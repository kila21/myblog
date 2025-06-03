import { forwardRef, type ButtonHTMLAttributes, type Ref } from "react";

export type ButtonPropsType = {
    variant: "auth" | "post";
    loading: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef((props: ButtonPropsType, ref: Ref<HTMLButtonElement>) => {
    const {className, type, children, ...buttonprops} = props

    // styles depending on where button usage
    const variantStyles = {
        auth: 'py-4 bg-blue-400 rounded text-blue-50 font-bold hover:bg-blue-700',
        // some other buttons
        post: ''
    }

    return (
        <div>
            <button 
            ref={ref}
            type={type} 
            className={`${variantStyles[props.variant]} ${className ? className : ''}`}
            {...buttonprops} 
            >
                {children}
            </button>
        </div>
    )
});