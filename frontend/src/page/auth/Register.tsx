import { RegisterForm } from "../../components/forms/RegisterForm"


export const Register = () => {
    return (
        <main className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-center text-2xl font-bold text-gray-600 mb-6 mt-10">Register</h1>
            <RegisterForm />
        </main>
    )
}