import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination, Autoplay  } from 'swiper/modules';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Container from 'react-bootstrap/esm/Container';


export default function HomeSwipper() {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper z-0 mt-[103px]"
      >
        <SwiperSlide>
          <div className='h-full w-full bg-[var(--movies-bg)] py-3 flex items-center justify-center'>
            <Container>
              <div>
                <h1 className='font-["Kanit"] text-center text-[var(--text-color)]'>Filmlərə baxmaq üçün ingiliscə öyrənmək istəyirsiz mi?</h1>
                <div className='grid grid-cols-[3fr_2fr] max-w-[1000px] mx-auto my-0'>
                  <DotLottieReact
                    src="https://lottie.host/b9380d6d-965a-4b6f-901c-62a28b7385b6/QZIsy00JCk.lottie"
                    loop
                    autoplay
                  />
                  <div className='font-["PT_Serif"] text-center text-[var(--text-color)] flex items-center justify-center text-3xl'>
                    <p>Elə isə ilk öncə istədiyiniz film və ya serialı seçin</p>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='h-full w-full bg-[var(--movies-bg)] py-3 flex items-center justify-center'>
            <Container>
              <div>
                <div className='grid grid-cols-[1fr_1fr] max-w-[1000px] mx-auto my-0'>
                  <div className='font-["PT_Serif"] text-center text-[var(--text-color)] flex items-center justify-center text-3xl '>
                    <p>Əgər serial seçimi etmisinizsə serialın sezon və bölümünü də seçin</p>
                  </div>
                  <DotLottieReact
                    src="https://lottie.host/ed9f6416-a670-422c-b445-5168ae26bb65/cq6nhkEF0T.lottie"
                    loop
                    autoplay
                  />
                </div>
              </div>
            </Container>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='h-full w-full bg-[var(--movies-bg)]'></div>
          {/* <img src="https://swiperjs.com/demos/images/nature-3.jpg" /> */}
        </SwiperSlide>
        <SwiperSlide>
          <div className='h-full w-full bg-[var(--movies-bg)]'></div>
          {/* <img src="https://swiperjs.com/demos/images/nature-4.jpg" /> */}
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

