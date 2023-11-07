import { Component } from '@Core/component';

type RegistrationForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export class Register extends Component {
    private LOCATORS = {
        input: (name: string) => this.locator.locator(`//input[@name=${name}]`),
        createAccountBTN: this.locator.locator('//button[@aria-label="Create new account"]'),
    };
    public async fillRegisterData(data: RegistrationForm): Promise<void> {
        await this.LOCATORS.input('firstName').fill(data.firstName);
        await this.LOCATORS.input('lastName').fill(data.lastName);
        await this.LOCATORS.input('email').fill(data.email);
        await this.LOCATORS.input('password').fill(data.password);
    }

    public async clickButton(): Promise<void> {
        await this.LOCATORS.createAccountBTN.click();
    }

    public async createNewAccount(data: RegistrationForm): Promise<void> {
        await this.fillRegisterData(data);
        await this.clickButton();
    }
}
