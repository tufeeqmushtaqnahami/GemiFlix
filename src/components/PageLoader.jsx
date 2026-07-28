const PageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-5">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>

        <h2 className="text-lg font-medium text-white">
          Loading...
        </h2>
      </div>
    </div>
  );
};

export default PageLoader;