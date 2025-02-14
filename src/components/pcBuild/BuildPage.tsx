import { useBuildStore } from '../../store/buildStore';
import BuildComponent from './BuildComponent';

export default function BuildPage() {
  const selectedComponents = useBuildStore((state) => state.selectedComponents);
  const removeComponent = useBuildStore((state) => state.removeComponent);

  return (
    <div>
      <h2>Выбранные комплектующие</h2>
      <h3>Процессор</h3>
      <BuildComponent
        id={selectedComponents.cpuId}
        category='cpu'
        onRemove={(id) => removeComponent('cpu', id)}
      />
    </div>
  );
}
