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
    port: 6379,
  },
  queueName: 'vc-signing-queue', // Name for your queue
};

const queue = new Queue(config.queueName, {
  connection: config.redisConnection,
});
```

## Add Jobs to the Queue
```ts
const jobData = {
  id: 123, // Unique identifier for the VC signing job
  // Other data relevant to VC signing
};

await queue.add('sign-vc', jobData);

```

## Create Worker Instance

This worker class handles the signing of verifiable credentials using BullJs for job processing.

### Constructor Parameters

* `name`: The name of the queue.
* `vcOptions`: The options for signing verifiable credentials. See below for details.
* `workerOptions`: The options for the BullJs worker.

### VCOptions

* `issuerPrivateKey`: The private key of the issuer for signing the verifiable credential.
* `holderPublicKey`: The public key of the holder for encrypting the verifiable credential.
* `issuanceDate`: (Optional) The issuance date of the verifiable credential. Defaults to the current date and time.
* `suite`: The suite used for signing the verifiable credential.
* `didMethod`: The DID method used for resolving DIDs.
* `vcLoader`: The function used for loading the verifiable credential.
* `documentLoader`: The document loader function for loading JSON-LD documents.
* `callback`: The callback function to handle the result of signing the verifiable credential.

```ts
import { Worker } from 'zedeid-ss-bulk-signer';

// Define the options for signing verifiable credentials
const vcOptions = {
  issuerPrivateKey: '...', // Issuer's private key
  holderPublicKey: '...',  // (Optional) Holder's public key
  suite: '...',            // Cryptographic suite
  didMethod: '...',        // DID method
  loader: async (job) => { ... }, // Function to load VC for signing
  documentLoader: async (uri) => { ... }, // Function to load referenced documents
  callback: (err, vc) => { ... }, // Callback for signed VC or errors
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

