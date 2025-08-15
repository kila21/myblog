import {useForm } from "react-hook-form";

import type { ChangePasswordFormType } from "../../types/modals/ChangePasswordFormType";
import { changePassword } from "../../store/auth/authThunk";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getFieldError } from "../../utils/getFieldError";

export const ChangePassword = () => {
    const {register, handleSubmit} = useForm<ChangePasswordFormType>()
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.auth.error);

    const handleChangePassword = (data: ChangePasswordFormType) => {
        if(data) {
            dispatch(changePassword(data));
        }
    } 

    return (
        <form onSubmit={handleSubmit(handleChangePassword)} className="flex flex-col h-auto items-center space-y-3">
            <h2 className="text-center font-bold text-lg">Change Password</h2>
            <div className="mt-10">
                <input 
                    type="password"
                    placeholder="Old Password"
                    {...register('old_password', {required: true})}
                    className={`block px-3 outline-0 hover:border-1 hover:border-neon-green
                        focus:border-neon-green focus:border-1
                        ${getFieldError(error, "old_password") ? 'border-red-500 border-1 focus:border-red-500' : ''}`}
                    required />
                {/* // old password error message */}
                {getFieldError(error, "old_password") && (
                    <span className="text-red-500 text-[11px] mt-1">
                        {getFieldError(error, "old_password")}
                    </span>
                )}
            </div>
            <div className="w-[70%] flex flex-col items-center">
                <input 
                    type="password"
                    placeholder="New Password"
                    {...register('new_password', {required: true})}
                    className={`block px-3 outline-0 hover:border-1 hover:border-neon-green
                        focus:border-neon-green focus:border-1 
                        ${getFieldError(error, "non_field_errors") ? 'border-red-500 border-1 focus:border-red-500' : ''}`}
                    required />

                    {/* // new password error message */}
                    {getFieldError(error, "non_field_errors") && (
                        <span className="text-red-500 text-[11px] mt-1">
                            {getFieldError(error, "non_field_errors")}
                        </span>
                    )}
            </div>
            <div>
                <input 
                    type="password"
                    placeholder="Confirm New Password"
                    {...register('confirm_password', {required: true})}
                    className="block px-3 outline-0 hover:border-1 hover:border-neon-green
                        focus:border-neon-green focus:border-1"
                    required />
            </div>

            <button type="submit" className="w-50 h-10 mt-10 cursor-pointer
            text-neon-green border-2">
                Change Password
            </button>
        </form>
    );
}