export interface Program {
  id: string;
  name: string;
  country: string;
  type: string;
  duration: string;
  age_limit: string;
  eligible_nationalities: string[];
  requirements: string[];
  benefits: string[];
  application_fee: string;
  processing_time: string;
  description: string;
}

export interface ApiResponse {
  data: Program[];
  error?: string;
}
