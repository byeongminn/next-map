'use client';

import { CurrentLocationButton, Map, Markers, StoreBox } from '@/components';
import { StoreType } from '@/interface';

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const stores: StoreType[] = await getData();

  return (
    <>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
      <CurrentLocationButton />
    </>
  );
}
