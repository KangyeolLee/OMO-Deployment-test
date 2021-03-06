import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import Header from '@components/Header';
import Button from '@components/Shared/Button';
import { selectedReceipt } from '@recoil/certificationState';

const CertificationGuide = () => {
  const { query, push } = useRouter();
  const { id } = query;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [receipt, setReceipt] = useRecoilState(selectedReceipt);

  const handleOnClickButton = () => fileInputRef?.current?.click();

  const handleOnChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    if (!files?.length) return;

    setReceipt(files[0]);
  };

  useEffect(() => {
    if (receipt) {
      push({ pathname: `/certification`, query: { id } });
    }
  }, [receipt, id]);

  return (
    <CertificationPage>
      <Header title="인증하기" />
      <CertificationGuideMain className="container">
        <ReceiptImageWrapper>
          <Image src="/images/receipt.png" alt="영수증 예시 이미지" layout="fill" />
        </ReceiptImageWrapper>

        <div className="guide-message-wrapper">
          <p>
            <span className="highlight">날짜와 금액</span>이 보여야
          </p>
          <p>정확한 인증이 진행되니</p>
          <p>꼭 확인해주세요!</p>
        </div>

        <div className="warning-message">필수 인증사항 누락은 기각사유가 될 수 있습니다</div>

        <ButtonArea>
          <Button
            clickListener={handleOnClickButton}
            color="#fff"
            bgColor="#293AD2"
            text="영수증 사진 찍기"
          />
          <FileInput
            onChange={handleOnChangeFileInput}
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="camera"
          />
        </ButtonArea>
      </CertificationGuideMain>
    </CertificationPage>
  );
};

export default CertificationGuide;

const CertificationPage = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const CertificationGuideMain = styled.article`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .warning-message {
    text-align: center;
    ${({ theme }) => theme.fonts.contents3};
    color: ${({ theme }) => theme.colors.black500};
  }

  .guide-message-wrapper {
    text-align: center;
    ${({ theme }) => theme.fonts.header3_5};

    .highlight {
      color: ${({ theme }) => theme.colors.pointRed};
      font-weight: 700;
    }

    p + p {
      margin-top: 8px;
    }
  }
`;

const ReceiptImageWrapper = styled.div`
  position: relative;
  width: 205px;
  height: 322px;
  margin: 0 auto;
`;

const ButtonArea = styled.div``;

const FileInput = styled.input`
  color: blue;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
`;
