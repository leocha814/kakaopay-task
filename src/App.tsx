import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { RouteObject, useRoutes } from 'react-router-dom';

import { routeObjects } from '@/constants/routes';
import { theme } from '@/constants/theme';

import { Content } from './components/Content';
const RoutePage = ({ routeObjects }: { routeObjects: RouteObject[] }) => {
  return useRoutes(routeObjects);
};

const App = () => {
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
            return <Content>서비스 사용이 잠시 불가 합니다.</Content>;
          }}
        >
          <RoutePage routeObjects={routeObjects} />
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
