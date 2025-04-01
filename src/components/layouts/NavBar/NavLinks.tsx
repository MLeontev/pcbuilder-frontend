import { Link } from 'react-router-dom';
import { componentCategories } from '../../../constants/componentCategories';

export default function NavLinks() {
  return (
    <ul className='flex space-x-8'>
      <li>
        <Link
          to='/build'
          className='bg-gray-200 text-black font-semibold px-4 py-2 rounded-lg hover:bg-gray-400 transition'
        >
          Конфигурация
        </Link>
      </li>
      {componentCategories.map(({ category, path, title }) => (
        <li key={category} className='hover:text-gray-300'>
          <Link to={path} className='font-semibold'>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
