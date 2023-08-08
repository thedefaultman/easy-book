import getDoctorVisits from "@/actions/getDoctorVisits";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const doctor_visits = await getDoctorVisits()

    return NextResponse.json(doctor_visits)
}