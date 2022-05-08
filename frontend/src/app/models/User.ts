export class User {
    id: string = '100';
    name: string = 'mark.doe';
    email: string = 'markjoe@example.com';
    password?: string;
    image?: string;

    constructor(data?: User) {
        Object.assign(this, data);
        this.image = 'https://res.cloudinary.com/og-tech/image/upload/s--Ivs1sp-J--/c_scale,w_100/v1529311900/og_icon.jpg';
    }
}