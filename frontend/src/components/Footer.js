import React from "react";
import "../styles/footer.styles.css";

const Footer = () => {
  return (
    <div className="footer mt-5">

      <div className="row">
        <div className="col-md-4 col-12">
          <h3>Your Logo</h3>
          <h3><i class="fas fa-business-time mr-2"></i>Timings </h3>
          <div class="d-flex flex-column">
            <div class="p-2">
              Working Schedule Mon - Sat: 9:00 am - 10:00 pm Sun: 10:00 am -
              8:00 pm
            </div>
          </div>
        </div>
        <div className="col-md-4 col-12">
          <h3>Links</h3>
          <div class="d-flex flex-column">
            <div class="p-2">Home</div>
            <div class="p-2">About Us</div>
            <div class="p-2">Contact Us</div>
          </div>
        </div>

        <div className="col-md-4 col-12">
          <h3>Social</h3>
          <div class="d-flex flex-column">
            <a
              className="footer-icons-link"
              target="_blank"
              href="https://www.facebook.com/"
            >
              <div class="p-2 social-icons-footer">
                <i class="fab fa-facebook mr-2"></i>
                Facebook
              </div>
            </a>
            <a
              className="footer-icons-link"
              target="_blank"
              href="https://www.facebook.com/"
            >
              <div class="p-2 social-icons-footer">
                <i class="fab fa-instagram mr-2"></i>Instagram
              </div>
            </a>
            <a
              className="footer-icons-link"
              target="_blank"
              href="https://www.facebook.com/"
            >
              <div class="p-2 social-icons-footer">
                <i class="fab fa-twitter mr-2"></i>Twitter
              </div>
            </a>
            <a
              className="footer-icons-link"
              target="_blank"
              href="https://www.facebook.com/"
            >
              <div class="p-2 social-icons-footer">
                <i class="fab fa-youtube mr-2"></i> Youtube
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
