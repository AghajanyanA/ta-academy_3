import { Locator } from '@playwright/test';
import { MyAccountDrop } from './topSide/myAccountDrop';
import { Component } from '@Core/component';

export class TopSide extends Component {
    private LOCATORS = {
        myAccountContainer: this.locator.locator('//div[contains(@class,"myAccount__myAccountMenu")]'),
        welcomeMessage: this.locator.locator('//div[contains(@class, "title")][contains(text(), "Hello")]'),
        myAccount: this.locator.locator('//div[contains(@class, "myAccount__title")]')
    };

    public async openAccountPanel(): Promise<void> {
        await this.LOCATORS.myAccountContainer.hover()
    }

    public welcomeMessage(): Locator {
        return this.LOCATORS.welcomeMessage
    }

    public myAccount(): Locator {
        return this.LOCATORS.myAccount
    }

    public MyAccountDrop = new MyAccountDrop(this, this.LOCATORS.myAccountContainer, this.page)

}
