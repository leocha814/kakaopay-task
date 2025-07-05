import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      primary: string;
      secondary: string;
      placeholder: string;
      kakao: string;
      kakaoSecondary: string;
      error: string;
      labelPrimary: string;
      labelSecondary: string;
      labelTertiary: string;
    };
    fontSize: {
      normal: string;
      sub: string;
      title: string;
      titleSub: string;
      button: string;
      buttonSub: string;
    };
    fontWeight: {
      regular: number;
      bold: number;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
