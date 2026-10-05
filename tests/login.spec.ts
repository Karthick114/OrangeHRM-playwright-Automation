import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
test('User should login successfully with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();

    await loginPage.verifyLoginPage();

    await loginPage.login('Admin', 'admin123');

    await loginPage.verifyDashboard();
});