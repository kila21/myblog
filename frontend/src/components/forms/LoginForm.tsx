import { useEffect, useState } from "react"
import { Input } from "../common/Input"
import { Button } from "../common/Button"


export const LoginForm = () =>{
    const [remember, setRemember] = useState(false)
    const [value, setValue] = useState('')

    useEffect(() => {
        const stored = localStorage.getItem("rememberedEmail");
        if (stored) {
            setValue(stored);
        }
    }, []);

    return (
        <form className="sm:w-100 w-70 2xl:w-120 h-auto flex flex-col justify-center gap-10">
            <Input defaultValue={value} type='text' label="Username"/>
            <Input type='password' label="Password" />
            
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
                <Button type="submit" variant="auth" loading={false} className="w-full cursor-pointer">Login</Button>
            </div>
        </form>
    )
    
}