import { RefObject, useState, useEffect } from 'react'

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = '0px' },
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const updateEntry = ([entry]: IntersectionObserverEntry[]) => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!node || !hasIOSupport) return

    const observeParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observeParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef?.current, root, rootMargin, JSON.stringify(threshold)])

  return entry
}
