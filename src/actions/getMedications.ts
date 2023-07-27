import { Medication } from "@/lib/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getMedications = async (): Promise<Medication[]>=> {
    const supabase = createServerComponentClient({
        cookies: cookies,
    })

    const { data, error } = await supabase
        .from("medication")
        .select("*")

    if (error) {
        console.log(error)
        return []
    }

    return data as Medication[] || []
}

export default getMedications