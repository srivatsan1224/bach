
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  salary: number;
  description: string;
  requirements: string[];
  benefits?: string[];
  contactEmail: string;
  contactPhone?: string;
  postedDate: string;
  applicationDeadline?: string;
  isActive?: boolean;
}
