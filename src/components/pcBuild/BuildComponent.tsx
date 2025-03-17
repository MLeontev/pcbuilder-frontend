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
      <button
        className='w-full border-2 border-dashed border-gray-400 rounded-lg p-4 my-1 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition'
        onClick={() => navigate(`/${category}`)}
      >
        Добавить
      </button>
    );
  }

  return (
    <div className='flex items-center border border-gray-400 p-3 my-1 rounded-lg shadow-sm'>
      {component.isLoading ? (
        <p>Загрузка...</p>
      ) : component.isError ? (
        <p>Ошибка загрузки</p>
      ) : component.data ? (
        <>
          <div
            className='w-20 h-20 flex-shrink-0 cursor-pointer flex items-center justify-center'
            onClick={() => navigate(`/${category}/${component.data.id}`)}
          >
            {component.data.imagePath ? (
              <img
                className='rounded-lg'
                src={`${IMAGES_URL}${component.data.imagePath}`}
                alt={component.data.name}
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center p-1 bg-gray-200 text-gray-500 rounded hover:bg-gray-300 transition'>
                Нет картинки
              </div>
            )}
          </div>

          <div
            className='flex-1 ml-4 cursor-pointer'
            onClick={() => navigate(`/${category}/${component.data.id}`)}
          >
            <h2 className='hover:text-gray-500 transition'>
              {component.data.name}
            </h2>
            <p className='hover:text-gray-500 transition'>
              {component.data.description}
            </p>
          </div>

          <button
            className='ml-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
            onClick={() => onRemove(component.data.id)}
          >
            Удалить из сборки
          </button>
        </>
      ) : (
        <p>Данные не найдены</p>
      )}
    </div>
  );
}
