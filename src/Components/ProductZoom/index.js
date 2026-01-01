import { AnimatePresence, motion } from 'framer-motion';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useEffect, useState } from 'react';

const ProductZoom = ({ images, discount }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  // Preload images
  useEffect(() => {
    if (images && images.length > 0) {
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [images]);

  if (!images || images.length === 0) {
    return <p>No images found</p>;
  }

  return (
    <div className="productZoom d-flex" style={{ gap: '20px', alignItems: 'flex-start' }}>
      
      {/* Thumbnails */}
      <div
        className="thumbnails"
        style={{
          width: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Swiper
          direction="vertical"
          slidesPerView={4}
          spaceBetween={12}
          style={{ height: '420px' }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSlideIndex(index)}
                style={{
                  cursor: 'pointer',
                  border: slideIndex === index ? '2px solid #007bff' : '1px solid #ddd',
                  borderRadius: '8px',
                  width: '90px',
                  height: '90px',
                  objectFit: 'cover',
                  padding: '4px',
                  backgroundColor: '#fff',
                  boxShadow: slideIndex === index ? '0 0 8px rgba(0, 123, 255, 0.5)' : 'none',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Image with Discount Badge */}
      <div
        style={{
          flexGrow: 1,
          width: '100%',
          maxWidth: '550px',
          aspectRatio: '17/21',
          background: '#fff',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        {/* Animate Discount Badge */}
        <AnimatePresence>
          {discount && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
              className="badge badge-primary"
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: '#007bff',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                zIndex: 10,
              }}
            >
              {discount}% OFF
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animate Image Switching */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <InnerImageZoom
              src={images[slideIndex]}
              zoomSrc={images[slideIndex]}
              zoomScale={1.3}
              zoomType="hover"
              alt={`Zoomed image ${slideIndex + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
                display: 'block',
              }}
            />
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};

export default ProductZoom;
