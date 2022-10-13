import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import Error from "../components/ui/Error";
import { useLoginMutation } from "../features/auth/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError?.data);
    }
    if (data?.accessToken && data?.user) {
      navigate("/inbox");
    }
  }, [data, responseError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (responseError) {
      setError(responseError?.data);
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <div className="grid place-items-center h-[calc(100vh_-_20px)] bg-secondary ">
      <div className="h-[calc(100vh_-_180px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 border border-primary rounded-lg shadow-xl">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/">
              <img className="mx-auto h-12 w-auto" src={logoImage} alt="Learn with sumit" />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-light">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-sm shadow-sm -space-y-px">
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
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none  relative block w-full px-3 py-2 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <small>
                  Don't have an account?{" "}
                  <Link to="/register" className="font-medium text-accent-light hover:text-violet-500">
                    Please Register
                  </Link>
                </small>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-gray-light bg-cyan hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                SIGN IN
              </button>
            </div>

            {error && <Error message={error} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
