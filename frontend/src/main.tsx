import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import MainLayout from './components/layout/MainLayout.tsx'
import { Home } from './page/home/Home.tsx'
import { Login } from './page/auth/Login.tsx'
import { Register } from './page/auth/Register.tsx'
import { DetailPost } from './page/posts/DetailPost.tsx'
import { Profile } from './page/profile/Profile.tsx'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <MainLayout />, 
    children:[
      {path: '/', element: <Home />},
      {path: '/post/:slug', element: <DetailPost />},
      {path: '/profile/:username', element: <Profile />}
    ]
  },
  {path: '/login', element: <Login />},
  {path: '/Register', element: <Register />}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
