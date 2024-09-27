import React, { useState } from "react";
import axios from "axios"; // axios import
import swal from "sweetalert"; // sweetalert import
import "../styles/auth.css";
import { useForm } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import Wallpaper from "./layouts/Wallpaper";
import { saveCredentials, getWalletData } from "./Store";
import { ProductionAPI as API } from "./layouts/Routes";

export default function Authentication() {
  const [form, setForm] = useState(true); // login or register
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleForm = (e) => {
    if (e.target.id === "login") setForm(true);
    if (e.target.id === "register") setForm(false);
  };

  const fetchData = async () => {
    await getWalletData().then((data) => console.log(data));
  };

  const saveUserDataToStore = async (email, password) => {
    await saveCredentials({ email, password }).then(fetchData());
  };

  const handleLogin = async (data) => {
    try {
      if (!data.email || !data.password) {
        return swal("Details Required", "All fields are required", "error");
      }

      // Retrieve wallet data from local storage or another source
      await getWalletData().then((store) => {
        if (store && store.email && store.password) {
          if (
            data.email === store.email &&
            store.password === btoa(data.password)
          ) {
            swal("Welcome", "Welcome Back to BlockVault", "success");
            return navigate("/app");
          } else {
            return swal("Login Failed", "Invalid email or password", "error");
          }
        }
      });

      // If wallet data isn't found, check the backend via an API call
      const response = await axios.post(API.LOGIN, {
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        const email = data.email;
        const password = btoa(data.password);
        saveUserDataToStore(email, password);
        swal("Login Successful", "Successfully logged in", "success");
        return navigate("/app");
      }
    } catch (error) {
      swal("Error", error.message, "error");
    } finally {
      reset();
    }
  };

  const handleRegister = async (data) => {
    try {
      if (!data.email || !data.password || !data.confirmPassword) {
        return swal("Details Required", "All fields are required", "error");
      }

      if (data.password !== data.confirmPassword) {
        return swal("Error", "Passwords do not match", "error");
      }

      const response = await axios.post(API.REGISTER, {
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        swal("Registered", "Successfully registered", "success");
        setForm(true);
        navigate("/app");
      } else {
        swal("Registration Failed", "Error during registration", "error");
      }
    } catch (error) {
      swal("Error", error.message, "error");
    } finally {
      reset();
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center authentication">
      <Wallpaper />
      <div className="flex w-1/4 flex-wrap flex-col md:flex-nowrap gap-4 border-1 p-5 rounded-xl justify-center items-center bg-black">
        <div className="flex w-2/3 flex-wrap flex-row gap-4 z-10">
          <p
            className="test-2xl cursor-pointer font-normal hover:border-b-yellow-50 ease-in duration-40"
            id="login"
            style={
              form
                ? {
                    borderBottomColor: "white",
                    paddingBottom: "5px",
                    fontSize: "large",
                    fontWeight: "800",
                    color: "purple",
                  }
                : { border: "transparent" }
            }
            onClick={handleForm}
          >
            Login
          </p>
          <p
            className="test-sm cursor-pointer font-normal hover:border-b-yellow-50 ease-in duration-40"
            id="register"
            style={
              form
                ? { border: "transparent" }
                : {
                    borderBottomColor: "white",
                    paddingBottom: "5px",
                    fontSize: "large",
                    fontWeight: "800",
                    color: "purple",
                  }
            }
            onClick={handleForm}
          >
            Register
          </p>
        </div>
        {form ? (
          <form
            className="flex w-4/5 flex-wrap flex-col md:flex-nowrap gap-4"
            onSubmit={handleSubmit(handleLogin)}
          >
            <Input
              type="email"
              label="Email"
              {...register("email", { required: "Email is required" })}
              status={errors.email ? "error" : ""}
              helperText={errors.email ? errors.email.message : ""}
            />
            <Input
              type="password"
              label="Password"
              {...register("password", { required: "Password is required" })}
              status={errors.password ? "error" : ""}
              helperText={errors.password ? errors.password.message : ""}
            />
            <Button type="submit" color="primary">
              Login
            </Button>
          </form>
        ) : (
          <form
            className="flex w-4/5 flex-wrap flex-col md:flex-nowrap gap-4"
            onSubmit={handleSubmit(handleRegister)}
          >
            <Input
              type="email"
              label="Email"
              {...register("email", { required: "Email is required" })}
              status={errors.email ? "error" : ""}
              helperText={errors.email ? errors.email.message : ""}
            />
            <Input
              type="password"
              label="Password"
              {...register("password", { required: "Password is required" })}
              status={errors.password ? "error" : ""}
              helperText={errors.password ? errors.password.message : ""}
            />
            <Input
              type="password"
              label="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              status={errors.confirmPassword ? "error" : ""}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
            />
            <Button type="submit" color="primary">
              Register
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
