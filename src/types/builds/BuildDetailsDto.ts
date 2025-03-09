import { BuildComponentIds } from './BuildComponentIds';

export interface BuildDetailsDto {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  components: BuildComponentIds;
}
