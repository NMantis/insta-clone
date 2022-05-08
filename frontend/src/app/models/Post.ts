import { Comment } from './Comment';
import { User } from './User';

export class Post {
    id?: string = '122';
    image: string = 'https://res.cloudinary.com/og-tech/image/upload/q_40/v1506850322/blog_g3mexb.jpg';
    description: string = 'Zoned Out 💥';
    title: string = '';
    likes: any[] = [];
    comments: Comment[] = [];
    location?: any  = 'here&there';
    user?: User = new User();
    created_at: Date | string;

    constructor(data?: Post) {
        Object.assign(this, data);
    }
}