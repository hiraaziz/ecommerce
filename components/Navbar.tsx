import React from "react";
import Image from "next/image";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex w-full justify-evenly my-8 items-center">
      <Image src={"/Logo.webp"} alt="logo" width={150} height={150} />

      <div className="flex justify-between list-none w-96 text-lg font-normal">
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/female">
          <li>Female</li>
        </Link>
        <Link href="/male">
          <li>Male</li>
        </Link>
        <Link href="/allproducts">
          <li>All Products</li>
        </Link>
      </div>
      <div className="border-[1px] border-gray-200 rounded-md w-80 py-[1px] flex items-center text-sm">
        <CiSearch className="mx-2" />
        <input placeholder="What you looking for?" />
      </div>
      <div>
        <CiShoppingCart className="w-14 h-14 bg-slate-100 rounded-full p-3" />
        <span className="bg-red-400 w-5 h-4 text-center text-xs absolute  pb-5 -mt-14 ml-[25px] rounded-full text-white ">
          0
        </span>
      </div>
    </div>
  );
};

export default Navbar;
