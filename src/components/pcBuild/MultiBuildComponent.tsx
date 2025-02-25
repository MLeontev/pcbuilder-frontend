import { useNavigate } from 'react-router-dom';
import BuildComponent from './BuildComponent';

interface MultiBuildComponentProps {
  ids: number[];
  category: string;
  route: string;
  onRemove: (id: number) => void;
}

export default function MultiBuildComponent({
  ids,
  category,
  route,
  onRemove,
}: MultiBuildComponentProps) {
  const navigate = useNavigate();

  return (
    <div>
      {ids && ids.length > 0 ? (
        <>
          {ids.map((id) => (
            <BuildComponent
              key={id}
              id={id}
              category={category}
              onRemove={() => onRemove(id)}
            />
          ))}
          <button
            className='px-3 py-1 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-100 transition'
            onClick={() => navigate(route)}
          >
            Добавить еще
          </button>
        </>
      ) : (
        <BuildComponent id={null} category={category} onRemove={() => {}} />
      )}
    </div>
  );
}
