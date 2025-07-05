import styled from '@emotion/styled';

import star from '@/assets/icons/star.svg';
import yellowStar from '@/assets/icons/yellow-star.svg'; // 즐겨찾기된 상태의 아이콘

const Button = styled('button')`
  background: ${({ isBookmarked }: { isBookmarked: boolean }) =>
    `url(${isBookmarked ? yellowStar : star}) no-repeat center center`};
  background-size: 24px 24px;
  width: 40px;
  height: 40px;
  border: none;
`;

export interface BookmarkButtonProps {
  isBookmarked?: boolean;
  id?: number;
  accountNumber?: string;
  onToggle: ({
    isBookmarked,
    accountNumber,
    id,
  }: {
    isBookmarked: boolean;
    accountNumber: string;
    id: number;
  }) => void;
}

export const BookmarkButton = ({
  isBookmarked = false,
  id = 0,
  accountNumber = '',
  onToggle,
}: BookmarkButtonProps) => {
  return (
    <Button
      isBookmarked={isBookmarked}
      aria-label={'즐겨찾기'}
      onClick={(e) => {
        e.stopPropagation();
        onToggle({ isBookmarked, id, accountNumber });
      }}
    />
  );
};
