import { Check } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosInstance from "../../hooks/useAxios";

const MyFoodRequest = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [food, setFood] = useState([]);
  const [refetch, setRefetch] = useState(false);

  console.log("food", food);

  //! Fetch all food requests
  useEffect(() => {
    const fetchFoodRequests = async () => {
      try {
        const res = await axiosInstance.get("/my-food-request");
        setFood(res.data.data);
      } catch (error) {
        console.error("Failed to fetch food requests:", error);
      }
    };

    fetchFoodRequests();
  }, [refetch]);

  //! Accept request
  const handleFoodRequestAccepted = async (_id) => {
    try {
      await axiosInstance.post(`/request-accepted/${_id}`);
      setRefetch((prev) => !prev);
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  };

  //! Reject request
  const handleFoodRequestRejected = async (_id) => {
    try {
      await axiosInstance.post(`/food-request-rejected/${_id}`);
      setRefetch((prev) => !prev);
    } catch (error) {
      console.error("Failed to reject request:", error);
    }
  };

  return (
    <div>
      <div className="my-4 md:my-8 text-center">
        <h1 className="mb-6 text-xl md:text-3xl font-bold text-[#F06225]">
          Food Requests
          <span className="text-primary"> ({food?.length || 0})</span>
        </h1>
      </div>

      <div className="mb-20 overflow-x-auto rounded-md px-2 md:px-8">
        <table className="table w-full">
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
            {food?.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  No requests yet.
                </td>
              </tr>
            ) : (
              food?.map((r, index) => (
                <tr
                  key={r._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="text-center font-semibold">{index + 1}</td>
                  <td>{r.userName}</td>
                  <td>{r.need_food_reason}</td>
                  <td>{r.contact}</td>
                  <td>
                    <span
                      className={`badge px-3 py-1 text-white ${
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
                  <td className="flex gap-2 justify-center">
                    <button
                      className={`btn btn-sm text-white ${
                        r.status === "pending"
                          ? "bg-[#F06225] hover:bg-orange-600"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      disabled={r.status !== "pending"}
                      onClick={() => handleFoodRequestAccepted(r._id)}
                    >
                      {r.status === "accepted" ? (
                        <>
                          <Check size={16} /> Accepted
                        </>
                      ) : (
                        "Accept"
                      )}
                    </button>

                    <button
                      className={`btn btn-sm text-white ${
                        r.status === "pending"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      disabled={r.status !== "pending"}
                      onClick={() => handleFoodRequestRejected(r._id)}
                    >
                      {r.status === "rejected" ? (
                        <>
                          <Check size={16} /> Rejected
                        </>
                      ) : (
                        "Reject"
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFoodRequest;
