"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

const journeySteps = [
  {
    icon: "🎯",
    title: "Пробное занятие",
    description: "Знакомимся и определяем уровень",
    x: 12.5, // percentage
    y: 45,
  },
  {
    icon: "📊",
    title: "Диагностика уровня",
    description: "Находим пробелы в знаниях",
    x: 31.25,
    y: 30,
  },
  {
    icon: "🗺️",
    title: "Личный план",
    description: "Составляем маршрут к цели",
    x: 50,
    y: 55,
  },
  {
    icon: "🚀",
    title: "Подготовка",
    description: "Изучаем материал в удобном формате",
    x: 72.5,
    y: 35,
  },
  {
    icon: "🏆",
    title: "ЕГЭ 80+",
    description: "Получаем высокие баллы!",
    x: 90,
    y: 50,
  },
]

const obstacles = [
  { x: 22.5, y: 62.5, icon: "😴", label: "Лень" },
  { x: 40, y: 20, icon: "📱", label: "Отвлечения" },
  { x: 60, y: 70, icon: "😰", label: "Стресс" },
  { x: 81.25, y: 22.5, icon: "🤷", label: "Непонимание" },
]

export function LearningJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pathData, setPathData] = useState("")

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      // Convert percentage positions to actual coordinates
      const points = journeySteps.map((step) => ({
        x: (step.x / 100) * width,
        y: (step.y / 100) * height,
      }))

      // Create smooth curved path through all points
      let path = `M${points[0].x} ${points[0].y}`

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1]
        const curr = points[i]

        // Calculate control points for smooth curves
        const cp1x = prev.x + (curr.x - prev.x) * 0.3
        const cp1y = prev.y + (curr.y - prev.y) * 0.1
        const cp2x = prev.x + (curr.x - prev.x) * 0.7
        const cp2y = curr.y + (prev.y - curr.y) * 0.1

        path += ` C${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
      }

      setPathData(path)
    }

    updatePath()
    window.addEventListener("resize", updatePath)
    return () => window.removeEventListener("resize", updatePath)
  }, [])

  return (
    <section id="journey" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Твой маршрут к ЕГЭ</h2>

        <div className="max-w-6xl mx-auto">
          <div
            ref={containerRef}
            className="relative h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-primary/20 overflow-hidden"
          >
            {/* Map background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                    <path
                      d="M 5 0 L 0 0 0 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.2"
                      className="text-primary"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {pathData && (
                <>
                  {/* Path glow effect */}
                  <path d={pathData} stroke="currentColor" strokeWidth="8" fill="none" className="text-primary/20" />
                  {/* Main path */}
                  <path
                    d={pathData}
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="15,8"
                    className="text-primary animate-pulse"
                    style={{
                      filter: "drop-shadow(0 0 6px rgba(79, 70, 229, 0.4))",
                    }}
                  />
                </>
              )}
            </svg>

            {obstacles.map((obstacle, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${obstacle.x}%`, top: `${obstacle.y}%` }}
              >
                {/* Danger zone */}
                <div className="absolute w-12 h-12 md:w-16 md:h-16 bg-red-500/10 border-2 border-red-500/30 border-dashed rounded-full animate-pulse -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"></div>

                {/* Obstacle icon */}
                <div className="relative w-8 h-8 md:w-10 md:h-10 bg-red-100 border-2 border-red-300 rounded-full flex items-center justify-center text-sm md:text-lg shadow-md">
                  {obstacle.icon}
                </div>

                {/* Obstacle label */}
                <div className="absolute top-10 md:top-12 left-1/2 transform -translate-x-1/2 text-xs text-red-600 font-medium bg-white/90 rounded px-2 py-1 shadow-sm whitespace-nowrap">
                  {obstacle.label}
                </div>
              </div>
            ))}

            {journeySteps.map((step, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${step.x}%`, top: `${step.y}%` }}
              >
                {/* Checkpoint marker */}
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white border-4 border-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 z-10 relative cursor-pointer">
                    <span className="text-lg md:text-xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md z-20">
                    {index + 1}
                  </div>
                </div>

                {/* Checkpoint info card - appears on hover */}
                <div className="absolute top-16 md:top-20 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                  <Card className="w-40 md:w-48 shadow-xl border-2 border-primary/20">
                    <CardContent className="p-3 text-center space-y-1">
                      <h3 className="font-bold text-xs md:text-sm text-foreground">{step.title}</h3>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile version - vertical layout */}
          <div className="md:hidden mt-8 space-y-6">
            {journeySteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-white border-4 border-primary rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">🗺️ Наш путь обходит все препятствия и ведёт прямо к успеху!</p>
        </div>
      </div>
    </section>
  )
}
