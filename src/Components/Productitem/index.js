import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { TfiFullscreen } from "react-icons/tfi";
import { IoMdHeartEmpty } from "react-icons/io";
import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { MyContext } from "../../App";

import "swiper/css";
import "swiper/css/pagination";

const ProductItem = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const swiperInstance = useRef(null);
  const context = useContext(MyContext);

  const viewProductDetails = (id) => {
    context.setIsOpenProductModal({
      id: id,
      open: true,
    });
  };

  const backendUrl = "http://localhost:8080";
  const productImages =
    props.item?.images?.length > 0
      ? props.item.images.map((image) => `${backendUrl}${image}`)
      : ["/default-image.jpg"];

  return (
    <div
      className={`productItem ${props.itemView}`}
      onMouseEnter={() => {
        setIsHovered(true);
        if (swiperInstance.current?.autoplay) {
          swiperInstance.current.autoplay.start();
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (swiperInstance.current?.autoplay) {
          swiperInstance.current.autoplay.stop();
        }
      }}
    >
      {/* Product Image */}
      <div className="imgWrapper">
        <Link to={`/product/${props.item?._id}`} className="imgWrapper-link">
          {isHovered ? (
            <Swiper
              onSwiper={(swiper) => (swiperInstance.current = swiper)}
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop={true}
              slidesPerView={1}
            >
              {productImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} className="productImage" alt={props.item?.name} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src={productImages[0]}
              className="productImage"
              alt={props.item?.name}
            />
          )}
        </Link>

        <span className="badge badge-primary">27%</span>

        {/* Action Buttons */}
        <div className="actions">
          <Button onClick={() => viewProductDetails(props.item?._id)}>
            <TfiFullscreen />
          </Button>

          <Button
  onClick={() => context.addToWishlist(props.item)}
  className="wishlist-btn"
>
  {context.wishlist.some(w => w._id === props.item._id) ? (
    <IoMdHeartEmpty style={{ color: "red", fontSize: "22px", fill: "red" }} />
  ) : (
    <IoMdHeartEmpty style={{ fontSize: "22px" }} />
  )}
</Button>

        </div>
      </div>

      {/* Product Info */}
      <div className="info">
        <h4>{props.item?.name || "Product Name"}</h4>
        <span className="text-success d-block">
          {props.item?.countInStock > 0 ? "In Stock" : "Out of Stock"}
        </span>

        <Rating
          className="mt-2 mb-2"
          name="read-only"
          value={props.item?.rating || 0}
          readOnly
          size="small"
          precision={0.5}
        />

        <div className="d-flex">
          <span className="oldPrice">${props.item?.oldPrice || "00.00"}</span>
          <span className="netPrice text-danger ml-2">
            ${props.item?.price || "00.00"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
