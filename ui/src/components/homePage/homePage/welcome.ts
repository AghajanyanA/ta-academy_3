import { Component } from "@Core/component";
import { Locator } from "@playwright/test";


export class Welcome extends Component {
    private LOCATORS = {
        welcomeWindow: this.locator.locator('//div[@class="rc-dialog-content"]'),
        welcomeTitle: this.locator.locator('//h2[contains(text(),"Welcome,")]'),
        welcomeSubtitle: this.locator.locator('//p[text()="You can start enjoying everything we have to offer"]'),
        closeBTN: this.locator.locator('//button[@aria-label="Close"]')
    }

    public welcomeWindow(): Locator {
        return this.LOCATORS.welcomeWindow
    }

    public title(): Locator {
        return this.LOCATORS.welcomeTitle
    }
    public subtitle(): Locator {
        return this.LOCATORS.welcomeSubtitle
    }
    public async closeWindow(): Promise<void> {
        await this.LOCATORS.closeBTN.click()
    }
}