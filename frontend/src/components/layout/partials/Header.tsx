import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Menu, X } from 'lucide-react';

import { useAppSelector } from '../../../store/hooks';


export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const isAuth = useAppSelector((state) => state.auth)

    return (
        <header className='flex justify-between items-center w-full h-15 fixed top-0 left-0 px-3'>
            <nav className='hidden w-auto h-6 md:flex items-center justify-around space-x-5 ml-2'>
                <Link to='/'><li>Home</li></Link>
                <Link to='#'><li>Posts</li></Link>
                <Link to='#'><li>Search</li></Link>
            </nav>

            {/*user profile icon */}
            {isAuth.user ? 
                <div className='w-10 h-10 rounded-full overflow-hidden border border-grey-300 shadow-sm mr-5'>
                    <img className='w-full h-full object-cover bg-white' src={isAuth.user.image || '/default-profile.jpg'} alt='user-profile image'/>
                </div>
                :
                <div className='w-30 h-10 mt-5'>
                    <a href='/login'>Login</a>
                </div>
            }
            
            {/* mobile navigation */}
            {isOpen ? 
                <nav className='md:hidden bg-Mainbg w-screen h-screen fixed top-0 left-0 flex flex-col items-center justify-center space-y-6'>
                    <button className='absolute top-6 right-6'>
                        <X color='white' onClick={() => setIsOpen(false)}/> 
                    </button>
                    
                    <a href='#'><li>Home</li></a>
                    <a href='#'><li>Posts</li></a>
                    <a href='#'><li>Search</li></a>
                </nav>
             : 
                <div className='md:hidden' onClick={() => setIsOpen(true)}>
                    <Menu color='white'/>
                </div> 
              }
        </header>
    )
}