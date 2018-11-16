/**
 * Mirrors the blockstack user data stored in local storage
 */
export class UserData {
    /**
     * blockstack Id
     *  */
    username: string;
    authResponseToken: string;
    coreSessionToken: string;
    appPrivateKey: string;
    decentralizedID: string;
    hubUrl: string;
    identityAddress: string;
    profile: {
        name: string;
        apps: {
            [domain: string]: string;
        }
    };
}
