import { useEffect } from 'react';
import { componentCategories } from '../../constants/componentCategories';
import { useCheckCompatibility } from '../../hooks/builds/useCheckCompatibility';
import useGenerateExcelReport from '../../hooks/builds/useGenerateExcelReport';
import useGeneratePdfReport from '../../hooks/builds/useGeneratePdfReport';
import { useSaveBuild } from '../../hooks/builds/useSaveBuild';
import { useUpdateBuild } from '../../hooks/builds/useUpdateBuild';
import { useAuthStore } from '../../store/authStore';
import { useBuildStore } from '../../store/buildStore';
import BuildComponent from './BuildComponent';
import MultiBuildComponent from './MultiBuildComponent';

const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return '✅ Совместима';
    case 1:
      return '⚠️ Совместима с ограничениями';
    case 2:
      return '❌ Несовместима';
    default:
      return '❓ Статус неизвестен';
  }
};

const getErrorStatusLabel = (status: number) => {
  switch (status) {
    case 0:
      return { label: 'ℹ️ Заметки', className: 'text-blue-500' };
    case 1:
      return { label: '⚠️ Предупреждения', className: 'text-orange-500' };
    case 2:
      return { label: '❌ Ошибки', className: 'text-red-600' };
    default:
      return { label: '❓ Неизвестные', className: 'text-gray-500' };
  }
};

export default function BuildPage() {
  const isAuth = useAuthStore((state) => state.isAuth);

  const selectedComponents = useBuildStore((state) => state.selectedComponents);
  const buildId = useBuildStore((state) => state.buildId);
  const buildName = useBuildStore((state) => state.buildName);
  const buildDescription = useBuildStore((state) => state.buildDescription);
  const updateBuildInfo = useBuildStore((state) => state.updateBuildInfo);
  const removeComponent = useBuildStore((state) => state.removeComponent);
  const clearBuild = useBuildStore((state) => state.clearBuild);

  const buildData = {
    name: buildName,
    description: buildDescription,
    components: selectedComponents,
  };

  const checkCompatibility = useCheckCompatibility();
  const generateExcelReport = useGenerateExcelReport();
  const generatePdfReport = useGeneratePdfReport();
  const { mutate: saveBuild, isPending: isSaving } = useSaveBuild();
  const { mutate: updateBuild, isPending: isUpdating } = useUpdateBuild();

  const compatibilityData = checkCompatibility.data?.data;
  const status = compatibilityData?.status;
  const errors = compatibilityData?.errors || [];

  const problems = errors.filter((e) => e.status === 2);
  const warnings = errors.filter((e) => e.status === 1);
  const notes = errors.filter((e) => e.status === 0);

  const handleSaveBuild = () => {
    if (!isAuth) {
      alert('Войдите в систему, чтобы сохранить сборку');
      return;
    }

    if (!buildName.trim()) {
      alert('Введите название сборки');
      return;
    }

    if (buildName.length > 100) {
      alert('Название не должно быть длиннее 100 символов');
      return;
    }

    saveBuild(buildData);
  };

  const handleUpdateBuild = () => {
    if (!buildName.trim()) {
      alert('Введите название сборки');
      return;
    }

    if (buildName.length > 100) {
      alert('Название не должно быть длиннее 100 символов');
      return;
    }

    if (buildId) {
      updateBuild({ buildId, build: buildData });
    }
  };

  const handleGenerateReport = (reportType: 'excel' | 'pdf') => {
    if (reportType === 'excel') {
      generateExcelReport.mutate(buildData);
    } else {
      generatePdfReport.mutate(buildData);
    }
  };

  const handleClearBuild = () => {
    if (
      window.confirm(
        'Ваша текущая сборка не будет сохранена автоматически. Вы уверены, что хотите начать новую сборку?'
      )
    ) {
      clearBuild();
    }
  };

  useEffect(() => {
    checkCompatibility.mutate(selectedComponents);
  }, [selectedComponents]);

  return (
    <div className='mx-auto w-3/4 flex gap-6 mt-6'>
      <div className='flex-1'>
        <label htmlFor='build-name' className='block font-medium mb-1'>
          Название сборки
        </label>
        <input
          id='build-name'
          type='text'
          value={buildName}
          onChange={(e) => updateBuildInfo(e.target.value, buildDescription)}
          placeholder='Введите название сборки'
          className='border p-2 w-full mb-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1'
        />

        <label htmlFor='build-description' className='block font-medium mb-1'>
          Описание сборки
        </label>
        <textarea
          id='build-description'
          value={buildDescription}
          onChange={(e) => updateBuildInfo(buildName, e.target.value)}
          placeholder='Введите описание сборки'
          className='border p-2 w-full mb-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1'
        />

        {componentCategories.map(({ category, singleTitle, path }) => (
          <div className='my-3' key={category}>
            <h3 className='font-medium text-lg mb-1'>{singleTitle}</h3>
            {['ram', 'storage'].includes(category) ? (
              <MultiBuildComponent
                ids={
                  selectedComponents[
                    `${category}Ids` as keyof typeof selectedComponents
                  ] as number[]
                }
                category={category}
                route={path}
                onRemove={(id) => removeComponent(category, id)}
              />
            ) : (
              <BuildComponent
                id={
                  selectedComponents[
                    `${category}Id` as keyof typeof selectedComponents
                  ] as number | null
                }
                category={category}
                onRemove={(id) => removeComponent(category, id)}
              />
            )}
          </div>
        ))}
      </div>

      <div className='w-1/2 p-4 border border-gray-300 rounded-lg shadow-md self-start'>
        <h2 className='text-xl font-semibold mb-4'>Совместимость сборки</h2>

        {checkCompatibility.isPending && (
          <p className='text-gray-500'>🔄 Проверка...</p>
        )}

        {!checkCompatibility.isPending && (
          <>
            <p className='text-lg font-medium mb-2'>{getStatusText(status!)}</p>

            {[problems, warnings, notes].map((group, index) => {
              if (group.length === 0) return null;

              const { label, className } = getErrorStatusLabel(group[0].status);

              return (
                <div key={index}>
                  <h3 className='font-semibold mt-4'>{label}:</h3>
                  {group.map((error, idx) => (
                    <p key={idx} className={className}>
                      ▸ {error.message}
                    </p>
                  ))}
                </div>
              );
            })}
          </>
        )}

        <div className='mt-5 space-y-2'>
          <div className='flex gap-2'>
            <button
              className='px-3 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-100 transition flex-1'
              onClick={() => handleGenerateReport('excel')}
            >
              Сохранить в Excel
            </button>
            <button
              className='px-3 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-100 transition flex-1'
              onClick={() => handleGenerateReport('pdf')}
            >
              Сохранить в PDF
            </button>
          </div>

          <div className='flex gap-2'>
            {buildId && (
              <button
                onClick={handleUpdateBuild}
                disabled={isUpdating}
                className='bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition flex-1'
              >
                {isSaving ? 'Обновление...' : 'Сохранить изменения'}
              </button>
            )}
            <button
              onClick={handleSaveBuild}
              disabled={isSaving}
              className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition flex-1'
            >
              {isSaving ? 'Сохранение...' : 'Сохранить сборку как новую'}
            </button>
          </div>

          <button
            onClick={handleClearBuild}
            className='w-full bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition'
          >
            Начать новую сборку
          </button>
        </div>
      </div>
    </div>
  );
}
