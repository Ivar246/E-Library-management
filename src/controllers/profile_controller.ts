import { Profile } from "../entity/Profile";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const insertData = async (req: Request, res: Response, next: NextFunction) => {
    const profileId = parseInt(req.params.pid);
    const { firstName, lastName, profile_image } = req.body;
    const profile = await AppDataSource.manager.findOneBy(Profile, { id: profileId });
    if (profile) {
        if (firstName.length > 0)
            profile.firstName = firstName;

        if (lastName.length > 0)
            profile.lastName = lastName;

        if (profile_image.length > 0)
            profile.profile_image = profile_image;
        await AppDataSource.manager.save(profile);
        return res.status(204).json({ message: "Successfully updated" });
    }

    else {
        return res.status(400).json({ message: "Profile not found" });
    }
}

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    const parsedUser = JSON.parse(req.user);
    const userId = parseInt(req.params.userId)
    if (parsedUser.userId !== userId) {
        return res.status(401).json({ message: "Couldn't get the profle.", status: "failure" })
    }
    const profileinfo = await AppDataSource.manager.createQueryBuilder(User, "user").leftJoin("user.profile", "profile").select(["user.id",
        "user.username",
        "user.age",
        "user.phone",
        "user.email",
        "user.password",
        "user.role",
        "user.created_at",
        "profile.id",
        "profile.lastName",
        "profile.profile_image",
    ])
        .where("user.id = :userId", { userId })
        .getOne()
    console.log(profileinfo)

    return res.json(profileinfo)
}