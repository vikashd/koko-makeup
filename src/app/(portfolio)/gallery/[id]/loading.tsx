import { ArrowUpLeft } from "iconoir-react";

export default function Loading() {
  return (
    <div className="pt-64">
      <div className="container mx-auto animate-pulse">
        <div className="inline-block opacity-10 -mb-2">
          <ArrowUpLeft />
        </div>
        <div className="max-w-56 h-[60px] rounded bg-white/10" />
        <div className="my-10">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3">
            <div className="w-full aspect-square rounded bg-white/10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
