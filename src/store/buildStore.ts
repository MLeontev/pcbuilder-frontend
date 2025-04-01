import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { BuildComponentIds } from '../types/builds/BuildComponentIds';
import { BuildDetailsDto } from '../types/builds/BuildDetailsDto';

type BuildStoreState = {
  buildId: number | null;
  buildName: string;
  buildDescription: string;
  selectedComponents: BuildComponentIds;
};

type BuildStoreActions = {
  addComponent: (componentType: string, componentId: number) => void;
  removeComponent: (componentType: string, componentId: number) => void;
  setBuild: (build: BuildDetailsDto) => void;
  clearBuild: () => void;
  resetBuildId: () => void;
  updateBuildInfo: (name: string, description: string) => void;
  setBuildId: (id: number) => void;
};

type BuildStore = BuildStoreState & BuildStoreActions;

export const useBuildStore = create<BuildStore>()(
  devtools(
    persist(
      (set) => ({
        buildId: null,
        buildName: '',
        buildDescription: '',
        selectedComponents: {
          cpuId: null,
          motherboardId: null,
          gpuId: null,
          coolerId: null,
          ramIds: [],
          storageIds: [],
          caseId: null,
          psuId: null,
        },

        addComponent: (componentType, componentId) => {
          set((state) => {
            const newSelectedComponents = { ...state.selectedComponents };

            switch (componentType) {
              case 'cpu':
                newSelectedComponents.cpuId = componentId;
                break;
              case 'motherboard':
                newSelectedComponents.motherboardId = componentId;
                break;
              case 'gpu':
                newSelectedComponents.gpuId = componentId;
                break;
              case 'cooler':
                newSelectedComponents.coolerId = componentId;
                break;
              case 'ram':
                newSelectedComponents.ramIds = [
                  ...newSelectedComponents.ramIds,
                  componentId,
                ];
                break;
              case 'storage':
                newSelectedComponents.storageIds = [
                  ...newSelectedComponents.storageIds,
                  componentId,
                ];
                break;
              case 'case':
                newSelectedComponents.caseId = componentId;
                break;
              case 'psu':
                newSelectedComponents.psuId = componentId;
                break;
              default:
                return state;
            }

            return { selectedComponents: newSelectedComponents };
          });
        },

        removeComponent: (componentType, componentId) => {
          set((state) => {
            const newSelectedComponents = { ...state.selectedComponents };

            switch (componentType) {
              case 'cpu':
                newSelectedComponents.cpuId = null;
                break;
              case 'motherboard':
                newSelectedComponents.motherboardId = null;
                break;
              case 'gpu':
                newSelectedComponents.gpuId = null;
                break;
              case 'cooler':
                newSelectedComponents.coolerId = null;
                break;
              case 'ram':
                const indexRam =
                  newSelectedComponents.ramIds.indexOf(componentId);
                if (indexRam > -1) {
                  newSelectedComponents.ramIds = [
                    ...newSelectedComponents.ramIds.slice(0, indexRam),
                    ...newSelectedComponents.ramIds.slice(indexRam + 1),
                  ];
                }
                break;
              case 'storage':
                const indexStorage =
                  newSelectedComponents.storageIds.indexOf(componentId);
                if (indexStorage > -1) {
                  newSelectedComponents.storageIds = [
                    ...newSelectedComponents.storageIds.slice(0, indexStorage),
                    ...newSelectedComponents.storageIds.slice(indexStorage + 1),
                  ];
                }
                break;
              case 'case':
                newSelectedComponents.caseId = null;
                break;
              case 'psu':
                newSelectedComponents.psuId = null;
                break;
              default:
                return state;
            }

            return { selectedComponents: newSelectedComponents };
          });
        },

        setBuild: (build) => {
          set({
            buildId: build.id,
            buildName: build.name,
            buildDescription: build.description ?? '',
            selectedComponents: {
              cpuId: build.components.cpuId,
              motherboardId: build.components.motherboardId,
              gpuId: build.components.gpuId,
              coolerId: build.components.coolerId,
              ramIds: build.components.ramIds,
              storageIds: build.components.storageIds,
              caseId: build.components.caseId,
              psuId: build.components.psuId,
            },
          });
        },

        clearBuild: () => {
          set({
            buildId: null,
            buildName: '',
            buildDescription: '',
            selectedComponents: {
              cpuId: null,
              motherboardId: null,
              gpuId: null,
              coolerId: null,
              ramIds: [],
              storageIds: [],
              caseId: null,
              psuId: null,
            },
          });
        },

        resetBuildId: () => {
          set({ buildId: null });
        },

        setBuildId: (id: number) => {
          set({ buildId: id });
        },

        updateBuildInfo: (name, description) => {
          set({ buildName: name, buildDescription: description });
        },
      }),
      {
        name: 'build-store',
      }
    )
  )
);
