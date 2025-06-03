import { forwardRef, type Ref } from "react";

import type { InputPropsType } from "../../types/props/InputPropsType";

export const Input = forwardRef((props: InputPropsType, ref: Ref<HTMLInputElement>) => {
    const { label, error, ...inputProps} = props

    return (
        <div className="w-full flex fex-col gap-2">
            <input 
            ref={ref} 
            placeholder={label} 
            {...inputProps} 
            className='w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 text-gray-600'
            />
            {error && <p>{error}</p>}
        </div>
    )
})