import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import styled, { css } from 'styled-components';

import { SearchBottomActionSheet as StyledSearchBottomActionSheet } from '@/components/Certification/styles';
import {
  LocationChecker,
  ReceiptChecker,
  SearchBottomActionSheet,
} from '@components/Certification';
import Header from '@components/Header';
import Button from '@components/Shared/Button';
import { CertificationModal } from '@components/Shared/Modal';
import { DetailPageProps } from '@pages/search/[id]';
import { selectedReceipt } from '@recoil/certificationState';
import { Omakase, currentOmakaseState } from '@recoil/omakaseState';
import { requestStamp } from '@request';

const Certification = () => {
  const { query } = useRouter();
  const { id } = query;
  const [store, setStore] = useState<DetailPageProps>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActionSheetActive, setIsActionSheetActive] = useState(false);
  const receipt = useRecoilValue(selectedReceipt);
  const [blobUrl, setBlobUrl] = useState('/images/receipt.png');
  const { state, contents } = useRecoilValueLoadable(currentOmakaseState(Number(id)));

  const handleClickOnReselectLocation = () => {
    setIsActionSheetActive((prev) => !prev);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const transformedBlobUrl = URL.createObjectURL(receipt!);
    setBlobUrl(transformedBlobUrl);
    return () => URL.revokeObjectURL(transformedBlobUrl);
  }, [receipt]);

  if (state === 'loading') return '...loading';

  const omakase = contents as Omakase;

  const handleSubmitReceipt = () => {
    const formData = new FormData();
    formData.append('omakaseId', String(id));
    formData.append('receiptIssuaranceData', dayjs().format('YYYY-MM-DD'));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    formData.append('receiptImage', receipt!);

    requestStamp(formData);
    setIsModalOpen(true);
  };

  return (
    <CertificationPage isActionSheetActive={isActionSheetActive}>
      <Header title="인증확인" />
      <CertificationMain className="container">
        <LocationChecker
          store={store}
          image={omakase.image_url}
          address={omakase.address}
          name={omakase.name}
          handleClickOnReselectLocation={handleClickOnReselectLocation}
        />

        <ReceiptChecker blobUrl={blobUrl as string} />

        <Button
          clickListener={handleSubmitReceipt}
          color="#fff"
          bgColor="#293AD2"
          text="도장깨기 접수하기"
        />
      </CertificationMain>

      {isModalOpen && <CertificationModal name={omakase.name} />}
      <SearchBottomActionSheet
        setStore={setStore}
        handleClickOnReselectLocation={handleClickOnReselectLocation}
      />
    </CertificationPage>
  );
};

export default Certification;

const CertificationPage = styled.section<{ isActionSheetActive: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  ${StyledSearchBottomActionSheet} {
    visibility: hidden;
    transform: translateY(0);
  }

  ${({ isActionSheetActive }) =>
    isActionSheetActive &&
    css`
      ${StyledSearchBottomActionSheet} {
        transform: translateY(0);
        visibility: visible;
      }

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 10;
      }
    `}
`;

const CertificationMain = styled.article`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
