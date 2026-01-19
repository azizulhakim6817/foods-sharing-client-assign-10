import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const locatoin = useLocation();
  const { loignUser, googleSignUp } = useContext(AuthContext);

  const [showPassword, setPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    //! regex-> password must be--------
    const isShortPassword = password.length < 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    if (isShortPassword) {
      setError("Length must be at least 6 characters.");
      return;
    }
    if (!hasUppercase) {
      setError("Must have an Uppercase letter.");
      return;
    }
    if (!hasLowercase) {
      setError("Must have a Lowercase letter.");
      return;
    }
    //* login-------------------------
    try {
      const result = await loignUser(email, password);
      const user = result.user;
      console.log("user ", user);
      toast.success("Login successful");
      navigate(locatoin.state || "/");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  //! googleSignUp -----------------
  const handlegoogleSignUp = () => {
    googleSignUp().then((result) => {
      console.log(result.user);
      toast.success("Login successful");
      navigate(locatoin.state || "/");
    });
  };

  //!Toggle password ----------------------------
  const handleTogglePassword = (e) => {
    e.preventDefault();
    setPassword(!showPassword);
  };

  return (
    <div className="mx-auto my-8 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="text-center text-3xl font-bold text-[#F06225]">Login</h2>
        <fieldset className="fieldset">
          <form onSubmit={handleSubmit} className="space-y-1">
            <label className="label text-gray-700 font-normal">Email : </label>
            <input
              type="email"
              name="email"
              className="input w-full "
              placeholder="Email"
            />
            {/* password */}
            <div className="relative">
              <label className="label text-gray-700 font-normal ">
                Password :
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input w-full"
                placeholder="Password"
              />
              <button
                onClick={handleTogglePassword}
                className=" btn-xs absolute right-3 top-7"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <p className="text-red-500">{error}</p>

            {/*Forgot password?------------------------ */}
            <div className="mt-1">
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="w-full btn bg-[#F06225] text-white mt-1">
              Login
            </button>
          </form>
        </fieldset>
        {/* Google------------------------ */}
        <button
          onClick={handlegoogleSignUp}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
        {/* redirect to login page ------------------------*/}
        <div className="text-center">
          <p>
            Already have an account?
            <Link to="/register">
              <span className="font-bold text-blue-600"> Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
