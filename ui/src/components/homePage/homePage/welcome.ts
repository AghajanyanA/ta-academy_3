import { Component } from '@Core/component';

export default class WelcomeModal extends Component {
    private LOCATORS = {
        welcomeTitle: this.locator.locator('//h2[contains(text(),"Welcome,")]'),
        welcomeSubtitle: this.locator.locator(
            '//p[text()="You can start enjoying everything we have to offer"]'
        ),
        closeBTN: this.locator.locator('//button[@aria-label="Close"]'),
    };

    public async isVisible(): Promise<boolean> {
        return await this.locator.isVisible();
    }

    public async title(): Promise<string | null> {
        return await this.LOCATORS.welcomeTitle.textContent();
    }
    public async isSubtitleVisible(): Promise<boolean> {
        return await this.LOCATORS.welcomeSubtitle.isVisible();
    }
    public async closeWindow(): Promise<void> {
        await this.LOCATORS.closeBTN.click();
    }
}
