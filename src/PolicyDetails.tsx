import { type BasePolicy } from './types';

export function PolicyDetails({policy}: {policy: BasePolicy}) {
    return (
        <div className="selected-policy">
            <h2>Selected Policy</h2>
            <p><strong>Id: </strong>{policy.id}</p>
            <p><strong>Name: </strong>{policy.firstName} {policy.lastName}</p>
            <p><strong>Email: </strong>{policy.email}</p>
            {policy.phoneNumber && <p><strong>Phone Number: </strong>{policy.phoneNumber}</p>}
            {policy.dateOfBirth && <p><strong>Date of Birth: </strong>{policy.dateOfBirth.toDateString()}</p>}
        </div>)
}