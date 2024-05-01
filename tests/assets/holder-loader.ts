import config from './config';

export default function holderPublicKeyLoader(): Promise<string> {
    return new Promise((resolve) => resolve(config.holderPublicKey));
}
