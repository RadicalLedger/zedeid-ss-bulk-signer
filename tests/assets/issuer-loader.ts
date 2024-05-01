import config from './config';

export default function issuerPrivateKeyLoader(): Promise<string> {
    return new Promise((resolve) => resolve(config.issuerPrivateKey));
}
