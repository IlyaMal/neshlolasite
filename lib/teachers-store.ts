import type { Teacher, TeacherFormData } from "./types"

class TeachersStore {
  private teachers: Teacher[] = []
  private nextId = 1

  // Initialize with some sample data
  constructor() {
    this.teachers = [
      {
        id: "1",
        name: "Анна Петрова",
        subject: "Математика",
        experience: 5,
        pricePerHour: 1500,
        format: "both",
        description:
          "Опытный преподаватель математики с индивидуальным подходом к каждому ученику. Специализируюсь на подготовке к ЕГЭ и ОГЭ.",
        photo: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "Дмитрий Иванов",
        subject: "Английский язык",
        experience: 8,
        pricePerHour: 2000,
        format: "online",
        description:
          "Носитель языка с международными сертификатами. Помогу улучшить разговорную речь и подготовиться к экзаменам.",
        photo: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        name: "Елена Смирнова",
        subject: "Физика",
        experience: 12,
        pricePerHour: 1800,
        format: "offline",
        description: "Кандидат физико-математических наук. Объясняю сложные темы простым языком.",
        photo: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    this.nextId = 4
  }

  getAllTeachers(): Teacher[] {
    return [...this.teachers]
  }

  getTeacherById(id: string): Teacher | undefined {
    return this.teachers.find((teacher) => teacher.id === id)
  }

  addTeacher(data: TeacherFormData): Teacher {
    const newTeacher: Teacher = {
      ...data,
      id: this.nextId.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.teachers.push(newTeacher)
    this.nextId++
    return newTeacher
  }

  updateTeacher(id: string, data: Partial<TeacherFormData>): Teacher | null {
    const index = this.teachers.findIndex((teacher) => teacher.id === id)
    if (index === -1) return null

    this.teachers[index] = {
      ...this.teachers[index],
      ...data,
      updatedAt: new Date(),
    }
    return this.teachers[index]
  }

  deleteTeacher(id: string): boolean {
    const index = this.teachers.findIndex((teacher) => teacher.id === id)
    if (index === -1) return false

    this.teachers.splice(index, 1)
    return true
  }

  getUniqueSubjects(): string[] {
    const subjects = this.teachers.map((teacher) => teacher.subject)
    return [...new Set(subjects)].sort()
  }
}

// Export singleton instance
export const teachersStore = new TeachersStore()
