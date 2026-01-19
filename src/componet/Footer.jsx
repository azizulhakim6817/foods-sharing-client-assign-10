import { Link } from "react-router";
import logo from "../assets/logo.png";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content py-6">
      {/* Logo */}
      <div className="flex justify-center items-center mb-4">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-10 h-10" src={logo} alt="PlateShare Logo" />
          <span className="text-2xl font-bold">PlateShare</span>
        </Link>
      </div>

      {/* Copyright */}
      <p className="text-center mb-4">
        Copyright © {new Date().getFullYear()} - All rights reserved || Foods
        Sharing
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-6">
        {/* Github */}
        <a
          href="https://github.com/azizulhakim6817"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-600 transition-colors"
        >
          <FaGithub size={25} />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/azizul-hakim-948309237/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition-colors"
        >
          <FaLinkedin size={25} />
        </a>
        {/* Facebook */}
        <a
          href="https://www.facebook.com/azizulhakimvideo/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
