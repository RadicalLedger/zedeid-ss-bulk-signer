import { DocumentLoader } from '@transmute/vc.js/dist/types/DocumentLoader';
import { DIDMethods } from 'sd-vc-lib/dist/types/utils.type';
import { Suite } from '@transmute/vc.js/dist/types/Suite';
import { Callback, VerifiableCredentialLoader } from './types/declrations';
import { VCOptions } from './types/interfaces';
import { Worker as BullMqWorker, Job, WorkerOptions } from 'bullmq';
/**
 * Represents a worker that handles the signing of verifiable credentials.
 */
export default class Worker {
    worker: BullMqWorker;
    issuer: string;
    holder: string | undefined;
    issuanceDate: string;
    suite: Suite;
    didMethod: DIDMethods;
    vcLoader: VerifiableCredentialLoader;
    documentLoader: DocumentLoader;
    callback: Callback;
    /**
     * Creates a new instance of the Worker class.
     * @param name - The name of the worker.
     * @param vcOptions - The options for signing verifiable credentials.
     * @param workerOptions - The options for the worker.
     */
    constructor(name: string, vcOptions: VCOptions, workerOptions?: WorkerOptions);
    /**
     * Handles the processing of a job by signing the verifiable credential.
     * @param job - The job to be processed.
     */
    workerHandler(job: Job): Promise<void>;
}
