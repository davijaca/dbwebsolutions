import React from "react";
import { Link } from "gatsby";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Parallax, Mousewheel } from "swiper";

import removeSlashFromPagination from "common/removeSlashpagination";
import ShowcassesFullScreenData from "data/showcases-full-screen-slider.json";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/mousewheel";

// Register Swiper modules
SwiperCore.use([Navigation, Pagination, Parallax, Mousewheel]);

const ShowcasesFullScreen = () => {
  const [load, setLoad] = React.useState(true);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const paginationRef = React.useRef(null);

  React.useEffect(() => {
    removeSlashFromPagination();
    setTimeout(() => {
      setLoad(false);
    }, 0);
  }, []);

  // ✅ Intercept scroll at edges
  React.useEffect(() => {
    const swiperEl = document.querySelector('.swiper-container')?.swiper;
    if (!swiperEl) return;

    const handler = (e) => {
      if (
        (swiperEl.isEnd && e.deltaY > 0) ||
        (swiperEl.isBeginning && e.deltaY < 0)
      ) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    const container = document.querySelector('.swiper-container');
    container?.addEventListener('wheel', handler, { passive: false });

    return () => {
      container?.removeEventListener('wheel', handler);
    };
  }, []);

  // ✅ Reset Swiper to first slide after reaching section 3
  React.useEffect(() => {
    const swiper = document.querySelector('.swiper-container')?.swiper;
    const targetSection = document.querySelector('#after-swiper');

    if (!swiper || !targetSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && swiper.isEnd) {
          swiper.slideTo(0, 0); // Instantly reset to first slide
        }
      },
      { threshold: 0.6 } // Trigger when 60% of #after-swiper is visible
    );

    observer.observe(targetSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="slider showcase-full" style={{ height: "100vh", overflow: "hidden" }}>
      {!load && (
        <Swiper
          speed={1000}
          mousewheel={{
            thresholdDelta: 20,
            thresholdTime: 200,
          }}
          parallax={true}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          pagination={{
            clickable: true,
            el: paginationRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.params.pagination.el = paginationRef.current;
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              for (let i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].childNodes[0].setAttribute(
                  "data-swiper-parallax",
                  0.75 * swiper.width
                );
              }

              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
              swiper.pagination.destroy();
              swiper.pagination.init();
              swiper.pagination.update();
            });
          }}
          className="swiper-container parallax-slider"
          slidesPerView={1}
          style={{ height: "100%" }}
        >
          {ShowcassesFullScreenData.map((slide) => (
            <SwiperSlide key={slide.id} className="swiper-slide" style={{ height: "100vh" }}>
              <div
                className="bg-img valign"
                style={{ backgroundImage: `url(${slide.image})`, height: "100%" }}
                data-overlay-dark="4"
              >
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="caption">
                        <h1>
                          <Link to={`/project-details2/project-details2-dark`}>
                            <div className="stroke" data-swiper-parallax="-2000">
                              {slide.title.first}
                            </div>
                            <span data-swiper-parallax="-5000">
                              {slide.title.second}
                            </span>
                          </Link>
                          <div className="bord"></div>
                        </h1>
                        <div className="discover">
                          <Link to={`/works/works-dark`}>
                            <span>
                              Explore <br /> More
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="txt-botm">
        <div
          ref={navigationNextRef}
          className="swiper-button-next swiper-nav-ctrl next-ctrl cursor-pointer"
        >
          {/* <div><span>Next Slide</span></div>
          <div><i className="fas fa-chevron-right"></i></div> */}
        </div>
        <div
          ref={navigationPrevRef}
          className="swiper-button-prev swiper-nav-ctrl prev-ctrl cursor-pointer"
        >
          {/* <div><i className="fas fa-chevron-left"></i></div>
          <div><span>Prev Slide</span></div> */}
        </div>
        <div className="swiper-pagination dots" ref={paginationRef}></div>
      </div>
    </section>
  );
};

export default ShowcasesFullScreen;
