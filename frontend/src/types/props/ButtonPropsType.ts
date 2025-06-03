import {type ButtonHTMLAttributes } from "react";


export type ButtonPropsType = {
    variant: "auth" | "post";
    loading: string;
} & ButtonHTMLAttributes<HTMLButtonElement>