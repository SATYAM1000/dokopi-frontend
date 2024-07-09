"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
