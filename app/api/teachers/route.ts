import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

// Маппинг для создания (все поля обязательны)
function mapTeacherToDB(body: any) {
  return {
    name: String(body.name || "").trim(),
    subject: String(body.subject || "").trim(),
    experience: Number(body.experience) || 0,
    price_per_hour: Number(body.pricePerHour) || 0,
    format: String(body.format || "online"),
    description: body.description ? String(body.description).trim() : null,
    photo: body.photo ? String(body.photo).trim() : null,
  }
}

// Маппинг для обновления (только переданные поля)
function mapPartialTeacherToDB(body: any) {
  const mapped: any = {}
  if (body.name !== undefined) mapped.name = String(body.name).trim()
  if (body.subject !== undefined) mapped.subject = String(body.subject).trim()
  if (body.experience !== undefined) mapped.experience = Number(body.experience)
  if (body.pricePerHour !== undefined) mapped.price_per_hour = Number(body.pricePerHour)
  if (body.format !== undefined) mapped.format = String(body.format)
  if (body.description !== undefined)
    mapped.description = body.description ? String(body.description).trim() : null
  if (body.photo !== undefined) mapped.photo = body.photo ? String(body.photo).trim() : null

  return mapped
}

// GET /api/teachers
export async function GET() {
  const { data, error } = await supabase.from("teachers").select("*").order("created_at", { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/teachers
export async function POST(req: Request) {
  const body = await req.json()
  const teacherData = mapTeacherToDB(body)

  const { data, error } = await supabase
    .from("teachers")
    .insert([teacherData])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// PATCH /api/teachers?id=UUID
export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "ID обязателен" }, { status: 400 })

  const body = await req.json()
  const teacherData = mapPartialTeacherToDB(body)
  teacherData.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from("teachers")
    .update(teacherData)
    .eq("id", id)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Преподаватель не найден" }, { status: 404 })
  }

  return NextResponse.json(data[0])
}

// DELETE /api/teachers?id=UUID
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "ID обязателен" }, { status: 400 })

  const { data, error } = await supabase
    .from("teachers")
    .delete()
    .eq("id", id)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Преподаватель не найден" }, { status: 404 })
  }

  return NextResponse.json({ message: "Преподаватель удалён", teacher: data[0] })
}
