import { ArrowUpRight } from "lucide-react";
import axiosInstance from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const AddProduct = () => {
  const { user } = useAuth();

  //!handleSubmit--------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const foodName = e.target.name.value;
    const foodImage = e.target.image.value;
    const foodQuantity = e.target.quantity.value;
    const pickupLocation = e.target.pickup_location.value;
    const expireDate = e.target.expire_date.value;
    const additionalNotes = e.target.additional_notes.value;
    const food_status = e.target.food_status.value;

    const newFood = {
      foodName,
      foodImage,
      foodQuantity,
      pickupLocation,
      expireDate,
      additionalNotes,
      food_status,
      donator_name: user.displayName,
      donator_email: user.email,
      donator_image: user.photoURL,
    };

    axiosInstance
      .post("/create-foods", newFood)
      .then((res) => {
        console.log(res.data);
        toast.success("Food created successfully");
        e.target.reset();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="mx-auto my-6 card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="text-center text-2xl font-bold text-[#F06225]">
          Add Product
        </h2>
        <fieldset className="fieldset">
          <form onSubmit={handleSubmit} className="space-y-1">
            {/* name */}
            <label className="label font-semibold text-gray-500">
              Food name :
            </label>
            <input
              type="text"
              name="name"
              className="input w-full"
              placeholder="Food Name..."
            />
            {/*Image  */}
            <label className="label font-semibold text-gray-500">
              Fool image URL :
            </label>
            <input
              type="text"
              name="image"
              className="input w-full"
              placeholder="Fool image URL..."
            />
            {/*quantity  */}
            <label className="label font-semibold text-gray-500">
              Fool quantity :
            </label>
            <input
              type="text"
              name="quantity"
              className="input w-full"
              placeholder="Quantity..."
            />
            {/*pickup_location  */}
            <label className="label font-semibold text-gray-800">
              Pickup location :
            </label>
            <input
              type="text"
              name="pickup_location"
              className="input w-full"
              placeholder="Pickup location..."
            />
            {/*expire_date  */}
            <label className="label font-semibold text-gray-500">
              Expire Date :
            </label>
            <input
              type="date"
              name="expire_date"
              className="input w-full"
              placeholder="Expire date..."
            />
            {/*additional_notes  */}
            <label className="label font-semibold text-gray-500">
              Additional notes :
            </label>
            <input
              type="text"
              name="additional_notes"
              className="input w-full"
              placeholder="Additional notes..."
            />
            {/*food_status  */}
            <select
              name="food_status"
              defaultValue=""
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select food status
              </option>
              <option value="Available">Available</option>
              <option value="pending">Pending</option>
            </select>

            {/*Donator name */}
            <label className="label font-semibold text-gray-500">
              Donator name :
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Donator name..."
            />
            {/*donator_email  */}
            <label className="label font-semibold text-gray-500">
              Donator email :
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Eonator email..."
            />
            {/*donator_image  */}
            <label className="label font-semibold text-gray-500">
              Donator image URL :
            </label>
            <input
              type="text"
              defaultValue={user?.photoURL}
              className="input w-full"
              placeholder="Donator image URL..."
            />

            <button className="w-full btn bg-[#F06225] font-bold text-white mt-4">
              Add Products <ArrowUpRight size={20} />
            </button>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default AddProduct;
