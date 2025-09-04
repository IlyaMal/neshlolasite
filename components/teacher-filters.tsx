"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TeacherFilters as Filters } from "@/lib/types"

interface TeacherFiltersProps {
  subjects: string[]
  onFiltersChange?: (filters: Filters) => void
}

export function TeacherFilters({ subjects, onFiltersChange }: TeacherFiltersProps) {
  const [filters, setFilters] = useState<Filters>({})

  useEffect(() => {
    onFiltersChange?.(filters)
  }, [filters, onFiltersChange])

  const handleFilterChange = (key: keyof Filters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
  }

  const clearFilters = () => {
    setFilters({})
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined && value !== "" && value !== null)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Фильтры</h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Очистить
            </Button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Subject Filter */}
          <div className="space-y-2">
            <Label htmlFor="subject">Предмет</Label>
            <Select
              value={filters.subject || ""}
              onValueChange={(value) => handleFilterChange("subject", value === "all" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Все предметы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все предметы</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Format Filter */}
          <div className="space-y-2">
            <Label htmlFor="format">Формат занятий</Label>
            <Select
              value={filters.format || ""}
              onValueChange={(value) => handleFilterChange("format", value === "all" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Любой формат" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любой формат</SelectItem>
                <SelectItem value="online">Онлайн</SelectItem>
                <SelectItem value="offline">Оффлайн</SelectItem>
                <SelectItem value="both">Онлайн/Оффлайн</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Min Price Filter */}
          <div className="space-y-2">
            <Label htmlFor="minPrice">Цена от (₽)</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="0"
              min="0"
              step="100"
              value={filters.minPrice || ""}
              onChange={(e) => handleFilterChange("minPrice", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>

          {/* Max Price Filter */}
          <div className="space-y-2">
            <Label htmlFor="maxPrice">Цена до (₽)</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="10000"
              min="0"
              step="100"
              value={filters.maxPrice || ""}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {filters.subject && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                  <span>Предмет: {filters.subject}</span>
                  <button
                    onClick={() => handleFilterChange("subject", undefined)}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              {filters.format && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                  <span>
                    Формат:{" "}
                    {filters.format === "online"
                      ? "Онлайн"
                      : filters.format === "offline"
                        ? "Оффлайн"
                        : "Онлайн/Оффлайн"}
                  </span>
                  <button
                    onClick={() => handleFilterChange("format", undefined)}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                  <span>
                    Цена: {filters.minPrice || 0}₽ - {filters.maxPrice || "∞"}₽
                  </span>
                  <button
                    onClick={() => {
                      handleFilterChange("minPrice", undefined)
                      handleFilterChange("maxPrice", undefined)
                    }}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
