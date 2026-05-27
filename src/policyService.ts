import type { BasePolicy, BasePolicyList } from "./types";

export async function updatePolicy(policy: BasePolicy): Promise<BasePolicy> {
    const response = await fetch(`${import.meta.env.VITE_POLICIES_API_URL}/${policy.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(policy),
    });
    if (!response.ok) {
        throw new Error(`Failed to update policy ${policy.id}: ${response.status}`);
    }
    return response.json();
}

export async function getPolicies(): Promise<BasePolicyList> {
    const response = await fetch(import.meta.env.VITE_POLICIES_API_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch policies: ${response.status}`);
    }
    const data = await response.json();
    return data.map((policy: any) => ({
        ...policy,
        dateOfBirth: policy.dateOfBirth ? new Date(policy.dateOfBirth) : undefined,
    }));
}
