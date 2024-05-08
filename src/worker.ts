import { DocumentLoader } from '@transmute/vc.js/dist/types/DocumentLoader';
import { VerifiableCredential } from '@transmute/vc.js/dist/types/VerifiableCredential';
import { DIDMethods } from 'sd-vc-lib/dist/types/utils.type';
import { Suite } from '@transmute/vc.js/dist/types/Suite';
import {
    Callback,
    HolderPublicKeyLoader,
    IssuerPrivateKeyLoader,
    VerifiableCredentialLoader
} from './types/declrations';
import { VCLoaderData, VCOptions } from './types/interfaces';
import { Worker as BullMqWorker, Job, WorkerOptions } from 'bullmq';
import { verifiable } from 'sd-vc-lib';

/**
 * Represents a worker that handles the signing of verifiable credentials.
 */
export default class Worker {
    private worker: BullMqWorker;
    private issuerLoader: IssuerPrivateKeyLoader;
    private holderLoader: HolderPublicKeyLoader | undefined;
    private issuanceDate: string;
    private suite: Suite;
    private didMethod: DIDMethods;
    private vcLoader: VerifiableCredentialLoader;
    private documentLoader: DocumentLoader;
    private callback: Callback;

    /**
     * Creates a new instance of the Worker class.
     * @param name - The name of the worker.
     * @param vcOptions - The options for signing verifiable credentials.
     * @param workerOptions - The options for the worker.
     */
    constructor(name: string, vcOptions: VCOptions, workerOptions?: WorkerOptions) {
        this.issuerLoader = vcOptions.issuerPrivateKeyLoader;
        this.holderLoader = vcOptions.holderPublicKeyLoader;
        this.issuanceDate = vcOptions.issuanceDate || new Date().toISOString();
        this.suite = vcOptions.suite;
        this.didMethod = vcOptions.didMethod;
        this.vcLoader = vcOptions.loader;
        this.documentLoader = vcOptions.documentLoader;
        this.callback = vcOptions.callback;

        /* Bind the method to the current instance */
        this.workerHandler = this.workerHandler.bind(this);

        this.worker = new BullMqWorker(name, this.workerHandler, workerOptions);
    }

    /**
     * Handles the processing of a job by signing the verifiable credentials.
     * @param job - The job to be processed.
     * @returns A promise that resolves when the handler is done.
     */
    public async workerHandler(job: Job): Promise<void> {
        try {
            const vcData: VCLoaderData[] = await this.vcLoader(job);

            const promises = vcData.map(({ credential, data }: VCLoaderData) => {
                return new Promise(async (resolve) => {
                    try {
                        let issuerPrivateKey = await this.issuerLoader(job);
                        let holderPublicKey = this.holderLoader && (await this.holderLoader(job));

                        const vc: VerifiableCredential = await verifiable.credential.create({
                            credential: credential,
                            holderPublicKey,
                            issuerPrivateKey,
                            issuanceDate: this.issuanceDate,
                            documentLoader: this.documentLoader,
                            didMethod: this.didMethod,
                            suite: this.suite
                        });

                        resolve({ data, vc });
                    } catch (error) {
                        resolve({ error });
                    }
                });
            });

            const results = await Promise.all(promises);

            await this.callback(null, { job, results });
        } catch (error) {
            await this.callback(error);
        }
    }

    /**
     * Returns the BullMqWorker instance.
     * @returns The BullMqWorker instance.
     */
    public get(): BullMqWorker {
        return this.worker;
    }

    /**
     * Closes the worker.
     * @returns A promise that resolves when the worker is closed.
     */
    public close(): Promise<void> {
        return this.worker.close();
    }
}
