import { User } from "./User";

export interface FollowRequest {
    sender: User;
    recipient: User;
    status: FollowReqStatus;
}

export enum FollowReqStatus {
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    PENDING = 'pending',
} 