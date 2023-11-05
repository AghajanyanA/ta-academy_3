import { Component } from "@Core/component";

type RegistrationForm = {
    firstName: string,
    lastName: string,
    email: string, 
    password: string
}

export class Register extends Component {
    private LOCATORS = {
        firstName: this.locator.locator('//input[@name="firstName"]'),
        lastName: this.locator.locator('//input[@name="lastName"]'),
        email: this.locator.locator('//input[@name="email"]'),
        password: this.locator.locator('//input[@name="password"]'),
        createAccountBTN: this.locator.locator('//button[@aria-label="Create new account"]')
    }
    public async fillRegisterData(data: RegistrationForm) {        
        await this.LOCATORS.firstName.fill(data.firstName)
        await this.LOCATORS.lastName.fill(data.lastName)
        await this.LOCATORS.email.fill(data.email)
        await this.LOCATORS.password.fill(data.password)
    }

    public async createNewAccount(data: RegistrationForm) {
        await this.fillRegisterData(data)
        await this.LOCATORS.createAccountBTN.click()
    }

    

}