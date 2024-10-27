import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

const img_hosting_token = import.meta.env.VITE_Img_Hosting_Token;

function AddContact() {
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    setLoading(true);
  
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgUrl = imgResponse.data.url;
          const { name, email, phone, address } = data;
          const newItem = { name, email, image: imgUrl, phone, address };
  
          // Retrieve the JWT token from localStorage
          const token = localStorage.getItem("token");
  
          fetch("https://contact-management-app-server.vercel.app/contacts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newItem),
          })
            .then((res) => {
              if (!res.ok) {
                return res.json().then(errorData => {
                  throw new Error(errorData.message || "Failed to add contact");
                });
              }
              return res.json();
            })
            .then((contactResponse) => {
              if (contactResponse.insertedId) {
                setLoading(false);
                reset();
                Swal.fire({
                  icon: "success",
                  title: "Success!",
                  text: "Contact added successfully!",
                });
                navigate("/");
              } else {
                throw new Error("Failed to add contact");
              }
            })
            .catch((error) => {
              setLoading(false);
              console.error("Error:", error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message, // Show the error message from the server
              });
            });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Image upload failed:", error);
        Swal.fire({
          icon: "error",
          title: "Image Upload Error",
          text: "Failed to upload image. Please try again.",
        });
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-base-100 shadow-lg rounded-lg">
      <Helmet>
        <title>Add Contact | CMA</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Contact</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        className="card-body bg-base-200 px-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Name<span className="text-red-600">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 50,
                message: "Name can't exceed 50 characters",
              },
            })}
            className="input rounded-none focus:ring-0 focus:border-0 focus:outline-none focus:shadow-md"
          />
          {errors.name && (
            <p className="text-red-600 ps-1">{errors.name.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Email<span className="text-red-600">*</span>
            </span>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            className="input rounded-none focus:ring-0 focus:border-0 focus:outline-none focus:shadow-md"
          />
          {errors.email && (
            <p className="text-red-600 ps-1">{errors.email.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Phone Number<span className="text-red-600">*</span>
            </span>
          </label>
          <input
            type="tel"
            placeholder="Enter Phone number(01*********)"
            {...register("phone", {
              required: "Phone number is required",
              minLength: {
                value: 11,
                message: "Phone number must be 11 digits",
              },
              maxLength: {
                value: 11,
                message: "Phone number must be 11 digits",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Phone number must contain only numbers",
              },
            })}
            className="input rounded-none focus:ring-0 focus:border-0 focus:outline-none focus:shadow-md"
          />
          {errors.phone && (
            <p className="text-red-600 ps-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Address<span className="text-red-600">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter Address"
            {...register("address", {
              required: "Address is required",
              maxLength: {
                value: 100,
                message: "Address can't exceed 100 characters",
              },
            })}
            className="input rounded-none focus:ring-0 focus:border-0 focus:outline-none focus:shadow-md"
          />
          {errors.address && (
            <p className="text-red-600 ps-1">{errors.address.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Image<span className="text-red-600">*</span>
            </span>
          </label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="file-input file-input-bordered w-full max-w-xs focus:outline-none"
          />
          {errors.image && (
            <p className="text-red-600 ps-1">{errors.image.message}</p>
          )}
        </div>

        <div className="form-control mt-4">
          <button
            type="submit"
            className="btn bg-gray-600 text-xl w-52 text-white hover:text-black rounded-lg"
          >
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddContact;
