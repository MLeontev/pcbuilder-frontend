import { Navigate, useParams } from 'react-router-dom';
import { useComponent } from '../../hooks/pcComponents/useComponent';
import { IMAGES_URL } from '../../http';

export default function ComponentPage() {
  const { category, id } = useParams<{ category: string; id: string }>();

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

  console.log(data);

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
    </div>
  );
}
