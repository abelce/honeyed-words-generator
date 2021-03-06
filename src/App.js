import React, { lazy, Suspense, useState } from 'react';
import styled from 'styled-components';

import { getQueryValue } from './utils';
import Loading from './components/Loading';
import ShareQR from './components/ShareQR';
import LoadingWords from './components/LoadingWords';
import StartButton from './components/StartButton';
import RefreshButton from './components/RefreshButton';
import SaveButton from './components/SaveButton';
import Card from './components/Card';

const Header = lazy(() => import('./components/Header'));

const InfoModal = lazy(() => import('./components/InfoModal'));
const MetooButton = styled(StartButton)`
  z-index: 998;
  position: fixed;
  bottom: 0.6rem;
  left: 50%;
  width: 14rem;
  margin-left: -7rem;
`;
const wordsIdx = getQueryValue('idx');
const hasWords = wordsIdx !== '';
const App = () => {
  const [start, setStart] = useState(hasWords);
  const [loading, setLoading] = useState(!hasWords);
  const handleStart = () => {
    setStart(true);
    setLoading(true);
  };
  const handleDone = () => {
    setLoading(false);
  };
  const handleUpdate = () => {
    setLoading(true);
  };
  return (
    <Suspense fallback={<Loading />}>
      {!hasWords && <InfoModal />}
      {start && !loading && !hasWords && <ShareQR />}
      <RefreshButton visible={start && !loading && !hasWords} handleUpdate={handleUpdate} />
      <SaveButton visible={start && !loading && !hasWords} />
      {!start && <Header handleStart={handleStart} />}
      <LoadingWords visible={start && loading} handleDone={handleDone} />
      <Card wordsIdx={wordsIdx} visible={start && !loading} />
      {start && !loading && hasWords && (
        <MetooButton
          onClick={() => {
            location.href = location.href.split('?')[0];
          }}
        >
          我也要生成
        </MetooButton>
      )}
    </Suspense>
  );
};
export default App;
