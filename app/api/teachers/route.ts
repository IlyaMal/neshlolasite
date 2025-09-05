import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

// GET /api/teachers
export async function GET() {
  const { data, error } = await supabase.from("teachers").select("*")
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/teachers
export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("Получено на сервер:", body)

    // Валидация и преобразование данных
    const teacher = {
      name: String(body.name || "").trim(),
      subject: String(body.subject || "").trim(),
      format: String(body.format || "online"),
      pricePerHour: Number(body.pricePerHour) || 0,
      experience: Number(body.experience) || 0,
      description: body.description ? String(body.description).trim() : null,
      photo: body.photo ? String(body.photo).trim() : null,
    }

    // Проверка обязательных полей
    if (!teacher.name || !teacher.subject) {
      return NextResponse.json(
        { error: "Поля name и subject обязательны" },
        { status: 400 }
      )
    }

    // Вставка в Supabase
    const { data, error } = await supabase
      .from("teachers")
      .insert([teacher])
      .select()
      .single() // safe, т.к. всегда один объект

    if (error) {
      console.error("Ошибка Supabase:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err: any) {
    console.error("Ошибка сервера:", err)
    return NextResponse.json({ error: err.message || "Неизвестная ошибка" }, { status: 500 })
  }
}
