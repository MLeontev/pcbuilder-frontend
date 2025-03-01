import { useNavigate } from 'react-router-dom';
import { useBuildStore } from '../../store/buildStore';

interface AddToBuildButtonProps {
  category: string;
  componentId: number;
}

export default function AddToBuildButton({
  category,
  componentId,
}: AddToBuildButtonProps) {
  const addComponent = useBuildStore((state) => state.addComponent);
  const navigate = useNavigate();

  const onAdd = () => {
    addComponent(category, componentId);
    navigate('/build');
  };

  return (
    <button
      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
      onClick={onAdd}
    >
      Добавить в сборку
    </button>
  );
}
