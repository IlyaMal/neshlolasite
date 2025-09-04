"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const teacherTypes = [
  {
    type: "Строгий наставник",
    icon: "👨‍🏫",
    description: "Четкий план, дисциплина, контроль выполнения заданий",
    traits: ["Пунктуальность", "Системность", "Высокие требования"],
    color: "from-red-500 to-orange-500",
  },
  {
    type: "Дружелюбный коуч",
    icon: "😊",
    description: "Поддержка, мотивация, индивидуальный подход",
    traits: ["Эмпатия", "Гибкость", "Позитивный настрой"],
    color: "from-green-500 to-teal-500",
  },
  {
    type: "Креативный ментор",
    icon: "🎨",
    description: "Нестандартные методы, интересные объяснения",
    traits: ["Творческий подход", "Интерактивность", "Увлекательность"],
    color: "from-purple-500 to-pink-500",
  },
  {
    type: "Требовательный эксперт",
    icon: "🎯",
    description: "Глубокие знания, высокий уровень подготовки",
    traits: ["Экспертность", "Детальность", "Результативность"],
    color: "from-blue-500 to-indigo-500",
  },
]

export function TeacherMatching() {
  const [selectedType, setSelectedType] = useState<number | null>(null)
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <section id="teachers" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Система подбора преподавателей</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Мы подбираем преподавателя под твой характер и стиль обучения. Выбери тип, который тебе ближе всего!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {teacherTypes.map((teacher, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedType === index ? "ring-2 ring-primary shadow-xl" : "hover:shadow-lg"
              }`}
              onClick={() => setSelectedType(selectedType === index ? null : index)}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${teacher.color} rounded-full flex items-center justify-center mx-auto text-2xl`}
                >
                  {teacher.icon}
                </div>
                <h3 className="font-bold text-lg">{teacher.type}</h3>
                <p className="text-sm text-muted-foreground">{teacher.description}</p>

                <div className="space-y-2">
                  {teacher.traits.map((trait, traitIndex) => (
                    <div key={traitIndex} className="text-xs bg-muted px-2 py-1 rounded-full">
                      {trait}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedType !== null && (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-serif font-bold mb-4">Отличный выбор! {teacherTypes[selectedType].type}</h3>
                <p className="text-muted-foreground mb-6">
                  Мы подберем для тебя преподавателя с таким стилем работы. Наша система учитывает твои предпочтения и
                  находит идеального ментора.
                </p>
                
                <Button onClick={() => scrollToSection("#readiness")}size="lg">Найти моего преподавателя</Button>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">500+</div>
              <p className="text-sm text-muted-foreground">Проверенных преподавателей</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">98%</div>
              <p className="text-sm text-muted-foreground">Успешных совпадений</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">24ч</div>
              <p className="text-sm text-muted-foreground">Время подбора преподавателя</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
