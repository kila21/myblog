import { Link } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { changePasswordFailure, logout } from "../../../store/auth/authSlice"
import { ChangePassword } from "../../modals/ChangePassword"
import { Modal } from "../../modals/Modal"
import { useState } from "react"

interface userMenuProps {
    close: () => void;
}

export const UserMenu = ({close}: userMenuProps) => {
    const user = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const [openChangePassword, setOpenChangePassword] = useState(false)

    return (
        <div className="w-50 absolute md:right-2 top-12
         rounded-2xl overflow-hidden border-2 border-neon-green mr-5 bg-[#23262F] z-50">
            <ol>
                <Link onClick={close} to={user.token && user.user && `/profile/${user.user}` || '#'} className="block px-8 py-1 border-b-[#31343C] border-b-1">
                    <li className="list-disc text-white font-bold text-sm mb-2">
                        Profile
                    </li>
                </Link>

                <Link to='#' className="block px-8 py-1 border-b-[#31343C] border-b-1"
                    onClick={() => setOpenChangePassword(true)}
                    >
                    <li className="list-disc text-white font-bold text-sm mb-2">
                        Change Password
                    </li>
                </Link>
                {openChangePassword && 
                    <Modal isOpen={openChangePassword} onClose={() => (
                        setOpenChangePassword(false),
                        dispatch(changePasswordFailure(null))
                        )}> 
                        <ChangePassword />
                    </Modal>
                }

                <Link to='/profile' className="block px-8 py-1 border-b-[#31343C] border-b-1">
                    <li className="list-disc text-white font-bold text-sm mb-2">
                        Settings
                    </li>
                </Link>

                <Link to={'#'} onClick={() => dispatch(logout())} className="block px-8 py-1 border-b-[#31343C] border-b-1">
                    <li className="list-disc text-[#22E6A6] font-bold text-sm mb-2">
                        Logout
                    </li>
                </Link>

            </ol>
        </div>
    )
}