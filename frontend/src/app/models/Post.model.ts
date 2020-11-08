import { Comment } from './Comment.model';
export class Post {
    id?: string;
    image: string;
    description: string;
    title: string;
    likes: any[];
    comments: Comment[];
}