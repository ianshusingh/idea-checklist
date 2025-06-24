import { Skeleton } from "@/components/ui/skeleton";

export default function AppLoader(){
     return (
          <div className="p-4 space-y-3.5">
               <div className="flex items-center justify-between">
                    <Skeleton className="w-[300px] h-[24px] md:h-[30px]"/>
                    <div className="flex items-center justify-center gap-2">
                         <Skeleton className="w-9 h-9"/>
                         <Skeleton className="w-9 h-9"/>
                    </div>
               </div>
               <Skeleton className="w-full h-[16px]"/>
               <Skeleton className="w-full h-9"/>
               {new Array(5).fill("").map((_,i)=>(
                    <Skeleton key={i} className="w-full h-[90px]"/>
               ))}
          </div>
     )
}