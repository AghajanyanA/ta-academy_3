import { Locator } from '@playwright/test';
import { MyAccountDrop } from './topSide/myAccountDrop';
import { Component } from '@Core/component';

export class TopSide extends Component {
    private LOCATORS = {
        myAccountContainer: this.locator.locator(
            '//div[contains(@class,"myAccount__myAccountMenu")]'
        ),
        welcomeMessage: this.locator.locator(
            '//div[contains(@class, "title")][contains(text(), "Hello")]'
        ),
        myAccount: this.locator.locator('//div[contains(@class, "myAccount__title")]'),
    };

    public MyAccountDrop = new MyAccountDrop(this.LOCATORS.myAccountContainer, this.page);

    public async welcomeMessage(): Promise<string | null> {
        return await this.LOCATORS.welcomeMessage.textContent();
    }

    public async myAccount(): Promise<string | null> {
        return await this.LOCATORS.myAccount.textContent();
    }
}
