import React from 'react';
import Item from './ProductItem'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function ProductList({products, openModal}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5// optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <div className='list'>
      <Carousel 
      responsive={responsive}
      swipeable={false}
      draggable={false}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      >
      {products.map((item, index) => 
        <Item item={item} openModal={openModal} key={index}/>
      )}
    </Carousel>
  </div>
  );
}

export default ProductList;