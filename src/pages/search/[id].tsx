import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValueLoadable, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import FavoriteFilledIcon from '@assets/favorite.svg';
import FavoriteOutlineIcon from '@assets/favorite_border.svg';
import Header from '@components/Header';
import Button from '@components/Shared/Button';
import { PageLoading } from '@components/Shared/Loading';
import StoreDescription from '@components/StoreDescription';
import { StoreDisplayProps } from '@components/StoreDisplay';
import { Omakase, currentOmakaseQuery } from '@recoil/omakaseState';
import { requestLike } from '@request';

export interface DetailPageProps extends StoreDisplayProps {
  description: string;
  phone_number: string;
  price_information: string;
  business_hours: string;
  recommendation_count: number;
  is_certification: boolean | null;
  is_recommendation: boolean;
}

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state, contents } = useRecoilValueLoadable(currentOmakaseQuery(Number(id)));
  const [isLiked, setIsLiked] = useState<boolean>(contents?.is_recommendation);
  const [likeCount, setLikeCount] = useState<number>(contents?.recommendation_count ?? 0);
  const refresh = useResetRecoilState(currentOmakaseQuery(Number(id)));

  useEffect(() => {
    return () => refresh();
  }, [refresh]);

  useEffect(() => {
    if (state === 'hasValue') {
      setIsLiked(contents.is_recommendation);
      setLikeCount(contents.recommendation_count);
    }
  }, [state]);

  if (state === 'loading') return <PageLoading />;

  const omakase = contents as Omakase;

  const handleClickOnLikeBtn = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);
    requestLike(Number(id));
  };

  return (
    <DetailPage>
      <Header />
      <ImageWrapper>
        <Image src={omakase.image_url} alt="가게 이미지" layout="fill" />
      </ImageWrapper>
      <StoreDescription store={omakase} />

      <ButtonWrapper>
        <LikeButton onClick={handleClickOnLikeBtn}>
          {isLiked ? <FavoriteFilledIcon /> : <FavoriteOutlineIcon />}
          <span className="count">{likeCount}</span>
        </LikeButton>
        <Button
          clickListener={() =>
            router.push({
              pathname: '/certification/guide',
              query: { id },
            })
          }
          color="#fff"
          bgColor="#293AD2"
          text="이 가게 도장깨기"
        />
      </ButtonWrapper>
    </DetailPage>
  );
};

export default Detail;

const DetailPage = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;

  header {
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    z-index: 100;

    svg path {
      fill: #fff;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  min-height: 190px;
  height: 224px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  background-color: #fff;
  position: fixed;
  bottom: 20px;
  width: 100%;
  padding: 0 20px;
  padding-top: 10px;
  box-sizing: border-box;
  display: flex;
`;

const LikeButton = styled.button`
  border: none;
  outline: none;
  border-radius: 10px;
  margin-right: 8px;
  box-sizing: content-box;
  background-color: ${({ theme }) => theme.colors.black100};
  width: 54px;
  height: 54px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .count {
    color: ${({ theme }) => theme.colors.pointRed};
    ${({ theme }) => theme.fonts.contents3};
  }
`;
