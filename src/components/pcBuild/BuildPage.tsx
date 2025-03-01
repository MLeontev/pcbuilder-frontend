import { useEffect } from 'react';
import { componentCategories } from '../../constants/componentCategories';
import { useCheckCompatibility } from '../../hooks/builds/useCheckCompatibility';
import useGenerateExcelReport from '../../hooks/builds/useGenerateExcelReport';
import useGeneratePdfReport from '../../hooks/builds/useGeneratePdfReport';
import { useBuildStore } from '../../store/buildStore';
import BuildComponent from './BuildComponent';
import MultiBuildComponent from './MultiBuildComponent';

const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return '✅ Все совместимо';
    case 1:
      return '⚠️ Совместимо с ограничениями';
    case 2:
      return '❌ Несовместимо';
    default:
      return '❓ Статус неизвестен';
  }
};

const getErrorStatusLabel = (status: number) => {
  switch (status) {
    case 0:
      return { label: 'ℹ️ Заметка', className: 'text-blue-500' };
    case 1:
      return { label: '⚠️ Предупреждение', className: 'text-orange-500' };
    case 2:
      return { label: '❌ Ошибка', className: 'text-red-600' };
    default:
      return { label: '❓ Неизвестно', className: 'text-gray-500' };
  }
};

export default function BuildPage() {
  const selectedComponents = useBuildStore((state) => state.selectedComponents);
  const removeComponent = useBuildStore((state) => state.removeComponent);
  const checkCompatibility = useCheckCompatibility();
  const generateExcelReport = useGenerateExcelReport();
  const generatePdfReport = useGeneratePdfReport();

  const compatibilityData = checkCompatibility.data?.data;
  const status = compatibilityData?.status;
  const errors = compatibilityData?.errors || [];

  const problems = errors.filter((e) => e.status === 2);
  const warnings = errors.filter((e) => e.status === 1);
  const notes = errors.filter((e) => e.status === 0);

  useEffect(() => {
    checkCompatibility.mutate(selectedComponents);
  }, [selectedComponents]);

  return (
    <div className='mx-auto w-3/4 flex gap-6 mt-6'>
      <div className='flex-1'>
        <h2 className='text-xl font-semibold mb-6'>Выбранные комплектующие</h2>

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
        <h2 className='text-xl font-semibold mb-4'>Проверка совместимости</h2>

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
                  <h3 className={`font-semibold ${className}`}>{label}:</h3>
                  {group.map((error, idx) => (
                    <p key={idx} className={className}>
                      {error.message}
                    </p>
                  ))}
                </div>
              );
            })}
          </>
        )}
        <button
          className='px-3 py-1 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-100 transition'
          onClick={() =>
            generateExcelReport.mutate({
              name: null,
              description: null,
              components: selectedComponents,
            })
          }
        >
          Сохранить в Excel
        </button>
        <button
          className='px-3 py-1 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-100 transition'
          onClick={() =>
            generatePdfReport.mutate({
              name: null,
              description: null,
              components: selectedComponents,
            })
          }
        >
          Сохранить в PDF
        </button>
      </div>
    </div>
  );
}
