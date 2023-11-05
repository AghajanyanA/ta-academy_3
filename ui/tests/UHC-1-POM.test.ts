import { generateEmail } from './../utils/randomEmailGenerator';
import { test, expect } from '@Test';

test.describe('UHC-1', () => {
    test('Registration new customer with valid data and checking user data reset after logout', async ({ page, homePage}) => {
        
        await test.step('Step 1 — Click login and check popup window', async () => {

            await homePage.open();
            
            await homePage.Header.TopSide.MyAccountDrop.openLoginPanel();
    
            await expect(homePage.Auth.loginTitle).toBeVisible();
        })

        await test.step('Step 2 — Click create account button', async () => {

            await homePage.Auth.displayRegisterPage();

        })

        const userName = 'Jackson';

        await test.step('Step 3 — Fill registration form and register', async () => {
            
            const generatedEmail = generateEmail(8);

            await homePage.Auth.Register.createNewAccount({
                firstName: userName, 
                lastName: 'Hart', 
                email: generatedEmail, 
                password: '12345678aA.'
            });

            await expect(homePage.Auth.registerTitle).toBeHidden();

            await expect(homePage.Welcome.welcomeWindow()).toBeVisible();

            await expect(homePage.Welcome.title()).toHaveText(`Welcome, ${userName}`); 

            await expect(homePage.Welcome.subtitle()).toBeVisible();
            
        })    
        
        await test.step('Step 4 — Check if user is successfully registered', async () => {       
            await homePage.Welcome.closeWindow();

            await expect(homePage.Welcome.welcomeWindow()).toBeHidden();

            await expect(homePage.Header.TopSide.welcomeMessage()).toHaveText(`Hello, ${userName}`);

            const capitalizedUsername = userName.charAt(0).toUpperCase() + userName.slice(1)
    
            await expect(homePage.EligiblityWidget.header()).toHaveText(`Hi ${capitalizedUsername}`);
        })
 
        await test.step('Step 5 — Check logout works', async () => {

            await homePage.Header.TopSide.MyAccountDrop.signOut()
    
            await expect(homePage.Header.TopSide.myAccount()).toHaveText(
                'My Account'
            );
    
            await expect(homePage.EligiblityWidget.window()).toBeHidden();
        })
    });
});
