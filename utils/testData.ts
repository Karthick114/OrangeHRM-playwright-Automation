export function generateEmployeeId(): string {
    return Date.now().toString().slice(-6);
}