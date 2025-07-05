import styled from '@emotion/styled';
import type { Property } from 'csstype';
import React, { useRef } from 'react';

import { useOnClickOutside } from '@/utils/hooks/useOnClickOutside';
import { getThemeValue, ThemeKeys } from '@/utils/utils';

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Arrow = styled.div<{
  position: TooltipProps['position'];
  backgroundColor?: ThemeKeys<'color'> | Property.BackgroundColor;
}>`
  position: absolute;
  width: 0;
  height: 0;
  ${({ position, backgroundColor = '#000000D8', theme }) => {
    switch (position) {
      case 'top':
        return `
          left: 50%;
          top: 100%;
          transform: translateX(-50%);
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid ${getThemeValue(theme.color, backgroundColor)};
        `;
      case 'bottom':
        return `
          left: 50%;
          bottom: 100%;
          transform: translateX(-50%);
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid ${getThemeValue(theme.color, backgroundColor)};
        `;
      case 'left':
        return `
          top: 50%;
          right: -8px;
          transform: translateY(-50%);
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 8px solid ${getThemeValue(theme.color, backgroundColor)};
        `;
      case 'right':
        return `
          top: 50%;
          left: -8px;
          transform: translateY(-50%);
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-right: 8px solid ${getThemeValue(theme.color, backgroundColor)};
        `;
      default:
        return '';
    }
  }}
`;

const TooltipContent = styled.div<{
  position: 'top' | 'bottom' | 'left' | 'right';
  color?: Property.Color;
  backgroundColor?: ThemeKeys<'color'> | Property.BackgroundColor;
}>`
  position: absolute;
  padding: 8px 12px;
  background-color: ${({ backgroundColor = '#000000D8', theme }) =>
    getThemeValue(theme.color, backgroundColor)};
  color: ${({ color = '#FFFFFF', theme }) => getThemeValue(theme.color, color)};
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 1000;

  ${({ position }) => {
    switch (position) {
      case 'top':
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 8px;
        `;
      case 'bottom':
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 8px;
        `;
      case 'left':
        return `
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 8px;
        `;
      case 'right':
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 8px;
        `;
      default:
        return '';
    }
  }}
`;

export interface TooltipProps {
  show: boolean;
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  color?: Property.Color;
  backgroundColor?: ThemeKeys<'color'> | Property.BackgroundColor;
  onClose?: VoidFunction;
}

export const Tooltip = ({
  show,
  position = 'bottom',
  children,
  content,
  color,
  backgroundColor,
  onClose,
}: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(tooltipRef, () => {
    if (show && onClose) onClose();
  });

  return (
    <TooltipWrapper ref={tooltipRef}>
      {children}
      {show && (
        <TooltipContent
          color={color}
          backgroundColor={backgroundColor}
          position={position}
        >
          {content}
          <Arrow backgroundColor={backgroundColor} position={position} />
        </TooltipContent>
      )}
    </TooltipWrapper>
  );
};
