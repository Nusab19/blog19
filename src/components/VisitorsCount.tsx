import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

interface VisitorsCountProps {
  uniqueName: string
}

export default function VisitorsCount({ uniqueName }: VisitorsCountProps) {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch(
          `https://doc2-photo-bot.vercel.app/api/count?username=Nusab19&repo=blog---${uniqueName}`,
        )
        const data = await response.json()

        // Extract count from finalUrl
        const countMatch = data.finalUrl.match(/Visits-(\d+)-/)
        const visitorCount = countMatch ? parseInt(countMatch[1]) : 0

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
