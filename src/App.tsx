import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { RouteObject, useRoutes } from 'react-router-dom';

import { routeObjects } from '@/constants/routes';
import { theme } from '@/constants/theme';
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
      <ThemeProvider theme={theme}>
        <ErrorBoundary
          fallbackRender={() => {
            return 'Error Page';
          }}
        >
          <RoutePage routeObjects={routeObjects} />
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
