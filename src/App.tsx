import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please refresh.</div>}>
      <Dashboard />
    </ErrorBoundary>
  );
}

export default App;
