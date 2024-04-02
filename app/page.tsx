'use client'
import CategoryList from '@/components/CategoryList'
import { Loader, LoaderGrid } from '@/components/Loader'
import { GridLayout, RoomItem } from '@/components/RoomItem'
import { RoomType } from '@/interface'
import { useQuery, useInfiniteQuery } from 'react-query'
import axios from 'axios'
import React, { useEffect, useRef, useCallback } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function Home() {
  const ref = useRef<HTMLDivElement | null>(null)
  const pageRef = useIntersectionObserver(ref, {})
  const isPageEnd = !!pageRef?.isIntersecting

  const fetchRooms = async ({ pageParam = 1 }) => {
    console.log({ pageParam })
    const { data } = await axios('/api/rooms?page=' + pageParam, {
      params: { limit: 12, page: pageParam },
    })
    return data
  }

  const {
    data: rooms,
    isFetching,
    fetchNextPage,
    hasNextPage,
    error,
    isFetchingNextPage,
    status,
    isError,
    isLoading,
  } = useInfiniteQuery('rooms', fetchRooms, {
    getNextPageParam: (lastPage, page) =>
      lastPage?.data?.length > 0 ? lastPage.page + 1 : undefined,
  })

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNextPage()
      }, 500)
    }
  }, [isPageEnd, hasNextPage, fetchNextPage])

  return (
    <>
      <CategoryList />
      <GridLayout>
        {isLoading || isFetching ? (
          <LoaderGrid />
        ) : (
          rooms?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page?.data.map((room: RoomType) => (
                <RoomItem room={room} key={room.id} />
              ))}
            </React.Fragment>
          ))
        )}
      </GridLayout>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </>
  )
}
