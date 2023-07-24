export interface Allergy {
    allergy_id: string;
    created_at?: string | null;
    name: string;
  }
  
  export interface Appointment {
    appointment_id: string;
    created_at?: string | null;
    date: string;
    doctor_id: string;
    PHN: string;
    reason?: string | null;
    status: string;
    time: string;
  }
  
  export interface Doctor {
    created_at: string | null;
    DOB: string | null;
    doctor_id: string;
    email: string | null;
    encrypted_password: string | null;
    first_name: string | null;
    gender: string | null;
    last_name: string | null;
    specialization: string | null;
    user_id: string;
  }
  
  export interface History {
    created_at: string | null;
    history_id: string;
    PHN: string;
  }
  
  export interface History_Allergy {
    allergy_id: string;
    created_at: string | null;
    history_id: string;
  }
  
  export interface History_Medication {
    created_at: string | null;
    history_id: string;
    medicine_id: string;
  }
  
  export interface Medication {
    created_at: string | null;
    medicine_id: string;
    name: string;
  }
  
  export interface Patient {
    address: string | null;
    created_at: string | null;
    DOB: string | null;
    email: string | null;
    encrypted_password: string | null;
    first_name: string | null;
    gender: string | null;
    last_name: string | null;
    PHN: string;
    phone: string | null;
    user_id: string;
  }
  
  export interface Record {
    appointment_id: string;
    created_at: string | null;
    diagnosis: string;
    doctor_id: string;
    history_id: string;
    PHN: string;
    record_id: string;
    treatment: string;
  }
  
  export interface Reviews {
    comments: string | null;
    created_at: string | null;
    doctor_id: string;
    PHN: string;
    rating: number;
    review_id: string;
  }