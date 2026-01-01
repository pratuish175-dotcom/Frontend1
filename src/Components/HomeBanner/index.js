
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
                <img src="https://cmsimages.shoppersstop.com/static_web_Adidas_puma_and_more_fab67b1371/static_web_Adidas_puma_and_more_fab67b1371.png" className="w-100"/>

            </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src="https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427470/1731427468095_New_Project_13.jpg" className="w-100" />

                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src="https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427548/1731427544379_New_Project_6.jpg" className="w-100" />

                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="item">
                    <img src="https://res.cloudinary.com/dkgonwhvj/image/upload/v1731427522/1731427519864_New_Project_11.jpg" className="w-100" />

                </div>
            </SwiperSlide>
            
            
            
         </Swiper>


    </div>

    </div>
  )
}

export default HomeBanner;