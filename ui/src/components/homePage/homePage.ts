import { EligiblityWidget } from './homePage/eligiblityWidget';
import { Container } from '@Core/container';
import { Header } from '@Components/homePage/homePage/header';
import { Auth } from './homePage/auth';
import { Welcome } from './homePage/welcome';

export class HomePage extends Container {
    protected LOCATORS = {
        header: this.page.locator('//div[contains(@class, "header__wrapHeader")]'),
        authWindow: this.page.locator('//div[contains(@class, "ReactModal__Content")]'),
        eligiblityWidget: this.page.locator('//section[contains(@class, "eligibilityWidget__widget")]'),
        welcome: this.page.locator('//div[@class="rc-dialog welcomePopup"]'),
    };

    public Header = new Header(this.LOCATORS.header, this.page);

    public Auth = new Auth(this.LOCATORS.authWindow, this.page);

    public Welcome = new Welcome(this.LOCATORS.welcome, this.page);

    public EligiblityWidget = new EligiblityWidget(this.LOCATORS.eligiblityWidget, this.page);

    public async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}
