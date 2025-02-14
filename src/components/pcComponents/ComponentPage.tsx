import { Navigate, useParams } from 'react-router-dom';
import { useComponent } from '../../hooks/pcComponents/useComponent';
import { IMAGES_URL } from '../../http';
import { useBuildStore } from '../../store/buildStore';

export default function ComponentPage() {
  const { category, id } = useParams<{ category: string; id: string }>();

  const componentId = parseInt(id || '');
  if (isNaN(componentId) || !category) {
    return <Navigate to='/404' />;
  }

  const addComponent = useBuildStore((state) => state.addComponent);

  const { isPending, isError, data } = useComponent({
    id: parseInt(id || '0'),
    category: category || '',
  });

  if (isPending) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <Navigate to='/404' />;
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <img src={`${IMAGES_URL}${data.imagePath}`} alt='Нет изображения' />
      <ul>
        {Object.entries(data.specifications).map(([key, value]) => (
          <li key={key}>
            <strong>{key}</strong>: {value}
          </li>
        ))}
      </ul>
      <button onClick={() => addComponent(category || '', data.id)}>
        Добавить в сборку
      </button>
    </div>
  );
}
