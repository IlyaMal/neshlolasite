import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

type Params = { params: { id: string } }

// GET /api/teachers/:id
export async function GET(req: Request, { params }: Params) {
  const { data, error } = await supabase.from("teachers").select("*").eq("id", params.id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// PATCH /api/teachers/:id
export async function PATCH(req: Request, { params }: Params) {
  const body = await req.json()
  const { data, error } = await supabase
    .from("teachers")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// DELETE /api/teachers/:id
export async function DELETE(req: Request, { params }: Params) {
  const { error } = await supabase.from("teachers").delete().eq("id", params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
