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
        this.issuer = vcOptions.issuerPrivateKey;
        this.holder = vcOptions.holderPublicKey;
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
            const credentials = await this.vcLoader(job);
            const promises = credentials.map((credential) => {
                return new Promise(async (resolve) => {
                    const vc = await sd_vc_lib_1.verifiable.credential.create({
                        credential,
                        holderPublicKey: this.holder,
                        issuerPrivateKey: this.issuer,
                        issuanceDate: this.issuanceDate,
                        documentLoader: this.documentLoader,
                        didMethod: this.didMethod,
                        suite: this.suite
                    });
                    resolve(vc);
                });
            });
            Promise.all(promises).then((results) => {
                this.callback(null, results);
            });
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
