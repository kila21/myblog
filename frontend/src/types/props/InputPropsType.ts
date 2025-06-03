import { type InputHTMLAttributes } from 'react'
// import type { FieldError } from "react-hook-form";


export type InputPropsType = {
    label: string;
    // error?: FieldError;
    error?: string;
} & InputHTMLAttributes<HTMLInputElement>;