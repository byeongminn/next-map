export const Loading = () => {
  return (
    <>
      <div className="w-full h-20 animate-pulse bg-gray-200 rounded-md" />
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="w-full h-20 animate-pulse bg-gray-200 rounded-md mt-2"
        />
      ))}
    </>
  );
};
