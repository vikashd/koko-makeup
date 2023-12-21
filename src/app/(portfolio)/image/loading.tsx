import { Loading as LoadingAnimation } from "@/app/_components/Loading";

export default function Loading() {
  return (
    <div
      className="fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-slate-900 bg-opacity-60 z-50"
      aria-hidden
    >
      <LoadingAnimation />
    </div>
  );
}
