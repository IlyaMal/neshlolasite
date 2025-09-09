import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

type Params = { params: { id: string } }

// конвертация camelCase → snake_case
function toDB(body: any) {
  const mapped: any = {}
  if ("name" in body) mapped.name = body.name
  if ("subject" in body) mapped.subject = body.subject
  if ("experience" in body) mapped.experience = body.experience
  if ("pricePerHour" in body) mapped.price_per_hour = body.pricePerHour
  if ("format" in body) mapped.format = body.format
  if ("description" in body) mapped.description = body.description
  if ("photo" in body) mapped.photo = body.photo
  mapped.updated_at = new Date().toISOString()
  return mapped
}

// конвертация snake_case → camelCase
function fromDB(row: any) {
  if (!row) return null
  return {
    id: row.id,
    name: row.name,
    subject: row.subject,
    experience: row.experience,
    pricePerHour: row.price_per_hour,
    format: row.format,
    description: row.description,
    photo: row.photo,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// GET /api/teachers/:id
export async function GET(req: Request, { params }: Params) {
  const { data, error } = await supabase.from("teachers").select("*").eq("id", params.id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(fromDB(data))
}

// PATCH /api/teachers/:id
export async function PATCH(req: Request, { params }: Params) {
  const body = await req.json()
  const updateData = toDB(body)

  const { data, error } = await supabase
    .from("teachers")
    .update(updateData)
    .eq("id", params.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message, debug: { body, updateData } },
      { status: 500 }
    )
  }

  return NextResponse.json(fromDB(data))
}

// DELETE /api/teachers/:id
export async function DELETE(req: Request, { params }: Params) {
  const { data, error } = await supabase.from("teachers").delete().eq("id", params.id).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true, deleted: fromDB(data) })
}
