import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/useMusic.store";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Clock, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumDetail = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { selectedAlbum, isLoading, fetchAlbumById } = useMusicStore();

  useEffect(() => {
    fetchAlbumById(albumId!);
  }, [albumId]);

  const formatDuration = (duration : number) => {
    const secs = duration % 60;
    const minutes = (duration-secs) / 60;
    return minutes + ":" + secs;
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        {/* Main content */}
        <div className="relative min-h-full flex flex-col">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-md bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80"
          ></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img
                className="size-60 rounded-xl shadow-xl"
                src={selectedAlbum?.imageUrl}
                alt={selectedAlbum?.title}
              />
              <div className="flex flex-col justify-end select-none">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">
                  {selectedAlbum?.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {selectedAlbum?.artist}
                  </span>
                  <span>• {selectedAlbum?.songs.length}</span>
                  <span>• {selectedAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* Play btn */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                size="icon"
                className="size-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                <Play className="size-7 text-black" />
              </Button>
            </div>

            {/* Table */}
            <div className="bg-black/20 backdrop-blur-sm">
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Release Date</div>
                <div>
                  <Clock className="size-4" />
                </div>
              </div>

              {/* songs list */}
              <div className="px-6">
                <div className="space-y-2 py-4">
                  {selectedAlbum?.songs.map((song, idx) => (
                    <div
                      key={song._id}
                      className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-center">
                        <span className="group-hover:hidden">{idx + 1}</span>
                        <Play className="size-4 hidden group-hover:block " />
                      </div>

                      <div className="flex items-center gap-3">
                        <img
                          src={song.imageUrl}
                          alt={song.title}
                          className="size-10 rounded-md"
                        />
                        <div className="flex flex-col ">
                          <div className="font-medium text-white">
                            {song.title}
                          </div>
                          <div>{song.artist}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="font-medium text-zinc-500">
                          {song.createdAt.split("T")[0]}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="font-medium text-zinc-500">
                          {formatDuration(song.duration)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumDetail;
