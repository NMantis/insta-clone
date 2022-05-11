import { User } from "./User";

export interface Comment {
    id?: string;
    text: string;
    user: Partial<User>; //User
    post_id: string;
    comment_likes: any[]; //Like
    created_at: string | Date;
}