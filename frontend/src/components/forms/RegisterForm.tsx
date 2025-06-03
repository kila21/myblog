import { useForm } from "react-hook-form"

import type { RegisterFormDataType } from "../../types/auth/RegisterFormData"
import { Input } from "../common/Input"
import { Button } from "../common/Button"


export const RegisterForm = () => {
    const {register, handleSubmit, watch, formState: { errors }} = useForm<RegisterFormDataType>()

    const pass = watch('password')

    const onFormSubmit = (data: RegisterFormDataType) => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="sm:w-100 w-70 2xl:w-120 h-auto flex flex-col justify-center gap-10">
            <Input 
                type="email"
                label='Email'
                 {...register('email', {
                    required: {value: true, message: 'Email Is Required.'}
                })}
                error={errors.email?.message}
                aria-invalid={errors.email?.message ? 'true' : 'false'}
                aria-describedby={errors.email? 'error' : undefined}
            />

             <Input 
                type="text"
                label='Username'
                 {...register('username', {
                    required: {value: true, message: 'Username Is Required.'}
                })}
                error={errors.username?.message}
                aria-invalid={errors.username?.message ? 'true' : 'false'}
                aria-describedby={errors.username? 'error' : undefined}
            />

             <Input 
                type="password"
                label='Password'
                 {...register('password', {
                    required: {value: true, message: 'Password Is Required.'},
                    minLength: {value: 8, message: 'Min Length Is 8 Character.'}
                })}
                error={errors.password?.message}
                aria-invalid={errors.password?.message ? 'true' : 'false'}
                aria-describedby={errors.password? 'error' : undefined}
            />

             <Input 
                type="password"
                label='Confrim Password'
                 {...register('password2', {
                    required: {value: true, message: 'Password Is Required.'},
                    minLength: {value: 8, message: 'Min Length Is 8 Character.'},
                    validate: value => value === pass || 'Password Dont Match'
                })}
                error={errors.password2?.message}
                aria-invalid={errors.password2?.message ? 'true' : 'false'}
                aria-describedby={errors.password2? 'error' : undefined}
            />

            <div className="w-full">
                <Button type="submit" variant="auth" loading='false' className="w-full cursor-pointer">Login</Button>
            </div>
        </form>
    )
}