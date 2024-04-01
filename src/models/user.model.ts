import mongoose from "mongoose";
import bcrypt from "bcrypt";

// interfaces
export interface userInput {
  username: string;
  password: string;
  email: string;
}

export interface userDocument extends userInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// create user schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);
// append methods to user schema
userSchema.pre("save", async function (next) {
  let user = this as unknown as userDocument;
  if (!user.isModified("password")) {
    return next();
  }
  const genSalt = await bcrypt.genSalt(Number(process.env.SALTFACTOR));
  const hash = bcrypt.hashSync(user.password, genSalt);
  user.password = hash;
  return next();
});

userSchema.methods.confirmPassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as userDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

// export user model
export const userModel = mongoose.model("user", userSchema);
