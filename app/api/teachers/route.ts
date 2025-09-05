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
  const body = await req.json()
  const { data, error } = await supabase
    .from("teachers")
    .insert([{ ...body }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
