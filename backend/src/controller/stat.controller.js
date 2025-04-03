import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (req, res, next) => {
  try {
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),

        Song.agregate([
          {
            $unionWith: {
              coll: "albums",
              pipeling: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.status(200).json({
      totalSongs,
      totalAlbums,
      totalUsers,
      uniqueArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    next(error);
  }
};
