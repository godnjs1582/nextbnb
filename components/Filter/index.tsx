import cn from 'classnames'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { detailFilterState, filterState } from '@/atom'
import FilterLayout from './layout'

const SearchFilter = () => {
  const detailFilter = useRecoilValue(detailFilterState)
  return (
    <>
      <LocationFilter />
      <CheckInFilter />
      <CheckOutFilter />
      <GuestFilter />
    </>
  )
}

export default SearchFilter

const LocationFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState)
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState)
  return (
    <FilterLayout
      title="지역으로 검색하기"
      isShow={detailFilter === 'location'}
    >
      <div className="flex flex-wrap gap-4 mt-4">
        {['서울', '부산', '대구', '인천', '광주', '대전', '울산']?.map(
          (value) => (
            <button
              key={value}
              type="button"
              className={cn(
                'border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-rose-500',
                {
                  'bg-rose-600 text-white': filterValue.location === value,
                },
              )}
              onClick={(e) => {
                setFilterValue({ ...filterValue, location: value })
                setDetailFilter('checkIn')
              }}
            >
              {value}
            </button>
          ),
        )}
      </div>
    </FilterLayout>
  )
}

const CheckInFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState)
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState)
  const onChange = (e: any) => {
    setFilterValue({ ...filterValue, checkIn: dayjs(e).format('YYYY-MM-DD') })
    setDetailFilter('checkOut')
  }
  return (
    <FilterLayout
      title="체크인 날짜 설정하기"
      isShow={detailFilter === 'checkIn'}
    >
      <Calendar
        className="mt-8 mx-auto"
        onChange={onChange}
        minDate={new Date()}
        defaultValue={filterValue.checkIn ? new Date() : null}
        formatDay={(locale, date) => dayjs(date).format('DD')}
      />
    </FilterLayout>
  )
}

const CheckOutFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState)
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState)

  const onChange = (e: any) => {
    setFilterValue({ ...filterValue, checkOut: dayjs(e).format('YYYY-MM-DD') })
    setDetailFilter('guest')
  }
  return (
    <FilterLayout
      title="체크아웃 날짜 설정하기"
      isShow={detailFilter === 'checkOut'}
    >
      <Calendar
        className="mt-8 mx-auto"
        onChange={onChange}
        defaultValue={filterValue.checkOut ? new Date() : null}
        minDate={
          filterValue.checkOut ? new Date(filterValue.checkIn) : new Date()
        }
        formatDay={(locale, date) => dayjs(date).format('DD')}
      />
    </FilterLayout>
  )
}

const GuestFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState)
  const detailValue = useRecoilValue(detailFilterState)
  const [counter, setCounter] = useState(filterValue.guest || 0)
  return (
    <FilterLayout title="게스트 수 추가하기" isShow={detailValue === 'guest'}>
      <div className="mt-4 border border-gray-200 rounded-lg py-2 px-4 flex justify-between items-center">
        <div>
          <div className="font-semibold text-sm">게스트 수 추가</div>
          <div className="text-gray-500 text-xs">숙박 인원을 입력해주세요</div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="rounded-full size-8 disabled:border-gray-200 hover:border-black"
            disabled={counter <= 0}
            onClick={() => {
              setCounter((prev) => prev - 1)
              setFilterValue({ ...filterValue, guest: counter - 1 })
            }}
          >
            <AiOutlineMinusCircle
              className={cn('m-auto', { 'text-gray-200': counter <= 0 })}
            />
          </button>
          <div className="w-3 text-center">{counter}</div>
          <button
            type="button"
            className="rounded-full size-8 disabled:border-gray-200 hover:border-black"
            onClick={() => {
              setCounter((prev) => prev + 1)
              setFilterValue({ ...filterValue, guest: counter + 1 })
            }}
            disabled={counter >= 20}
          >
            <AiOutlinePlusCircle
              className={cn('m-auto', { 'text-gray-200': counter >= 20 })}
            />
          </button>
        </div>
      </div>
    </FilterLayout>
  )
}
