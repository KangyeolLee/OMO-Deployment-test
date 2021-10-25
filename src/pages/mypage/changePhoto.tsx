import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ModalLayout from '@components/Layout/ModalLayout';
import ProfileImage from '@components/ProfileImage';
import { UNDEF } from '@constants/shared';
import { useUserState } from '@recoil/userState';

const ChangePhoto = () => {
  const [userState, setUserState] = useUserState();
  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const router = useRouter();

  useEffect(() => {
    setThumbnail(userState.info?.profileImage);
  }, [userState]);

  const changeProfilePhoto = () => {
    if (confirm('프로필 사진을 변경하시겠습니까?')) {
      setUserState((prev) => ({ ...prev, info: { ...prev.info, profileImage: thumbnail } }));
      alert('프로필사진 변경이 완료되었습니다.');
      router.push('/mypage');
    }
  };

  return (
    <ModalLayout
      title=""
      buttonContent="변경하기"
      clickHandler={changeProfilePhoto}
      disabled={thumbnail === UNDEF}
    >
      <NotifyParagraph>
        <b>{userState.info?.nickname}</b>
        님의 프로필사진
      </NotifyParagraph>
      <ProfileImage thumbnail={thumbnail} setThumbnail={setThumbnail} />
    </ModalLayout>
  );
};

export default ChangePhoto;

const NotifyParagraph = styled.p`
  position: absolute;
  width: 100%;
  top: 20%;
  ${({ theme }) => theme.fonts.header2_5};
  text-align: center;

  b {
    font-weight: bold;
  }
`;
