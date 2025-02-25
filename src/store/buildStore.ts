import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type BuildStoreState = {
  selectedComponents: {
    cpuId: number | null;
    motherboardId: number | null;
    gpuId: number | null;
    coolerId: number | null;
    ramIds: number[];
    storageIds: number[];
    caseId: number | null;
    psuId: number | null;
  };
};

type BuildStoreActions = {
  addComponent: (componentType: string, componentId: number) => void;
  removeComponent: (componentType: string, componentId: number) => void;
};

type BuildStore = BuildStoreState & BuildStoreActions;

export const useBuildStore = create<BuildStore>()(
  devtools(
    persist(
      (set) => ({
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
      }),
      {
        name: 'build-store',
      }
    )
  )
);
