"use client"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { useEffect, useState } from "react"
import { fetchSections } from "@/utils/supabase/fetch"

export default function Page() {
  const [sections, setSections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const data = await fetchSections()
        setSections(data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards sections={sections} loading={loading} />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={sections} loading={loading} />
          </div>
        </div>
      </div>
    </>
  )
}
