import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

import "swiper/css";
import { getPopular } from "../../../../../types/fetch/getPopular";
import { getPoster } from "../../../../../lib/get/getPoster";

interface ISwiperComponent {
  data: getPopular;
}

export const SwiperComponent = ({ data }: ISwiperComponent) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data.results.map((movie, i) => {
        <SwiperSlide key={i}>
          <img src={getPoster(movie.poster_path)} alt="" />
        </SwiperSlide>;
      })}
    </Swiper>
  );
};
