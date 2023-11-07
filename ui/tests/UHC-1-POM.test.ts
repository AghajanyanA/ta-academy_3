import { capitalizeFirstChar } from '@Utils/capitalizeFirstChar';
import { generateEmail } from '../src/utils/randomEmailGenerator';
import { test, expect } from '@Test';

test.describe('UHC-1', () => {
    test('Registration new customer with valid data and checking user data reset after logout', async ({
        page,
        homePage,
    }) => {
        await test.step('Step 1 — Click login and check popup window', async () => {
            await homePage.open();

            await homePage.Header.TopSide.MyAccountDrop.openLoginModal();

            expect(await homePage.Auth.isLoginTitleVisible()).toBe(true);
        });

        await test.step('Step 2 — Click create account button', async () => {
            await homePage.Auth.clickCreateNewAccount();
            expect(await homePage.Auth.isRegisterTitleVisible()).toBe(true);
        });

        const userName = 'Jackson';

        await test.step('Step 3 — Fill registration form and register', async () => {
            const generatedEmail = generateEmail(8);

            await homePage.Auth.Register.createNewAccount({
                firstName: userName,
                lastName: 'Hart',
                email: generatedEmail,
                password: '12345678aA.',
            });

            expect(async () => {
                expect(await homePage.Auth.isRegisterTitleVisible()).toBe(false);
    
                expect(await homePage.WelcomeModal.isVisible()).toBe(true);
    
                expect(await homePage.WelcomeModal.title()).toStrictEqual(`Welcome, ${userName}`);
    
                expect(await homePage.WelcomeModal.isSubtitleVisible()).toBe(true);
            }).toPass()
        });

        await test.step('Step 4 — Check if user is successfully registered', async () => {
            await homePage.WelcomeModal.closeWindow();

            expect(await homePage.WelcomeModal.isVisible()).toBe(false);

            expect(await homePage.Header.TopSide.welcomeMessage()).toStrictEqual(
                `Hello, ${userName}`
            );

            expect(await homePage.EligiblityWidget.headerText()).toStrictEqual(
                `Hi ${capitalizeFirstChar(userName)}`
            );
        });

        await test.step('Step 5 — Check logout works', async () => {
            await homePage.Header.TopSide.MyAccountDrop.signOut();

            expect(await homePage.Header.TopSide.myAccount()).toStrictEqual('My Account');

            expect(await homePage.EligiblityWidget.isVisible()).toBe(false);
        });
    });
});
