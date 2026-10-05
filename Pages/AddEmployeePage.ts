import { Page, expect } from '@playwright/test';

export class AddEmployeePage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToPIM() {
        await this.page.waitForTimeout(3000);
        await this.page.getByRole('link', { name: 'PIM' }).click();
    }

    async clickAddEmployee() {
        await this.page.getByRole('button', { name: /Add/ }).click();

        await expect(
            this.page.getByRole('heading', { name: 'Add Employee' })
        ).toBeVisible();
    }

    async enterEmployeeDetails(
        firstName: string,
        lastName: string,
        employeeId: string
    ) {
        await this.page
            .getByRole('textbox', { name: 'First Name' })
            .fill(firstName);

        await this.page
            .getByRole('textbox', { name: 'Last Name' })
            .fill(lastName);

        // Employee ID field
        const employeeIdField = this.page
        .locator('.oxd-input-group')
        .filter({ hasText: 'Employee Id' })
        .locator('input');

    await employeeIdField.fill(employeeId);

    }

    async uploadProfilePicture(filePath: string) {
        await this.page
            .getByRole('button', { name: 'Choose File' })
            .setInputFiles(filePath);
    }

async saveEmployee(): Promise<string> {
    await this.page
        .getByRole('button', { name: 'Save' })
        .click();
    await this.page.waitForTimeout(5000);


    await expect(
        this.page.getByRole('heading', { name: 'Personal Details' })
    ).toBeVisible();

    const url = this.page.url();

    const match = url.match(/empNumber\/(\d+)/);

    if (!match) {
        throw new Error(`Employee number not found in URL: ${url}`);
    }

    return match[1];
}

    async verifyEmployeeCreated() {
        await expect(
            this.page.getByRole('heading', { name: 'Personal Details' })
        ).toBeVisible();
            await this.page.waitForTimeout(5000);

    }
}