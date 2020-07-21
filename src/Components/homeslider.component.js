import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import slider1 from "../images/S1.jpg";
import slider2 from "../images/S2.jpg";
import slider3 from "../images/S3.jpg";

export default class Slider extends Component {
    render() {
        return (
            <div className="container-fluid slider-fluid">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={slider1}
                            alt="First slide"
                            />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={slider2}
                            alt="Third slide"
                            />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={slider3}
                            alt="Third slide"
                            />
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}