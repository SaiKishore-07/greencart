import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

// add product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    // validate images
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Images required" });
    }

    // parse product data
    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    // upload images from MEMORY to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ resource_type: "image" }, (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            })
            .end(item.buffer); // <-- IMPORTANT (memory buffer)
        });
      }),
    );

    // save product
    await Product.create({
      ...productData,
      image: imagesUrl,
      inStock: true,
    });

    res.status(200).json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get products : /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ created: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get single product : /api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// change product inStock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.status(200).json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
