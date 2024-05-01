'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const bullmq_1 = require('bullmq');
const sd_vc_lib_1 = require('sd-vc-lib');
/**
 * Represents a worker that handles the signing of verifiable credentials.
 */
class Worker {
    /**
     * Creates a new instance of the Worker class.
     * @param name - The name of the worker.
     * @param vcOptions - The options for signing verifiable credentials.
     * @param workerOptions - The options for the worker.
     */
    constructor(name, vcOptions, workerOptions) {
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
        this.worker = new bullmq_1.Worker(name, this.workerHandler, workerOptions);
    }
    /**
     * Handles the processing of a job by signing the verifiable credentials.
     * @param job - The job to be processed.
     */
    async workerHandler(job) {
        try {
            const vcData = await this.vcLoader(job);
            const promises = vcData.map(({ credential, data }) => {
                return new Promise(async (resolve) => {
                    try {
                        let issuerPrivateKey = await this.issuerLoader(job);
                        let holderPublicKey = this.holderLoader && (await this.holderLoader(job));
                        const vc = await sd_vc_lib_1.verifiable.credential.create({
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
            this.callback(null, { job, results });
        } catch (error) {
            this.callback(error);
        }
    }
    /**
     * Returns the BullMqWorker instance.
     * @returns The BullMqWorker instance.
     */
    get() {
        return this.worker;
    }
}
exports.default = Worker;
//# sourceMappingURL=worker.js.map
