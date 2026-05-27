import type { BasePolicyList } from "./types";

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
