import './App.css'
import { PolicyList } from './PolicyList'
import { getPolicies } from './policyService'

function App() {
  return (
    <>
      <h1>Policies app</h1>
      <PolicyList policies={getPolicies()} />
    </>
  )
}

export default App
