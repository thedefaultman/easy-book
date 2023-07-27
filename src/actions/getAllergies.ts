import { Allergy } from "@/lib/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getAllergies = async (): Promise<Allergy[]>=> {
    const supabase = createServerComponentClient({
        cookies: cookies,
    })

    const { data, error } = await supabase
        .from("allergy")
        .select("*")

    if (error) {
        console.log(error)
        return []
    }

    return data as Allergy[] || []
}

export default getAllergies