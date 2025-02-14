export interface ComponentDetailsDto {
  id: number;
  imagePath: string | null;
  name: string;
  description: string;
  specifications: { [key: string]: string };
}
