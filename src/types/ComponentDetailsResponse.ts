export interface ComponentDetailsResponse {
  id: number;
  imagePath: string | null;
  name: string;
  description: string;
  specifications: { [key: string]: string };
}
