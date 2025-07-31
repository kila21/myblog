import type { PaginatedResponse } from '../PaginatedResponse'

export type CategoryType = {
    id: number,
    title: string,
    image: string,
    slug: string,
    post_count: number,
}

export type PaginatedCategoryType = PaginatedResponse<CategoryType>