import jwt from "jsonwebtoken";
import "dotenv/config";
const auth = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  const token = tokenHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acess denied, no Token my dude" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next(); // Passer au middleware suivant
  } catch (error) {
    res.status(401).json({ message: "Invalid Token my dude" });
  }
};

const generateAuthToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET);
  return token;
};
export { auth, generateAuthToken };