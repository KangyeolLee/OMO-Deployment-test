import Link from 'next/link';

import Setting from '@assets/setting.svg';
import { useFetchUserValue } from '@recoil/userState';

import * as S from './styles';

const MyPageHeader = () => {
  const { contents: userValue } = useFetchUserValue();

  return (
    <S.MyPageHeader className="container">
      <S.TitleSection>
        <span>{userValue.nickname}</span>님 안녕하세요!
      </S.TitleSection>
      <S.SettingSection>
        <Link href="/mypage/settings" passHref>
          <Setting />
        </Link>
      </S.SettingSection>
    </S.MyPageHeader>
  );
};

export default MyPageHeader;
