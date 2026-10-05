import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AddEmployeePage } from '../Pages/AddEmployeePage';
import employeeData from '../test-data/employee.json';
import { JobDetailsPage } from '../Pages/JobDetailsPage';
import { EmployeeListPage } from '../Pages/EmployeeListPage';
import { generateEmployeeId } from '../utils/testData';

test('Create a new employee', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const addEmployeePage = new AddEmployeePage(page);
    const jobDetailsPage = new JobDetailsPage(page);
    const employeeListPage = new EmployeeListPage(page);

    // Generate unique Employee ID
    const employeeId = generateEmployeeId();

    console.log('Generated Employee ID:', employeeId);

    // Login
    await loginPage.navigateToLoginPage();

    await loginPage.login('Admin', 'admin123');

    await loginPage.verifyDashboard();

    // Navigate to Add Employee
    await addEmployeePage.navigateToPIM();

    await addEmployeePage.clickAddEmployee();

    // Enter employee data
    await addEmployeePage.enterEmployeeDetails(
        employeeData.firstName,
        employeeData.lastName,
        employeeId
    );

    // Upload profile picture
    await addEmployeePage.uploadProfilePicture(
        employeeData.profilePicture
    );

    // Save employee
    const empNumber = await addEmployeePage.saveEmployee();

    console.log('Created Employee Number:', empNumber);

    // Verify employee created
    await addEmployeePage.verifyEmployeeCreated();

    // API validation
    const response = await page.request.get(
        `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/${empNumber}`
    );

    expect(response.status()).toBe(200);

    const apiResponse = await response.json();

    console.log('API Response:', apiResponse);

    // API assertions
    expect(apiResponse.data.empNumber).toBe(Number(empNumber));

    expect(apiResponse.data.firstName).toBe(employeeData.firstName);

    expect(apiResponse.data.lastName).toBe(employeeData.lastName);

    expect(apiResponse.data.employeeId).toBe(employeeId);

    // Update Job Details
    await jobDetailsPage.clickJobTab();

    await jobDetailsPage.updateJobDetails(
        employeeData.jobTitle,
        employeeData.employmentStatus
    );

    // Verify Job Details
    await jobDetailsPage.verifyJobDetails(
        employeeData.jobTitle,
        employeeData.employmentStatus
    );

    // Navigate to Employee List
    await employeeListPage.navigateToEmployeeList();

    // Search using generated Employee ID
    await employeeListPage.searchEmployee(employeeId);

    // Delete the exact employee
    await employeeListPage.deleteEmployee(employeeId);

    const deleteResponse = await page.request.get(
    `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/${empNumber}`
);

console.log('Delete API Status:', deleteResponse.status());

expect(deleteResponse.status()).toBe(422);

});