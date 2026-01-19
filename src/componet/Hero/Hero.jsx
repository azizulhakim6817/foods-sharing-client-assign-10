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
        <SwiperSlide data-hash="slide2">
          <div>
            <div className="absolute inset-0  bg-black/50">
              <div>
                <h1 className="my-16 md:mt-24 text-2xl text-white md:text-4xl font-bold mb-4">
                  Share Food, Spread Love
                </h1>
                <p className=" text-[15px] mb-10 md:mb-4 text-gray-300">
                  PlateShare is a community-driven platform <br /> where surplus
                  food finds a new home. Discover, share, and reduce food waste
                  together.
                </p>
              </div>

              {/* two button------------------------------------- */}
              <div className="mx-auto w-50 md:w-80 gap-2 grid grid-cols-1 md:grid-cols-2">
                {/*View All Foods*/}
                <Link
                  to="/available-foods"
                  className="btn bg-[#F06225] cursor-pointer text-white"
                >
                  View All Foods
                </Link>
                {/*Search Food*/}
                <form onSubmit={handleSarch}>
                  <div className="join">
                    <div>
                      <label className="rounded-l-full input validator join-item">
                        <input
                          type="text"
                          name="search"
                          placeholder="Search foods..."
                        />
                      </label>
                    </div>
                    <button className="rounded-r-full text-white btn bg-[#F06225] join-item">
                      <Search size={18} className="" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* 2-sliders---------------------------------------- */}
        <SwiperSlide data-hash="slide2" className="">
          <div>
            <div className="absolute inset-0  bg-black/50">
              <div>
                <h1 className="my-16 md:mt-24 text-2xl text-white md:text-3xl font-bold mb-4">
                  Share Food, Spread Love
                </h1>
                <p className=" text-[15px] mb-10 md:mb-4 text-gray-300">
                  PlateShare is a community-driven platform <br /> where surplus
                  food finds a new home. Discover, share, and reduce food waste
                  together.
                </p>
              </div>

              {/* two button------------------------------------- */}
              <div className="mx-auto w-50 md:w-80 gap-2 grid grid-cols-1 md:grid-cols-2">
                {/*View All Foods*/}
                <Link
                  to="/available-foods"
                  className="btn bg-[#F06225] cursor-pointer text-white"
                >
                  View All Foods
                </Link>
                {/*Search Food*/}
                <form onSubmit={handleSarch}>
                  <div className="join">
                    <div>
                      <label className="rounded-l-full input validator join-item">
                        <input
                          type="text"
                          name="search"
                          placeholder="Search foods..."
                        />
                      </label>
                    </div>
                    <button className="rounded-r-full text-white btn bg-[#F06225] join-item">
                      <Search size={18} className="" />
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
