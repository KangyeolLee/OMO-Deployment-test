import Image from 'next/image';
import React from 'react';

import * as S from './styles';

type LocationCheckerProps = {
  image: string;
  location: string;
  name: string;
};

const LocationChecker = ({ image, location, name }: LocationCheckerProps) => {
  const handleClickOnReselectStore = () => alert('밑에서 부와앙');

  return (
    <S.LocationChecker>
      <S.TitleWrapper>
        <S.Title>
          이 <strong>장소</strong>가 맞나요?
        </S.Title>
        <S.ReselectBtn onClick={handleClickOnReselectStore}>다시 선택하기</S.ReselectBtn>
      </S.TitleWrapper>

      <S.SelectedStorePreviewWrapper>
        <S.SelectedStoreInfo>
          <h1 className="title">{name}</h1>
          <p className="location">{location}</p>
        </S.SelectedStoreInfo>
        <S.SelectedStoreImageWrapper>
          <Image src={image} alt="매장 프리뷰 이미지" layout="fixed" width={200} height={160} />
        </S.SelectedStoreImageWrapper>
      </S.SelectedStorePreviewWrapper>
    </S.LocationChecker>
  );
};

export default LocationChecker;
