const MyFoodSkeleton = ({ rows = 5 }) => {
  return (
    <div className="px-4 md:px-8 lg:px-12 overflow-x-auto">
      <table className="table w-full min-w-[600px]">
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index} className="animate-pulse border-b last:border-none">
              {/* Index */}
              <td className="text-center">
                <div className="h-4 w-4 bg-gray-300 rounded mx-auto"></div>
              </td>

              {/* Image */}
              <td className="text-center">
                <div className="h-10 w-14 sm:h-12 sm:w-16 bg-gray-300 rounded mx-auto"></div>
              </td>

              {/* Food Name */}
              <td>
                <div className="h-4 w-24 sm:w-32 md:w-40 bg-gray-300 rounded"></div>
              </td>

              {/* Status */}
              <td>
                <div className="h-6 w-16 sm:w-20 bg-gray-300 rounded"></div>
              </td>

              {/* Actions */}
              <td>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <div className="h-8 w-full sm:w-20 bg-gray-300 rounded"></div>
                  <div className="h-8 w-full sm:w-20 bg-gray-300 rounded"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFoodSkeleton;
