import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Category } from '@mui/icons-material'; // Make sure you are using the correct icon if necessary

const HomeCat = (props) => {
  // Make sure to access props.catData instead of catData
  const { catData } = props; // Destructure catData from props

  return (
    <section className="homeCat">
      <div className="container">
        <h3 className="mb-3 hd">Featured Categories</h3>
        <Swiper
          slidesPerView={10}
          spaceBetween={8}
          slidesPerGroup={3}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 10 },
          }}
        >
          {/* Corrected ternary operator for rendering categories */}
          {catData && catData.length > 0 ? (
            catData.map((category, index) => (
              <SwiperSlide key={index}>
                <div className="item text-center cursor" style={{ background: category.color }}>
                  <img src={category.images[0]} alt={category.name} />
                  <h6>{category.name}</h6>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p>No categories available</p> // Fallback message when no categories are available
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeCat;
