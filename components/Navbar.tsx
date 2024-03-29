'use client'
import React, { useState } from 'react'
import { MdModeOfTravel } from 'react-icons/md'
import { RxDividerVertical } from 'react-icons/rx'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

const menus = [
  { id: 1, title: '로그인', url: '/users/login' },
  { id: 2, title: '회원가입', url: '/users/signup' },
  { id: 3, title: 'FAQ', url: '/faqs' },
]

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()

  return (
    <nav className="h-20 border border-b-gray w-full shadow-sm p-4 sm:px-10 flex justify-between align-center fixed top-0 bg-white">
      <div className="grow basis-0 hidden my-auto font-semibold text-lg sm:text-xl text-rose-500 cursor-pointer sm:flex sm:gap-2">
        <MdModeOfTravel className="text-4xl my-auto" />
        <div className="my-auto">NextBnB</div>
      </div>
      <div className="w-[280px] border border-gray-200 rounded-full shadow hover:shadow-lg cursor-pointer flex justify-between pl-6 pr-2">
        <div className="flex justify-center gap-1">
          <div className="my-auto font-semibold text-sm">어디든지</div>
          <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
          <div className="my-auto font-semibold text-sm">언제든</div>
          <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
          <div className="my-auto font-semibold text-sm">게스트</div>
        </div>
        <button
          type="button"
          className="bg-rose-500 text-white rounded-full w-8 h-8 my-auto"
        >
          <AiOutlineSearch className="text-lg  m-auto font-semibold" />
        </button>
      </div>
      <div className="grow basis-0 hidden sm:flex gap-4 align-middle my-auto relative justify-end">
        <button
          type="button"
          className="font-semibold text-sm my-auto px-4 py-3 rounded-full hover:bg-gray-50"
        >
          당신의 공간을 등록해주세요
        </button>
        <button
          type="button"
          className="flex align-middle gap-3 rounded-full border border-gray-20 shadow-sm px-4 py-3 my-auto hover:shadow-lg"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <AiOutlineMenu />
          <AiOutlineUser />
        </button>
        {showMenu && (
          <div className="border border-gray-200 shadow-lg py-2 flex flex-col absolute top-12 bg-white w-40 rounded-lg">
            {menus.map((menu) => (
              <button
                type="button"
                key={menu.id}
                className="h-10 hover:bg-gray-50 text-sm text-gray-700 text-center"
                onClick={() => router.push(menu.url)}
              >
                {menu.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
