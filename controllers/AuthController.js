import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const prisma = getPrismaInstance();
    if (!email) {
      return res.json({ message: "User Email is required", status: false });
    }
    const isUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!isUserExist) {
      return res.json({ message: "User does not exist", status: false });
    } else {
      return res.json({
        message: "User already exists",
        status: true,
        data: isUserExist,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const onboardUser = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, email, about, image: profilePhoto } = req.body;
    if (!email || !name || !about || !profilePhoto) {
      return res.send("Name,Email,About and Profile Photo must be provided");
    }
    const prisma = getPrismaInstance();
    await prisma.user.create({
      data: { name, email, about, profilePhoto },
    });
    return res.json({ message: "User created successfully", status: true });
  } catch (error) {
    next(error);
  }
};
