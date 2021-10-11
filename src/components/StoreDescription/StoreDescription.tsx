import Button from '@components/Shared/Button';
import { DetailPageProps } from '@pages/search/[id]';

import * as S from './styles';

interface StoreDescriptionProps {
  store: DetailPageProps;
}

const StoreDescription = ({ store }: StoreDescriptionProps) => {
  return (
    <S.StoreDescription>
      <div className="content-wrapper">
        <h1 className="list title">{store.name}</h1>
        <pre className="list desc">{store.location}</pre>
        <div className="list sub-contents">
          <p className="sub-title">위치 :</p>
          <p>{store.location}</p>
        </div>
        <div className="list sub-contents">
          <p className="sub-title">전화번호 :</p>
          <p>{store.tel}</p>
        </div>
        <div className="list sub-contents">
          <p className="sub-title">가격대 :</p>
          <p>{store.price}</p>
        </div>
        <div className="list hashtag-wrapper">
          {store.types.map((type) => (
            <S.HashTag key={type}>#{type}</S.HashTag>
          ))}
        </div>
      </div>

      <div className="button-wrapper">
        <Button clickListener={() => alert('문의중')} text="예약 문의 하기" />
        <Button clickListener={() => alert('문의중')} bgColor="#c9c9c9" text="이 가게 도장깨기" />
      </div>
    </S.StoreDescription>
  );
};

export default StoreDescription;
