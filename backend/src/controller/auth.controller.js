import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // Signup
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }
    else{
      console.log("User already exist in base");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("error in auth callback", error);
    next(error);
  }
};
