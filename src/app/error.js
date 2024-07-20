"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <p>{error.message}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
