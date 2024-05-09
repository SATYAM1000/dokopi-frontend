import { Skeleton } from "@/components/ui/skeleton";

const StoreSkelton = () => {
  return (
    <section className="w-full mt-4">
      <div className="w-full min-h-screen flex flex-col gap-2 ">
        {/* ------------stores container---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-[350px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-[350px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-[350px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-[350px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-[350px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-[350px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreSkelton;
