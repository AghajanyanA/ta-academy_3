import { generateEmail } from '../src/utils/randomEmailGenerator';
import { test, expect } from '@Test';

test.describe('UHC-1 (test ID)', () => {
    test('Registration new customer with valid data and checking user data reset after logout', async ({
        browser,
        page,
        baseURL,
    }) => {
        // Step 1

        await page.goto(baseURL as string, { waitUntil: 'domcontentloaded' });

        await page.locator('//div[text()="My Account"]/../..').hover();

        await page.locator('//button[text()="Log in"]').click();

        await expect(
            page.locator('//h2[text()="Access your vision benefits"]/../../..')
        ).toBeVisible();

        // Step 2

        await page.locator('//span[text()="Create UHCGlasses.com Account"]').click();

        await expect(
            page.locator('//h2[text()="No vision insurance? We got you!"]/../../..')
        ).toBeVisible();

        // Step 3

        const userName = 'Jackson';
        const generatedEmail = generateEmail(8);

        await page.locator('//input[@name="firstName"]').fill(userName);

        await page.locator('//input[@name="lastName"]').fill('Hart');

        await page.locator('//input[@name="email"]').fill(generatedEmail);

        await page.locator('//input[@name="password"]').fill('12345678aA.');

        await page.locator('//button[@aria-label="Create new account"]').click();

        await expect(
            page.locator('//h2[text()="No vision insurance? We got you!"]/../../..')
        ).toBeHidden();

        await expect(async () => {
            await expect(page.locator('//div[@class="rc-dialog-content"]')).toBeVisible();
            await expect(page.locator('//h2[contains(text(),"Welcome,")]')).toHaveText(
                `Welcome, ${userName}`
            ); // We could have used 'Welcome, .*' but I like it this way
            await expect(
                page.locator('//p[text()="You can start enjoying everything we have to offer"]')
            ).toBeVisible();
        }).toPass();

        // Step 4

        await page.locator('//button[@aria-label="Close"]').click();

        await expect(page.locator('//div[@class="rc-dialog-content"]')).toBeHidden();

        await expect(async () => {
            await expect(
                page.locator('//div[contains(@class, "title")][contains(text(), "Hello")]')
            ).toHaveText(`Hello, ${userName}`);

            await expect(
                page.locator('//header[contains(@class, "eligibilityWidget__header")]/p')
            ).toHaveText(`Hi ${userName.charAt(0).toUpperCase() + userName.slice(1)}`); // capitalize first letter just in case, becuase snackbar does the same, and if our first name was all lower letters - test would fail
        }).toPass();

        // Step 5

        await page
            .locator('//div[contains(@class, "title")][contains(text(), "Hello")]/../..')
            .hover();

        await page.locator('//button[text()="Sign out"]').click();

        await expect(page.locator('//div[contains(@class, "myAccount__title")]')).toHaveText(
            'My Account'
        );

        await expect(
            page.locator('//section[contains(@class, "eligibilityWidget__widget")]')
        ).toBeHidden();
    });
});
