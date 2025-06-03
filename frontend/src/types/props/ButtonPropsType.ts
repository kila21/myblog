import {type ButtonHTMLAttributes } from "react";


export type ButtonPropsType = {
    variant: "auth" | "post";
    loading: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>