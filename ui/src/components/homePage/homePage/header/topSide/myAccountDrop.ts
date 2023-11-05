import { Component } from '@Core/component';
import { TopSide } from '../topSide';
import { Locator, Page } from '@playwright/test';

export class MyAccountDrop extends Component {
    constructor(topSide: TopSide, locator: Locator, page: Page) {
        super(locator, page) 
        this.topSide = topSide
    }

    protected topSide: TopSide

    protected LOCATORS = {
        login: this.locator.locator('//button[text()="Log in"]'),
        signOut: this.locator.locator('//button[text()="Sign out"]')
    };

    async openLoginPanel() {
        await this.topSide.openAccountPanel()
        await this.LOCATORS.login.click()
    }
    
    async signOut() {
        await this.locator.hover()
        await this.LOCATORS.signOut.click()
    }

}
