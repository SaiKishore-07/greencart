import User from "../models/User.js";

// update user cartData : /api/cart/update

export const updateCart = async (req, res) => {
  try {
    // const { userId, cartItems } = req.body;
    const userId = req.userId;
    const { cartItems } = req.body;

    if (!cartItems) {
      return res
        .status(400)
        .json({ success: false, message: "Cart data missing" });
    }

    await User.findByIdAndUpdate(userId, { cartItems });
    res.status(200).json({ success: true, message: "Cart Updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
