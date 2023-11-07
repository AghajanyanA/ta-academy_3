import { Component } from '@Core/component';

export class MyAccountDrop extends Component {
    protected LOCATORS = {
        login: this.locator.locator('//button[text()="Log in"]'),
        signOut: this.locator.locator('//button[text()="Sign out"]'),
    };

    public async openAccountPanel(): Promise<void> {
        await this.locator.hover();
    }

    public async openLoginModal(): Promise<void> {
        await this.openAccountPanel();
        await this.LOCATORS.login.click();
    }

    public async signOut(): Promise<void> {
        await this.openAccountPanel();
        await this.LOCATORS.signOut.click();
    }
}
