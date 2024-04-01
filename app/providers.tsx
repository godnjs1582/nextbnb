'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { RecoilRoot } from 'recoil'
interface Props {
  children?: React.ReactNode
}

export const NextProvider = ({ children }: Props) => {
  return <RecoilRoot>{children}</RecoilRoot>
}

const NextLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="mt-20 p-10 min-h-[80vh]">{children}</div>
      <Footer />
    </>
  )
}

export default NextLayout
