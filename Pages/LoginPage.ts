import { Page, expect } from '@playwright/test';

export class LoginPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToLoginPage() {
        await this.page.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
        );
    }

    async verifyLoginPage() {
        await expect(
            this.page.getByRole('heading', { name: 'Login' })
        ).toBeVisible();
    }

    async login(username: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
        await this.page.waitForTimeout(8000);
    }

    async verifyDashboard() {
        await expect(
            this.page.getByRole('heading', { name: 'Dashboard' })
        ).toBeVisible();
    }
}