import type { PaginatedResponse } from "../PaginatedResponse";

type PostLikesList = {
    id: number,
    username: string,
    avatar: string,
    email: string
}

export type PaginatedPostLikesList = PaginatedResponse<PostLikesList>