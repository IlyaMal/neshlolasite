"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Как это работает", href: "#how-it-works" },
  { label: "Форматы", href: "#formats" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Маршрут", href: "#journey" },
  { label: "Результаты", href: "#results" },
  { label: "Преподаватели", href: "#teachers" },
  { label: "Тарифы", href: "#pricing" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
    <img 
      src="logo.svg" 
      alt="Логотип" 
      className="w-full h-full object-contain"
    />
  </div>
            <span className="text-xl font-serif font-bold text-foreground">НЕШКОЛА</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <Button onClick={() => scrollToSection("#readiness")} className="hidden md:flex">Начать обучение</Button>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div
                className={`w-full h-0.5 bg-foreground transition-all ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              ></div>
              <div className={`w-full h-0.5 bg-foreground transition-all ${isMenuOpen ? "opacity-0" : ""}`}></div>
              <div
                className={`w-full h-0.5 bg-foreground transition-all ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              ></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button onClick={() => scrollToSection("#readiness")} className="mt-4">Начать обучение</Button>
              
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
