import { Job } from 'bullmq';
import { Callback, HolderPublicKeyLoader, IssuerPrivateKeyLoader } from 'declrations';

/**
 * Represents a credential object.
 */
export interface Credential {
    '@context': any[];
    id: string;
    issuanceDate: string;
    type: string | string[];
    issuer: string;
    credentialSubject: any;
    mask?: any;
}

/**
 * Represents the options for creating a verifiable credential.
 */
export interface VCOptions {
    /**
     * The loader used to load the verifiable credential.
     */
    loader: VerifiableCredentialLoader;

    /**
     * The issuance date of the verifiable credential.
     */
    issuanceDate?: string;

    /**
     * The private key of the issuer.
     */
    issuerPrivateKey: IssuerPrivateKeyLoader;

    /**
     * The public key of the holder.
     */
    holderPublicKey?: HolderPublicKeyLoader;

    /**
     * The cryptographic suite used for signing the verifiable credential.
     */
    suite?: Suite;

    /**
     * The DID method used for generating DIDs.
     */
    didMethod?: DIDMethods;

    /**
     * The document loader used to load external documents.
     */
    documentLoader: DocumentLoader;

    /**
     * The callback function called on process failure or success.
     */
    callback: Callback;
}

/**
 * Represents the data passed to the callback function.
 */
export interface CallBackData {
    /**
     * The job object associated with the callback.
     */
    job: Job;

    /**
     * The array of results of verifiable credentials signing.
     */
    results?: any[];
}

/**
 * Represents the data passed to the callback function.
 */
export interface CallBackData {
    /**
     * The job object associated with the callback.
     */
    job: Job;

    /**
     * The array of results of verifiable credentials signing.
     */
    results?: any[];
}

/**
 * Represents the data for the VCLoader.
 */
export interface VCLoaderData {
    /**
     * The data object.
     */
    data: any;

    /**
     * The verifiable credential object.
     */
    credential: Credential;
}
