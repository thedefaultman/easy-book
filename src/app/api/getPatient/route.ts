import getPatientInformation from "@/actions/getPatientInformation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    // Get the id from the request body
    const id = request.headers.get('patient_id')
    const patient = await getPatientInformation(id ? id : undefined)

    return NextResponse.json(patient)
}