"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <p className="mt-2">{error.message}</p>
      <button
        className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
