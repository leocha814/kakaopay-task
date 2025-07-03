import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { RouteObject, useRoutes } from 'react-router-dom';

import { routeObjects } from '@/constants/routes';

const RoutePage = ({ routeObjects }: { routeObjects: RouteObject[] }) => {
  return useRoutes(routeObjects);
};

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
          return 'Error Page';
        }}
      >
        <RoutePage routeObjects={routeObjects} />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
