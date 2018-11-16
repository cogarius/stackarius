export interface BlockstackSearchResponse {
    results: BlockstackIdentity[];
}
/**
 * The return payload by blockstack core api
 * see: https://core.blockstack.org/v1/search?query=
 */
export interface BlockstackIdentity {
    fullyQualifiedName: string;
    openbazaar: string;
    profile: Profile;
    username: string;
}

export interface Profile {
    // @type: string;
    // account: Account[];
    // address: Address;
    image: Image[];
    name: string;
    website: Website[];
    description: string;
}


// export interface Account {
//     @type: string;
// identifier: string;
// proofType: string;
// proofUrl: string;
// service: string;
// role: string;
// }

// export interface Address {
//     @type: string;
// addressLocality: string;
// }

export interface Image {
    //  @type: string;
    contentUrl: string;
    name: string;
}

export interface Website {
    type: string;
    url: string;
}



