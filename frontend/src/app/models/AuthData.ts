import { User } from "./User";

export interface AuthData {
    password: string;
    name: string;
    username: string;
    email: string;
    confirmPassword: string;
}

export interface AutorizedResponse {
    user: User;
    access_token: string
}