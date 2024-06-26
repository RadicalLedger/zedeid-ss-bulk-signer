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
        this.issuanceDate = vcOptions.issuanceDate || new Date().toISOString();
        this.suite = vcOptions.suite;
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
     * @returns A promise that resolves when the handler is done.
     */
    async workerHandler(job) {
        try {
            const vcData = await this.vcLoader(job);
            const promises = vcData.map(({ credential, data }) => {
                return new Promise(async (resolve) => {
                    try {
                        let issuerPrivateKey = await this.issuerLoader(job);
                        console.log(this.suite);
                        const vc = await sd_vc_lib_1.verifiable.credential.create({
                            credential,
                            issuerPrivateKey,
                            issuanceDate: this.issuanceDate,
                            documentLoader: this.documentLoader
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
    get() {
        return this.worker;
    }
    /**
     * Closes the worker.
     * @returns A promise that resolves when the worker is closed.
     */
    close() {
        return this.worker.close();
    }
}
exports.default = Worker;
//# sourceMappingURL=worker.js.map
