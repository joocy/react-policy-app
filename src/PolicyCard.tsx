import { type BasePolicy } from './types';

type PolicyCardProps = { policy: BasePolicy };

export function PolicyCard({ policy }: PolicyCardProps) {
    return (
        <div className="policy-card">
            <p><strong>Id: </strong>{policy.id}</p>
            <p><strong>Name: </strong>{policy.firstName} {policy.lastName}</p>
        </div>
    );
}