import getPatientInformation from "@/actions/getPatientInformation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const patient = await getPatientInformation()

    return NextResponse.json(patient)
}