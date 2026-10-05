import { Page, expect } from '@playwright/test';

export class JobDetailsPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickJobTab() {
        await this.page.waitForTimeout(5000);

        await this.page.getByRole('link', { name: 'Job' }).click();

        await expect(
            this.page.getByRole('heading', { name: 'Job Details' })
        ).toBeVisible();
    }

    async updateJobDetails(
        jobTitle: string,
        employmentStatus: string
    ) {
                    await this.page.waitForTimeout(5000);

        // Job Title
        await this.page
            .getByText('-- Select --')
            .first()
            .click();

        await this.page
            .getByText(jobTitle, { exact: true })
            .click();

        // Employment Status
        await this.page
            .getByText('-- Select --')
            .nth(3)
            .click();

        await this.page
            .getByText(employmentStatus, { exact: true })
            .click();
        await this.page.waitForTimeout(5000);

        // Save
         await this.page
            .getByRole('button', { name: 'Save' })
            .hover();

        await this.page
            .getByRole('button', { name: 'Save' })
            .click();
    }

    async verifyJobDetails(
        jobTitle: string,
        employmentStatus: string
    ) {

                    await this.page.waitForTimeout(5000);

        await expect(
            this.page.getByText(jobTitle, { exact: true })
        ).toBeVisible();

        await expect(
            this.page.getByText(employmentStatus, { exact: true })
        ).toBeVisible();
    }
}