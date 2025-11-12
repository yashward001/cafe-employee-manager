export interface Employee {
  id: string;
  empCode: string; 
  name: string;
  email_address: string;
  phone_number: string;
  days_worked: number;
  cafe: string | null;
}

export interface EmployeePayload {
  id?: string;
  name: string;
  email: string;
  phone: string;
  gender: "Male" | "Female";
  startDate: string | null;
  cafeId?: string | null;
}