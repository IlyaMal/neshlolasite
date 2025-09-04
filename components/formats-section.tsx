"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function FormatsSection() {
  return (
    <section id = "formats" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Выбери свой стиль подготовки</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Individual */}
          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center space-y-6">
              <div className="text-6xl">🎯</div>
              <h3 className="text-2xl font-bold">Индивидуально</h3>
              <p className="text-lg text-muted-foreground">Только ты и препод</p>
              <div className="space-y-2 text-sm">
                <p>✅ Максимум внимания</p>
                <p>✅ Гибкий график</p>
                <p>✅ Персональная программа</p>
              </div>
              <Button className="w-full">Хочу 1-на-1</Button>
            </CardContent>
          </Card>

          {/* Mini-group */}
          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center space-y-6">
              <div className="text-6xl">🤝</div>
              <h3 className="text-2xl font-bold">Мини-группа</h3>
              <p className="text-lg text-muted-foreground">Учишься с командой</p>
              <div className="space-y-2 text-sm">
                <p>✅ Мотивация от группы</p>
                <p>✅ Доступная цена</p>
                <p>✅ Обмен опытом</p>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Хочу в команду
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
