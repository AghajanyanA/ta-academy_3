import { test, expect } from '@Test';

test.describe('UHC-1 (test ID)', () => {
    test('Registration new customer with valid data and checking user data reset after logout', async ({ browser, page, baseURL  }) => {

        // Step 1
        
        await page.goto(baseURL as string, {waitUntil: 'domcontentloaded'});

        await page.locator('//div[text()="My Account"]/../..').hover();

        await page.locator('//button[text()="Log in"]').click();

        expect(page.locator('//h2[text()="Access your vision benefits"]/../../..')).toBeVisible();

        // Step 2

        await page.locator('//span[text()="Create UHCGlasses.com Account"]').click();

        expect(page.locator('//h2[text()="No vision insurance? We got you!"]/../../..')).toBeVisible();

        // Step 3

        const userName = 'Jackson';

        await page.locator('//input[@name="firstName"]').fill(userName);

        await page.locator('//input[@name="lastName"]').fill('Hart');

        await page.locator('//input[@name="email"]').fill('jackson_hart@hollywood.com');

        await page.locator('//input[@name="password"]').fill('12345678aA.');

        await page.locator('//button[@aria-label="Create new account"]').click();

        expect(page.locator('//h2[text()="No vision insurance? We got you!"]/../../..')).toBeHidden();
        await page.waitForLoadState('domcontentloaded')
        expect(page.locator('//div[@class="rc-dialog-content"]')).toBeVisible();
        expect(page.locator('//h2[contains(text(),"Welcome,")]')).toHaveText(`Welcome, ${userName}`); // We could have used 'Welcome, .*' but I like it this way
        expect(page.locator('//p[text()="You can start enjoying everything we have to offer"]')).toBeVisible();

        // Step 4

        await page.locator('//button[@aria-label="Close"]').click();

        expect(page.locator('//div[@class="rc-dialog-content"]')).toBeHidden();

        expect(page.locator('//div[contains(@class, "title")][contains(text(), "Hello")]')).toHaveText(`Hello, ${userName}`);

        expect(page.locator('//header[contains(@class, "eligibilityWidget__header")]/p')).toHaveText(`Hi ${userName.charAt(0).toUpperCase() + userName.slice(1)}`); // capitalize first letter just in case, becuase snackbar does the same, and if our first name is all lower letters - test would fail

        // Step 5

        await page.locator('//div[contains(@class, "title")][contains(text(), "Hello")]/../..').hover();

        await page.locator('//button[text()="Sign out"]').click();

        expect(page.locator('//div[contains(@class, "myAccount__title")]')).toHaveText('My Account')

        expect(page.locator('//section[contains(@class, "eligibilityWidget__widget")]')).toBeHidden();

    });
});
