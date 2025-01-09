import { useRef, useEffect } from 'react';

import FinalView from '../components/FinalView';
import useDrawData from '../hook/useDrawData';
import useCheckHome from '../hook/useCheckHome';

import { Swiper as SwiperClass } from 'swiper';

const Draw = () => {
  useCheckHome();
  const { data, isLoading } = useDrawData();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<SwiperClass | null | any>(null);

  useEffect(() => {
    const syncSlide = () => {
      const slice = localStorage.getItem('slice');
      if (swiperRef.current && swiperRef.current.swiper && slice !== null) {
        swiperRef.current.swiper.slideTo(parseInt(slice, 10));
      }
    };
    syncSlide();

    window.addEventListener('storage', syncSlide);
    return () => {
      window.removeEventListener('storage', syncSlide);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden flex justify-center items-center bg-[#ffff]">
      <div
        className={`${
          isLoading && 'blur-sm'
        } flex flex-col justify-center items-center text-center`}
      >
        <h1 className="text-[2rem] font-bold mb-6 text-black">
          서울영상광고제를 후원해 주신 광고주께 감사드립니다.
        </h1>
        <div className="w-full  p-12 mt-8 border-gray-700 flex justify-center gap-6">
          {data.map((item, index) => {
            return <FinalView key={index} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Draw;
