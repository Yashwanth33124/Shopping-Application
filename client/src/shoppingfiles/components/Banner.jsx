import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";



import "./Banner.css";

const Banner = () => {
  return (
    <div className="bannersection">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="bannerbox"
      >
        <SwiperSlide>
          <img src={banner1} alt="banner 1" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={banner2} alt="banner 2" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
