import { Link } from "react-router-dom"
import { RegisterForm } from "../../components/forms/RegisterForm"


export const Register = () => {
    return (
        <main className="w-full h-full flex flex-col items-center px-10">
             <Link to={'/'} className="header max-w-110 text-center mb-10 cursor-pointer absolute top-5 left-5 md:top-10 md:left-10">
                <h1 className="mb-3">Blog App</h1>
                <hr className="gradiant-main h-0.5 w-25 border-none"/>
            </Link>
            <h1 className="text-center text-2xl font-bold text-gray-600 mb-6 mt-20">Register</h1>
            <RegisterForm />
        </main>
    )
}