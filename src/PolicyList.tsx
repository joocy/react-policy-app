import { PolicyCard } from './PolicyCard';
import { type BasePolicyList } from './types';

type PolicyListProps = {
    policies: BasePolicyList
};

export function PolicyList({ policies }: PolicyListProps) {
    return (
        <div className="policy-list">
            {policies.map(policy => (<PolicyCard key={policy.id} policy={policy} />))}
        </div>
    );
}