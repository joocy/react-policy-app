import type { BasePolicyList } from "./types";

export function getPolicies(): BasePolicyList {
    return [
        {
            id: "1",
            firstName: "John",
            lastName: "Smith",
            email: "john.smith@yahoo.com",
            dateOfBirth: new Date("1980-01-01")
        },
        {
            id: "2",
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@yahoo.com",
            phoneNumber: "1234567890",
            dateOfBirth: new Date("1990-01-01")
        },
        {
            id: "3",
            firstName: "Bob",
            lastName: "Smith",
            email: "bob.smith@yahoo.com"
        }
    ];
}