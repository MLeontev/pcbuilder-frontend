import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type BuildStoreState = {
  selectedComponents: {
    cpuId: number | null;
    motherboardId: number | null;
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
