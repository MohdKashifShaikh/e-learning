import React from "react";
// import Img from '../img/img-3.jfif';
import Grp from "../img/desk.jfif";
import Mern3 from "../img/mern3.webp";
import Mern2 from "../img/mern2.webp";
import Mern from "../img/mern.webp";
import Mean from "../img/mean.webp";

const Home = () => {
  document.title = "Index";
  return (
    <div>
      <section className="container-fluid bg-light upper-section">
        <div className="row g-3">
          <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12">
            <h1 className="heading">India's best learning destination</h1>
            <h6>
              Succeed with the help of India's top faculty. Access engaging CA video
              classes from the comfort of your home. Succeed with the help of India's top
              faculty. Access engaging CA video classes from the comfort of your home.
            </h6>
            <button className="btn btn-enroll">
              <label>Enroll Now</label>
            </button>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            {/* <img src={Img} alt="img" /> */}
            <img src={Grp} />
          </div>
        </div>
      </section>
      <section className="container lower-section">
        <h2>Learn the right way with eLearning</h2>

        {/* --------------------Carousel Starts Here----------------------- */}

        <div className="carousel-here">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                aria-label="Slide 1"
                className="active"
                aria-current="true"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item">
                <img src={Mern3} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Mern Stack Developer</h5>
                  <p>Some representative placeholder content for the first slide.</p>
                </div>
              </div>
              <div className="carousel-item active">
                <img src={Mern2} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>Some representative placeholder content for the second slide.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={Mern} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>Some representative placeholder content for the third slide.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={Mean} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Mean Stack Developer</h5>
                  <p>Some representative placeholder content for the third slide.</p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
