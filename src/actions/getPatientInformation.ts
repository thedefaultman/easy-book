import { Patient } from "@/lib/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPatientInformation = async (): Promise<Patient[]>=> {
    const supabase = createServerComponentClient({
        cookies: cookies,
    })

    const { data : sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
        console.log(sessionError.message)
    }

    const { data: patientData, error: patientError } = await supabase
        .from('patient')
        .select('*')
        .eq('user_id', sessionData?.session?.user.id)

    if (patientError) {
        console.log(patientError)
        return []
    }
    // allergies - need to get the allergy from the history_allergy table and get the name from the allergy table

    const { data: allergyData, error: allergyError } = await supabase
        .from('history_allergy')
        .select('allergy_id')
        .eq('PHN', patientData[0].PHN)

    if (allergyError) {
        console.log(allergyError)
        return []
    }

    const allergyIds = allergyData.map((allergy) => allergy.allergy_id)

    const { data: allergyNameData, error: allergyNameError } = await supabase
        .from('allergy')
        .select('name')
        .in('allergy_id', allergyIds)

    if (allergyNameError) {
        console.log(allergyNameError)
        return []
    }

    const allergyNames = allergyNameData.map((allergy) => allergy.name)

    patientData[0].allergies = allergyNames

    // medications - need to get the medication from the history_medication table and get the name from the medication table

    const { data: medicationData, error: medicationError } = await supabase
        .from('history_medication')
        .select('medicine_id')
        .eq('PHN', patientData[0].PHN)

    if (medicationError) {
        console.log(medicationError)
        return []
    }

    const medicationIds = medicationData.map((medication) => medication.medicine_id)

    const { data: medicationNameData, error: medicationNameError } = await supabase
        .from('medication')
        .select('name')
        .in('medicine_id', medicationIds)

    if (medicationNameError) {
        console.log(medicationNameError)
        return []
    }

    const medicationNames = medicationNameData.map((medication) => medication.name)

    patientData[0].medications = medicationNames

    // Records - need to get all patient records from the record table
    const { data: recordData, error: recordError } = await supabase
        .from('record')
        .select('*')
        .eq('PHN', patientData[0].PHN)

    if (recordError) {
        console.log(recordError)
        return []
    }

    patientData[0].records = recordData

    return patientData[0] || []
}

export default getPatientInformation