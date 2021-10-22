import styled from 'styled-components';

import Layout from '@components/Layout';
import RankingProfile from '@components/RankerProfile/RankingProfile';
import RankingBar from '@components/RankingBar';

export interface RankingProps {
  rankingList: {
    rank: number;
    name: string;
    amount: number;
  }[];
}

// const Top3RankingSection = ({ rankingList }: RankingProps) => (
//   <Top3RankingSectionWrapper>
//     <div className="rankers">
//       {rankingList.map(({ rank, name, amount }) => (
//         <RankingProfile rank={rank} name={name} amount={amount} key={rank} />
//       ))}
//     </div>
//   </Top3RankingSectionWrapper>
// );

// const OhtersRankingSection = ({ rankingList }: RankingProps) => (
//   <OthersRankingSectionWrapper>
//     {rankingList.map(({ rank, name, amount }) => (
//       <RankingBar rank={rank} nickname={name} amount={amount} key={rank} />
//     ))}
//   </OthersRankingSectionWrapper>
// );

const Ranking = () => {
  const rankingList = [
    { rank: 1, name: '오마', amount: 99 },
    { rank: 2, name: '카세', amount: 100 },
    { rank: 3, name: '오모', amount: 101 },
    { rank: 4, name: '박일등', amount: 34 },
    { rank: 5, name: '지니', amount: 13 },
    { rank: 6, name: '박일등', amount: 3 },
    { rank: 7, name: '박일등', amount: 34 },
    { rank: 8, name: '지니', amount: 13 },
    { rank: 9, name: '박일등', amount: 3 },
    { rank: 10, name: '박일등', amount: 3 },
    { rank: 11, name: '박일등', amount: 3 },
    { rank: 12, name: '박일등', amount: 3 },
    { rank: 13, name: '박일등', amount: 3 },
    { rank: 14, name: '박일등', amount: 3 },
  ];
  const othersRankingList = rankingList.slice(3);
  //TODO: login한 userID로 myRanking값 바꾸기
  const myRanking = rankingList.slice(0, 1);

  return (
    <Layout title="명예의 전당 ✨">
      <OmakasePioneerSection>
        <OmakasePioneerWrapper />
      </OmakasePioneerSection>
      {/* <Top3RankingSection rankingList={top3RankingList} /> */}
      <MyRangkingSection>
        {myRanking.map(({ rank, name, amount }) => (
          <RankingBar rank={rank} nickname={name} amount={amount} key={rank} />
        ))}
      </MyRangkingSection>
    </Layout>
  );
};

export default Ranking;

const OmakasePioneerSection = styled.section`
  padding: 0 20px;
`;

const OmakasePioneerWrapper = styled.div`
  width: 100%;
  height: 131.35px;
  background-color: #293ad2;
  border-radius: 16px;
`;

const OthersRankingSectionWrapper = styled.section`
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  padding: 17px 24px;

  h2 {
    ${({ theme }) => theme.fonts.contentsBold};
    font-size: 18px;
    line-height: 26px;
    margin-bottom: 14px;
  }

  .ranking-bar {
    margin-bottom: 11px;
  }
`;

const MyRangkingSection = styled.section`
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: fit-content;
  padding: 17px 24px;
  left: 0px;
  bottom: 56px;
  background-color: white;
  box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.1);
`;
