import styled from 'styled-components';

import MyPageLayout from '@components/Layout/MyPageLayout';
import MyProfile from '@components/MyProfile';
import VisitedStore from '@components/VisitedStore';
import { useUserRecoilValue } from '@recoil/userState';
import { dummys } from '@temp/VisitedStoreDummy';

const MyPage = () => {
  const { contents: userValue } = useUserRecoilValue();

  return (
    <MyPageLayout>
      <MyProfile userValue={userValue} />
      <MyPagePage className="container">
        <div className="store-list-title">
          <span>{userValue.info?.nickname}</span>님의 오마카세 리스트
        </div>
        <div className="store-list-layout">
          {dummys.map((dummy) => (
            <VisitedStore
              key={dummy.id}
              id={dummy.id}
              image={dummy.image}
              name={dummy.name}
              date={dummy.date}
            />
          ))}
        </div>
      </MyPagePage>
    </MyPageLayout>
  );
};

export default MyPage;

const MyPagePage = styled.div`
  .store-list-title {
    ${({ theme }) => theme.fonts.subTitle1};
    margin-bottom: 1.5rem;
  }
  .store-list-layout {
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px 15px;
  }
`;
