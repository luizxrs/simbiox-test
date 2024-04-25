import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

import "swiper/css";

interface ISwiperComponent {}

export const SwiperComponent = ({}: ISwiperComponent[]) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      ...
    </Swiper>
  );
};
