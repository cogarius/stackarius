/**
 * A public (non encrypted) message to the world
 */
export class Post {
    id: string;
    title: string;
    content: string;
    created: Date;
    updated: Date;
    authorId: string;
    isMine: boolean;
}
