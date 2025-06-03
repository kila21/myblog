import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import MainLayout from './components/layout/MainLayout.tsx'
import { Home } from './page/home/Home.tsx'
import { Login } from './page/auth/Login.tsx'
import { Register } from './page/auth/Register.tsx'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <MainLayout />, 
    children:[
      {path: '/', element: <Home />}
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
