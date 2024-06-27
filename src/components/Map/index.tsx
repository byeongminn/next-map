/* global kakao */

import Script from 'next/script';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { locationState, mapState } from '@/atom';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export const Map = ({ lat, lng, zoom }: MapProps) => {
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOptions = {
        center: new window.kakao.maps.LatLng(
          lat ?? location.lat,
          lng ?? location.lng,
        ),
        level: zoom ?? location.zoom,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOptions);

      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      ></Script>
      <div id="map" className="w-full h-screen"></div>
    </>
  );
};
