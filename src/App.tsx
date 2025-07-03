import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '@/components/Layout';

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: Infinity,
        retry: 0,
        refetchOnWindowFocus: false,
      },
      mutations: {
        gcTime: Infinity,
        retry: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        fallbackRender={() => {
          return 'Error 500';
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/notFound" element={<>Not Found</>} />
          <Route path="*" element={<Navigate to="/notFound" replace />} />
        </Routes>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
