import React from 'react'

const Page = async () => {
  const data = await getData()
  return (
    <div className="text-center min-h-screen py-40">
      <h1>ISR</h1>
      <h2>number:{data}</h2>
    </div>
  )
}

export default Page

async function getData() {
  const res = await fetch(
    'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain',
    {
      next: { revalidate: 5 },
    },
  )

  if (!res.ok) {
    throw new Error('Faild to fetch data')
  }

  return res.json()
}
