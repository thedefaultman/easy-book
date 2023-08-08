import getDoctors from "@/actions/getDoctors";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const doctors = await getDoctors()

    return NextResponse.json(doctors)
}