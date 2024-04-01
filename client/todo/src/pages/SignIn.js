/* eslint-disable no-unused-vars */
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="signIn-container">
      <div className="form">
        <form action="" className="signIn-form" onSubmit={handleSubmit}>
          <div>
            <label>Your email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label> Your password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="">Loading...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div className="signUp-option">
          <span> Dont have an account?</span>
          <a href="/sign-up" className="text-blue-500">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
