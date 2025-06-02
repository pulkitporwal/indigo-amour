"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import MainNav from "./main-nav";
import NavActions from "./nav-actions";
import getCategories from "@/actions/get-categories";
import SearchBar from "./ui/search-bar";

export const revalidate = 0;

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="shadow-md w-full flex items-center justify-center flex-col">
      <div className="px-4 py-10 sm:px-6 lg:px-32 flex w-full h-16 items-center justify-between">
        <div className="flex-1">
          <SearchBar />
        </div>
        <Link className="flex lg:ml-0 gap-x-2" href="/">
          <div className=" flex flex-1 font-landslide items-end gap-3 justify-center">
            <img
              src={"/icons/logo-icon.png"}
              className="md:w-12 my-auto h-9 w-9 md:h-12"
            />
            <div className="md:text-[1.25rem] leading-6 md:leading-7 text-[1rem] mt-1">
              Indigo <br /> Amour
            </div>
          </div>
        </Link>
        <NavActions />
      </div>
      <div className="w-full flex items-center justify-center gap-x-5 py-6">
        <MainNav data={categories} />
      </div>
    </div>
  );
};

export default Navbar;
