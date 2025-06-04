
export type PostResponseType = {
    id: number,
    likes_count: number,
    title: string,
    image: null | string,
    description: string,
    tags: string,
    view: number,
    slug: string,
    date: string,
    author: number,
    author_username: string,
    category: number,
    likes: number[]
}