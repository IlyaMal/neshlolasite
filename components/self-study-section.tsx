"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, BookOpen, User, Calendar, MessageCircle, Star, ArrowRight } from "lucide-react"

export function SelfStudySection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Calendar,
      title: "Личная программа",
      description: "Индивидуальный план подготовки под твои цели и уровень",
      details: "Анализируем твои знания и составляем персональный маршрут с учетом времени до экзамена",
    },
    {
      icon: BookOpen,
      title: "Все материалы",
      description: "Полный комплект учебных материалов и тестов",
      details: "Теория, практика, видеоуроки, конспекты и банк заданий - всё в одном месте",
    },
    {
      icon: MessageCircle,
      title: "Личный куратор",
      description: "Опытный наставник всегда на связи",
      details: "Отвечает на вопросы, мотивирует и корректирует план подготовки",
    },
  ]

  const benefits = [
    "Гибкий график обучения",
    "Доступ к материалам 24/7",
    "Еженедельные проверки прогресса",
    "Персональные рекомендации",
    "Поддержка до самого экзамена",
  ]

  return (
    <section id="self-study" className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Самостоятельная подготовка
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Готовься <span className="text-indigo-600">самостоятельно</span>,<br />
            но не в одиночку
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Получи персональную программу подготовки, все необходимые материалы и поддержку куратора для достижения
            твоих целей
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activeFeature === index ? "ring-2 ring-indigo-500 bg-indigo-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        activeFeature === index ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 mb-3">{feature.description}</p>
                      {activeFeature === index && (
                        <p className="text-sm text-indigo-600 font-medium">{feature.details}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Что ты получишь</h3>
              <p className="text-gray-600">Полный пакет для успешной подготовки</p>
            </div>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">1 990₽</div>
              <div className="text-indigo-200 mb-4">за месяц подготовки</div>

              <Button onClick={() => scrollToSection("#readiness")} className="w-full bg-white text-indigo-600 hover:bg-gray-100 font-semibold" size="lg">
                Начать подготовку
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Первая неделя бесплатно
          </div>
        </div>
      </div>
    </section>
  )
}
