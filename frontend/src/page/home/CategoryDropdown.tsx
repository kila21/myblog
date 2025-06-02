import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export const CategoryDropdown = () => {
  const [categoryValue, setCategoryValue] = useState('Select Category')

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-65 h-12 items-center justify-between gap-x-1.5 rounded-md  px-3 py-2 text-sm text-left font-semibold text-white shadow-xs border border-[#333333] ">
          { categoryValue }
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-white" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-65 origin-top-right rounded-md shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              onClick={() => setCategoryValue('Sport')}
            >
              Sport
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              onClick={() => setCategoryValue('Education')}
            >
              Education
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              onClick={() => setCategoryValue('Health')}
            >
              Health
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}