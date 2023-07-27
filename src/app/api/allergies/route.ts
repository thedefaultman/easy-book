import getAllergies from "@/actions/getAllergies";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const allergies = await getAllergies()

    return NextResponse.json(allergies)
}