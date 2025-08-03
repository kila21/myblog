import { useState } from "react"
import { useGetPostsByCategoryQuery } from "../../store/posts/postsService"

import { CategoryList } from "../../components/category/CategoryList"
import { Card } from "../../components/common/Card"
import { formatDate } from "../../utils/date"


import type { PostType } from "../../types/post/PaginatedPostResponseType"
import { CardSkeleton } from "../../components/skeletons/CardSkeleton"

export const Posts = () => {
    // category slug
    const [selectedCategory, setSelectedCategory ] = useState<null | string>(null)
    // for data pagination
    const [page, setPage ] = useState<number>(1)

    const {data: posts, isLoading} = useGetPostsByCategoryQuery(
        {slug: selectedCategory!, page: page},
        {skip: !selectedCategory}
    )


    const getCategoryValue = (category: string) => {
        setSelectedCategory(category)
    }
    return (
        <div className="w-full flex flex-col">
            <CategoryList categoryValue={getCategoryValue}/>
            <section className="w-full flex flex-wrap gap-10 p-10 justify-center md:justify-between mt-10">
                {isLoading && new Array(3).fill(null).map((item, index) => <CardSkeleton key={item + index + 'skeleton'}/>)}
                {/* {error && <div>"Failed to load posts. Please try again later."</div>} */}
                { posts?.results && posts.results.map((post: PostType) => {
                    return <Card 
                    key={post.slug + '-' + post.id + '-' + post.author} 
                    title={post.title} 
                    img={post.image} 
                    date={formatDate(post.date)}
                    slug={post.slug}
                    likes={post.likes_count}
                    bookmarks={post.bookmarkes_count}
                    views={post.view}
                    is_liked={post.is_liked}
                    is_bookmarked={post.is_bookmarked}
                    />
                })}
            </section>

            {posts && posts.next &&
            <button 
            className="border-1"
            onClick={() => setPage(page + 1)}
            >Load More Posts...</button>}
        </div>
    )
}