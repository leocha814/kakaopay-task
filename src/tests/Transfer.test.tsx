import userEvent from '@testing-library/user-event';

import * as hooks from '@/services/hooks';

import Transfer from '../pages/transfer/Transfer';
import { render, screen } from '../test-utils';

jest.mock('@/services/hooks', () => ({
  useMyInfo: jest.fn(),
  useTransfer: jest.fn(),
}));

const mockMyInfo = {
  account: {
    bank: { name: '테스트은행' },
    account_number: '123-456-7890',
    balance: 1000000,
  },
  transfer: {
    one_day_amount: 0,
  },
};

const mockTransfer = {
  mutate: jest.fn(),
  isPending: false,
  isSuccess: false,
  isError: false,
  reset: jest.fn(),
};

const locationState = {
  imageUrl: '/bank.png',
  bankName: '테스트은행',
  accountNumber: '123-456-7890',
  holderName: '홍길동',
  bankCode: '001',
};

beforeEach(() => {
  (hooks.useMyInfo as jest.Mock).mockReturnValue({ mockMyInfo });
  (hooks.useTransfer as jest.Mock).mockReturnValue(mockTransfer);
  jest.clearAllMocks();
});

function renderWithRouter() {
  return render(<Transfer />, {
    initialEntries: [{ pathname: '/transfer', state: locationState }],
  });
}

describe('Transfer', () => {
  it('은행 로고, 은행명, 계좌번호, 계좌명이 표시된다', () => {
    renderWithRouter();
    expect(screen.getByAltText('테스트은행 로고')).toBeInTheDocument();
    expect(screen.getByText(/테스트은행 123-456-7890/)).toBeInTheDocument();
    expect(screen.getByText('홍길동 님에게')).toBeInTheDocument();
  });

  it('금액 입력란 placeholder가 "얼마를 보낼까요?"로 보인다', () => {
    renderWithRouter();
    expect(screen.getByText('얼마를 보낼까요?')).toBeInTheDocument();
  });

  it('금액 입력 시 천단위 콤마와 함께 {{금액}}원으로 표시된다', async () => {
    renderWithRouter();
    // Keypad의 숫자 버튼이 1~9로 렌더링된다고 가정
    const button1 = screen.getByRole('button', { name: '1' });
    const button0 = screen.getByRole('button', { name: '0' });
    await userEvent.click(button1);
    await userEvent.click(button0);
    await userEvent.click(button0);
    await userEvent.click(button0);
    expect(screen.getByText('1,000원')).toBeInTheDocument();
  });

  it('금액칩(예: +1만) 클릭 시 금액이 더해진다', async () => {
    renderWithRouter();

    const chip = screen.getByText('+1만');
    await userEvent.click(chip);
    expect(screen.getByText('10,000원')).toBeInTheDocument();
    const chip2 = screen.getByText('+5만');
    await userEvent.click(chip2);
    expect(screen.getByText('60,000원')).toBeInTheDocument();
  });

  it('키패드 ← 버튼 클릭 시 한 자리씩 삭제된다', async () => {
    renderWithRouter();
    const button5 = screen.getByRole('button', { name: '5' });
    const button0 = screen.getByRole('button', { name: '0' });
    await userEvent.click(button5);
    await userEvent.click(button0);
    await userEvent.click(button0);
    await userEvent.click(button0);
    expect(screen.getByText('5,000원')).toBeInTheDocument();
    const backspace = screen.getByLabelText('지우기');
    await userEvent.click(backspace);
    expect(screen.getByText('500원')).toBeInTheDocument();
  });

  it('금액이 입력되어야 확인 버튼이 활성화된다', async () => {
    renderWithRouter();
    const confirmButton = screen.getByRole('button', { name: '확인' });
    expect(confirmButton).toBeDisabled();
    const button1 = screen.getByRole('button', { name: '1' });
    await userEvent.click(button1);
    expect(confirmButton).toBeEnabled();
  });

  it('금액이 0원이면 확인 버튼이 비활성화된다', async () => {
    renderWithRouter();
    const confirmButton = screen.getByRole('button', { name: '확인' });
    const button0 = screen.getByRole('button', { name: '0' });
    await userEvent.click(button0);
    expect(confirmButton).toBeDisabled();
  });

  it('확인 버튼 클릭 시 송금 함수가 호출된다', async () => {
    renderWithRouter();
    const button1 = screen.getByRole('button', { name: '1' });
    await userEvent.click(button1);
    const confirmButton = screen.getByRole('button', { name: '확인' });
    await userEvent.click(confirmButton);
    expect(mockTransfer.mutate).toHaveBeenCalledWith({
      bankCode: '001',
      accountNumber: '123-456-7890',
      amount: 1,
    });
  });

  it('송금 성공/실패/진행중 화면이 정상적으로 노출된다', () => {
    // Pending
    (hooks.useTransfer as jest.Mock).mockReturnValue({
      ...mockTransfer,
      isPending: true,
    });
    renderWithRouter();
    expect(screen.getByText(/보내는 중이에요./)).toBeInTheDocument();
    expect(screen.getByAltText('송금중')).toBeInTheDocument();

    // Success
    (hooks.useTransfer as jest.Mock).mockReturnValue({
      ...mockTransfer,
      isSuccess: true,
    });
    renderWithRouter();
    expect(screen.getByText(/송금을 완료했어요./)).toBeInTheDocument();
    expect(screen.getByAltText('송금 완료')).toBeInTheDocument();

    // Error
    (hooks.useTransfer as jest.Mock).mockReturnValue({
      ...mockTransfer,
      isError: true,
    });
    renderWithRouter();
    expect(screen.getByAltText('송금 에러')).toBeInTheDocument();
  });
});
