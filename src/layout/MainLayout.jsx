import { Outlet } from "react-router";
import Footer from "../componet/Footer";
import Navbar from "../componet/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className=" flex-1">
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
