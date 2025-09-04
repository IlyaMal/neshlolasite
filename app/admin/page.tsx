"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { TeacherForm } from "@/components/teacher-form"
import { teachersStore } from "@/lib/teachers-store"
import { formatPrice, formatExperience, formatTeachingFormat } from "@/lib/utils/format"
import type { Teacher, TeacherFormData } from "@/lib/types"
import Link from "next/link"

const ADMIN_PASSWORD = "admin123"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [teachers, setTeachers] = useState(teachersStore.getAllTeachers())
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPasswordError("")
    } else {
      setPasswordError("Неверный пароль")
      setPassword("")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Вход в админ-панель</CardTitle>
            <p className="text-muted-foreground">Введите пароль для доступа</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? "border-destructive" : ""}
                />
                {passwordError && <p className="text-sm text-destructive mt-1">{passwordError}</p>}
              </div>
              <Button type="submit" className="w-full">
                Войти
              </Button>
              <div className="text-center">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Вернуться на главную
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleAddTeacher = (data: TeacherFormData) => {
    const newTeacher = teachersStore.addTeacher(data)
    setTeachers(teachersStore.getAllTeachers())
    setShowForm(false)
  }

  const handleUpdateTeacher = (data: TeacherFormData) => {
    if (editingTeacher) {
      teachersStore.updateTeacher(editingTeacher.id, data)
      setTeachers(teachersStore.getAllTeachers())
      setEditingTeacher(null)
    }
  }

  const handleDeleteTeacher = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить этого преподавателя?")) {
      teachersStore.deleteTeacher(id)
      setTeachers(teachersStore.getAllTeachers())
    }
  }

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher)
    setShowForm(false)
  }

  const handleCancelEdit = () => {
    setEditingTeacher(null)
    setShowForm(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Админ-панель</h1>
              <p className="text-muted-foreground">Управление преподавателями</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-1 bg-transparent">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Выйти
              </Button>
              <Link
                href="/"
                className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90 transition-colors"
              >
                На главную
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего преподавателей</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Предметов</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 3.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachersStore.getUniqueSubjects().length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Средняя цена</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teachers.length > 0
                  ? formatPrice(Math.round(teachers.reduce((sum, t) => sum + t.pricePerHour, 0) / teachers.length))
                  : "0 ₽"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Form */}
        {(showForm || editingTeacher) && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>{editingTeacher ? "Редактировать преподавателя" : "Добавить преподавателя"}</CardTitle>
              </CardHeader>
              <CardContent>
                <TeacherForm
                  initialData={editingTeacher || undefined}
                  onSubmit={editingTeacher ? handleUpdateTeacher : handleAddTeacher}
                  onCancel={handleCancelEdit}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Actions */}
        {!showForm && !editingTeacher && (
          <div className="mb-6">
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Добавить преподавателя
            </Button>
          </div>
        )}

        {/* Teachers List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Список преподавателей</h2>

          {teachers.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <svg
                    className="h-12 w-12 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Нет преподавателей</h3>
                <p className="text-muted-foreground">Добавьте первого преподавателя, чтобы начать работу.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {teachers.map((teacher) => (
                <Card key={teacher.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Avatar */}
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                          {teacher.photo ? (
                            <img
                              src={teacher.photo || "/placeholder.svg"}
                              alt={teacher.name}
                              className="h-16 w-16 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-xl font-semibold text-primary">{teacher.name.charAt(0)}</span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground">{teacher.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {formatExperience(teacher.experience)} опыта
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-foreground">
                                {formatPrice(teacher.pricePerHour)}
                              </div>
                              <div className="text-sm text-muted-foreground">/час</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {teacher.subject}
                            </Badge>
                            <Badge variant="outline">{formatTeachingFormat(teacher.format)}</Badge>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2">{teacher.description}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditTeacher(teacher)}
                          className="gap-1"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Изменить
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTeacher(teacher.id)}
                          className="gap-1 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Удалить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
