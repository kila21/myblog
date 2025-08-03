import { useGetCategoriesQuery } from "../../store/posts/postsService"

export const CategoryList = () => {
    const {data: categories } = useGetCategoriesQuery(undefined, {
        refetchOnMountOrArgChange: true
    })

    return (
        <div className="w-full flex flex-col items-center gap-3">
            <h2>Filter Posts By Category</h2>
            <div className="w-full flex flex-wrap gap-5 justify-center">
                {categories?.results && categories.results.map(category => {
                    return (
                        <div className="w-25 h-35 md:h-40 md:w-30 border-1 rounded-md flex flex-col items-center cursor-pointer" key={'id of' + category.title + category.id}>
                            <img src={category.image} alt={category.title + 'posts'} className="w-full h-2/3"/>
                            <h5 className='text-sm'>{category.title}</h5>
                            <p className="text-md text-lightgrey">posts: <span className="text-white">{category.post_count}</span> </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}