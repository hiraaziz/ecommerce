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
    state.map((t: any) => {
      t.product_id == id ? setcartdisable(true) : setcartdisable(false);
    });
  }, [state]);

  async function addToCart() {
    const res = await fetch("/api/cart", {
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
      {state.length !== 0 ? (
        <Button quantity={quantity} setquantity={setquantity} id={id} />
      ) : (
        "loading"
      )}

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
