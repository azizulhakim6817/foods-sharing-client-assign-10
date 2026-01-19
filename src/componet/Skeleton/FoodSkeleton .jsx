const FoodSkeleton = () => {
  return (
    <div className="my-4 md:px-14 grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className=" rounded-lg p-4 animate-pulse">
          <div className="h-40 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default FoodSkeleton;
