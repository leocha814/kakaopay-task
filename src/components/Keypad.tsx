import styled from '@emotion/styled';

import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';

const KeyButtonContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  justify-content: center;
  align-items: center;
  flex: 1;
  grid-gap: 16px;
`;

const KeyButton = styled(Button)`
  height: 100%;
  border: none;
  color: 'primary';
  font-size: 26px;
  border-radius: 0;
  background: white;
  touch-action: none;
  transition: background 0.2s;
  &:active {
    background: #f1f3f5;
  }
`;

interface KeypadProps {
  onKeyPress: (value: string) => void;
  onClickChip: (value: number) => void;
  backspaceProps: React.HTMLAttributes<HTMLButtonElement>;
}

export const Keypad = ({
  onKeyPress,
  onClickChip,
  backspaceProps,
}: KeypadProps) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <>
      <Box justifyContent="space-evenly">
        {[1, 5, 10, 200].map((value) => (
          <Chip key={value} onClick={() => onClickChip(value * 10000)}>
            +{value}만
          </Chip>
        ))}
      </Box>
      <KeyButtonContainer>
        {keys.map((key) => (
          <KeyButton name={key} key={key} onClick={() => onKeyPress(key)}>
            {key}
          </KeyButton>
        ))}
        <div></div>
        <KeyButton onClick={() => onKeyPress('0')}>0</KeyButton>
        <KeyButton aria-label="지우기" {...backspaceProps}>
          ←
        </KeyButton>
      </KeyButtonContainer>
    </>
  );
};
