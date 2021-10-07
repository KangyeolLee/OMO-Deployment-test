import { useState } from 'react';
import styled from 'styled-components';

import { HeaderInput } from '@components/Header';
import SearchNoData from '@components/SearchNoData';
import SearchRecord from '@components/SearchRecord';
import StoreDisplay from '@components/StoreDisplay';
import { dummys } from '@temp/SearchListDummy';

import { DetailPageProps } from './[id]';

const Searching = () => {
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [keyword, setKeyword] = useState('');
  const [stores, setStores] = useState<DetailPageProps[]>([]);

  const tempGetStoresByText = (text: string) => {
    const stores = dummys.filter((dummy) => dummy.name.includes(text));
    setIsSearched(true);
    setKeyword(text);
    setStores(stores);
  };

  return (
    <SearchingPage>
      <HeaderInput placeholder="위치/가게명을 검색해주세요." searchHandler={tempGetStoresByText} />
      <SearchingData className="container">
        {stores?.length ? (
          stores.map((store) => (
            <StoreDisplay
              key={store.id}
              id={store.id}
              types={store.types}
              image={store.image}
              name={store.name}
              desc={store.desc}
            />
          ))
        ) : isSearched ? (
          <SearchNoData keyword={keyword} />
        ) : (
          <SearchRecord />
        )}
      </SearchingData>
    </SearchingPage>
  );
};

export default Searching;

const SearchingPage = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SearchingData = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 20px;
`;
