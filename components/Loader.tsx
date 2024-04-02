import cn from 'classnames'
import { GridLayout } from './RoomItem'

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-4 justify-center ', className)}>
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping" />
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping" />
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping" />
    </div>
  )
}

export function LoaderGrid({ className }: { className?: string }) {
  return (
    <>
      {[...Array(12)].map((e, i) => (
        <div
          key={i}
          className={cn(
            'rounded-md w-full h-72 md:h-64 bg-gray-200 animate-pulse z-[0]',
            className,
          )}
        ></div>
      ))}
    </>
  )
}
