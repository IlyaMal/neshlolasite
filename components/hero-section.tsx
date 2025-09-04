"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function HeroSection() {

   const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Boring school */}
          <div className="relative">
            <Card className="p-8 bg-gray-100 border-2 border-gray-300 transform -rotate-1">
              <div className="text-center space-y-4">
                <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-lg">😴 Скучный класс</span>
                </div>
                <h3 className="text-xl font-bold text-gray-600">Школа</h3>
                <p className="text-gray-500">Зубрёжка, скука, стресс...</p>
              </div>
            </Card>
          </div>

          {/* Right side - НеШкола */}
          <div className="relative">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary transform rotate-1 shadow-xl">
              <div className="text-center space-y-4">
                <div className="w-full h-48 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-lg">🚀 Онлайн-урок</span>
                </div>
                <h3 className="text-xl font-bold text-primary">НеШкола</h3>
                <p className="text-primary/80">Интерактив, результат, удовольствие!</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center mt-12 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
            ЕГЭ без скуки.
            <br />
            <span className="text-primary">Результат без зубрёжки.</span>
          </h1>

          <Button onClick={() => scrollToSection("#readiness")} size="lg" className="text-xl px-8 py-4 font-semibold">
            🚀 Запишись на пробное
          </Button>
        </div>
      </div>
    </section>
  )
}
