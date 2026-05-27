import { PolicyCard } from './PolicyCard';
import { type BasePolicy, type BasePolicyList } from './types';

type PolicyListProps = {
    policies: BasePolicyList
    onPolicySelect: (policy: BasePolicy) => void
};

export function PolicyList({policies, onPolicySelect}: PolicyListProps) {
    return (
        <div className="policy-list">
            {policies.map(policy => (<PolicyCard key={policy.id} policy={policy} onPolicySelect={onPolicySelect}/>))}
        </div>
    );
}