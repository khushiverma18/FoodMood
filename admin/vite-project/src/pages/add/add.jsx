import React, { useState } from "react";
import "./add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const url = "http://localhost:8080";

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  /* 🟢 universal input handler */
  const onChangeHandler = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setImage(files[0]);               // file object state
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /* 🚀 submit */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);

    if (image) formData.append("image", image); // ← यही ‘append’ काम आता है

    try {
      const { data: res } = await axios.post(
        `${url}/api/food/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.success) {
        toast.success(res.message);
        setData({ name: "", description: "", price: "", category: "Salad" });
        setImage(null);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        {/* image upload */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
            hidden
            onChange={onChangeHandler}
          />
        </div>

        {/* name */}
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* description */}
        <div className="add-product-name flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            rows="4"
            placeholder="Write content here"
            value={data.description}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* category + price */}
        <div className="add-category-price">
          <div className="add-product-name flex-col">
            <p>Product category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              {[
                "Salad",
                "Rolls",
                "Deserts",
                "Sandwich",
                "Cake",
                "Pure Veg",
                "Pasta",
                "Noodles",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type="number"
              name="price"
              placeholder="₹ 20"
              value={data.price}
              onChange={onChangeHandler}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
