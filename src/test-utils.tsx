// test-utils.tsx
import { ThemeProvider } from '@emotion/react';
import { render, RenderOptions } from '@testing-library/react';
import { ReactNode } from 'react';
import { InitialEntry, MemoryRouter } from 'react-router-dom';

import { theme } from '@/constants/theme';

interface AllProvidersProps {
  children: ReactNode;
  initialEntries?: InitialEntry[];
}

const AllProviders = ({ children, initialEntries }: AllProvidersProps) => (
  <ThemeProvider theme={theme}>
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  </ThemeProvider>
);

// customRender에서 initialEntries를 받을 수 있도록 확장
const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions & { initialEntries?: InitialEntry[] },
) => {
  const { initialEntries, ...restOptions } = options || {};
  return render(ui, {
    wrapper: (props) => (
      <AllProviders initialEntries={initialEntries}>
        {props.children}
      </AllProviders>
    ),
    ...restOptions,
  });
};

export * from '@testing-library/react';
export { customRender as render };
