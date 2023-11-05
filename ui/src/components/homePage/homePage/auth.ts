import { Component } from "@Core/component";
import { expect } from "@Test";
import { Register } from "./header/auth/register";

export class Auth extends Component {
    protected LOCATORS = {
        loginTitle: this.locator.locator('//h2[contains(text(), "Access")]'),
        createNewAccountBTN: this.locator.locator('//span[text()="Create UHCGlasses.com Account"]'),
        registerTitle: this.locator.locator('//h2[text()="No vision insurance? We got you!"]'),
        welcomeWindow: this.locator.locator('//div[@class="rc-dialog-content"]'),
    }

    public loginTitle = this.LOCATORS.loginTitle

    public registerTitle = this.LOCATORS.registerTitle


    public async displayRegisterPage(): Promise<void> {
        await this.LOCATORS.createNewAccountBTN.click()
        await expect(this.LOCATORS.registerTitle).toBeVisible()
    }


    public Register = new Register(this.locator, this.page)

}