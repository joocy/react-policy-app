import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type BasePolicy } from './types';
import { updatePolicy } from './policyService';

export function PolicyDetails({policy}: {policy: BasePolicy}) {
    const [email, setEmail] = useState(policy.email);
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, isSuccess, error } = useMutation({
        mutationFn: (updatedPolicy: BasePolicy) => updatePolicy(updatedPolicy),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['policies'] });
        },
    });

    function handleSave() {
        mutate({ ...policy, email });
    }

    return (
        <div className="selected-policy">
            <h2>Selected Policy</h2>
            <p><strong>Id: </strong>{policy.id}</p>
            <p><strong>Name: </strong>{policy.firstName} {policy.lastName}</p>
            <p>
                <strong>Email: </strong>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button onClick={handleSave} disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save'}
                </button>
            </p>
            {isSuccess && <p style={{ color: 'green' }}>Saved successfully</p>}
            {isError && <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>}
            {policy.phoneNumber && <p><strong>Phone Number: </strong>{policy.phoneNumber}</p>}
            {policy.dateOfBirth && <p><strong>Date of Birth: </strong>{policy.dateOfBirth.toDateString()}</p>}
        </div>
    );
}
