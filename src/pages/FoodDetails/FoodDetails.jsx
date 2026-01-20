import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "./../../hooks/useAuth";
import axiosInstance from "../../hooks/useAxios";
import { useRef } from "react";
import { toast } from "react-toastify";
import { Check } from "lucide-react";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [foodRequest, setFoodRequest] = useState([]);
  console.log(foodRequest);
  const [refetch, setRefetch] = useState(false);

  const { user } = useAuth();
  //console.log("user i:", user);

  const useRefModal = useRef(null);

  //! food-details----------------
  useEffect(() => {
    axiosInstance.get(`/food-details/${id}`).then((res) => {
      setFood(res.data.result);
    });
  }, [id, refetch]);

  //! open modal handleRequestFoodButton------
  const handleRequestFood = (e) => {
    e.preventDefault();
    useRefModal.current.showModal();
    const newRequest = {
      foodId: food._id,
      location: e.target.location.value,
      contact: e.target.contact.value,
      need_food_reason: e.target.reason.value,
      userEmail: food?.donator_email,
      userName: food?.donator_name,
      photoURL: food?.donator_image,
    };
    try {
      axiosInstance.post("/food-request", newRequest).then((data) => {
        //console.log("food request", data.data.result);
        toast.success("Food request create successfull");
        useRefModal.current.close();
        e.target.reset();
        setRefetch((prev) => !prev);
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create food request");
    }
  };

  //! handleModalClose-------------
  const handleModalClose = () => {
    useRefModal.current.close();
    e.preventDefault();
    useRefModal.current.close();
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your bid has been chanced",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  //! get food request ------------------
  useEffect(() => {
    axiosInstance
      .get(`/food-request-owner/${food?._id}?userEmail=${user?.email}`)
      .then((res) => {
        //console.log(res.data.result);
        setFoodRequest(res.data.result);
      })
      .catch(console.error);
  }, [food?._id, user?.email, refetch]);

  //! food request accepted api post------------------------
  const handleFoodRequestAccepted = (_id) => {
    axiosInstance
      .post(`/request-accepted/${_id}`)
      .then((res) => {
        console.log("Accepted data", res.data);
        toast.success("Request accepted successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      });
  };
  //! food request rejected api post------------------------
  const handleFoodRequestRejected = (_id) => {
    axiosInstance
      .post(`/food-request-rejected/${_id}`)
      .then((res) => {
        console.log("Rejected data", res.data);
        toast.success("Request rejected successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div>
      <div className="mb-14 max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
        {/* Food Info */}
        <img
          src={food?.foodImage}
          alt={food?.foodName}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-xl md:text-2xl font-bold mb-4">{food?.foodName}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          <p>
            <strong>Quantity : </strong> {food?.foodQuantity}
          </p>
          <p>
            <strong>Pickup Location : </strong> {food?.pickupLocation}
          </p>
          <p>
            <strong>Expire Date : </strong>
            {new Date(food?.expireDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status : </strong>{" "}
            <span
              className={`font-semibold ${
                food?.food_status === "Available"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {food?.food_status}
            </span>
          </p>
        </div>

        {food?.additionalNotes && (
          <div className="bg-yellow-100 p-4 rounded-md mb-4">
            <h3 className="font-semibold mb-1">Additional Notes : </h3>
            <p>{food.additionalNotes}</p>
          </div>
        )}

        {/* Donator Info */}
        <div className="bg-gray-100 p-4 rounded-md flex items-center gap-2 md:gap-4">
          <img
            src={food?.donator_image}
            alt={food?.donator_name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold">{food?.donator_name}</h2>
            <div>
              <p className="text-[11px] md:text-[16px]  text-gray-600">
                {food?.donator_email}
              </p>
            </div>
            <p>
              <span className="font-medium text-[12px] md:text-[15px]">
                Created At :{" "}
              </span>

              <span className="text-[12px] md:text-[15px]">
                {new Date(food?.createdAt)?.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>

        {/* Request Button */}
        <div className="text-end mt-4">
          <button
            onClick={handleRequestFood}
            className=" bg-[#F06225] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Request Food
          </button>
        </div>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog ref={useRefModal} id="my_modal_1" className="modal">
          <div className="modal-box">
            <h1 className="py-4 text-xl font-bold text-center text-[#F06225]">
              Request Food
            </h1>
            <div className="modal-action">
              <form
                onSubmit={handleRequestFood}
                method="dialog"
                className="space-y-3"
              >
                <input
                  type="text"
                  name="location"
                  placeholder="Your Location"
                  className="input input-bordered w-full"
                  required
                />

                <textarea
                  name="reason"
                  placeholder="Why do you need this food?"
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>

                <input
                  type="text"
                  name="contact"
                  placeholder="Contact Number"
                  className="input input-bordered w-full"
                  required
                />

                <div className=" space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2 ">
                  <div>
                    <button
                      type="submit"
                      className="btn w-full bg-[#F06225] font-bold text-gray-100"
                    >
                      Submit Request
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn w-full text-[#F06225] font-bold bg-gray-300"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {/* table --------------------------------*/}

      <div>
        <div className="mb-20 overflow-x-auto bg-white rounded-md px-2 md:px-42">
          <h1 className="mb-6 text-center text-xl md:text-3xl font-bold text-[#F06225]">
            Food Request
            <span className="text-yellow-500"> ({foodRequest?.length})</span>
          </h1>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Sl NO</th>
                <th>Name</th>
                <th>Reason</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {foodRequest?.map((r, index) => (
                <tr
                  key={r._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  {/* Serial */}
                  <td className="text-center align-middle font-semibold">
                    {index + 1}
                  </td>

                  {/* User Name */}
                  <td className="align-middle">{r?.userName}</td>

                  {/* Reason */}
                  <td className="align-middle">{r?.need_food_reason}</td>

                  {/* Contact */}
                  <td className="align-middle">{r?.contact}</td>

                  {/* Status */}
                  <td className="text-start">
                    <span
                      className={`badge px-3 py-3 text-white ${
                        r.status === "pending"
                          ? "bg-yellow-500"
                          : r.status === "accepted"
                            ? "bg-green-500"
                            : "bg-red-500"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="flex flex-1 md:flex text-center align-middle space-x-2">
                    <button
                      className={`btn btn-sm text-white ${
                        r.status === "pending"
                          ? "bg-[#F06225] hover:bg-orange-600"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      disabled={r.status !== "pending"}
                      onClick={async () => {
                        await handleFoodRequestAccepted(r?._id);
                        setRefetch((prev) => !prev);
                      }}
                    >
                      {r.status === "accepted" ? (
                        <>
                          <Check size={16} /> Accepted
                        </>
                      ) : (
                        <>Accept</>
                      )}
                    </button>
                    <button
                      className={`btn btn-sm text-white ${
                        r.status === "pending"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      disabled={r.status !== "pending"}
                      onClick={async () => {
                        await handleFoodRequestRejected(r?._id);
                        setRefetch((prev) => !prev);
                      }}
                    >
                      {r.status === "rejected" ? (
                        <>
                          <Check size={16} /> Rejected
                        </>
                      ) : (
                        <>Reject</>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
