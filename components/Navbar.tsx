"use client";
import Image from "next/image";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import Cookies from "universal-cookie";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/State";
import { ICart } from "@/type";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const { state, dispatch } = useContext(CartContext);
  const [cartcount, setcartcount] = useState(0);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    if (state.length != 0) {
      const count = state.reduce(
        (acc: number, curr: ICart) => acc + curr.quantity,
        0
      );
      setcartcount(count);
    } else {
      setcartcount(0);
    }
  }, [state]);

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    const cookies = new Cookies();
    const userId = cookies.get("user_id");
    const res = await fetch(`/api/cart?userid=${userId}`);
    const response: { res: ICart[] } = await res.json();
    if (response.res.length > 0) {
      dispatch({
        type: "FetchedCart",
        payload: response.res,
      });
    }
  }

  return (
    <nav>
      <div className="hidden lg:flex w-full justify-evenly my-8 items-center">
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
          <Link href="/cart">
            <CiShoppingCart className="w-14 h-14 bg-slate-100 rounded-full p-3" />
            <span className="bg-red-400 w-5 h-4 text-center text-xs absolute  pb-5 -mt-14 ml-[25px] rounded-full text-white ">
              {cartcount}
            </span>
          </Link>
        </div>
      </div>
      <div className="flex lg:hidden w-full justify-between h-14">
        <Image
          src={"/Logo.webp"}
          alt="logo"
          width={150}
          height={100}
          className="p-4"
        />
        <button onClick={() => setOpenNav(!openNav)} className="p-4">
          <RxHamburgerMenu />
        </button>
      </div>
      {openNav ? (
        <div className="w-full flex flex-col items-center justify-evenly h-60">
          <div className="flex-col justify-between list-none text-lg font-normal ">
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

          <Link href="/cart">
            <CiShoppingCart className="w-14 h-14 bg-slate-100 rounded-full p-3" />
            <span className="bg-red-400 w-5 h-4 text-center text-xs absolute  pb-5 -mt-14 ml-[25px] rounded-full text-white ">
              {cartcount}
            </span>
          </Link>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
