
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';




const HomeBanner = () => {
   
  return (
    <div className="container mt-3">
        <div className="homeBannerSection">
        <Swiper
          slidePerView={1}
          spaceBetween={15}
          navigation={false}
          loop={false}
          autoplay={{
              delay:2500,
              displayOnInteraction:false,
          }}
         modules={[Navigation,Autoplay]}
          className="mySwiper"
           >
            <SwiperSlide>
        
            <div className="item">
                <img src="https://gocolors.com/cdn/shop/files/Jan_1_Eoss_D.jpg?v=1767241771" className="w-100"/>

            </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src="https://gocolors.com/cdn/shop/files/Jan_1_Banner_2_D.jpg?v=1767241771" className="w-100" />

                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src="https://gocolors.com/cdn/shop/files/Jan_1_Banner_2_D.jpg?v=1767241771" className="w-100" />

                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src="https://gocolors.com/cdn/shop/files/Jan_1_Banner_2_D.jpg?v=1767241771" className="w-100" />

                </div>
            </SwiperSlide>
            
            
            
         </Swiper>


    </div>

    </div>
  )
}

export default HomeBanner;