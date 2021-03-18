import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import FoodImage1 from "../images/f1.jpg"
import FoodImage2 from "../images/f2.jpg"
import FoodImage3 from "../images/f3.jpg"
import "../styles/hero.styles.css"


const Hero = () => {
  return (
    <Carousel fade>
      <Carousel.Item className="main-div-hero">
        <img
          className="d-block w-100 image-hero"
          src={FoodImage1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="main-div-hero">
        <img
          className="d-block w-100 image-hero"
          src={FoodImage2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="main-div-hero">
        <img
          className="d-block w-100 image-hero"
          src={FoodImage3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Hero;
