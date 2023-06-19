"use client";
import { CartContext } from "@/components/State";
import React, { useState, useContext, useEffect } from "react";
import { Button } from "./Button";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

const AddCart = ({ id }: any) => {
  const [quantity, setquantity] = useState(1);
  const { state, dispatch } = useContext(CartContext);
  const [cartdisbale, setcartdisable] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    // if value product is in the cart set add to cart button disable
    const val = state.find((t: any) => t.product_id == id);
    if (val) setcartdisable(true);
  }, [state]);

  async function addToCart() {
    // First It will add product to cart and If response is okay It will add into store as well
    const res = await fetch("https://hira-ecommerce.vercel.app/api/cart", {
      method: "POST",
      body: JSON.stringify({
        user: session?.user?.email,
        product_id: id,
        quantity: quantity,
      }),
    });

    if (res.status == 200) {
      toast.success("Item Added to card");
      dispatch({
        type: "AddToCart",
        payload: {
          product_id: id,
          quantity: quantity,
        },
      });
    } else toast.error("Item Added! Failed");
  }

  return (
    <>
      <Button quantity={quantity} setquantity={setquantity} id={id} />

      <button
        onClick={() => addToCart()}
        className="px-4 py-2 bg-black text-white"
        disabled={cartdisbale}
      >
        {cartdisbale ? "Added to Cart" : "Add to Cart"}
      </button>
      <Toaster />
    </>
  );
};

export default AddCart;
