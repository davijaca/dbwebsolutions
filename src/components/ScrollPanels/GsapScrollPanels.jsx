import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShowcassesFullScreenData from "data/showcases-full-screen-slider.json";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/mousewheel";

gsap.registerPlugin(ScrollTrigger);

const GsapScrollPanels = () => {
  useEffect(() => {
    const container = document.querySelector(".swiper-container");
    const wrapper = document.querySelector(".horizontal-scroll-wrapper");
    const panels = gsap.utils.toArray(".swiper-slide");

    if (!container || panels.length === 0) return;

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => `+=${container.scrollWidth}`
      }
    });
  }, []);

  return (
    <section className="slider showcase-full" style={{ padding: 0, margin: 0 }}>
      <div
        className="horizontal-scroll-wrapper"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <div className="swiper-container parallax-slider" style={{ display: "flex", height: "100%" }}>
          {ShowcassesFullScreenData.slice(0, 4).map((slide, index) => (
            <div
              key={index}
              className="swiper-slide"
              style={{
                flex: "0 0 100vw",
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="caption">
                      <h1>
                        <div className="stroke">{slide.title.first}</div>
                        <span>{slide.title.second}</span>
                      </h1>
                      <div className="bord"></div>
                      <div className="discover">
                        <span>
                          Explore <br /> More
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GsapScrollPanels;
