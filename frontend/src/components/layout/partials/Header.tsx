import { useState } from 'react';

import {Menu, X } from 'lucide-react';


export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className='flex justify-between items-center w-full h-15 fixed top-0 left-0 px-3'>
            <nav className='hidden w-auto h-6 md:flex items-center justify-around space-x-5 ml-2'>
                <a href='#'><li>Home</li></a>
                <a href='#'><li>Posts</li></a>
                <a href='#'><li>Search</li></a>
            </nav>

            {/*user profile icon */}
            <div className='w-10 h-10 rounded-full overflow-hidden border border-grey-300 shadow-sm mr-5'>
                <img className='w-full h-full object-cover bg-white' src='' alt=''/>
            </div>
            
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