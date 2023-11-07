import { Component } from '@Core/component';
import { Register } from './header/auth/register';

export class Auth extends Component {
    protected LOCATORS = {
        loginTitle: this.locator.locator('//h2[contains(text(), "Access")]'),
        createNewAccountBTN: this.locator.locator('//span[text()="Create UHCGlasses.com Account"]'),
        registerTitle: this.locator.locator('//h2[text()="No vision insurance? We got you!"]'),
        welcomeWindow: this.locator.locator('//div[@class="rc-dialog-content"]'),
    };

    public Register = new Register(this.locator, this.page);

    public async isLoginTitleVisible(): Promise<boolean> {
        return await this.LOCATORS.loginTitle.isVisible();
    }

    public async isRegisterTitleVisible(): Promise<boolean> {
        return await this.LOCATORS.registerTitle.isVisible();
    }

    public async clickCreateNewAccount(): Promise<void> {
        await this.LOCATORS.createNewAccountBTN.click();
    }
}
