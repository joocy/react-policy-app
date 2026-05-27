import { useState } from 'react';
import './App.css'
import { PolicyList } from './PolicyList'
import { PolicyDetails } from './PolicyDetails'
import { getPolicies } from './policyService'
import type { BasePolicy } from './types';

function App() {
  const [selectedPolicy, setSelectedPolicy] = useState<BasePolicy | null>(null);

  function handlePolicySelect(policy: BasePolicy) {
    setSelectedPolicy(policy);
  }

  return (
    <>
      <h1>Policies app</h1>
      <PolicyList policies={getPolicies()} onPolicySelect={handlePolicySelect} />
      {selectedPolicy && (<PolicyDetails policy={selectedPolicy} />)}
    </>
  )
}

export default App
