import { Component } from "@Core/component";
import { Locator } from "@playwright/test";

export class EligiblityWidget extends Component {
    private LOCATORS = {
        header: this.locator.locator('//header[contains(@class, "eligibilityWidget__header")]/p')
    }

    public window(): Locator {
        return this.locator
    }

    public header(): Locator {
        return this.LOCATORS.header
    }
}