import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, HashNavigation } from "swiper/modules";

import "./styles.css";
import { Search } from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  //! input sarch ----------------------*/
  const handleSarch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
    console.log(search_text);
  };

  return (
    <div className="h-95">
      <Swiper
        spaceBetween={20}
        /*  hashNavigation={{
          watchState: true,
        }} */
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, HashNavigation]}
        className="mySwiper"
      >
        {/* 1-sliders---------------------------------------- */}
        <SwiperSlide data-hash="slide1" className="slide-one">
          <div>
            <div className="absolute inset-0 bg-black/50">
              <div>
                <h1 className="my-16 md:mt-24 text-2xl text-white md:text-4xl font-bold mb-4">
                  Share Food, Spread Love
                </h1>
                <p className="mx-4 text-[14px] mb-10 md:mb-4 text-gray-300">
                  PlateShare connects kind people with surplus food. <br />
                  Share meals, help others, and build a caring community
                  together.
                </p>
              </div>

              {/* buttons */}
              <div className="mx-auto w-50 md:w-80 gap-2 grid grid-cols-1 md:grid-cols-2">
                <Link
                  to="/available-foods"
                  className="btn bg-[#F06225] cursor-pointer text-white"
                >
                  View All Foods
                </Link>

                <form onSubmit={handleSarch}>
                  <div className="join">
                    <label className="rounded-l-full input validator join-item">
                      <input
                        type="text"
                        name="search"
                        placeholder="Search foods..."
                      />
                    </label>
                    <button className="rounded-r-full text-white btn bg-[#F06225] join-item">
                      <Search size={18} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* 2-sliders---------------------------------------- */}
        <SwiperSlide data-hash="slide2" className="slide-two">
          <div>
            <div className="absolute inset-0 bg-black/50">
              <div>
                <h1 className="my-16 md:mt-24 text-2xl text-white md:text-3xl font-bold mb-4">
                  Reduce Waste, Save Food
                </h1>
                <p className="text-[15px] mb-10 md:mb-4 text-gray-300">
                  Millions of meals go to waste every day. <br />
                  PlateShare helps you give extra food a second chance.
                </p>
              </div>

              {/* buttons */}
              <div className="mx-auto w-50 md:w-80 gap-2 grid grid-cols-1 md:grid-cols-2">
                <Link
                  to="/available-foods"
                  className="btn bg-[#F06225] cursor-pointer text-white"
                >
                  View All Foods
                </Link>

                <form onSubmit={handleSarch}>
                  <div className="join">
                    <label className="rounded-l-full input validator join-item">
                      <input
                        type="text"
                        name="search"
                        placeholder="Find nearby food..."
                      />
                    </label>
                    <button className="rounded-r-full text-white btn bg-[#F06225] join-item">
                      <Search size={18} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
