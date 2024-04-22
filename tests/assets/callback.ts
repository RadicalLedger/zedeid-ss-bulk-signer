import { VerifiableCredential } from '@transmute/vc.js/dist/types/VerifiableCredential';

export default function callback(error: any, vc?: VerifiableCredential) {
    if (error) {
        // Handle error
    }

    // Handle VerifiableCredential usage
    if (vc) {
        // Store the VerifiableCredential
        // ...
        // Perform operations with the VerifiableCredential
        // ...
    }
}
