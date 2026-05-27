import { type BasePolicy } from './types';

type PolicyCardProps = { 
    policy: BasePolicy 
    onPolicySelect: (policy: BasePolicy) => void
};

export function PolicyCard({ policy, onPolicySelect }: PolicyCardProps) {
    return (
        <div className="policy-card" onClick={() => onPolicySelect(policy)}>
            <p><strong>Id: </strong>{policy.id}</p>
            <p><strong>Name: </strong>{policy.firstName} {policy.lastName}</p>
        </div>
    );
}