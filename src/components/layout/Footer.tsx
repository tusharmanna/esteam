import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-wrapper footer-bg-one">
        <div className="container">
          <div className="footer-area position-relative">
            <div className="row g-4">
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="single-footer-caption">
                  <div className="footer-tittle">
                    <h4 className="title">About Us</h4>
                    <p className="pera">
                      Welcome to <strong>ESteam</strong>, where we bring your imagination to life
                      with our high-quality personalized gift items. Founded on the belief that
                      every gift should be as unique as the recipient, we are passionate about
                      helping you create memorable, one-of-a-kind items that perfectly capture
                      your sentiments.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="footer-menu-section">
                  <div className="logo logo-large light-logo">
                    <Link href="/">
                      <Image
                        src="/images/logo/esteam-logo.png"
                        alt="ESteam Logo"
                        width={180}
                        height={54}
                      />
                    </Link>
                  </div>
                  <div className="footer-social-section">
                    <h4 className="title">Follow Us</h4>
                    <ul className="footer-social-lists">
                      <li className="list-icon">
                        <a
                          href="https://www.facebook.com/artoffelix"
                          className="list"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="ri-facebook-fill"></i>
                        </a>
                      </li>
                      <li className="list-icon">
                        <a
                          href="https://www.instagram.com/felixites/"
                          className="list"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="ri-instagram-fill"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 offset-xl-1 col-lg-4 col-sm-6">
                <div className="single-footer-caption">
                  <div className="footer-tittle">
                    <ul className="info-listing">
                      <li className="footer-info-list">
                        <a href="mailto:sales@felixarts.biz" className="single">
                          <i className="ri-mail-fill"></i>
                          <p className="pera">sales@felixarts.biz</p>
                        </a>
                      </li>
                      <li className="footer-info-list">
                        <a href="tel:+17708158221" className="single">
                          <div className="d-flex gap-6">
                            <i className="ri-phone-fill"></i>
                            <p className="pera">+1 (770) 815-8221</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
