import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './App.css'
import { PolicyList } from './PolicyList'
import { PolicyDetails } from './PolicyDetails'
import { PolicySelectionProvider } from './PolicySelectionContext'
import { getPolicies } from './policyService'
import type { BasePolicy } from './types';

function App() {
  const [selectedPolicy, setSelectedPolicy] = useState<BasePolicy | null>(null);
  const [policyFilter, setPolicyFilter] = useState<string>('');
  const { data: policyList = [], isLoading, error } = useQuery({
    queryKey: ['policies'],
    queryFn: getPolicies,
  });

  const filteredPolicies = policyList.filter(policy =>
    policy.firstName.toLowerCase().includes(policyFilter.toLowerCase())
  )

  function handlePolicySelect(policy: BasePolicy) {
    setSelectedPolicy(policy);
  }

  return (
    <PolicySelectionProvider onPolicySelect={handlePolicySelect}>
      <h1>Policies app</h1>
      <input value={policyFilter} onChange={e => setPolicyFilter(e.target.value)} placeholder="Filter by first name" />
      <div className="app-layout">
        <div className="app-list">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Failed to load policies: {error.message}</p>
          ) : filteredPolicies.length === 0 ? (
            <p>No policies found matching "{policyFilter}"</p>
          ) : (
            <PolicyList policies={filteredPolicies} />
          )}
        </div>
        {selectedPolicy && (
          <div className="app-details">
            <PolicyDetails key={selectedPolicy.id} policy={selectedPolicy} />
          </div>
        )}
      </div>
    </PolicySelectionProvider>
  )
}

export default App
