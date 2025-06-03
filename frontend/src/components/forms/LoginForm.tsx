import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { Input } from "../common/Input"
import { Button } from "../common/Button"

import type { LoginFormDataType } from "../../types/auth/LoginForm"

export const LoginForm = () =>{
    const [remember, setRemember] = useState(false)
    const [value, setValue] = useState('')

    // form
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormDataType>()

    const onFormSubmit = (data: LoginFormDataType) => {
        console.log(data)
        if (remember) {
            localStorage.setItem('username', data.username)
        }else{
            localStorage.removeItem('username')
        }
    }

    useEffect(() => {
        const stored = localStorage.getItem("username");
        if (stored) {
            setValue(stored);
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="sm:w-100 w-70 2xl:w-120 h-auto flex flex-col justify-center gap-10">
            <Input defaultValue={value} 
            type='text' 
            label="Username" 
            {...register('username', {
                minLength: {value: 4, message: 'Username must be at least  4 character'},
                required: true
            })}
            error={errors.username?.message}
            aria-invalid={errors.username ? "true" : "false"}
            aria-describedby={errors.username ? "error" : undefined}
            />

            <Input 
            type='password' 
            label="Password"
            {...register('password', {
                minLength: {value: 8, message: 'Password must be at least  8 character'},
                required: true
            })}
            error={errors.password?.message}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "error" : undefined}
            />
            
            {/* remember me checkbox and forgot pass */}
            <div className="w-full flex justify-between">
                <div className=" flex items-center gap-x-1">
                    <input onClick={() => setRemember(!remember)} type="checkbox" name="remember" id="remember" className=" w-4 h-4"/>
                    <label htmlFor="remember" className="text-sm text-slate-400">Remember me</label>
                </div>

                <div className="flex gap-3">
                    <a href="#" className="text-sm text-slate-400 hover:text-blue-500">Forgot?</a>
                    <a href="/register" className="text-sm text-slate-400 hover:text-blue-500">Register</a>
                </div>
            </div>

            {/* button for submit */}
            <div className="w-full">
                <Button type="submit" variant="auth" loading='false' className="w-full cursor-pointer">Login</Button>
            </div>
        </form>
    )
    
}