export interface BasePolicy {
    readonly id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber?: string,
    dateOfBirth?: Date,
}

export type BasePolicyList = BasePolicy[];