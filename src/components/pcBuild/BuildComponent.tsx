import { useNavigate } from 'react-router-dom';
import { useComponent } from '../../hooks/pcComponents/useComponent';
import { IMAGES_URL } from '../../http';

interface BuildComponentProps {
  id: number | null;
  category: string;
  onRemove: (id: number) => void;
}

export default function BuildComponent({
  id,
  category,
  onRemove,
}: BuildComponentProps) {
  const navigate = useNavigate();
  const component = useComponent({ id: id || 0, category });

  if (!id) {
    return (
      <div>
        <button onClick={() => navigate(`/${category}`)}>Добавить</button>
      </div>
    );
  }

  return (
    <div>
      {component.isLoading ? (
        <p>Загрузка...</p>
      ) : component.isError ? (
        <p>Ошибка загрузки</p>
      ) : component.data ? (
        <div>
          <img
            src={`${IMAGES_URL}${component.data.imagePath}`}
            alt={component.data.name}
          />
          <h4>{component.data.name}</h4>
          <p>{component.data.description}</p>
          <button onClick={() => onRemove(component.data.id)}>
            Удалить из сборки
          </button>
        </div>
      ) : (
        <p>Данные не найдены</p>
      )}
    </div>
  );
}
