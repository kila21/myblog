import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import MainLayout from './components/layout/MainLayout.tsx'
import { Home } from './components/page/home/Home.tsx'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <MainLayout />, 
    children:[
      {path: '/', element: <Home />}
    ]

  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
