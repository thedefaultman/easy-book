import getMedications from "@/actions/getMedications";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const medications = await getMedications()

    return NextResponse.json(medications)
}
