import { Link } from "react-router";

const FoodCard = ({ food }) => {
  return (
    <div className="group my-2 card bg-base-100  shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <figure className="relative">
        <img
          src={food.foodImage}
          alt={food.foodName}
          className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Status Badge */}
        <span className="absolute text-white bg-[#F06225] top-2 left-2 badge badge-success ">
          {food.food_status}
        </span>
      </figure>
      <div className="p-4 space-y-3">
        {/* Food Name */}
        <h2 className="text-lg font-bold line-clamp-1">{food.foodName}</h2>
        {/* Donator */}
        <div className="flex items-center gap-3">
          <img
            src={food.donator_image}
            alt={food.donator_name}
            className="w-7 h-7 rounded-full ring ring-primary ring-offset-2"
          />
          <div>
            <p className="text-sm font-semibold">{food.donator_name}</p>
            <p className="text-xs text-gray-500">Food Donator</p>
          </div>
        </div>
        {/* 2 column div */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">Quantity : Servers </span>
            <br className=" block md:hidden" />
            {food.foodQuantity} people
          </p>
          <p>
            <span className="font-medium">Pickup : </span>
            <br className=" block md:hidden" />
            {food.pickupLocation}
          </p>
          <p className="">
            <span className="font-medium">Expire : </span>
            <br className=" block md:hidden" />
            {food.expireDate}
          </p>
          <p className="">
            <span className="font-medium">Created At : </span>
            <br className=" block md:hidden" />
            {new Date(food.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Notes */}
        {food.additionalNotes && (
          <p className="text-xs text-gray-400 italic line-clamp-2">
            Notes : {food.additionalNotes}
          </p>
        )}

        {/* Button – Full Width */}
        <Link
          to={`/food-details/${food._id}`}
          className="btn text-white bg-[#F06225] w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;
