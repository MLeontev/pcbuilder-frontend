import { Navigate, useParams } from 'react-router-dom';
import { useComponent } from '../../hooks/pcComponents/useComponent';
import { IMAGES_URL } from '../../http';
import AddToBuildButton from './AddToBuildButton';

export default function ComponentPage() {
  const { category, id } = useParams<{ category: string; id: string }>();

  const componentId = parseInt(id || '');
  if (isNaN(componentId) || !category) {
    return <Navigate to='/404' />;
  }

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
    <div className='mx-auto w-3/4 flex gap-6 mt-6 justify-center'>
      <div className='flex items-center justify-center w-40 h-40'>
        {data.imagePath ? (
          <img
            src={`${IMAGES_URL}${data.imagePath}`}
            alt={data.name}
            className='w-full h-full rounded-lg'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center p-1 bg-gray-200 text-gray-500 rounded'>
            Нет картинки
          </div>
        )}
      </div>
      <div className=''>
        <h2 className='text-2xl font-bold'>{data.name}</h2>
        <p className='mt-2 font-semibold'>{data.description}</p>
        <p className='text-xl mt-4 mb-1 font-bold'>Характеристики:</p>
        <ul className='space-y-1 mb-4'>
          {Object.entries(data.specifications).map(([key, value]) => (
            <li key={key}>
              <span className='font-semibold'>{key}:</span> {value}
            </li>
          ))}
        </ul>
        <AddToBuildButton category={category} componentId={data.id} />
      </div>
    </div>
  );
}
