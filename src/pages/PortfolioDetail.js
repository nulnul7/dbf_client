import React from 'react';
import ImageSliders from '../components/ImageSliders';

import image1 from '../assets/slide_1.jpeg'
import image2 from '../assets/slide_2.jpeg'
import image3 from '../assets/slide_3.jpeg'
import image4 from '../assets/slide_4.jpeg'
import image5 from '../assets/slide_5.jpeg'
import image6 from '../assets/slide_6.jpeg'


const PortfolioDetail = () => {
  return <>
    <ImageSliders images={[image1, image2, image3, image4, image5, image6]}>

    </ImageSliders>
  </>;
};

export default PortfolioDetail;
