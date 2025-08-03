import { CategoryList } from "../../components/category/CategoryList"

export const Posts = () => {
    return (
        <div className="w-full flex flex-col">
            <CategoryList />
            <div> Some posts here....</div>
        </div>
    )
}