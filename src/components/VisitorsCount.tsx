import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

interface VisitorsCountProps {
  uniqueName: string
  readOnly?: boolean
}

export default function VisitorsCount({
  uniqueName,
  readOnly,
}: VisitorsCountProps) {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        if (readOnly) {
          var fetchUrl = `https://counter-seven-flame.vercel.app/api/counter/blog---${uniqueName}/get`
        } else {
          var fetchUrl = `https://counter-seven-flame.vercel.app/api/counter/blog---${uniqueName}`
        }
        const response = await fetch(fetchUrl)
        const data = await response.json()
        const visitorCount = data?.value

        setCount(visitorCount)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    fetchVisitorCount()
  }, [uniqueName])

  if (loading) {
    return (
      <span className="flex items-center gap-1">
        <Eye size={16} />
        <span className="rounded-md blur-[3px]">
          {119 + Math.floor(Math.random() * 333) + 1}
        </span>
      </span>
    )
  }

  if (error) {
    return (
      <span className="flex items-center gap-1 text-red-500">
        <Eye size={16} />
        <span>...</span>
      </span>
    )
  }

  return (
    <span className="flex items-center gap-1">
      <Eye size={16} className="text-sky-500" />
      <span>{count}</span>
    </span>
  )
}
