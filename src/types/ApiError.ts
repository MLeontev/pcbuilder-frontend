export interface ApiError {
  code: string;
  message: string;
  errors?: { field: string; message: string }[];
}
