import { Queue, Worker } from '../index';
import config from './assets/config';
import documentLoader from './assets/document-loader';
import loader from './assets/loader';
import callback from './assets/callback';

describe('Bulk Verifiable Credentials Signing', () => {
    it('Create a Queue', () => {
        const queue = new Queue(config.queueName, {
            connection: config.redisConnection,
            defaultJobOptions: { attempts: 3, backoff: { type: 'exponential', delay: 1000 } }
        });

        queue.addBulk([
            { name: 'Reward 1 Generation', data: { id: 0 } },
            { name: 'Reward 2 Generation', data: { id: 1 } },
            { name: 'Reward 3 Generation', data: { id: 2 } },
            { name: 'Reward 4 Generation', data: { id: 3 } },
            { name: 'Reward 5 Generation', data: { id: 4 } }
        ]);
    });

    it('Start a worker', () => {
        new Worker(
            config.queueName,
            {
                loader,
                documentLoader,
                callback,
                issuerPrivateKey: config.issuerPrivateKey,
                holderPublicKey: config.holderPublicKey
            },
            {
                connection: config.redisConnection
            }
        );
    });
});
