# Fetching Data with useEffect and fetch

## Overview

The browser's built-in `fetch` API combined with React's `useEffect` hook is the baseline approach to loading remote data in a React component. No extra dependencies are required.

## Implementation

Three pieces of state are needed: the data itself, a loading flag, and an error.

```tsx
const [policyList, setPolicyList] = useState<BasePolicyList>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [error, setError] = useState<Error | null>(null);
```

`useEffect` with an empty dependency array runs once after the component mounts. The fetch result is written into state when it resolves, or the error is captured if it rejects.

```tsx
useEffect(() => {
  getPolicies()
    .then(data => {
      setPolicyList(data);
    })
    .catch(err => {
      setError(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
}, []);
```

In the JSX, render the error state alongside loading and empty states:

```tsx
{isLoading ? (
  <p>Loading...</p>
) : error ? (
  <p>Failed to load policies: {error.message}</p>
) : policyList.length === 0 ? (
  <p>No policies found.</p>
) : (
  <PolicyList policies={policyList} />
)}
```

The service function performs the fetch and maps the raw JSON into typed objects:

```ts
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
```

## Trade-offs

| | |
|---|---|
| **No dependencies** | Works with React alone — nothing to install or configure |
| **Manual state management** | Loading, error, and data state must each be tracked separately |
| **No caching** | Every mount triggers a fresh network request |
| **No deduplication** | Multiple components fetching the same data each fire their own request |
| **Refetching is manual** | Stale data requires explicit user action or another `useEffect` to refresh |
