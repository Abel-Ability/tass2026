import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import FloatingSidebar from "./FloatingSidebar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navbar />
      <FloatingSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}