import { Doctor } from "@/lib/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getDoctors = async (): Promise<Doctor[]>=> {
    const supabase = createServerComponentClient({
        cookies: cookies,
    })

    const { data: doctorData, error: doctorError } = await supabase
        .from('doctor')
        .select('*')

    if (doctorError) {
        console.log(doctorError)
        return []
    }

    return doctorData || []
}

export default getDoctors