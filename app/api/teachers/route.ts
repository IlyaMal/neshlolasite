import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

// Преобразуем camelCase из фронтенда в snake_case для базы
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

// GET /api/teachers
export async function GET() {
  const { data, error } = await supabase.from("teachers").select("*")
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

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()

  // преобразуем к snake_case, но только для переданных ключей
  const teacherData: Record<string, any> = {}
  if (body.name !== undefined) teacherData.name = body.name
  if (body.subject !== undefined) teacherData.subject = body.subject
  if (body.experience !== undefined) teacherData.experience = body.experience
  if (body.pricePerHour !== undefined) teacherData.price_per_hour = body.pricePerHour
  if (body.format !== undefined) teacherData.format = body.format
  if (body.description !== undefined) teacherData.description = body.description
  if (body.photo !== undefined) teacherData.photo = body.photo
  teacherData.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from("teachers")
    .update(teacherData)
    .eq("id", params.id)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Преподаватель не найден" }, { status: 404 })
  }

  return NextResponse.json(data[0])
}

// DELETE /api/teachers/:id
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("teachers")
    .delete()
    .eq("id", params.id)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Преподаватель не найден" }, { status: 404 })
  }

  return NextResponse.json({ message: "Преподаватель удалён", teacher: data[0] })
}
