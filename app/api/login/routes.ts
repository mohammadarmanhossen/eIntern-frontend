import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Central Auth server hit (server-side)
    const res = await fetch("https://auth.dapplesoft.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Auth server did not return JSON" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Auth server unreachable" },
      { status: 500 }
    );
  }
}
