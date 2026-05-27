import { useState } from 'react';
import './App.css'
import { PolicyList } from './PolicyList'
import { PolicyDetails } from './PolicyDetails'
import { getPolicies } from './policyService'
import type { BasePolicy } from './types';

function App() {
  const [selectedPolicy, setSelectedPolicy] = useState<BasePolicy | null>(null);
  const [policyFilter, setPolicyFilter] = useState<string>('');
  const policyList = getPolicies();
  const filteredPolicies = policyList.filter(policy =>
    policy.firstName.toLowerCase().includes(policyFilter.toLowerCase())
  )

  function handlePolicySelect(policy: BasePolicy) {
    setSelectedPolicy(policy);
  }

  return (
    <>
      <h1>Policies app</h1>
      <input value={policyFilter} onChange={e => setPolicyFilter(e.target.value)} placeholder="Filter by first name" />
      {filteredPolicies.length === 0 ? (
        <p>No policies found matching "{policyFilter}"</p>
      ):(<PolicyList policies={filteredPolicies} onPolicySelect={handlePolicySelect} />)}
      {selectedPolicy && (<PolicyDetails policy={selectedPolicy} />)}
    </>
  )
}

export default App
