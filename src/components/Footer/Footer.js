import React from "react";
import "./Footer.css";
import {Row, Col} from "react-bootstrap"



const Footer = () =>
    <footer className="footer navbar-staticBottom">
        <Row>
            <Col lg={12}>
            <p className="footerText">RxMinder © 2017</p>
        </Col>
      </Row>
    </footer>;
export default Footer;
