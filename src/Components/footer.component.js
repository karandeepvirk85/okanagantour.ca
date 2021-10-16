import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../logo-footer.png";
export default class Footer extends Component {
    render() {
        return (
            <>
                <div className="container-fluid footer-fluid">
                    <div className="footer-container">
                        <Row>
                            <Col className="footer-logo">
                                <img src={logo} />
                                <p>
                                    <a href="https://www.google.com/maps/place/735+Fraser+Rd,+Kelowna,+BC+V1X+3L3/@49.897662,-119.3963787,17z/data=!3m1!4b1!4m5!3m4!1s0x537d8d369ef9e8a7:0x15f502f4f7633bab!8m2!3d49.897662!4d-119.39419">
                                        735 Fraser Road, Kelowna, V1X3L3
                                    </a>
                                </p>
                                <p>
                                    <a href="mailto:info@KootenayRockies.com">
                                        ikarandeep.singh.virk@gmail.com
                                    </a>
                                </p>
                                <p>
                                    <a href="tel:204-599-1056">204-599-1056</a>
                                </p>
                            </Col>
                            <Col>
                                <h1>Quick Links</h1>
                                <p>
                                    <Link to="/tour/high-spirited-two-day-wine-adventure">
                                        High Spirited Two Day Wine Adventure
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/tour/rocky-mountains-classic-summer-tour">
                                        Rocky Mountains Classic Summer Tour
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/tour/lake-country-wine-tour">
                                        Signature Sip: Half Day Wine Tour
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/tour/lake-country-wine-tour">
                                        Lake Country Wine Tour
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/tour/bicyle-tour-on-historical-kettle-valley-railway">
                                        Bicyle Tour On Historical Kettle..
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/tour/all-star-wineries-of-kelowna-tour">
                                        All Star Wineries of Kelowna Tour
                                    </Link>
                                </p>
                            </Col>
                            <Col>
                                <h1>Categories</h1>
                                <p>
                                    <Link to="/activities">Activity Tours</Link>
                                </p>
                                <p>
                                    <Link to="/wine">Wine Tours</Link>
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div class="my-credits text-center">
                    <p>
                        Designed and Developed by{" "}
                        <a href="https://karandeepvirk.com">Karandeep Virk</a>{" "}
                    </p>
                </div>
            </>
        );
    }
}
