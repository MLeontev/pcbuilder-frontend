import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../components/AppRouter';

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
