import { CategoryDropdown } from "./CategoryDropdown"

export const Home = () => {
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
            <section className="w-full h-full flex flex-col justify-center items-center mt-5">
                <div>
                    <h3 className="text-left mb-1">Categories</h3>
                    <CategoryDropdown />
                </div>
            </section>
        </>
    )
}