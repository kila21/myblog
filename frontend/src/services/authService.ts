import type { AxiosResponse } from "axios";

import api from "./axios";
import type { LoginFormDataType } from "../types/auth/LoginFormData";
import type { LoginResponseType } from "../types/auth/LoginResponse";

export const loginUser = (data: LoginFormDataType): Promise<AxiosResponse<LoginResponseType>> => {
    return api.post('/users/token/', data)
}