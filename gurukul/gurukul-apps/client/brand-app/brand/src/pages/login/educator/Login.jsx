import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginEducator } from "../../../redux/api/educatorAPI";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { branding } = useSelector((state) => state.brandDetails);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loading = useSelector((state) => state.ui.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    console.log("Form Data:", data);
    dispatch(loginEducator({ dispatch, data, brandId: branding.brandId })).then((res) => {
      console.log("Login Response:", res);
      if (res.payload.code > 300) {
        setErrorMessage(res.payload.message);
        setSuccessMessage("");
      } else {
        setSuccessMessage(res.payload.message);
        setErrorMessage("");
        // navigate("/");
      }
    });
  };

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-600 mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
