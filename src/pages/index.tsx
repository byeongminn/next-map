import { Map, Markers, StoreBox } from '@/components';

import * as stores from '@/data/store_data.json';
import { useState } from 'react';

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeDatas = stores['DATA'];

  return (
    <>
      <Map setMap={setMap} />
      <Markers
        map={map}
        storeDatas={storeDatas}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}
