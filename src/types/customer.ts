export interface Customer {
  id: string;
  fullName: string;
  email: string;
  registrationDate: string; // ISO 8601 string
}

export interface PageMetaData {
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
export interface CustomerListResponse {
  data: Customer[];
  meta: PageMetaData;
}
