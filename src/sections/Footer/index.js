import React from "react";
import logo from "../../assets/images/logo.png";
import discord from "../../assets/images/media/discord.png";
import facebook from "../../assets/images/media/facebook.png";
import instagram from "../../assets/images/media/instagram.png";
import reddit from "../../assets/images/media/reddit.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center">
          {/* <!-- Left Column --> */}
          <div className="col-lg-5 mb-4">
            <a href="/">
              <img
                src={logo}
                alt="Logo"
                className="mb-3"
                style={{ height: "50px" }}
              />
            </a>
            <p className="text-white fs-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum
              modi, possimus dolore saepe nobis itaque cupiditate veniam
              nostrum, provident quam, nequeab dicta velit debitis cum unde
              recusandae. Fuga, consectetur.
            </p>
            <h6 className="fw-semibold">Join Us on</h6>
            <div className="d-flex gap-3 mt-2">
              <button className="btn p-0 m-0">
                <img src={reddit} alt="Reddit" width="32" />
              </button>
              <button className="btn p-0 m-0">
                <img src={discord} alt="Discord" width="32" />
              </button>
              <button className="btn p-0 m-0">
                <img src={instagram} alt="Instagram" width="32" />
              </button>
              <button className="btn p-0 m-0">
                <img src={facebook} alt="facebook" width="32" />
              </button>
            </div>
          </div>

          {/* <!-- Right Column --> */}
          <div className="col-lg-5 mb-4">
            <h2 className="fw-bold">GET NOTIFIED</h2>
            <p className="text-white">
              Get emails for latest news about anime, and more.
            </p>
            <form className="subscribe-form">
              <div className="input-group mb-2">
                <input
                  type="email"
                  name="email"
                  className="form-control text-white"
                  placeholder="info@example.com"
                  required
                />
                <button type="submit" className="btn btn-outline-light">
                  Subscribe
                </button>
              </div>
            </form>
            <small className="text-white">
              <p>By subscribing you agree to our terms and conditions.</p>
            </small>
          </div>
        </div>
      </div>

      <hr className="border-secondary line" />

      {/* Bottom Footer */}
      <div className="container-fluid pb-3 bottom-footer">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            © 2025 All rights reserved by <a href="/">The Movie Web App</a>.
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="/" className="me-3">
              Privacy Policy
            </a>
            <a href="/">Comments Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
