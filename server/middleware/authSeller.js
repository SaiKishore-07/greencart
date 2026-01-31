import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(400).json({ success: false, message: "Not Authorized" });
  }

  try {
    if (!process.env.SELLER_EMAIL || !process.env.JWT_SECRET) {
      throw new Error("Environment variables missing");
    }

    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      res.status(401).json({ success: false, message: "Not Authorized" });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authSeller;
