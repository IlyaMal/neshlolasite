"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function InteractiveGame() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Это НЕ скука</h2>

        <p className="text-center text-lg mb-8 text-muted-foreground">
          Наведи мышку и угадай, где школа, а где НеШкола
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card
            className="cursor-pointer transition-all duration-300 hover:scale-105"
            onMouseEnter={() => setHoveredCard("school")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-4xl">😴</span>
              </div>
              <div className={`transition-all duration-300 ${hoveredCard === "school" ? "opacity-100" : "opacity-0"}`}>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-bold text-gray-600">Это школа</p>
                  <p className="text-sm text-gray-500">Скучные лекции, зубрёжка, стресс</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-all duration-300 hover:scale-105"
            onMouseEnter={() => setHoveredCard("neschool")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-full h-48 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
              <div
                className={`transition-all duration-300 ${hoveredCard === "neschool" ? "opacity-100" : "opacity-0"}`}
              >
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-bold text-primary">Это НеШкола</p>
                  <p className="text-sm text-primary/80">Интерактив, геймификация, результат</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
