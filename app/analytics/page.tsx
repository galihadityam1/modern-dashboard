"use client"
import React from "react"
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip as RechartsTooltip } from 'recharts';
import data from "../dashboard/data.json"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

// Helper: group by field
const groupBy = (arr: any[], key: string) => arr.reduce((acc: any, obj: any) => {
  acc[obj[key]] = (acc[obj[key]] || 0) + 1
  return acc
}, {})

// 1. Status Overview
const statusCounts = groupBy(data, "status")
const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }))
const totalSections = data.length

// 2. Reviewer Workload
const reviewerCounts = groupBy(data, "reviewer")
const reviewerData = Object.entries(reviewerCounts).map(([name, value]) => ({ name, value }))

// 3. Section Type Distribution
const typeCounts = groupBy(data, "type")
const typeData = Object.entries(typeCounts).map(([name, value]) => ({ name, value }))

// 4. Target vs. Limit Comparison
const targetLimitData = data.map(d => ({
  header: d.header,
  target: Number(d.target),
  limit: Number(d.limit),
  difference: Number(d.target) - Number(d.limit)
}))

// 5. Sections to Prioritize
const prioritizedSections = data.filter(
  d => d.status === "In Process" && (!d.reviewer || d.reviewer === "Assign reviewer")
)

const priorityHeaders = [
  "Security Measures and Data Protection Policies",
  "Data Migration Plan",
  "Version Control Strategy",
  "Regulatory Compliance",
  "Monitoring and Alerting System",
  "Communication Protocol"
]

const priorityRows = data.filter(d =>
  priorityHeaders.some(h => d.header.toLowerCase().includes(h.toLowerCase()))
)

const ITEMS_PER_PAGE = 6;

export default function AnalyticsPage() {
  const [page, setPage] = React.useState(1)
  const pageCount = Math.ceil(targetLimitData.length / ITEMS_PER_PAGE)
  const pagedData = targetLimitData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Analytics Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Status Overview</CardTitle>
            <CardDescription>Percentage of sections by status</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {statusData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reviewer Workload</CardTitle>
            <CardDescription>Number of sections assigned to each reviewer</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reviewerData}>
                <CartesianGrid strokeDasharray="3 3" />
                {/* <XAxis dataKey="name" /> */}
                <YAxis allowDecimals={false} />
                <RechartsTooltip
                  cursor={{ fill: '#eee' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const { name, value } = payload[0].payload;
                      return (
                        <div className="rounded bg-background p-2 shadow border text-sm">
                          <div><span className="font-medium">Reviewer:</span> {name}</div>
                          <div><span className="font-medium">Sections:</span> {value}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Section Type Distribution</CardTitle>
            <CardDescription>Distribution of section types</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {typeData.map((entry, idx) => (
                    <Cell key={`cell-type-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Target vs. Limit Comparison</CardTitle>
            <CardDescription>Compare target and limit for each section</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Header</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Limit</TableHead>
                  <TableHead>Difference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedData.map(row => (
                  <TableRow key={row.header}>
                    <TableCell>{row.header}</TableCell>
                    <TableCell>{row.target}</TableCell>
                    <TableCell>{row.limit}</TableCell>
                    <TableCell className={row.difference < 0 ? "text-red-600" : "text-green-600"}>{row.difference}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-3 py-1 rounded transition-colors bg-muted text-foreground hover:bg-accent disabled:opacity-50"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {page} of {pageCount}
              </span>
              <button
                className="px-3 py-1 rounded transition-colors bg-muted text-foreground hover:bg-accent disabled:opacity-50"
                onClick={() => setPage(p => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
              >
                Next
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
