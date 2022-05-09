import { User } from "./User";

export class ProfileData {
    followers: number;
    posts: number;
    following: number;
    user: User;

    constructor(data?: ProfileData) {
        Object.assign(this, data);
        this.user = new User(data?.user);
    }
}