import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import sliderBg from '../../../../assets/bg-slider.png'

export default function HomeSwipper() {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{ clickable: true}}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="z-0 mt-[103px]"
      >
        <SwiperSlide>
          <div className='h-full w-full py-3 flex bg-red-300 justify-center bg-top bg-cover' style={{ backgroundImage: `url(${sliderBg})` }}>
            <div className='font-["Kanit"] text-center font-semibold max-[450px]:text-lg max-[450px]:leading-6 text-2xl sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl pt-[6%]'>
              Film izləmək üçün <br /> ingiliscə öyrənmək <br /> istəyirsiz?
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='h-full w-full py-3 flex bg-red-300 justify-center bg-top bg-cover' style={{ backgroundImage: `url(${sliderBg})` }}>
            <div className='font-["Kanit"] text-center font-semibold max-[450px]:text-base max-[450px]:leading-6 text-2xl sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl pt-[6%]'>
              Elə isə istədiyiniz <br /> film və ya serialı <br /> seçərək başlayın
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='h-full w-full py-3 flex bg-red-300 justify-center bg-top bg-cover' style={{ backgroundImage: `url(${sliderBg})` }}>
            <div className='font-["Kanit"] text-center font-semibold max-[450px]:text-base max-[450px]:leading-6 text-2xl sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl pt-[6%]'>
              İstifadə olunan sözləri <br /> öyrənib quizdə xal <br /> toplamağa başlayın
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='h-full w-full py-3 flex bg-red-300 justify-center bg-top bg-cover' style={{ backgroundImage: `url(${sliderBg})` }}>
            <div className='font-["Kanit"] text-center font-semibold max-[450px]:text-base max-[450px]:leading-5 text-2xl sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl pt-[4%]'>
              Həmçinin Bloqlar <br /> hissəsində <br /> bloq yarada və <br />oxuya bilərsiniz
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

