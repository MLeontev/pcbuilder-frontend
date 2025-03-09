import { BuildComponentIds } from './BuildComponentIds';

export interface SaveUpdateBuildRequest {
  name: string;
  description: string | null;
  components: BuildComponentIds;
}
