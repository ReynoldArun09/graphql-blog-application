import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../../models/user.model.js";

const resolvers = {
  Query: {
    getAllUser: async () => {
      const users = await userModel.find({});
      return users;
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const { username, email, password, profilePic } = args;
      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
        return {
          status: 400,
          message: "User already exists",
          data: null,
        };
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await userModel.create({
        username,
        password: hashPassword,
        email,
        profilePic: profilePic ? profilePic : "",
      });

      return {
        status: 201,
        message: "User created succesfully!",
        data: user,
      };
    },

    login: async (_, args, { res }) => {
      const { email, password } = args;

      const existingUser = await userModel.findOne({ email });

      if (!existingUser) {
        return {
          status: 400,
          message: "User doesnt exist",
          data: null,
        };
      }

      const comparePassword = await bcrypt.compare(password, existingUser.password);

      if (!comparePassword) {
        return {
          status: 400,
          message: "Invalid credentinals",
          data: null,
        };
      }

      const accessToken = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return {
        status: 200,
        message: "User has beed logged in",
        data: existingUser,
      };
    },
  },
};

export default resolvers;
