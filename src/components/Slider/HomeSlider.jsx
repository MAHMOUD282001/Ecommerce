import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import style from "./HomeSlider.module.css"
import firstImg from "../../assets/1.jpg"
import secondImg from "../../assets/2.jpg"
import thairdImg from "../../assets/3.jpg"



function HomeSlider() {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return <div className={`${style.slider}`}>
    <div className="container">
        <div className="slider-content">
            <Slider {...settings}>
              <div className={`${style.sliderItem}`}>
                <img src={firstImg} alt="First Img"/>
              </div>
              <div className={`${style.sliderItem}`}>
                <img src={secondImg} alt="Second Img"/>
              </div>
              <div className={`${style.sliderItem}`}>
                <img src={thairdImg} alt="Thaird Img"/>
              </div>
            </Slider>
        </div>
    </div>
  </div>;
}

export default HomeSlider;
