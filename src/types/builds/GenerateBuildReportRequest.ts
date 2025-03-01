import { BuildComponentIds } from './BuildComponentIds';

export interface GenerateBuildReportRequest {
  name: string | null;
  description: string | null;
  components: BuildComponentIds;
}
