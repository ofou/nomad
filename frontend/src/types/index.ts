export interface WorkHolidayProgram {
  id: number;
  country: string;
  title: string;
  description: string;
  duration: string;
  requirements: string[];
  eligibleCountries: string[];
  ageLimit: string;
  website: string;
  createdAt: string;
}

export interface SearchFilters {
  search: string;
  country?: string;
  duration?: string;
}