const {
  alreadyExistsError,
  unprocessableError,
  itemNotFoundError,
  unauthorizedError,
} = require("../errors/db.errors");
const { EXIST_USER } = require("../validators/user.validate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("./user.service");
const User = require("../models/user.model");
const { sendEmail } = require("../helper/sendingEmail");
const { getdataFromToken } = require("../helper/auth.helper");
const { userStatus } = require("../constants/status");

const register = async (data) => {
  try {
    const emailNotRegistered = await User.findOne({ email: data.email });
    console.log("emailNotRegistered", emailNotRegistered);
    if (emailNotRegistered) {
      throw alreadyExistsError("Email already Exists");
    }

    const usernameNotRegistered = await User.findOne({ username: data.username });
    console.log("usernameNotRegistered", usernameNotRegistered);
    if (usernameNotRegistered) {
      throw alreadyExistsError("Username already Exists");
    }

    const password = await bcrypt.hash(data.password, 12);
    const user = {
      ...data,
      password,
    };
    const token = jwt.sign(
      {
        email: data.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const send_message = `${process.env.CLIENT_URL}/${token}`;
    await sendEmail(data.email, "Verify Email", send_message);
    console.log(send_message);
    //await for verification userStatus.active === 'active'
    const createdUser = await userService.createUser(user);
    return createdUser;
  } catch (error) {
    throw unprocessableError(error.message);
  }
};

const verification = async (token) => {
  const { email } = await getdataFromToken(token);
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw itemNotFoundError("User not Found");
    }
    await User.updateOne({ email: email }, { $set: { status: userStatus.active } });
    return user;
  } catch (error) {
    throw unprocessableError(error);
  }
};

const login = async (data) => {
  try {
    const { email, password } = data;
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      throw itemNotFoundError("Username is not found. Invalid login credentials.");
    }
    console.log(foundUser);
    if (foundUser.status === "deleted") {
      throw itemNotFoundError("Username is not found. Invalid login credentials.");
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const accessToken = jwt.sign(
        {
          user: foundUser,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign(
        {
          user: foundUser,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      //   res.cookie("refreshToken", refreshToken, {
      //     httpOnly: true,
      //     sameSite: "None",
      //     secure: true,
      //     maxAge: 24 * 60 * 60 * 1000,
      //   });
      //   res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "None", secure: true });
      const data = {
        user: { ...foundUser._doc },
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      return data;
    }
    throw unauthorizedError("Password Incorrect");
  } catch (error) {
    throw unprocessableError(error);
  }
};
module.exports = { register, verification, login };
