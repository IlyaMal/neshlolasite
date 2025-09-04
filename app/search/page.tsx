"use client"

import { useState, useMemo } from "react"
import { TeacherCard } from "@/components/teacher-card"
import { teachersStore } from "@/lib/teachers-store"
import type { TeacherFilters as Filters, Teacher } from "@/lib/types"
import Link from "next/link"

type FilterStep = "subject" | "format" | "price" | "results"

interface SearchResults {
  filters: Filters
  teachers: Teacher[]
  step: FilterStep
}

export default function SearchPage() {
  const allTeachers = teachersStore.getAllTeachers()
  const subjects = teachersStore.getUniqueSubjects()

  const [filters, setFilters] = useState<Filters>({})
  const [currentStep, setCurrentStep] = useState<FilterStep>("subject")
  const [savedResults, setSavedResults] = useState<SearchResults | null>(null)

  const filteredTeachers = useMemo(() => {
    return allTeachers.filter((teacher) => {
      // Filter by subject
      if (filters.subject && teacher.subject !== filters.subject) {
        return false
      }

      // Filter by format
      if (filters.format && filters.format !== "both") {
        if (teacher.format !== filters.format && teacher.format !== "both") {
          return false
        }
      }

      // Filter by minimum price
      if (filters.minPrice && teacher.pricePerHour < filters.minPrice) {
        return false
      }

      // Filter by maximum price
      if (filters.maxPrice && teacher.pricePerHour > filters.maxPrice) {
        return false
      }

      return true
    })
  }, [allTeachers, filters])

  const handleSubjectSelect = (subject: string) => {
    setFilters((prev) => ({ ...prev, subject }))
    setCurrentStep("format")
  }

  const handleFormatSelect = (format: string) => {
    setFilters((prev) => ({ ...prev, format }))
    setCurrentStep("price")
  }

  const handlePriceSelect = (minPrice?: number, maxPrice?: number) => {
    const newFilters = { ...filters, minPrice, maxPrice }
    setFilters(newFilters)
    setCurrentStep("results")

    setSavedResults({
      filters: newFilters,
      teachers: allTeachers.filter((teacher) => {
        if (newFilters.subject && teacher.subject !== newFilters.subject) return false
        if (newFilters.format && newFilters.format !== "both") {
          if (teacher.format !== newFilters.format && teacher.format !== "both") return false
        }
        if (newFilters.minPrice && teacher.pricePerHour < newFilters.minPrice) return false
        if (newFilters.maxPrice && teacher.pricePerHour > newFilters.maxPrice) return false
        return true
      }),
      step: "results",
    })
  }

  const resetFilters = () => {
    setFilters({})
    setCurrentStep("subject")
    setSavedResults(null)
  }

  const restoreResults = () => {
    if (savedResults) {
      setFilters(savedResults.filters)
      setCurrentStep(savedResults.step)
    }
  }

  if (typeof window !== "undefined") {
    ;(window as any).teacherSearchState = {
      savedResults,
      restoreResults,
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold text-foreground">TeacherFinder</span>
              </Link>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">Поиск преподавателей</h1>
                <p className="text-sm text-muted-foreground">Найдите идеального преподавателя для ваших целей</p>
              </div>
            </div>
            <Link
              href="/admin"
              className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
              Админ-панель
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              {["subject", "format", "price", "results"].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep === step || (step === "results" && currentStep === "results")
                        ? "bg-primary text-primary-foreground"
                        : index < ["subject", "format", "price", "results"].indexOf(currentStep)
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <div
                      className={`w-8 h-0.5 ${
                        index < ["subject", "format", "price", "results"].indexOf(currentStep)
                          ? "bg-primary/20"
                          : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Subject Selection */}
          {currentStep === "subject" && (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Выберите предмет</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectSelect(subject)}
                    className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Format Selection */}
          {currentStep === "format" && (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Формат занятий</h2>
              <p className="text-muted-foreground mb-4">Предмет: {filters.subject}</p>
              <div className="flex justify-center gap-3">
                {["online", "offline", "both"].map((format) => (
                  <button
                    key={format}
                    onClick={() => handleFormatSelect(format)}
                    className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    {format === "online" ? "Онлайн" : format === "offline" ? "Оффлайн" : "Любой"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Price Selection */}
          {currentStep === "price" && (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Ценовой диапазон</h2>
              <p className="text-muted-foreground mb-4">
                {filters.subject} •{" "}
                {filters.format === "online" ? "Онлайн" : filters.format === "offline" ? "Оффлайн" : "Любой формат"}
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handlePriceSelect(undefined, 1000)}
                  className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  До 1000 ₽
                </button>
                <button
                  onClick={() => handlePriceSelect(1000, 2000)}
                  className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  1000-2000 ₽
                </button>
                <button
                  onClick={() => handlePriceSelect(2000, undefined)}
                  className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  От 2000 ₽
                </button>
                <button
                  onClick={() => handlePriceSelect()}
                  className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  Любая цена
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {currentStep === "results" && (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Результаты поиска</h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <p className="text-muted-foreground">
                  {filters.subject} •{" "}
                  {filters.format === "online" ? "Онлайн" : filters.format === "offline" ? "Оффлайн" : "Любой формат"} •
                  {filters.minPrice || filters.maxPrice
                    ? ` ${filters.minPrice ? `от ${filters.minPrice}` : ""}${filters.minPrice && filters.maxPrice ? "-" : ""}${filters.maxPrice ? `до ${filters.maxPrice}` : ""} ₽`
                    : " Любая цена"}
                </p>
                <button onClick={resetFilters} className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Начать заново
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {currentStep === "results" && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground text-center">
              Найдено преподавателей: <span className="font-medium text-foreground">{filteredTeachers.length}</span>
            </p>
          </div>
        )}

        {/* Teachers Grid - только на шаге results */}
        {currentStep === "results" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {currentStep === "results" && filteredTeachers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <svg className="h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Нет преподавателей по заданным критериям</h3>
            <p className="text-muted-foreground max-w-md">Попробуйте изменить параметры поиска или начать заново.</p>
          </div>
        )}
      </main>
    </div>
  )
}
