import type { AxiosResponse } from "axios";

import api from "./axios";
import type { LoginFormDataType } from "../types/auth/LoginFormData";
import type { RegisterFormDataType } from "../types/auth/RegisterFormData";

import type { LoginResponseType } from "../types/auth/LoginResponse";
import type { RegisterResponseType } from "../types/auth/RegisterResponse";

export const loginUser = (data: LoginFormDataType): Promise<AxiosResponse<LoginResponseType>> => {
    return api.post('/users/token/', data)
}

export const registerUser = (data: RegisterFormDataType): Promise<AxiosResponse<RegisterResponseType>> => {
    return api.post('/users/register/', data)
}
