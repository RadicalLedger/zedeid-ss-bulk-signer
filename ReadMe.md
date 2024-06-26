# Verifiable Credential Signing Worker

This project implements a BullJs worker for signing verifiable credentials (VCs) in a background job processing environment.

## Installation

Install the required dependencies:

```bash
npm install https://github.com/RadicalLedger/zedeid-ss-bulk-signer
```

or

```bash
yarn add https://github.com/RadicalLedger/zedeid-ss-bulk-signer
```

Make sure you have a Redis server running, as BullJs requires Redis for job queueing and processing. You can download and install Redis from <a href="https://redis.io/downloads/" target="_blank">here</a> or use a cloud service like Redis Labs.

# Usage

## Create BullJS Queue

By creating an instance of the Queue class with the specified queueName and connection options, you are initializing a BullJs queue that can be used for processing tasks asynchronously.

```ts
import { Queue } from 'zedeid-ss-bulk-signer';

const config = {
    // ... other configurations
    redisConnection: {
        host: 'localhost',
        port: 6379
    },
    queueName: 'vc-signing-queue' // Name for your queue
};

const queue = new Queue(config.queueName, {
    connection: config.redisConnection
});
```

## Add Jobs to the Queue

```ts
const jobData = {
    id: 123 // Unique identifier for the VC signing job
    // Other data relevant to VC signing
};

await queue.add('sign-vc', jobData);
```

## Create Worker Instance

This worker class handles the signing of verifiable credentials using BullJs for job processing.

### Constructor Parameters

-   `name`: The name of the queue.
-   `vcOptions`: The options for signing verifiable credentials. See below for details.
-   `workerOptions`: The options for the BullJs worker.

### VCOptions

-   `issuerPrivateKeyLoader`: The private key of the issuer for signing the verifiable credential.
-   `issuanceDate`: (Optional) The issuance date of the verifiable credential. Defaults to the current date and time.
-   `suite`: The suite used for signing the verifiable credential.
-   `vcLoader`: The function used for loading the verifiable credentials.
-   `documentLoader`: The document loader function for loading JSON-LD documents.
-   `callback`: The callback function to handle the result of signing the verifiable credential.

## Methods

### workerHandler

This method handles the processing of a job by signing the verifiable credentials.

**Parameters:**

-   `job`: The job to be processed.

**Returns:**

-   A promise that resolves when the handler is done.

### get

This method returns the BullMq worker instance.

**Returns:**

-   The BullMq worker instance.

### close

This method closes the worker and returns a promise that resolves when the worker is closed.

**Returns:**

-   A promise that resolves when the worker is closed.

```ts
import { Worker } from 'zedeid-ss-bulk-signer';

// Define the options for signing verifiable credentials
const vcOptions = {
  issuerPrivateKeyLoader: async (job) => { ... }, // Issuer's private key
  suite: '...',            // Cryptographic suite
  loader: async (job) => { ... }, // Function to load VC for signing
  documentLoader: async (uri) => { ... }, // Function to load referenced documents
  callback: async (err, data) => { ... }, // Callback for signed VCs or errors
};

// Define the options for the worker
const workerOptions = {
    connection: {
        host: '...' // Redis connection host
        port: '...' // Redis connection port
    }
}

// Create a new instance of the Worker class
const worker = new Worker('workerName', vcOptions, workerOptions);

// The worker will start processing jobs immediately
```

# BullJs

This project uses BullJS, a Redis-backed queue library for Node.js, to handle job queueing and processing. For more information on BullJS, visit the <a href="https://github.com/OptimalBits/bull" target="_blank">official documentation</a>.
