import { Component } from '@Core/component';
import { fireEvent } from '@testing-library/react';

export interface TestDataID {
    name: string;
    price: number;
    quantity: number;
}

enum InputName {
    name = 'name',
    price = 'price',
    quantity = 'quantity',
}

export class ModalAddItem extends Component {
    protected selectors = {
        input: (dataTestID: string) => `.//input[@data-testid="input-${dataTestID}"]`,
        createButton: './/button[text()="Create"]',
    };

    public async clickCreateButton(): Promise<void> {
        const [button] = await document.waitForXpath(this.selectors.createButton);
        fireEvent.click(button);
    }

    public async fillNewItemData(data: TestDataID): Promise<void> {
        const [name] = await document.waitForXpath(this.selectors.input(InputName.name));
        const [price] = await document.waitForXpath(this.selectors.input(InputName.price));
        const [quantity] = await document.waitForXpath(this.selectors.input(InputName.quantity));

        fireEvent.change(name, { target: { value: data.name } });
        fireEvent.change(price, { target: { value: data.price } });
        fireEvent.change(quantity, { target: { value: data.quantity } });
    }

    public async addNewItem(data: TestDataID): Promise<void> {
        await this.fillNewItemData(data);
        await this.clickCreateButton();
    }
}
