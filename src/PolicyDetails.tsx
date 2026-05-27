import { useState } from 'react';
import { type BasePolicy } from './types';
import { updatePolicy } from './policyService';

interface PolicyDetailsProps {
    policy: BasePolicy;
    onUpdate: (updated: BasePolicy) => void;
}

export function PolicyDetails({ policy, onUpdate }: PolicyDetailsProps) {
    const [email, setEmail] = useState(policy.email);
    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    async function handleSave() {
        setIsPending(true);
        setIsSuccess(false);
        setError(null);
        try {
            const updated = await updatePolicy({ ...policy, email });
            onUpdate(updated);
            setIsSuccess(true);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="selected-policy">
            <h2>Selected Policy</h2>
            <p><strong>Id: </strong>{policy.id}</p>
            <p><strong>Name: </strong>{policy.firstName} {policy.lastName}</p>
            <p>
                <strong>Email: </strong>
                <input value={email} onChange={e => setEmail(e.target.value)} />
                <button onClick={handleSave} disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save'}
                </button>
            </p>
            {isSuccess && <p style={{ color: 'green' }}>Saved successfully</p>}
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            {policy.phoneNumber && <p><strong>Phone Number: </strong>{policy.phoneNumber}</p>}
            {policy.dateOfBirth && <p><strong>Date of Birth: </strong>{policy.dateOfBirth.toDateString()}</p>}
        </div>
    );
}
