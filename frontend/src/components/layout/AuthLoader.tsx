import { useEffect } from "react"

import { useAppDispatch } from "../../store/hooks"
import { loginSuccess } from "../../store/auth/authSlice"

export const AuthLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (token && user ) {
        dispatch(loginSuccess({user: user, token: token}))
    }
  }, [])

  return children
}
