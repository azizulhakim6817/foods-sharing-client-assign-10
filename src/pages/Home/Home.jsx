import Hero from "../../componet/Hero/Hero";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../hooks/useAxios";
import FoodCard from "../../componet/FoodCard";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../componet/Hero/LoadingSpinner ";
import FoodSkeleton from "../../componet/Skeleton/FoodSkeleton ";

const Home = () => {
  const { loading, setLoading } = useAuth();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axiosInstance.get("/get-foods").then((res) => {
      setFoods(res.data.result);
      setLoading(false);
    });
  }, []);

  // data fetching---------------
  if (loading) {
    return <LoadingSpinner />;
  }

  // foods skeleton when no data------------
  if (foods.length === 0) {
    return <FoodSkeleton />;
  }

  return (
    <div>
      <Hero />
      {/* Foods 6 itmes ------------- */}
      <div>
        <h2 className="text-3xl my-8 text-center font-bold mb-8 text-[#F06225]">
          Featured Foods
        </h2>
      </div>
      <div className="my-4 md:px-8 mt-6 gap-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {foods?.slice(0, 6).map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
      {/* two additional static sections------------------*/}
      <div className="my-4 text-center">
        {/* How It Works Section */}
        <section className="px-4 py-8 text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#F06225]">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-3 border rounded-lg border-[#F06225] shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Post Food</h3>
              <p className="text-[16px]">
                Share your extra food with the community in just a few clicks.
              </p>
            </div>
            <div className="p-6 border rounded-lg border-[#F06225] shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 ">Find Food</h3>
              <p className="text-[16px]">
                Browse and search available food items in your area easily.
              </p>
            </div>
            <div className="p-6 border rounded-lg border-[#F06225] shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">Collect Food</h3>
              <p className="text-[16px]">
                Pick up the food safely and help reduce waste in your community.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="px-4 py-6 md:py-14  text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#F06225]">
            Our Mission
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-[16px] mb-8">
            We aim to connect people with surplus food to those in need,
            reducing food waste and building a stronger, more caring community.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <h3 className="text-2xl font-bold text-[#a03a0e]">500+</h3>
              <p className="text-[16px]">Food Posts</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#a03a0e]">2000+</h3>
              <p className="text-[16px]">Community Members</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#a03a0e]">1500+</h3>
              <p className="text-[16px]">Meals Shared</p>
            </div>
          </div>
        </section>
        {/* show all the available foods */}
        <div className="my-6 md:my-14">
          <Link
            to="/available-foods"
            className="btn bg-[#F06225] cursor-pointer text-white"
          >
            Show All <ArrowUpRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
