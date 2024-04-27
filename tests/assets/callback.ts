import { CallBackData } from '../../src/types/interfaces';

export default function callback(error: any, data?: CallBackData) {
    if (error) {
        // Handle error
    }

    // Handle Verifiable Credentials usage
    if (data?.results) {
        for (const result of data.results) {
            if (result?.error) {
                // Handle error
            } else {
                // const vc = result;
                // Store the Verifiable Credentials
                // ...
                // Perform operations with the Verifiable Credentials
                // ...
            }
        }
    }
}
