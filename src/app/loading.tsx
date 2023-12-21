import { Loading as LoadingAnimation } from "@/app/_components/Loading";

export default function Loading() {
  return (
    <div className="fixed bg-blue-950/80 top-0 left-0 w-screen h-screen flex items-center justify-center px-4 py-4 z-50">
      <LoadingAnimation />
    </div>
  );
}
