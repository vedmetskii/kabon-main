import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(JSON.stringify({hello: "world"}))
}