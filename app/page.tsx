'use client'
import CategoryList from '@/components/CategoryList'
import Loader from '@/components/Loader'
import { GridLayout, RoomItem } from '@/components/RoomItem'
import { RoomType } from '@/interface'
import { useQuery } from 'react-query'

export default function Home() {
  const fetchRooms = async () => {
    const data = await fetch('/api/rooms')
    return data.json()
  }

  const { data, isError, isLoading } = useQuery('rooms', fetchRooms)

  if (isLoading) {
    return <Loader className="mt-60 mb-40" />
  }

  return (
    <>
      <CategoryList />
      <GridLayout>
        {data?.map((room: RoomType) => <RoomItem room={room} key={room.id} />)}
      </GridLayout>
    </>
  )
}

async function getRooms() {
  const fetchRooms = async () => {
    const data = await fetch('/api/rooms')
    return data.json()
  }

  if (!res.ok) {
    throw new Error('failed to fetch')
  }

  return res.json()
}
