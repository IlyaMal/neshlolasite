"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ReadinessQuiz() {
  const [showForm, setShowForm] = useState(false)
  const [showEncouragement, setShowEncouragement] = useState(false)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("Выбери предмет")
  const [teacher, setTeacher] = useState("Выбери преподавателя")

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // ⚠️ Прямой токен → лучше вынести в .env и прокидывать на клиент через public переменные
  const BOT_TOKEN = "8200208030:AAFbfLrLdXKedioyqVdhe3AKSQnGCoqPF3o"
  const CHAT_ID = "673699672" // свой ID или группы

  const handleSubmit = async () => {
    setLoading(true)

    const text = `
📌 Новая заявка на пробное занятие:
👤 Имя: ${name}
📞 Телефон: ${phone}
📚 Предмет: ${subject}
👨‍🏫 Преподаватель: ${teacher}
    `

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      })

      if (res.ok) {
        setSuccess(true)
      } else {
        console.error("Ошибка:", await res.text())
      }
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  return (
    <section id = "readiness" className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">

          {!showForm && !showEncouragement && (
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Ты готов к ЕГЭ?</h2>
              <div className="space-y-4">
                <Button size="lg" className="w-full text-xl py-6" onClick={() => setShowForm(true)}>Да! 🚀</Button>
                <Button variant="outline" size="lg" className="w-full text-xl py-6 bg-transparent" onClick={() => setShowEncouragement(true)}>Ещё думаю... 🤔</Button>
              </div>
            </div>
          )}

          {showEncouragement && (
            <Card className="animate-in slide-in-from-bottom duration-500">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-2xl font-serif font-bold">А давай на пробное бесплатно? 😉</h3>
                <p className="text-lg text-muted-foreground">Никаких обязательств! Просто посмотришь, как проходят наши занятия.</p>
                <Button size="lg" className="w-full" onClick={() => setShowForm(true)}>Окей, попробую! 🎯</Button>
              </CardContent>
            </Card>
          )}

          {showForm && (
            <Card className="animate-in slide-in-from-bottom duration-500">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-2xl font-serif font-bold">Записывайся на пробное! 🚀</h3>

                {!success ? (
                  <div className="space-y-4">
                    <input type="text" placeholder="Твоё имя" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 rounded-lg border border-input bg-background" />
                    <input type="tel" placeholder="Номер телефона" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-4 rounded-lg border border-input bg-background" />

                    <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-4 rounded-lg border border-input bg-background">
                      <option>Выбери предмет</option>
                      <option>Математика</option>
                      <option>Русский язык</option>
                      <option>Физика</option>
                      <option>Химия</option>
                      <option>Биология</option>
                      <option>История</option>
                      <option>Обществознание</option>
                    </select>

                    <select value={teacher} onChange={(e) => setTeacher(e.target.value)} className="w-full p-4 rounded-lg border border-input bg-background">
                      <option>Выбери преподавателя</option>
                      <option>📏 Строгий наставник</option>
                      <option>😊 Дружелюбный коуч</option>
                      <option>🎨 Креативный ментор</option>
                      <option>🎯 Требовательный эксперт</option>
                    </select>

                    <Button size="lg" className="w-full" onClick={handleSubmit} disabled={loading}>
                      {loading ? "Отправляем..." : "Записаться на пробное 🎯"}
                    </Button>
                  </div>
                ) : (
                  <p className="text-green-600 font-bold">Заявка отправлена! Мы свяжемся с тобой 🚀</p>
                )}

                <p className="text-sm text-muted-foreground">Пробное занятие абсолютно бесплатно!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
