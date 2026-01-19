import { Link } from "react-router"; 
import logo from "../assets/logo.png";

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
        Copyright © {new Date().getFullYear()} - All rights reserved || PlateShare
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-6">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/azizulhakimvideo/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </a>

        {/* YouTube */}
        <a
          href="https://www.youtube.com/@yourchannelname"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8h4.56v16H.22V8zm7.44 0h4.38v2.18h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.46 3.04 5.46 6.98V24h-4.56v-7.46c0-1.78-.03-4.06-2.48-4.06-2.48 0-2.86 1.94-2.86 3.95V24H7.66V8z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
