import type { Teacher, TeacherFormData } from "./types"

export class TeachersStore {
  async getAllTeachers(): Promise<Teacher[]> {
    const res = await fetch("/api/teachers")
    return res.json()
  }

  async getTeacherById(id: string): Promise<Teacher | null> {
    const res = await fetch(`/api/teachers/${id}`)
    if (!res.ok) return null
    return res.json()
  }

  async addTeacher(data: TeacherFormData): Promise<Teacher> {
    const res = await fetch("/api/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return res.json()
  }

  async updateTeacher(id: string, data: Partial<TeacherFormData>): Promise<Teacher | null> {
    const res = await fetch(`/api/teachers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) return null
    return res.json()
  }

  async deleteTeacher(id: string): Promise<boolean> {
    const res = await fetch(`/api/teachers/${id}`, { method: "DELETE" })
    return res.ok
  }

  async getUniqueSubjects(): Promise<string[]> {
    const teachers = await this.getAllTeachers()
    const subjects = teachers.map((t) => t.subject)
    return [...new Set(subjects)].sort()
  }
}

export const teachersStore = new TeachersStore()
