import { Page, expect } from '@playwright/test';

export class EmployeeListPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToEmployeeList() {
          await this.page.waitForTimeout(5000);

        await this.page.getByRole('link', { name: 'PIM' }).click();

        await expect(
            this.page.getByRole('heading', { name: 'Employee Information' })
        ).toBeVisible();
    }

    async searchEmployee(employeeId: string) {
        const employeeIdField = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .locator('input');

        await employeeIdField.fill(employeeId);

        await this.page
            .getByRole('button', { name: 'Search' })
            .click();
              await this.page.waitForTimeout(5000);

    }

    async deleteEmployee(employeeId: string) {
        await this.page.waitForTimeout(5000);

    const row = this.page
        .locator('.oxd-table-card')
        .filter({ hasText: employeeId });

    await expect(row).toHaveCount(1);

    await row.hover();

    await row.locator('button').last().click();
    await this.page.waitForTimeout(5000);

    await expect(
        this.page.getByText('Are you Sure?')
    ).toBeVisible();

    await this.page
        .getByRole('button', { name: /Yes, Delete/ })
        .click();

    await expect(row).toHaveCount(0);
    await this.page.waitForTimeout(5000);
}
}