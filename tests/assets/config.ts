export default {
    queueName: 'test-queue',
    redisConnection: {
        host: 'localhost',
        port: 6379
    },
    issuerPrivateKey: 'ed710c0f8812e360dafa4dd2888b7ff24d2401223daf961e7e78988a56fa24a4',
    holderPublicKey: 'c2196d230267c18d101e51cb34d318e375f2100c268f2ffd6e9baef1d905a058',
    verifiableCredentials: [
        {
            '@context': [
                'https://www.w3.org/2018/credentials/v1',
                'https://d202eicx1ap3m7.cloudfront.net/credentials/microrewards/v0-01/microrewards-schema-v0-04.json'
            ],
            id: 'http://localhost:8080/verify/did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq/8da736d605af5b0591d45c1e2f09264073fe5d3e9b77c1389e6097c247664a42',
            issuanceDate: '2023-04-14T00:00:00Z',
            type: ['VerifiableCredential'],
            issuer: 'did:key:z6Mkoqgh9AppS2s28onvE4Qy9jwDBJ8ZqRdBtoWLSsRL57Jj',
            credentialSubject: {
                type: ['EducationalAchievementBadge'],
                holder: 'did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq',
                title: 'Badge Title 1',
                description: 'Successfully Completing the Course of Mobile Application Development',
                issuerLogo: 'https://picsum.photos/500/500',
                issuerName: 'Sample Organization',
                issuerUrl: 'http://localhost:8080/issuer-profile/1',
                holderImage: 'https://picsum.photos/300/300',
                holderName: 'John Stark',
                holderProfileUrl:
                    'http://localhost:8080/did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq/rewards',
                remarks: 'Sample remark about this badge 2',
                visualPresentation: 'https://picsum.photos/500/500',
                customAttribute: []
            }
        },
        {
            '@context': [
                'https://www.w3.org/2018/credentials/v1',
                'https://d202eicx1ap3m7.cloudfront.net/credentials/microrewards/v0-01/microrewards-schema-v0-04.json'
            ],
            id: 'http://localhost:8080/verify/did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq/8da736d605af5b0591d45c1e2f09264073fe5d3e9b77c1389e6097c247664a42',
            issuanceDate: '2023-04-14T00:00:00Z',
            type: ['VerifiableCredential'],
            issuer: 'did:key:z6Mkoqgh9AppS2s28onvE4Qy9jwDBJ8ZqRdBtoWLSsRL57Jj',
            credentialSubject: {
                type: ['EducationalAchievementBadge'],
                holder: 'did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq',
                title: 'Badge Title 2',
                description: 'Successfully Completing the Course of Data Science',
                issuerLogo: 'https://picsum.photos/500/500',
                issuerName: 'Sample Organization',
                issuerUrl: 'http://localhost:8080/issuer-profile/1',
                holderImage: 'https://picsum.photos/300/300',
                holderName: 'John Stark',
                holderProfileUrl:
                    'http://localhost:8080/did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq/rewards',
                remarks: 'Sample remark about this badge 2',
                visualPresentation: 'https://picsum.photos/500/500',
                customAttribute: []
            }
        },
        {
            '@context': [
                'https://www.w3.org/2018/credentials/v1',
                'https://d202eicx1ap3m7.cloudfront.net/credentials/microrewards/v0-01/microrewards-schema-v0-04.json'
            ],
            id: 'http://localhost:8080/verify/did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq/8da736d605af5b0591d45c1e2f09264073fe5d3e9b77c1389e6097c247664a43',
            issuanceDate: '2023-04-14T00:00:00Z',
            type: ['VerifiableCredential'],
            issuer: 'did:key:z6Mkoqgh9AppS2s28onvE4Qy9jwDBJ8ZqRdBtoWLSsRL57Jj',
            credentialSubject: {
                type: ['EducationalAchievementBadge'],
                holder: 'did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq',
                title: 'Badge Title 3',
                description: 'Successfully Completing the Course of Web Development',
                issuerLogo: 'https://picsum.photos/500/500',
                issuerName: 'Sample Organization',
                issuerUrl: 'http://localhost:8080/issuer-profile/1',
                holderImage: 'https://picsum.photos/300/300',
                holderName: 'John Stark',
                holderProfileUrl:
                    'http://localhost:8080/did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq/rewards',
                remarks: 'Sample remark about this badge 3',
                visualPresentation: 'https://picsum.photos/500/500',
                customAttribute: []
            }
        },
        {
            '@context': [
                'https://www.w3.org/2018/credentials/v1',
                'https://d202eicx1ap3m7.cloudfront.net/credentials/microrewards/v0-01/microrewards-schema-v0-04.json'
            ],
            id: 'http://localhost:8080/verify/did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq/8da736d605af5b0591d45c1e2f09264073fe5d3e9b77c1389e6097c247664a44',
            issuanceDate: '2023-04-14T00:00:00Z',
            type: ['VerifiableCredential'],
            issuer: 'did:key:z6Mkoqgh9AppS2s28onvE4Qy9jwDBJ8ZqRdBtoWLSsRL57Jj',
            credentialSubject: {
                type: ['EducationalAchievementBadge'],
                holder: 'did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq',
                title: 'Badge Title 4',
                description: 'Successfully Completing the Course of Artificial Intelligence',
                issuerLogo: 'https://picsum.photos/500/500',
                issuerName: 'Sample Organization',
                issuerUrl: 'http://localhost:8080/issuer-profile/1',
                holderImage: 'https://picsum.photos/300/300',
                holderName: 'John Stark',
                holderProfileUrl:
                    'http://localhost:8080/did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq/rewards',
                remarks: 'Sample remark about this badge 4',
                visualPresentation: 'https://picsum.photos/500/500',
                customAttribute: []
            }
        },
        {
            '@context': [
                'https://www.w3.org/2018/credentials/v1',
                'https://d202eicx1ap3m7.cloudfront.net/credentials/microrewards/v0-01/microrewards-schema-v0-04.json'
            ],
            id: 'http://localhost:8080/verify/did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq/8da736d605af5b0591d45c1e2f09264073fe5d3e9b77c1389e6097c247664a45',
            issuanceDate: '2023-04-14T00:00:00Z',
            type: ['VerifiableCredential'],
            issuer: 'did:key:z6Mkoqgh9AppS2s28onvE4Qy9jwDBJ8ZqRdBtoWLSsRL57Jj',
            credentialSubject: {
                type: ['EducationalAchievementBadge'],
                holder: 'did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq',
                title: 'Badge Title 5',
                description: 'Successfully Completing the Course of Machine Learning',
                issuerLogo: 'https://picsum.photos/500/500',
                issuerName: 'Sample Organization',
                issuerUrl: 'http://localhost:8080/issuer-profile/1',
                holderImage: 'https://picsum.photos/300/300',
                holderName: 'John Stark',
                holderProfileUrl:
                    'http://localhost:8080/did:key:z6MksWwdG9DoeDrzrhQrMvj8B9hWG7i6eWomiz9AX6hquCwq/rewards',
                remarks: 'Sample remark about this badge 5',
                visualPresentation: 'https://picsum.photos/500/500',
                customAttribute: []
            }
        }
    ]
};
