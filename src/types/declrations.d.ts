import { VerifiableCredential } from '@transmute/vc.js/dist/types/VerifiableCredential';
import { CallBackData, Credential, VCLoaderData } from 'interfaces';

/**
 * A function type for loading verifiable credentials.
 * @param job - The job object containing information about the credential to be loaded.
 * @returns A promise that resolves to the loaded credential.
 */
export declare type VerifiableCredentialLoader = (job: Job) => Promise<VCLoaderData[]>;

/**
 * A function type for loading issuer private keys.
 * @param job - The job object containing information about the private key to be loaded.
 * @returns A promise that resolves to the loaded private key.
 */
export declare type IssuerPrivateKeyLoader = (job?: Job) => Promise<string>;

/**
 * A function type for loading holder public keys.
 * @param job - The job object containing information about the public key to be loaded.
 * @returns A promise that resolves to the loaded public key.
 */
export declare type HolderPublicKeyLoader = (job?: Job) => Promise<string>;

/**
 * A callback function type for handling errors and verifiable credentials.
 * @param error - The error object, if any.
 * @param data - The callback data containing the error and signed verifiable credential, if available.
 */
export declare type Callback = (error: any, data?: CallBackData) => void;
