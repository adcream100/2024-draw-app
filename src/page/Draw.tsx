import { useRef, useEffect } from 'react';
import Loading from '../components/Loading';
import DrawCard from '../components/DrawCard';
import useDrawData from '../hook/useDrawData';
import useCheckHome from '../hook/useCheckHome';
import { Swiper, SwiperSlide } from 'swiper/react';
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
    <>
      {isLoading && <Loading />}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <video
            className="w-full h-screen object-cover"
            src="/videos/bg.mp4"
            autoPlay
            loop
            muted
          />
        </div>
        <div
          className={`${
            isLoading && 'blur-sm'
          }  h-full text-center flex flex-col justify-center items-center`}
        >
          <h1 className="relative text-[2rem] font-bold mb-6 text-[#fff]">
            서울영상광고제를 후원해 주신 광고주께 감사드립니다.
          </h1>
          <div className="w-[1000px] mt-8">
            <Swiper className="mySwiper" ref={swiperRef}>
              {data.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <DrawCard key={index} {...item} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Draw;
