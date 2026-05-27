# Fetching Data with React Query

## Overview

[TanStack Query](https://tanstack.com/query) (formerly React Query) is a data-fetching library that manages server state — loading, caching, background refetching, and error handling — so components don't have to do it manually.

## Setup

A `QueryClient` is created once and provided to the whole app via `QueryClientProvider`, typically in `main.tsx`:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
```

## Implementation

The `useQuery` hook replaces the `useEffect` + `useState` combination. It takes a `queryKey` (used for caching and deduplication) and a `queryFn` (the async function that fetches the data).

```tsx
const { data: policyList = [], isLoading } = useQuery({
  queryKey: ['policies'],
  queryFn: getPolicies,
});
```

The underlying service function is unchanged — `useQuery` calls it and handles the rest:

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
| **Less boilerplate** | `isLoading`, `error`, and `data` come from one hook call instead of three `useState` declarations |
| **Automatic caching** | Results are cached by `queryKey` — repeated mounts skip the network if data is fresh |
| **Request deduplication** | Multiple components using the same key share one in-flight request |
| **Background refetching** | Stale data is refreshed automatically on window focus and network reconnect |
| **Extra dependency** | Requires installing and configuring `@tanstack/react-query` |
