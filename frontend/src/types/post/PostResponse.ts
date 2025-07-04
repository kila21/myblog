
export type PostResponseType = {
    author: number,
    author_username: string,
    bookmarked_by: number[],
    bookmarkes_count: number,
    is_bookmarked: boolean,
    likes_count: number,
    is_liked: boolean,
    category: number,
    id: number,
    title: string,
    image: null | string,
    description: string,
    tags: string,
    view: number,
    slug: string,
    date: string,
    likes: number[]
}