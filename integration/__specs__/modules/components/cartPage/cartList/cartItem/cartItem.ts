import { extractPriceForOne } from './../../../../utils/extractPriceForOne';
import { TestDataID } from '@Components/cartPage/ModalAddItem/ModalAddItem';
import { Component } from '@Core/component';
import { fireEvent } from '@testing-library/react';

export class CartItem extends Component {
    protected selectors = {
        fullPrice: './/div[contains(@class, "fullprice")]',
        priceForOne: './/div[contains(@class, "price-for-one")]',
        addButton: './/button[text()="+"]',
        itemName: './/h2[@class="cart-item__name"]',
        quantity: './/div[@data-testid="quantity-current"]',
        deleteButton: './/button[@data-testid="delete-btn"]',
    };

    public async getPriceForAll(): Promise<number> {
        const [priceElement] = await document.waitForXpath(this.selectors.fullPrice);
        return Number(priceElement.textContent.replace('$', ''));
    }

    public async getPriceForOne(): Promise<number> {
        const [priceElement] = await document.waitForXpath(this.selectors.priceForOne);
        return extractPriceForOne(priceElement.textContent);
    }

    public async getQuantity(): Promise<number> {
        const [quantityElement] = await document.waitForXpath(this.selectors.quantity)
        return +quantityElement.textContent
    }

    public async getName(): Promise<string> {
        const [itemElement] = await document.waitForXpath(this.selectors.itemName);
        return itemElement.textContent;
    }

    public async addOne(): Promise<void> {
        await this.element.clickByXpath(this.selectors.addButton);
    }

    public async getLatestAddedItem(data: TestDataID): Promise<TestDataID> {
        const price = await this.getPriceForAll() / data.quantity;
        const name = await this.getName();
        const quantity = await this.getQuantity();
        return {price, name, quantity}
    }

    public async deleteLatestItem(): Promise<void> {
        const [deleteButton] = await document.waitForXpath(this.selectors.deleteButton)
        fireEvent.click(deleteButton)
    }
}
