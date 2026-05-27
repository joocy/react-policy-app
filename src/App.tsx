import { useState } from 'react';
import './App.css'
import { PolicyList } from './PolicyList'
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
      {selectedPolicy && (
        <div className="selected-policy">
          <h2>Selected Policy</h2>
          <p><strong>Id: </strong>{selectedPolicy.id}</p>
          <p><strong>Name: </strong>{selectedPolicy.firstName} {selectedPolicy.lastName}</p>
          <p><strong>Email: </strong>{selectedPolicy.email}</p>
          {selectedPolicy.phoneNumber && <p><strong>Phone Number: </strong>{selectedPolicy.phoneNumber}</p>}
          {selectedPolicy.dateOfBirth && <p><strong>Date of Birth: </strong>{selectedPolicy.dateOfBirth.toDateString()}</p>}
        </div>
      )}
    </>
  )
}

export default App
