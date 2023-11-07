import { Component } from '@Core/component';
import { Locator } from '@playwright/test';

export class EligiblityWidget extends Component {
    private LOCATORS = {
        header: this.locator.locator('//header[contains(@class, "eligibilityWidget__header")]/p'),
    };

    public async isVisible(): Promise<boolean> {
        return await this.locator.isVisible();
    }

    public async headerText(): Promise<string | null> {
        return await this.LOCATORS.header.textContent();
    }
}
