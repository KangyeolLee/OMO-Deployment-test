// 기본 찾기 페이지

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import DisplayListIcon from '@assets/display-list.svg';
import DisplayWideIcon from '@assets/display-wide.svg';
import QuestionIcon from '@assets/question.svg';
import SearchIcon from '@assets/search.svg';
import Layout from '@components/Layout';
import SearchResults from '@components/SearchResults';
import { GradeDescriptionModal } from '@components/Shared/Modal';
import { LEVEL, omakaseKeywordState, omakaseLevelState } from '@recoil/omakaseState';

type Mode = 'wide' | 'list';
const ISSERVER = typeof window === 'undefined';

const Search = () => {
  const menuMode = ISSERVER ? 'wide' : (localStorage.getItem('menu-mode') as Mode);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mode, setMode] = useState<Mode>(menuMode);
  const [tab, setTab] = useRecoilState(omakaseLevelState);
  const [keyword, setKeyword] = useRecoilState(omakaseKeywordState);

  useEffect(() => {
    const storage = localStorage.getItem('menu-mode') as Mode | null;

    if (!storage) {
      localStorage.setItem('menu-mode', 'wide');
      return;
    }

    setMode(storage);

    return () => setKeyword('');
  }, [setKeyword]);

  const toggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const handleClickOnModeBtn = () => {
    if (mode === 'wide') {
      localStorage.setItem('menu-mode', 'list');
      setMode('list');
    } else {
      localStorage.setItem('menu-mode', 'wide');
      setMode('wide');
    }
  };

  const handleClickOnTabs = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLSpanElement)) return;

    const level = e.target.id as LEVEL;
    setTab(level);
  };

  return (
    <Layout title="오마카세 찾기">
      <SearchPage className="container">
        <FixedArea>
          <div className="tabs" onClick={(e) => handleClickOnTabs(e)}>
            <span id="ENTRY" className={`tab ${tab === 'ENTRY' ? 'active' : ''}`}>
              엔트리
            </span>
            <span id="MIDDLE" className={`tab ${tab === 'MIDDLE' ? 'active' : ''}`}>
              미들
            </span>
            <span id="HIGH" className={`tab ${tab === 'HIGH' ? 'active' : ''}`}>
              하이엔드
            </span>
            <QuestionIcon className="float-right" onClick={toggleModal} />
          </div>

          <Link href="/search/searching" passHref>
            <a>
              <SearchBar>
                <span>{keyword || '이름/지역구를 검색해주세요'}</span>
                <SearchIcon />
              </SearchBar>
            </a>
          </Link>

          <div className="header-wrapper">
            <h1 className="sub-title">인기순 오마카세</h1>
            {mode === 'wide' ? (
              <DisplayListIcon onClick={handleClickOnModeBtn} />
            ) : (
              <DisplayWideIcon onClick={handleClickOnModeBtn} />
            )}
          </div>
        </FixedArea>

        <SearchResults />
      </SearchPage>
      {isOpenModal && <GradeDescriptionModal toggleModal={toggleModal} />}
    </Layout>
  );
};

export default Search;

const SearchPage = styled.section`
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
  }

  .sub-title {
    ${({ theme }) => theme.fonts.subTitle1};
  }

  .tabs {
    position: relative;
    display: flex;
    align-items: center;
    ${({ theme }) => theme.fonts.subTitle3};
    color: ${({ theme }) => theme.colors.black400};

    .float-right {
      position: absolute;
      right: 0;
    }

    .tab {
      margin-right: 10px;
      padding-bottom: 5px;

      &.active {
        color: #000;
        border-bottom: 2px solid ${({ theme }) => theme.colors.pointRed};
      }
    }
  }
`;

const SearchBar = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.black100};
  padding: 12px 16px;
  margin: 18px auto;

  span {
    ${({ theme }) => theme.fonts.contents3};
    color: #000;
  }
`;

const FixedArea = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  padding-bottom: 20px;

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 36px;
  }
`;
