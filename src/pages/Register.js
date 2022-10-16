import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import Error from "../components/ui/Error";
import { useRegisterMutation } from "../features/auth/authApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const [register, { data, isLoading, error: responseError }] = useRegisterMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (data?.accessToken && data?.user) {
      navigate("/inbox");
    }
  }, [data, responseError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (confirmPassword !== password) {
      setError("Password do not match");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className="grid place-items-center h-[calc(100vh_-_20px)] bg-secondary">
      <div className="h-[calc(100vh_-_120px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 border border-primary rounded-lg shadow-xl">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/">
              <img className="mx-auto h-12 w-auto" src={logoImage} alt="Learn with sumit" />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-light">Create your account</h2>
          </div>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="Name"
                  type="Name"
                  autoComplete="Name"
                  required
                  className="appearance-none mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-accent  rounded-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-accent  rounded-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-accent  rounded-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="confirmPassword"
                  autoComplete="current-confirmPassword"
                  required
                  className="appearance-none mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-accent  rounded-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 mb-2">
              <div className="flex items-center">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  required
                  className="h-4 w-4 focus:ring-violet-500 border-gray-300 rounded"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label
                  htmlFor="accept-terms"
                  className={`ml-2 block text-sm  ${agreed ? "text-accent-light" : ""}`}
                >
                  Agreed with the terms and condition
                </label>
              </div>
            </div>

            <div>
              <div className="text-sm mb-2 mt-0">
                <small>
                  Already have an account?{" "}
                  <Link to="/" className="font-medium text-accent-light">
                    Please Login
                  </Link>
                </small>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-primary text-sm text-gray-light  font-medium rounded-sm text-white hover:bg-cyan bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                SIGN UP
              </button>
            </div>

            {error !== "" && <Error message={error} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
