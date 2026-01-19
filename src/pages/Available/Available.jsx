import { useEffect } from "react";
import FoodCard from "../../componet/FoodCard";
import axiosInstance from "../../hooks/useAxios";
import { useState } from "react";
import { Store } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../componet/Hero/LoadingSpinner ";
import FoodSkeleton from "../../componet/Skeleton/FoodSkeleton ";

const Available = () => {
  const { loading, setLoading } = useAuth();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axiosInstance.get("/get-foods").then((res) => {
      //console.log(res.data);
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
    <div className="my-4 md:px-8">
      <div className="my-4 md:my-8 text-center">
        <h1 className="flex justify-center items-center gap-4 text-2xl md:text-3xl text-[#F06225] font-bold">
          Available Foods <Store size={30} className="text-blue-400" />
        </h1>
      </div>
      <div className="mt-6 gap-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {foods?.slice(0, 9).map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Available;
