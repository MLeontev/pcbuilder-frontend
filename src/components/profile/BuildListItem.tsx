import { useNavigate } from 'react-router-dom';
import { useBuild } from '../../hooks/builds/useBuild';
import { useDeleteBuild } from '../../hooks/builds/useDeleteBuild';
import { useBuildStore } from '../../store/buildStore';
import { BuildDto } from '../../types/builds/BuildDto';

interface BuildListItemProps {
  build: BuildDto;
}

export default function BuildListItem({ build }: BuildListItemProps) {
  const { refetch } = useBuild(build.id);
  const setBuild = useBuildStore((state) => state.setBuild);
  const navigate = useNavigate();
  const { mutate: deleteBuild, isPending } = useDeleteBuild();

  const handleSelectBuild = async () => {
    const { data } = await refetch();
    if (data) {
      setBuild(data);
      navigate('/build');
    }
  };

  return (
    <div className='flex items-center border border-gray-400 p-4 my-2 rounded-lg shadow-sm gap-1'>
      <div className='flex-1 ml-4'>
        <h2 className='font-medium'>{build.name}</h2>
        <p>{build.description}</p>
        <div className='flex flex-row w-full gap-10 mt-2 text-gray-600'>
          <p>Изменено: {build.updatedAt}</p>
          <p>Создано: {build.createdAt}</p>
        </div>
      </div>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
        onClick={handleSelectBuild}
      >
        Выбрать
      </button>
      <button
        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
        onClick={() => {
          if (window.confirm('Вы уверены, что хотите удалить сборку?')) {
            deleteBuild(build.id);
          }
        }}
        disabled={isPending}
      >
        Удалить
      </button>
    </div>
  );
}
