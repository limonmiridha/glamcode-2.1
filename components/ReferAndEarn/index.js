import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import Slider from 'react-slick';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import girl from '../../assets/img/girl.jpg';
// import Image from 'next/image';

function CustomNextArrow(props) {
  const { className, onClick } = props;
  return <div className={`${className}`} onClick={onClick}></div>;
}

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

const ReferAndEarn = (props) => {
  console.log(props, 'ddd');
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'https://admin.glamcode.in/api/offers-banners';
      const response = await fetch(apiUrl);
      const data = await response.json();
      setBannerData(data.offers_banner);
    };

    fetchData();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          variableWidth: true,
        },
      },
    ],
  };

  return (
    <div className="refer-earn mx-2 mx-md-4 mx-lg-5">
      <Slider {...settings}>
        {[1, 2, 3, 4, 5, 6].map(() => (
          <Card className="border-0 rounded-3 px-2 card refer-earn-img position-relative">
            <Link href="/">
              {bannerData.map((banner) => (
                <div className="img-container">
                  <img
                    src={`https://admin.glamcode.in/${banner.image}`}
                    className="rounded-3"
                    style={{
                      objectFit: 'cover',
                      height: '12rem',
                      width: '100%',
                    }}
                  />
                </div>
              ))}
              {/* <img
                src={girl.src}
                width="100%"
                height="100%"
                className="rounded-3"
                style={{ objectFit: 'cover' }}
              /> */}
              <br />

              <div className="position-absolute top-0 left-0 p-3 text-white">
                <h6 className="fs-5 fw-bold m-0">Refer a Friend</h6>
                <p className="m-0">to download GC App and earn</p>
                <span className="fs-5 fw-bold"> ₹ 100</span>
                <button
                  className="d-block border-0 text-white px-2 py-1 mt-3 fw-normal"
                  style={{ background: '#0000004c' }}
                >
                  Explore Offer
                </button>
              </div>
            </Link>
            {/* <div className="w-100 h-100 bg-black position-absolute top-0 left-0 opacity-50"></div> */}
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default ReferAndEarn;

export async function getServerSideProps(context) {
  const res = await fetch(`https://admin.glamcode.in/api/offers-banners`);
  const data = await res.json();
  console.log(data);
  return {
    props: data,
  };
}
