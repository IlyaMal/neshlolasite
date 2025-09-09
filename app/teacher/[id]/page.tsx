"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { teachersStore } from "@/lib/teachers-store"
import { formatPrice, formatExperience, formatTeachingFormat } from "@/lib/utils/format"
import Link from "next/link"
import { notFound } from "next/navigation"

interface TeacherPageProps {
  params: {
    id: string
  }
}

export default function TeacherPage({ params }: TeacherPageProps) {
  const teacher = teachersStore.getTeacherById(params.id)

  if (!teacher) {
    notFound()
  }

  const handleBackClick = () => {
    if (typeof window !== "undefined" && (window as any).teacherSearchState?.savedResults) {
      // Restore search results if available
      ;(window as any).teacherSearchState.restoreResults()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                onClick={handleBackClick}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {typeof window !== "undefined" && (window as any).teacherSearchState?.savedResults
                  ? "Назад к результатам"
                  : "Назад к списку"}
              </Link>
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
        <div className="max-w-4xl mx-auto">
          {/* Teacher Profile Card */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar and Basic Info */}
                <div className="flex flex-col items-center md:items-start">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
  {teacher.photo ? (
    <img
      src={teacher.photo || "/placeholder.svg"}
      alt={teacher.name ?? "Преподаватель"}
      className="h-32 w-32 rounded-full object-cover"
    />
  ) : (
    <span className="text-4xl font-semibold text-primary">
      {teacher.name?.charAt(0) ?? "?"}
    </span>
  )}
</div>



                  <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{teacher.name}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{formatExperience(teacher.experience)} опыта</p>

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-sm px-3 py-1">
                        {teacher.subject}
                      </Badge>
                      <Badge variant="outline" className="text-sm px-3 py-1">
                        {formatTeachingFormat(teacher.format)}
                      </Badge>
                    </div>

                    <div className="text-center md:text-left">
                      <div className="text-3xl font-bold text-foreground">{formatPrice(teacher.pricePerHour)}</div>
                      <div className="text-muted-foreground">за час занятий</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground mb-4">О преподавателе</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">{teacher.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Cards */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {/* Experience Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                    />
                  </svg>
                  Опыт работы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">{formatExperience(teacher.experience)}</div>
                <p className="text-muted-foreground">преподавательской деятельности</p>
              </CardContent>
            </Card>

            {/* Format Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Формат занятий
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">{formatTeachingFormat(teacher.format)}</div>
                <p className="text-muted-foreground">
                  {teacher.format === "online" && "Занятия проводятся дистанционно"}
                  {teacher.format === "offline" && "Занятия проводятся очно"}
                  {teacher.format === "both" && "Возможны как очные, так и дистанционные занятия"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Связаться с преподавателем
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <p className="text-muted-foreground mb-4">
                  Чтобы связаться с преподавателем и записаться на занятия, обратитесь к администратору сервиса.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Написать администратору
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Позвонить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
