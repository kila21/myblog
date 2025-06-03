
import { LoginForm } from "../../components/forms/LoginForm"


export const Login = () => {
    return (
        <main className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">LOGIN</h1>
            <LoginForm />
        </main>
    )
}