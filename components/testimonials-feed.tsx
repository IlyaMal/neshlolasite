"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Аня К.",
    avatar: "АК",
    before: 62,
    after: 88,
    university: "МГУ",
    reactions: ["🔥", "👏", "💪"],
  },
  {
    name: "Игорь М.",
    avatar: "ИМ",
    before: 48,
    after: 80,
    university: "МГТУ",
    reactions: ["🚀", "😎", "⚡"],
  },
  {
    name: "Соня Л.",
    avatar: "СЛ",
    before: 70,
    after: 92,
    university: "СПБГУ",
    reactions: ["🎉", "🌟", "💯"],
  },
]

export function TestimonialsFeed() {
  return (
    <section id = "testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Живая лента результатов</h2>

        <div className="max-w-2xl mx-auto space-y-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">{testimonial.avatar}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <span className="text-sm text-muted-foreground">• 2 часа назад</span>
                    </div>

                    <p className="text-lg">
                      Было: <span className="text-destructive font-bold">{testimonial.before} баллов</span>
                      <br />
                      Стало: <span className="text-primary font-bold">{testimonial.after} баллов</span>
                      <br />
                      Теперь иду в {testimonial.university}! 🚀
                    </p>

                    <div className="flex items-center space-x-4 pt-2">
                      <div className="flex space-x-1">
                        {testimonial.reactions.map((reaction, i) => (
                          <button key={i} className="hover:scale-125 transition-transform">
                            {reaction}
                          </button>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">24 реакции</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
