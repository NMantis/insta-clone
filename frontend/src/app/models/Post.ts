import { Comment } from './Comment';
import { User } from './User';

export class Post {
    id?: string = '122';
    image: string;
    description: string = 'Zoned Out 💥';
    title: string = '';
    likes: any[] = [];
    comments: Comment[] = [];
    location?: any = 'here&there';
    user?: User = new User();
    post_likes: any[];
    created_at: Date | string;

    constructor(data?: Post) {
        Object.assign(this, data);
        this.image = 'https://res.cloudinary.com/og-tech/image/upload/q_40/v1506850322/blog_g3mexb.jpg';

        this.user = new User(data?.user);
        this.likes = data?.post_likes;
    }
}