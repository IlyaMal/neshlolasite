"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: "👩‍🏫",
    title: "Методика",
    description: "Отработанные материалы, чёткая система занятий.",
  },
  {
    icon: "👥",
    title: "Преподаватели",
    description: "Опытные эксперты, индивидуальный подход.",
  },
  {
    icon: "👀",
    title: "Контроль",
    description: "Контроль успеваемости, отслеживание роста баллов.",
  },
  {
    icon: "📈",
    title: "Результат",
    description: "Неизбежное достижение цели.",
  },
]

export function HowItWorks() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section id = "how-it-works" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Как тут всё устроено</h2>
        <p className="text-center text-muted-foreground mb-12">Нажмите на карточку, чтобы увидеть результат</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                activeCard === index ? "ring-2 ring-primary shadow-xl" : ""
              }`}
              onClick={() => setActiveCard(activeCard === index ? null : index)}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p
                  className={`text-muted-foreground transition-all duration-300 ${
                    activeCard === index ? "opacity-100" : "opacity-0 h-0"
                  }`}
                >
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
