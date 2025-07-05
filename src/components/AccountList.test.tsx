import userEvent from '@testing-library/user-event';
import { HTMLAttributes } from 'react';

import { render, screen } from '../test-utils';
import { AccountList, AccountListProps } from './AccountList';

jest.mock('@/components/BookmarkIcon', () => ({
  BookmarkIcon: () => <span data-testid="bookmark-icon" />,
}));
jest.mock('@/components/Box', () => ({
  Box: ({ children }: HTMLAttributes<HTMLDivElement>) => <div>{children}</div>,
}));
jest.mock('@/components/Typography', () => ({
  Typography: ({ children }: HTMLAttributes<HTMLDivElement>) => (
    <span>{children}</span>
  ),
}));

const accounts: AccountListProps['accountList'] = [
  {
    imageUrl:
      'https://t1.daumcdn.net/kakaopay/assignment/frontend/assets/shinhan.png',
    holderName: '별명1',
    bankName: '신한',
    accountNumber: '110-1234-5678',
    id: 1,
    bankCode: '088',
    bookmarkInfo: {
      onToggle: jest.fn(),
      isBookmarked: true,
      id: 1,
      accountNumber: '110-1234-5678',
    },
  },
  {
    imageUrl:
      'https://t1.daumcdn.net/kakaopay/assignment/frontend/assets/kakaobank.png',
    holderName: '별명2',
    bankName: '카카오뱅크',
    accountNumber: '110-2345-6789',
    id: 2,
    bankCode: '090',
    bookmarkInfo: {
      onToggle: jest.fn(),
      isBookmarked: false,
      accountNumber: '110-2345-6789',
    },
  },
  {
    imageUrl:
      'https://t1.daumcdn.net/kakaopay/assignment/frontend/assets/nh.png',
    holderName: '별명3',
    bankName: '농협',
    accountNumber: '110-3456-7890',
    id: 3,
    bankCode: '011',
    bookmarkInfo: {
      onToggle: jest.fn(),
      isBookmarked: false,
      accountNumber: '110-3456-7890',
    },
  },
  {
    imageUrl:
      'https://t1.daumcdn.net/kakaopay/assignment/frontend/assets/kb.png',
    holderName: '별명4',
    bankName: '국민',
    accountNumber: '110-4567-8901',
    id: 4,
    bankCode: '004',
    bookmarkInfo: {
      onToggle: jest.fn(),
      isBookmarked: false,
      accountNumber: '110-4567-8901',
    },
  },
  {
    imageUrl:
      'https://t1.daumcdn.net/kakaopay/assignment/frontend/assets/hana.png',
    holderName: '별명5',
    bankName: '하나',
    accountNumber: '110-5678-9012',
    id: 5,
    bankCode: '032',
    bookmarkInfo: {
      onToggle: jest.fn(),
      isBookmarked: false,
      accountNumber: '110-5678-9012',
    },
  },
];
describe('AccountList', () => {
  it('타이틀이 잘 보인다', () => {
    render(<AccountList title="내 계좌" accountList={accounts} />);
    expect(screen.getByText('내 계좌')).toBeInTheDocument();
  });

  it('기본으로 2개만 보여주고, +N개 버튼이 보인다', () => {
    render(<AccountList title="내 계좌" accountList={accounts} />);
    expect(screen.getByText('별명1')).toBeInTheDocument();
    expect(screen.getByText('별명2')).toBeInTheDocument();

    expect(screen.getByText('+3개')).toBeInTheDocument();

    expect(screen.getByAltText('보이기')).toBeInTheDocument();
  });

  it('펼치기 버튼 클릭 시 모든 계좌가 보인다', async () => {
    render(<AccountList title="내 계좌" accountList={accounts} />);
    const toggleBtn = screen.getByAltText('보이기');
    await userEvent.click(toggleBtn);
    expect(screen.getByText('별명1')).toBeInTheDocument();
    expect(screen.getByText('별명2')).toBeInTheDocument();
    expect(screen.getByText('별명3')).toBeInTheDocument();
    expect(screen.getByText('별명4')).toBeInTheDocument();
    expect(screen.getByText('별명5')).toBeInTheDocument();

    expect(screen.getByAltText('숨기기')).toBeInTheDocument();
  });

  it('접기 버튼 클릭 시 다시 2개만 보인다', async () => {
    render(<AccountList title="내 계좌" accountList={accounts} />);
    const toggleBtn = screen.getByAltText('보이기');
    await userEvent.click(toggleBtn);
    const foldBtn = screen.getByAltText('숨기기');
    await userEvent.click(foldBtn);
    expect(screen.queryByText('별명3')).not.toBeInTheDocument();
    expect(screen.getByText('+3개')).toBeInTheDocument();
    expect(screen.getByAltText('보이기')).toBeInTheDocument();
  });

  it('계좌가 없으면 목록이 비어 있다', () => {
    render(<AccountList title="내 계좌" accountList={[]} />);

    const list = screen.getByRole('list');
    expect(list.childElementCount).toBe(0);
  });

  it('계좌 별명이 없으면 "별명 미설정"이 표시된다', () => {
    const noNickname = [
      {
        ...accounts[0],
        holderName: '',
      },
    ];
    render(<AccountList title="내 계좌" accountList={noNickname} />);
    expect(screen.getByText('별명 미설정')).toBeInTheDocument();
  });
});
