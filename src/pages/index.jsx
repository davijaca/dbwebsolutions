import React, { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";


import { loadFull } from "tsparticles";
import particlesConfig from "config/particle-config";
import ShowcasesFullScreen from "components/Showcases-full-screen/showcases-full-screen";
import initIsotope from "common/initIsotope";
import Navbar from "components/Navbar/navbar";
import Services from "components/Services/services";
import VideoWithTestimonials from "components/Video-with-testimonials/video-with-testimonials";
import SkillsCircle from "components/Skills-circle/skills-circle";
import Clients from "components/Clients/clients";
import CallToAction from "components/Call-to-action/call-to-action";
import Footer from "components/Footer/footer";
import PagesHeader from "components/Pages-header";
import AboutIntro from "components/About-intro";
import Team from "components/Team/team";
import MinimalArea from "components/Minimal-Area/minimal-area";
import DarkTheme from "layouts/Dark";


const Demos = () => {
  const fixedHeader = React.useRef(null);
  const MainContent = React.useRef(null);
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isOpen, setOpen] = React.useState(false);
    
    React.useEffect(() => {
      console.clear();
    }, []);
  
    const settings = {
      dots: true,
      infinite: true,
      arrows: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };



    React.useEffect(() => {
      setTimeout(() => {
        if (fixedHeader.current) {
          var slidHeight = fixedHeader.current.offsetHeight;
        }
        if (MainContent.current) {
          MainContent.current.style.marginTop = slidHeight + "px";
        }
      }, 1000);
  
      var navbar = navbarRef.current;
  
      if (window.pageYOffset > 300) {
        navbar.classList.add("nav-scroll");
      } else {
        navbar.classList.remove("nav-scroll");
      }
  
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          navbar.classList.add("nav-scroll");
        } else {
          navbar.classList.remove("nav-scroll");
        }
      });
  
    }, [fixedHeader, MainContent, navbarRef]);

  useEffect(() => {
    setPageLoaded(true);
    if (pageLoaded) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          if (pageLoaded) initIsotope();
          document.querySelector('#particles-js canvas')?.style.removeProperty('position');
        }, 500);
      });
    }

    setTimeout(() => {
      initIsotope();
      document.querySelector('#particles-js canvas')?.style.removeProperty('position');
    }, 500);
  }, [pageLoaded]);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    const container = document.querySelector(".snap-scroll-container");
    let isScrolling = false;

    const handleWheel = (e) => {
      if (isScrolling) return;

      const direction = e.deltaY > 0 ? "down" : "up";
      const sections = Array.from(document.querySelectorAll(".snap-section"));

      const currentIndex = sections.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return Math.abs(rect.top) < window.innerHeight * 0.5;
      });

      if (currentIndex === -1) return;

      const currentSection = sections[currentIndex];

      if (currentSection?.id === "slider-section") {
        const swiperInstance = document.querySelector(".swiper-container")?.swiper;

        if (swiperInstance) {
          const atBeginning = swiperInstance.isBeginning;
          const atEnd = swiperInstance.isEnd;

          // ✅ BLOCK SCROLL IF SWIPER IS MID-ANIMATION
          if (swiperInstance.animating) return;

          // ✅ Let Swiper handle its internal navigation
          if ((direction === "up" && !atBeginning) || (direction === "down" && !atEnd)) {
            return;
          }

          // ✅ Scroll page only after Swiper hits edge & finishes transition
          e.preventDefault();
          isScrolling = true;

          const nextIndex = direction === "down" ? currentIndex + 1 : currentIndex - 1;
          const nextSection = sections[nextIndex];

          if (!nextSection) {
            isScrolling = false;
            return;
          }

          window.scrollTo({
            top: nextSection.offsetTop,
            behavior: "smooth",
          });

          setTimeout(() => {
            isScrolling = false;
          }, 1200);
          return;
        }
      }

      const nextIndex = direction === "down" ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex === currentIndex || nextIndex < 0 || nextIndex >= sections.length) return;

      e.preventDefault();
      isScrolling = true;

      const nextSection = sections[nextIndex];
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling = false;
      }, 1200);
    };

    container?.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <DarkTheme>
      <Navbar nr={navbarRef} lr={logoRef} />
      <main className="snap-scroll-container">
        {/* Hero Section */}
        <section
          className="works-header particles valign bg-img parallaxie snap-section"
          data-overlay-dark="4"
          style={{
            minHeight: "100vh",
            zIndex: 99999,
            position: "relative", // required for proper layering
          }}
        >
          {/* 🔹 Background Video Layer */}
          <div className="video-bg">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="background-video"
            >
              <source src="/videos/hero-bg.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* 🔹 Optional Overlay (Dark tint) */}
          <div className="overlay-dark"></div>

          {/* 🔹 Particle Background Layer */}
          <Particles id="particles-js" init={particlesInit} options={particlesConfig} />

          {/* 🔹 Foreground Content */}
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9 col-md-11 static">
                <div className="capt mt-50">
                  <div className="bactxt custom-font valign">
                    <span className="full-width" style={{ color: "transparent", marginTop: "-250px"  }}>
                      DB<br />  <span
                      className="full-width"
                      style={{ color: "transparent", fontSize: "130px", display: "block", marginTop: "-250px" }}>
                      WEB SOLUTIONS
                    </span>
                    </span>
                  </div>
                  <h1 className="color-font">
                    Your website should tell a story
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-down-btn">
              <a href="#slider-section">
                <i className="fas fa-chevron-down"></i>
              </a>
          </div>
        </section>


        {/* Swiper Slider Section */}
        <section id="slider-section" className="snap-section">
          <ShowcasesFullScreen />
        </section>

        {/* After Swiper / Gallery Section */}
        <section className="snap-section" id="after-swiper">
          {/* <ShowcasesFullScreenCircleSlide /> */}
          <div className="main-content section-padding pb-0">
            <section className="masonery section-padding">
              <div className="container" style={{marginBottom: "-150px", marginTop: "-50px"}}>
                <div className="row justify-content-center">
                  <div className="col-lg-8 col-md-10">
                    <div className="sec-head text-center">
                      <h3 className="color-font">
                        Don't just be seen <br/>
                        Be remembered
                      </h3>
                      <span className="tbg">
                        YOU
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Services style="4item" />

              <section className="block-sec">
                <div
                  className="background bg-img pt-100 pb-0 parallaxie"
                  style={{ backgroundImage: `url(/img/95962.png)` }}
                  data-overlay-dark="5"
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="testim-box">
                          <div className="head-box">
                            <h6 className="wow fadeIn" data-wow-delay=".5s">
                              Testimonials
                            </h6>
                            <h4 className="wow fadeInLeft" data-wow-delay=".5s">
                              What Client&apos;s Say?
                            </h4>
                          </div>
                          <Slider
                            {...settings}
                            className="slic-item wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <div className="item">
                              <p>
                                Nulla metus metus ullamcorper vel tincidunt sed euismod
                                nibh volutpat velit class aptent taciti sociosqu ad
                                litora.
                              </p>
                              <div className="info">
                                <div className="img">
                                  <div className="img-box">
                                    <img src="/img/clients/1.png" alt="" />
                                  </div>
                                </div>
                                <div className="cont">
                                  <div className="author">
                                    <h6 className="author-name ">Clau Felippe</h6>
                                    <span className="author-details">
                                      Founder, OURO Revista e TV
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="item">
                              <p>
                                Nulla metus metus ullamcorper vel tincidunt sed euismod
                                nibh volutpat velit class aptent taciti sociosqu ad
                                litora.
                              </p>
                              <div className="info">
                                <div className="img">
                                  <div className="img-box">
                                    <img src="/img/clients/2.png" alt="" />
                                  </div>
                                </div>
                                <div className="cont">
                                  <div className="author">
                                    <h6 className="author-name ">Alex Regelman</h6>
                                    <span className="author-details">
                                      Co-founder, Colabrio
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="item">
                              <p>
                                Nulla metus metus ullamcorper vel tincidunt sed euismod
                                nibh volutpat velit class aptent taciti sociosqu ad
                                litora.
                              </p>
                              <div className="info">
                                <div className="img">
                                  <div className="img-box">
                                    <img src="/img/clients/3.png" alt="" />
                                  </div>
                                </div>
                                <div className="cont">
                                  <div className="author">
                                    <h6 className="author-name ">Alex Regelman</h6>
                                    <span className="author-details">
                                      Co-founder, Colabrio
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Slider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* <VideoWithTestimonials /> */}
              {/* <Team /> */}
              {/* <MinimalArea /> */}
              <Clients theme="dark" />

            </section>
          </div>
        </section>
      </main> 
      <CallToAction />
      <Footer />

    </DarkTheme>
  );
};

export const Head = () => (
  <>
    <title>DB - Web Solutions</title>
    <link rel="stylesheet" href="demo.css" />
  </>
);

export default Demos;
