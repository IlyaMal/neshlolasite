"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Стоимость в формате подписки</h2>

        <div className="max-w-2xl mx-auto mb-12">
          <Card className="relative hover:shadow-xl transition-all duration-300 border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                🔥 СКИДКА 10%
              </span>
            </div>
            <CardHeader className="text-center pb-4 pt-8">
              <div className="text-4xl mb-4">📚</div>
              <CardTitle className="text-2xl">Пакет 8 занятий</CardTitle>
              <p className="text-muted-foreground">Выгодная покупка сразу</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-lg line-through text-muted-foreground">20 000 ₽</span>
                  <span className="text-3xl font-bold text-primary">18 000 ₽</span>
                </div>
                <p className="text-muted-foreground">за весь пакет (2250 ₽ за занятие)</p>
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mt-2">
                  Экономия 2000 ₽
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>8 индивидуальных занятий</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Персональный преподаватель</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Гибкий график занятий</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Индивидуальная программа</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Действует 2 месяца</span>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">Купить пакет со скидкой</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="relative hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="text-4xl mb-4">🎓</div>
              <CardTitle className="text-2xl font-serif">Индивидуально</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold">1500 ₽</div>
                <p className="text-muted-foreground">за занятие</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Персональный преподаватель</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Гибкий график</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Индивидуальная программа</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Без предоплаты</span>
                </div>
              </div>

              <Button className="w-full">Выбрать план</Button>
            </CardContent>
          </Card>

          <Card className="relative hover:shadow-xl transition-all duration-300 border-primary">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Популярный
              </span>
            </div>
            <CardHeader className="text-center pb-4">
              <div className="text-4xl mb-4">👥</div>
              <CardTitle className="text-2xl font-serif">Мини-группа</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold">800 ₽</div>
                <p className="text-muted-foreground">за занятие</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Группа до 4 человек</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Мотивация от команды</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Обмен опытом</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Без предоплаты</span>
                </div>
              </div>

              <Button className="w-full">Выбрать план</Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-lg font-semibold text-primary">⚡️ Без предоплаты — плати только за урок</p>
        </div>
      </div>
    </section>
  )
}
