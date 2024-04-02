import React from 'react'
import cn from 'classnames'
import { FilterLayoutProps } from '@/interface'

const FilterLayout = ({ children, title, isShow }: FilterLayoutProps) => {
  return (
    <div
      className={cn(
        'w-full md:w-[780px] sm:w-[680px] absolute top-[19rem] sm:top-[70px] border border-gray-200 px-8 py-10 flex flex-col bg-white sm:max-w-3xl rounded-xl left-0',
        {
          hidden: !isShow,
        },
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      {children}
    </div>
  )
}

export default FilterLayout
