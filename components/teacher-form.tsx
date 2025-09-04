"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TeacherFormData, Teacher } from "@/lib/types"

interface TeacherFormProps {
  initialData?: Teacher
  onSubmit: (data: TeacherFormData) => void
  onCancel: () => void
}

export function TeacherForm({ initialData, onSubmit, onCancel }: TeacherFormProps) {
  const [formData, setFormData] = useState<TeacherFormData>({
    name: initialData?.name || "",
    subject: initialData?.subject || "",
    experience: initialData?.experience || 1,
    pricePerHour: initialData?.pricePerHour || 1000,
    format: initialData?.format || "both",
    description: initialData?.description || "",
    photo: initialData?.photo || "",
  })

  const [errors, setErrors] = useState<Partial<TeacherFormData>>({})

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        handleInputChange("photo", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<TeacherFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Предмет обязателен"
    }

    if (formData.experience < 1 || formData.experience > 50) {
      newErrors.experience = "Опыт должен быть от 1 до 50 лет"
    }

    if (formData.pricePerHour < 100 || formData.pricePerHour > 10000) {
      newErrors.pricePerHour = "Цена должна быть от 100 до 10000 рублей"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Описание обязательно"
    } else if (formData.description.length < 20) {
      newErrors.description = "Описание должно содержать минимум 20 символов"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof TeacherFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="photo">Фотография преподавателя</Label>
        <div className="flex items-center gap-4">
          {formData.photo && (
            <div className="relative">
              <img
                src={formData.photo || "/placeholder.svg"}
                alt="Предварительный просмотр"
                className="h-20 w-20 rounded-full object-cover border-2 border-border"
              />
            </div>
          )}
          <div className="flex-1">
            <Input id="photo" type="file" accept="image/*" onChange={handleFileChange} className="cursor-pointer" />
            <p className="text-xs text-muted-foreground mt-1">Загрузите фотографию в формате JPG, PNG или GIF</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Имя преподавателя *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Введите имя"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject">Предмет *</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            placeholder="Например: Математика"
            className={errors.subject ? "border-destructive" : ""}
          />
          {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <Label htmlFor="experience">Опыт работы (лет) *</Label>
          <Input
            id="experience"
            type="number"
            min="1"
            max="50"
            value={formData.experience}
            onChange={(e) => handleInputChange("experience", Number(e.target.value))}
            className={errors.experience ? "border-destructive" : ""}
          />
          {errors.experience && <p className="text-sm text-destructive">{errors.experience}</p>}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="pricePerHour">Цена за час (₽) *</Label>
          <Input
            id="pricePerHour"
            type="number"
            min="100"
            max="10000"
            step="50"
            value={formData.pricePerHour}
            onChange={(e) => handleInputChange("pricePerHour", Number(e.target.value))}
            className={errors.pricePerHour ? "border-destructive" : ""}
          />
          {errors.pricePerHour && <p className="text-sm text-destructive">{errors.pricePerHour}</p>}
        </div>
      </div>

      {/* Format */}
      <div className="space-y-2">
        <Label htmlFor="format">Формат занятий *</Label>
        <Select
          value={formData.format}
          onValueChange={(value: "online" | "offline" | "both") => handleInputChange("format", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="online">Только онлайн</SelectItem>
            <SelectItem value="offline">Только оффлайн</SelectItem>
            <SelectItem value="both">Онлайн и оффлайн</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Описание *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Расскажите о своем опыте, методах преподавания и специализации..."
          rows={4}
          className={errors.description ? "border-destructive" : ""}
        />
        <p className="text-xs text-muted-foreground">{formData.description.length}/500 символов (минимум 20)</p>
        {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          {initialData ? "Сохранить изменения" : "Добавить преподавателя"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
          Отмена
        </Button>
      </div>
    </form>
  )
}
