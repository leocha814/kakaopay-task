import star from '@/assets/icons/star.svg';
import yellowStar from '@/assets/icons/yellow-star.svg'; // 즐겨찾기된 상태의 아이콘

export interface BookmarkIconProps {
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

export const BookmarkIcon = ({
  isBookmarked = false,
  id = 0,
  accountNumber = '',
  onToggle,
}: BookmarkIconProps) => {
  return (
    <img
      alt={'즐겨찾기'}
      src={isBookmarked ? yellowStar : star}
      onClick={(e) => {
        e.stopPropagation();
        onToggle({ isBookmarked, id, accountNumber });
      }}
    />
  );
};
