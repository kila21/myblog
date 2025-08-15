import axios from 'axios';

import {
    changePasswordFailure,
    changePasswordStart,
    changePasswordSuccess,
    logout,
} from './authSlice';
import { API_BASE_URL } from '../../constants/api';
import type { ChangePasswordFormType } from '../../types/modals/ChangePasswordFormType';

export const changePassword = (data: ChangePasswordFormType) => async (dispatch: any, getState: any) => {
    try {
        dispatch(changePasswordStart());
        const token = getState().auth.token;

        await axios.post(
            API_BASE_URL + '/users/change_password/',
            { 
                old_password: data.old_password, 
                new_password: data.new_password,  
                confirm_password: data.confirm_password 
            },
            {headers: { Authorization: `Bearer ${token}` }}
        );

        dispatch(changePasswordSuccess());
        alert('Password changed successfully, please log in again.');
        setTimeout(() => {
            dispatch(logout());
            window.location.href = '/login';
        },1500)
    } catch (err: any) {
        dispatch(changePasswordFailure(err.response?.data || 'Password change failed'));
    }
};
