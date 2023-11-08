import { Mock } from '@Core/mock';
import { CartPage } from '@Components/cartPage/cartPage';
import { GetCartItemsMock } from '@Mocks/api/mockio/v2/id/get';
import '@testing-library/jest-dom';
import type { TestDataID } from '@Components/cartPage/ModalAddItem/ModalAddItem';
import { ModalAddItem } from '@Components/cartPage/ModalAddItem/ModalAddItem';
import { CartItem } from '@Components/cartPage/cartList/cartItem/cartItem';

describe('UHC-0-int', () => {
    const mock = Mock.getInstance();
    let cartPage: CartPage;
    let modalAddItem: ModalAddItem;
    let cartItem: CartItem;

    beforeAll(async () => {
        cartPage = new CartPage();
        modalAddItem = new ModalAddItem();
        cartItem = new CartItem();
        mock.addMocks(new GetCartItemsMock());
    });

    afterAll(() => {
        cartPage.destroy();
    });

    test('Test title', async () => {
        await cartPage.fulfill();

        await cartPage.openModalAddItem();

        const newItemModal = await cartPage.getModalAddNewItem();

        const newItemData: TestDataID = {
            name: 'Carrot',
            price: 50,
            quantity: 2,
        };

        reporter.startStep('"Add New Cart Item" modal is displayed.');
        expect(newItemModal).toBeVisible();
        reporter.endStep();

        await modalAddItem.addNewItem(newItemData);

        reporter.startStep(
            'Check that a new product has been added, and all fields (name, price, quantity) are displayed correctly'
        );
        expect(await cartItem.getLatestAddedItem(newItemData)).toEqual(newItemData);
        reporter.endStep();

        await cartItem.deleteLatestItem();

        reporter.startStep('Check that last added item is not on the page');
        expect(await cartItem.getLatestAddedItem(newItemData)).not.toEqual(newItemData);
        reporter.endStep();
    });
});
