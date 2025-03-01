import { useNavigate } from 'react-router-dom';
import { IMAGES_URL } from '../../http';
import { ComponentDto } from '../../types/pcComponents/ComponentDto';
import AddToBuildButton from './AddToBuildButton';

interface ComponentListItemProps {
  component: ComponentDto;
  category: string;
}

export default function ComponentListItem({
  component,
  category,
}: ComponentListItemProps) {
  const navigate = useNavigate();

  return (
    <div className='flex items-center border border-gray-400 p-4 my-2 rounded-lg shadow-sm'>
      <div
        className='w-20 h-20 flex-shrink-0 cursor-pointer'
        onClick={() => navigate(`/${category}/${component.id}`)}
      >
        {component.imagePath ? (
          <img
            className='w-full h-full rounded-lg'
            src={`${IMAGES_URL}${component.imagePath}`}
            alt='Нет изображения'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center p-1 bg-gray-200 text-gray-500 rounded hover:bg-gray-300 transition'>
            Нет картинки
          </div>
        )}
      </div>

      <div
        className='flex-1 ml-4 cursor-pointer'
        onClick={() => navigate(`/${category}/${component.id}`)}
      >
        <h2 className='hover:text-gray-500 transition'>{component.fullName}</h2>
        <p className='hover:text-gray-500 transition'>
          {component.description}
        </p>
      </div>

      <AddToBuildButton category={category} componentId={component.id} />
    </div>
  );
}
