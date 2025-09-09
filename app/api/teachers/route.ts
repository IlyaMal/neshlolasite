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

// PUT /api/teachers/:id
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const teacherData = mapTeacherToDB(body)

  const { data, error } = await supabase
    .from("teachers")
    .update(teacherData)
    .eq("id", params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// DELETE /api/teachers/:id
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("teachers")
    .delete()
    .eq("id", params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ message: "Преподаватель удалён", teacher: data })
}
