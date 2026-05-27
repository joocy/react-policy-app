import { usePolicySelection } from './PolicySelectionContext';
import { type BasePolicy } from './types';

type PolicyCardProps = { 
    policy: BasePolicy 
};

export function PolicyCard({ policy }: PolicyCardProps) {
    const { onPolicySelect } = usePolicySelection();

    return (
        <div className="policy-card" onClick={() => onPolicySelect(policy)}>
            <p><strong>Id: </strong>{policy.id}</p>
            <p><strong>Name: </strong>{policy.firstName} {policy.lastName}</p>
        </div>
    );
}