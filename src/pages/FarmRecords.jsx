import { useEffect, useState } from 'react'
import Card from '../components/common/Card'
import Skeleton from '../components/common/Skeleton'
import { getFarmRecords } from '../data/mockApi'

export default function FarmRecords() {
  const [records, setRecords] = useState(null)

  useEffect(() => {
    getFarmRecords().then(setRecords)
  }, [])

  return (
    <Card className="p-5">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink-500 border-b border-ink-900/5">
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Activity</th>
              <th className="pb-3 font-semibold">Crop</th>
              <th className="pb-3 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {!records &&
              [1, 2, 3].map((i) => (
                <tr key={i}>
                  <td colSpan={4} className="py-2">
                    <Skeleton className="h-8 w-full" />
                  </td>
                </tr>
              ))}
            {records?.map((r) => (
              <tr key={r.id} className="border-b border-ink-900/5 last:border-0 hover:bg-forest-50">
                <td className="py-3 text-ink-700">{r.date}</td>
                <td className="py-3 font-medium text-ink-900">{r.activity}</td>
                <td className="py-3 text-ink-700">{r.crop}</td>
                <td className="py-3 text-ink-500">{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
