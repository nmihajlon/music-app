import PlayListSkeleton from "@/components/skeletons/PlayListSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  const isLoading = true;

  return (
    <div className="h-full flex flex-col">
      {/* Navigation menu */}

      <div className="flex flex-col rounded-lg p-4 bg-zinc-800 mb-4">
        <div className="space-y-2">
          <Link
            to="/"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-700",
              })
            )}
          >
            <HomeIcon />
            <span className="hidden md:inline">Home</span>
          </Link>
          <SignedIn>
            <Link
              to="/chat"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-700",
                })
              )}
            >
              <MessageCircleIcon />
              <span className="hidden md:inline">Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Library section */}
      <div className="flex-1 rounded-lg bg-zinc-800 p-4">
        <div className="flex flex-col justify-between mb-4">
          <div className="flex items-center text-white">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline font-semibold">PlayList</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh - 300px)]">
          <div className="space-y-2">
            {isLoading ? (
                <PlayListSkeleton />
            ) : (
                <div>Some music</div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
