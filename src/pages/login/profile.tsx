import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import LoginLayout from '@components/Layout/LoginLayout';
import ProfileImage from '@components/ProfileImage';
import Button from '@components/Shared/Button';
import { useSignupFormState } from '@recoil/signupFormState';
import { useSetUserState } from '@recoil/userState';

const Profile = () => {
  const router = useRouter();
  const setUserState = useSetUserState();
  const [signupFormState, setSingupFormState] = useSignupFormState();

  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  useEffect(() => {
    setIsValidForm(signupFormState.profileImage !== undefined);
  }, [signupFormState]);

  const successLoggedIn = () => {
    if (isValidForm) {
      setUserState({ isLoggedIn: true, info: { ...signupFormState, amount: 0, level: 0 } });
      router.push('/');
    }
  };

  return (
    <LoginLayout>
      <Content>
        <div className="notify-main-letter">좋아요!</div>
        <div className="notify-sub-letter">
          <span className="nickname">{signupFormState.nickname}</span>님을 대표할
        </div>
        <div className="notify-sub-letter">이미지를 골라주세요!</div>

        <ProfileImage />

        <Button
          text="다음"
          width="calc(100% - 40px)"
          position="absolute"
          left="20px"
          bottom="4rem"
          disabled={isValidForm}
          clickListener={successLoggedIn}
        />
        <div className="set-next">다음에 할래요</div>
      </Content>
    </LoginLayout>
  );
};

export default Profile;

const Content = styled.div`
  margin-top: 6rem;
  width: 100%;
  height: 441px;

  .notify-main-letter {
    margin: 0 0 26px 20px;

    font-weight: bold;
    font-size: 30px;
    line-height: 36px;
    color: #000;
  }

  .notify-sub-letter {
    margin-left: 20px;
    font-size: 18px;
    line-height: 140%;
    color: #000;

    .nickname {
      font-weight: bold;
    }
  }

  .set-next {
    border: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 2rem;

    font-size: 12px;
    text-decoration-line: underline;
    color: #8c8c95;
  }
`;
