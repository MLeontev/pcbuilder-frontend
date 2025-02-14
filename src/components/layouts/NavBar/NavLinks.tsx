import { Link } from 'react-router-dom';
import { componentCategories } from '../../../constants/componentCategories';

export default function NavLinks() {
  return (
    <ul className='flex space-x-8'>
      <li className='hover:text-gray-300'>
        <Link to='/build'>Сборка</Link>
      </li>
      {componentCategories.map(({ category, path, title }) => (
        <li key={category} className='hover:text-gray-300'>
          <Link to={path}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}
