import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Store, SquarePen, Trash } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../hooks/useAxios";
import MyFoodSkeleton from "../../componet/Skeleton/MyFoodSkeleton";
import LoadingSpinner from "../../componet/Hero/LoadingSpinner ";

const ManageMyFood = () => {
  const { id } = useParams();
  const { user, loading, setLoading } = useAuth();
  const modalRef = useRef();
  const [foods, setFoods] = useState([]);
  const [refetch, setRefetch] = useState(false);

  //! update input------
  const [selectedFood, setSelectedFood] = useState({
    foodName: "",
    foodImage: "",
    foodQuantity: "",
    pickupLocation: "",
    expireDate: "",
    additionalNotes: "",
    food_status: "pending",
  });

  //! Handle input changes --> update input value-to change------
  const handleChange = (e) =>
    setSelectedFood({ ...selectedFood, [e.target.name]: e.target.value });

  // Fetch user's foods
  useEffect(() => {
    if (!user?.email) return;
    axiosInstance
      .get(`/manage-my-foods/${user.email}`)
      .then((res) => setFoods(res?.data?.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.email, refetch]);

  //! Open modal with food data --update open form data
  const openUpdateModal = (food) => {
    setSelectedFood(food);
    modalRef.current.showModal();
  };

  //! Fetch single food details (optional) update-------
  useEffect(() => {
    if (!id) return;
    axiosInstance.get(`/food-details/${id}`).then((res) => {
      setSelectedFood(res.data.result);
      setLoading(false);
    });
  }, [id, refetch]);

  // Update food
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updateData } = selectedFood; // Remove _id before sending
      await axiosInstance.post(`/food-update/${_id}`, updateData);
      toast.success("Food updated successfully");
      modalRef.current.close();
      setRefetch((prev) => !prev);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update food");
    }
  };

  // Close modal
  const handleModalClose = (e) => {
    e?.preventDefault();
    modalRef.current.close();
  };

  // Delete food
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This food will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/food-delete/${id}`).then(() => {
          setFoods((prev) => prev.filter((food) => food._id !== id));
          Swal.fire("Deleted!", "Food has been deleted.", "success");
          setLoading(false);
        });
      }
    });
  };

  // data fetching---------------
  if (loading) {
    return <LoadingSpinner />;
  }

  // foods skeleton when no data------------
  if (foods.length === 0) {
    return <MyFoodSkeleton />;
  }

  return (
    <div className="my-10 px-4 md:px-8">
      <div className="my-6 text-center">
        <h1 className="flex justify-center items-center gap-3 text-2xl md:text-3xl font-bold text-[#F06225]">
          Manage My Foods ({foods.length})
          <Store size={30} className="text-blue-400" />
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Food Photo</th>
              <th>Food Name</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : foods.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  No foods added yet 🍽️
                </td>
              </tr>
            ) : (
              foods.map((food, index) => (
                <tr key={food._id} className="hover:bg-gray-50">
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">
                    <img
                      src={food.foodImage || "/no-image.png"}
                      alt="Food"
                      className="w-16 h-12 object-cover rounded mx-auto"
                    />
                  </td>
                  <td className="font-medium">{food.foodName}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-sm font-semibold ${
                        food.food_status === "donated"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {food.food_status}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-col md:flex-row gap-2 justify-center">
                      <button
                        disabled={food.food_status === "donated"}
                        className={`btn btn-sm text-white flex items-center gap-1 ${
                          food.food_status === "donated"
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-[#F06225] hover:bg-orange-600"
                        }`}
                        onClick={() => openUpdateModal(food)}
                      >
                        <SquarePen size={16} />
                        Update
                      </button>

                      <button
                        disabled={food.food_status === "donated"}
                        className={`btn btn-sm text-white flex items-center gap-1 ${
                          food.food_status === "donated"
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                        onClick={() => handleDelete(food._id)}
                      >
                        <Trash size={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Update */}
      <dialog ref={modalRef} className="modal">
        <form
          onSubmit={handleUpdate}
          method="dialog"
          className="modal-box space-y-3"
        >
          <h2 className="text-xl font-bold text-center text-[#F06225]">
            Update Food
          </h2>

          <label className="label font-semibold text-gray-500">
            Food Name:
          </label>
          <input
            type="text"
            name="foodName"
            value={selectedFood.foodName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <label className="label font-semibold text-gray-500">
            Food Image URL:
          </label>
          <input
            type="text"
            name="foodImage"
            value={selectedFood.foodImage}
            onChange={handleChange}
            className="input w-full"
            required
          />

          <label className="label font-semibold text-gray-500">Quantity:</label>
          <input
            type="text"
            name="foodQuantity"
            value={selectedFood.foodQuantity}
            onChange={handleChange}
            className="input w-full"
            required
          />

          <label className="label font-semibold text-gray-500">
            Pickup Location:
          </label>
          <input
            type="text"
            name="pickupLocation"
            value={selectedFood.pickupLocation}
            onChange={handleChange}
            className="input w-full"
            required
          />

          <label className="label font-semibold text-gray-500">
            Expire Date:
          </label>
          <input
            type="date"
            name="expireDate"
            value={selectedFood.expireDate}
            onChange={handleChange}
            className="input w-full"
            required
          />

          <label className="label font-semibold text-gray-500">
            Additional Notes:
          </label>
          <input
            type="text"
            name="additionalNotes"
            value={selectedFood.additionalNotes}
            onChange={handleChange}
            className="input w-full"
          />

          <label className="label font-semibold text-gray-500">
            Food Status:
          </label>
          <input
            type="text"
            name="food_status"
            value={selectedFood.food_status}
            onChange={handleChange}
            className="input w-full"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <button
              type="submit"
              className="btn bg-[#F06225] text-white font-bold"
            >
              Update
            </button>
            <button
              type="button"
              className="btn bg-gray-300 text-[#F06225] font-bold"
              onClick={handleModalClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ManageMyFood;
