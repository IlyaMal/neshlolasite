"use client"

import { useState } from "react"

const results = [
  {
    name: "Аня",
    before: 62,
    after: 88,
    subject: "Математика",
    improvement: 26,
    university: "МГУ, Экономический факультет",
  },
  {
    name: "Игорь",
    before: 48,
    after: 80,
    subject: "Физика",
    improvement: 32,
    university: "МФТИ, Факультет общей и прикладной физики",
  },
  {
    name: "Соня",
    before: 70,
    after: 92,
    subject: "Русский язык",
    improvement: 22,
    university: "СПбГУ, Филологический факультет",
  },
  {
    name: "Максим",
    before: 55,
    after: 85,
    subject: "Химия",
    improvement: 30,
    university: "РХТУ им. Менделеева",
  },
  {
    name: "Лиза",
    before: 43,
    after: 78,
    subject: "Биология",
    improvement: 35,
    university: "МГУ, Биологический факультет",
  },
]

export function ResultsSlider() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  const toggleCard = (index: number) => {
    const newFlipped = new Set(flippedCards)
    if (newFlipped.has(index)) {
      newFlipped.delete(index)
    } else {
      newFlipped.add(index)
    }
    setFlippedCards(newFlipped)
  }

  return (
    <section id="results" className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Результаты «до/после»</h2>
        <p className="text-center text-muted-foreground mb-12">Нажмите на карточку, чтобы увидеть результат</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {results.map((result, index) => (
            <div key={index} className="flip-card">
              <div
                className={`flip-card ${flippedCards.has(index) ? "flipped" : ""} cursor-pointer`}
                onClick={() => toggleCard(index)}
              >
                <div className="flip-card-inner">
                  {/* Front side - Before */}
                  <div className="flip-card-front bg-white border-2 border-gray-200 shadow-lg">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-2xl">😔</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{result.name}</h3>
                      <p className="text-muted-foreground">{result.subject}</p>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-500 mb-2">{result.before}</div>
                        <p className="text-sm text-muted-foreground">баллов ЕГЭ</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Нажмите, чтобы увидеть результат</p>
                    </div>
                  </div>

                  {/* Back side - After */}
                  <div className="flip-card-back bg-gradient-to-br from-primary to-secondary text-white shadow-xl">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-2xl">🎉</span>
                      </div>
                      <h3 className="text-xl font-bold">{result.name}</h3>
                      <p className="text-white/90">{result.subject}</p>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">{result.after}</div>
                        <p className="text-sm text-white/90">баллов ЕГЭ</p>
                        <p className="text-lg font-semibold text-yellow-300">+{result.improvement} баллов!</p>
                      </div>
                      <div className="text-xs text-white/80 leading-relaxed">
                        <p className="font-semibold">Поступила:</p>
                        <p>{result.university}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
