import { useEffect, useState } from "react"
import { Card } from "../../components/common/Card"
import { CategoryDropdown } from "./CategoryDropdown"
import { getTopPosts } from "../../services/commonService"
import type { PostResponseType } from "../../types/post/PostResponse"
import { formatDate } from "../../utils/date"

export const Home = () => {
    const [posts, setPosts] = useState<PostResponseType[]>()

    const fetchPosts = async () => {
        try {
            const response = await getTopPosts()
            if (response) {
                const data = response.data
                setPosts(data)
            }
        }catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <>
            <main id="main-content" className="flex justify-center text-center">
                <section aria-labelledby='Title' className="max-w-115 h-auto flex flex-col justify-between space-y-5 items-center">
                    <h1>Blog App</h1>
                    <hr className="gradiant-main h-0.5 w-25 border-none"/>
                    <p className="px-3">Norrsken is a simple block theme for blogs, with a stylish design inspired by the aurora borealis.</p>
                </section>
            </main>

            {/* category filtration */}
            <section className="w-full flex flex-col justify-center items-center mt-5">
                <div>
                    <h2 className="text-left mb-1">Categories</h2>
                    <CategoryDropdown />
                </div>
            </section>

            {/* top post */}
            <section className="w-full flex flex-wrap gap-10 p-10 justify-center md:justify-between mt-10">
                { posts && posts.map((post: PostResponseType) => {
                    return <Card 
                    key={post.slug + '-' + post.id + '-' + post.author} 
                    title={post.title} 
                    img={post.image} 
                    date={formatDate(post.date)}
                    slug={post.slug}
                    likes={post.likes_count}
                    bookmarks={post.bookmarkes_count}
                    views={post.view}
                    />
                })}
            </section>
        </>
    )
}