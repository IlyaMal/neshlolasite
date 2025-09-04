export interface Teacher {
  id: string
  name: string
  subject: string
  experience: number // years of experience
  pricePerHour: number
  format: "online" | "offline" | "both"
  description: string
  avatar?: string
  photo?: string // добавляем поле для фотографии
  createdAt: Date
  updatedAt: Date
}

export interface TeacherFilters {
  subject?: string
  minPrice?: number
  maxPrice?: number
  format?: "online" | "offline" | "both"
}

export interface TeacherFormData {
  name: string
  subject: string
  experience: number
  pricePerHour: number
  format: "online" | "offline" | "both"
  description: string
  photo?: string // добавляем поле для фотографии в форму
}
