import { VCOptions } from './types/interfaces';
import { Worker as BullMqWorker, Job, WorkerOptions } from 'bullmq';
/**
 * Represents a worker that handles the signing of verifiable credentials.
 */
export default class Worker {
    private worker;
    private issuerLoader;
    private issuanceDate;
    private suite;
    private vcLoader;
    private documentLoader;
    private callback;
    /**
     * Creates a new instance of the Worker class.
     * @param name - The name of the worker.
     * @param vcOptions - The options for signing verifiable credentials.
     * @param workerOptions - The options for the worker.
     */
    constructor(name: string, vcOptions: VCOptions, workerOptions?: WorkerOptions);
    /**
     * Handles the processing of a job by signing the verifiable credentials.
     * @param job - The job to be processed.
     * @returns A promise that resolves when the handler is done.
     */
    workerHandler(job: Job): Promise<void>;
    /**
     * Returns the BullMqWorker instance.
     * @returns The BullMqWorker instance.
     */
    get(): BullMqWorker;
    /**
     * Closes the worker.
     * @returns A promise that resolves when the worker is closed.
     */
    close(): Promise<void>;
}
