import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Menu, X } from 'lucide-react';

import { useAppSelector } from '../../../store/hooks';
import { useGetAuthenticatedUserProfileQuery } from '../../../store/profile/profileService';


export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const user = useAppSelector((state) => state.auth)
    const {data: authenticatedUser } = useGetAuthenticatedUserProfileQuery(user.user!, {
        skip: !user.user
    }) 

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup function to be safe
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]); // Re-runs only when 'isOpen' changes

    return (
        <header className='z-10 flex justify-between items-center w-full h-15 fixed top-0 left-0 px-3'>
            <nav className='hidden w-auto h-6 md:flex items-center justify-around space-x-5 ml-2'>
                <Link to='/'><li>Home</li></Link>
                <Link to='/posts'><li>Posts</li></Link>
                {/* <Link to='#'><li>Search</li></Link> */}
                {user.user && user.token && <Link to='/bookmarks'> Bookmarks </Link> }
                {user.user && user.token && <Link to='/create-post'>New Post </Link> }
            </nav>

            {/*user profile icon */}
            {user.token ? 
                <div className='w-10 h-10 rounded-full overflow-hidden border border-grey-300 shadow-sm mr-5'>
                    <img className='w-full h-full object-cover bg-white' src={
                         user.user && authenticatedUser?.image || '/default-profile.jpg'} alt='user-profile image'/>
                </div>
                :
                <div className='w-30 h-10 mt-5'>
                    <a href='/login'>Login</a>
                </div>
            }
            
            {/* mobile navigation */}
            {isOpen ? 
                <nav className='z-50 fixed overflow-hidden md:hidden left-0 top-0 bg-Mainbg w-screen h-screen flex flex-col items-center justify-center space-y-6'>
                    <button className='absolute top-6 right-6'>
                        <X color='white' onClick={() => setIsOpen(false)}/> 
                    </button>
                    
                    <Link to='/' onClick={() => setIsOpen(false)}><li>Home</li></Link>
                    <Link to='/posts' onClick={() => setIsOpen(false)}><li>Posts</li></Link>
                    {/* <Link to='#' onClick={() => setIsOpen(false)}><li>Search</li></Link> */}
                    {user?.token && user.user && <Link to='/bookmarks' onClick={() => setIsOpen(false)}> Bookmarks </Link> }
                    {user.user && user.token && <Link to='/create-post' onClick={() => setIsOpen(false)}> New Post </Link> }
                </nav>
             : 
                <div className='md:hidden' onClick={() => setIsOpen(true)}>
                    <Menu color='white'/>
                </div> 
              }
        </header>
    )
}