'use client'
import React, { useState } from 'react'
import { MdModeOfTravel } from 'react-icons/md'
import { RxDividerVertical } from 'react-icons/rx'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import cn from 'classnames'
import 'dayjs/locale/ko'
import Link from 'next/link'
import SearchFilter from './Filter'
import { useRecoilState, useRecoilValue } from 'recoil'
import { detailFilterState, filterState } from '@/atom'

const menus = [
  { id: 1, title: '로그인', url: '/users/login' },
  { id: 2, title: '회원가입', url: '/users/signup' },
  { id: 3, title: 'FAQ', url: '/faqs' },
]

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState)
  const filterValue = useRecoilValue(filterState)

  const router = useRouter()
  return (
    <nav
      className={cn(
        'h-20 z-10 border border-b-gray w-full shadow-sm p-4 sm:px-10 flex align-middle justify-between items-center fixed top-0 bg-white',
        {
          '!h-44': showFilter === true,
          '!items-start': showFilter === true,
        },
      )}
    >
      <div className="grow basis-0 hidden  font-semibold text-lg sm:text-xl text-rose-500 cursor-pointer sm:flex sm:gap-2">
        <MdModeOfTravel className="text-4xl my-auto" />
        <Link href="/" className="my-auto block">
          NextBnB
        </Link>
      </div>
      {!showFilter ? (
        <div className="w-full sm:w-[280px] py-1.5 border border-gray-200 rounded-full shadow hover:shadow-lg cursor-pointer flex justify-between pl-6 pr-2">
          <div
            role="presentation"
            className="flex justify-center gap-1 cursor-pointer"
            onClick={() => setShowFilter(true)}
          >
            <div className="my-auto font-semibold text-sm">어디든지</div>
            <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
            <div className="my-auto font-semibold text-sm">언제든</div>
            <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
            <div className="my-auto font-semibold text-sm">게스트</div>
          </div>
          <button
            type="button"
            onClick={() => setShowFilter(true)}
            className="bg-rose-500 text-white rounded-full w-8 h-8 my-auto"
          >
            <AiOutlineSearch className="text-lg  m-auto font-semibold" />
          </button>
        </div>
      ) : (
        <div className="sm:w-[340px] cursor-pointer w-full relative">
          <div className="flex justify-content gap-7 h-14 text-center items-center">
            <button
              type="button"
              className="font-semibold underline underline-offset-8"
            >
              숙소
            </button>
            <button
              type="button"
              className="text-gray-700"
              onClick={() => alert('서비스 준비중입니다')}
            >
              체험
            </button>
            <button
              type="button"
              className="text-gray-700"
              onClick={() => alert('서비스 준비 중입니다')}
            >
              온라인 체험
            </button>
            <button
              type="button"
              className="text-gray-700 underline underline-offset-8 hover:text-black"
              onClick={() => setShowFilter(false)}
            >
              필터 닫기
            </button>
          </div>
          <div className="w-[90%] sm:max-w-3xl flex flex-col  sm:flex-row border border-gray-200 rounded-lg py-4 sm:py-2 sm:rounded-full shadow-sm  bg-white hover:shadow-lg cursor-pointer justify-between fixed top-20 inset-x-0 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-4 w-full relative sm:pl-2">
              <button
                type="button"
                onClick={() => setDetailFilter('location')}
                className={cn(
                  'font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
                  {
                    'shadow bg-white': detailFilter === 'location',
                  },
                )}
              >
                여행지
                <div className="text-gray-500 text-xs mt-1">
                  {filterValue.location || '여행지 검색'}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDetailFilter('checkIn')}
                className={cn(
                  'font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
                  {
                    'shadow bg-white': detailFilter === 'checkIn',
                  },
                )}
              >
                체크인
                <div className="text-gray-500 text-xs mt-1">
                  {filterValue.checkIn || '날짜 추가'}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDetailFilter('checkOut')}
                className={cn(
                  'font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
                  {
                    'shadow bg-white': detailFilter === 'checkOut',
                  },
                )}
              >
                체크아웃
                <div className="text-gray-500 text-xs mt-1">
                  {filterValue.checkOut || '날짜 추가'}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDetailFilter('guest')}
                className={cn(
                  'font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
                  {
                    'shadow bg-white': detailFilter === 'guest',
                  },
                )}
              >
                여행자
                <div className="text-gray-500 text-xs mt-1">
                  {`${filterValue.guest}명` || '게스트 추가'}
                </div>
              </button>
              <SearchFilter />
            </div>
            <button
              type="button"
              className="mt-4  bg-rose-600 text-white sm:mt-2 rounded-full h-10 mx-4 my-auto flex justify-center gap-1 px-3 py-2 hover:shadow hover:bg-rose-500"
              onClick={() => {
                setShowFilter(false)
                setDetailFilter(null)
              }}
            >
              <AiOutlineSearch className="font-semibold text-xl my-auto" />
              <div className="w-[30px] my-auto">검색</div>
            </button>
          </div>
        </div>
      )}

      <div className="grow basis-0 hidden md:flex gap-4 align-middle relative justify-end ">
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
          <div className="border border-gray-200 shadow-lg py-2 flex flex-col absolute top-12 bg-white w-60 rounded-lg">
            {menus.map((menu) => (
              <button
                type="button"
                key={menu.id}
                className="h-10 hover:bg-gray-50 pl-3 text-sm text-gray-700 text-left"
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
