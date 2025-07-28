import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css'

//Skeleton 
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import MainLayout from './components/layout/MainLayout.tsx'
import { Home } from './page/home/Home.tsx'
import { Login } from './page/auth/Login.tsx'
import { Register } from './page/auth/Register.tsx'
import { DetailPost } from './page/posts/DetailPost.tsx'
import { Profile } from './page/profile/Profile.tsx'
import { store } from './store/store.ts'
import { Bookmark } from './page/bookmark/Bookmark.tsx'
import { PostList } from './page/posts/PostList.tsx'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <MainLayout />, 
    children:[
      {path: '/', element: <Home />},
      {path: '/post/:slug', element: <DetailPost />},
      {path: '/profile/:username', element: <Profile />},
      {path: '/bookmarks', element: <Bookmark />},
      {path: '/posts', element: <PostList />}
    ]
  },
  {path: '/login', element: <Login />},
  {path: '/Register', element: <Register />}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <RouterProvider router={router}/>
      </SkeletonTheme>
    </Provider>
  </StrictMode>,
)
