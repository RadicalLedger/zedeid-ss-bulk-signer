import { Worker } from '../index';
import config from './assets/config';
import loader from './assets/loader';
import documentLoader from './assets/document-loader';
import callback from './assets/callback';
import issuerPrivateKeyLoader from './assets/issuer-loader';
import holderPublicKeyLoader from './assets/holder-loader';
import { after } from 'lodash';
import { Queue, QueueEvents } from 'bullmq';

describe('Bulk Verifiable Credentials Signing', () => {
    let queue: Queue;
    let worker: Worker;
    let queueEvents: QueueEvents;

    beforeAll(() => {
        queue = new Queue(config.queueName, {
            connection: config.redisConnection,
            defaultJobOptions: { attempts: 3, backoff: { type: 'exponential', delay: 1000 } }
        });

        queueEvents = new QueueEvents(config.queueName, { connection: config.redisConnection });
    });

    afterAll(async () => {
        await queue.close();
        await queueEvents.close();
    });

    it('Add items to queue', async () => {
        await queue.addBulk([
            { name: 'Reward 1 Generation', data: { id: 0 } },
            { name: 'Reward 2 Generation', data: { id: 1 } },
            { name: 'Reward 3 Generation', data: { id: 2 } },
            { name: 'Reward 4 Generation', data: { id: 3 } },
            { name: 'Reward 5 Generation', data: { id: 4 } }
        ]);
    });

    it('Start a worker', async () => {
        worker = new Worker(
            config.queueName,
            {
                loader,
                documentLoader,
                callback,
                issuerPrivateKeyLoader,
                holderPublicKeyLoader
            },
            {
                connection: config.redisConnection,
                concurrency: 5
            }
        );

        await new Promise<void>((resolve) => {
            const bullMqWorker = worker.get();

            bullMqWorker.on(
                'completed',
                after(5, async () => {
                    resolve();
                })
            );
        });

        await worker.close();
    });
});
