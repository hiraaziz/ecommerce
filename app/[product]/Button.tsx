"use client";
import { CartContext } from "@/components/State";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useSession } from "next-auth/react";

export const Button = ({ id, quantity, setquantity }: any) => {
  const { state, dispatch } = useContext(CartContext);
  const [buttonclick, setbuttonclick] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    changeQuantity();
  }, [quantity]);

  useEffect(() => {
    const product = state.filter((item: any) => id == item.product_id)[0];

    if (product) {
      setquantity(product.quantity);
    }
  }, [state]);

  async function QuantityChange() {
    // const cookies = new Cookies();
    // const userId = cookies.get("user_id");
    const res = await fetch("/api/quantity", {
      method: "PATCH",
      body: JSON.stringify({
        product_id: id,
        quantity: quantity,
        userid: session?.user?.email,
      }),
    });
    return await res.json();
  }

  async function changeQuantity() {
    /* On changing quantity everytime this functions will call.
    1. It will check if buttonclick = true means product already added so change quantity in db and store.
    2. If buttonclick = false means product is not added so do nothing on quantity change.
    */
    if (buttonclick == true) {
      const res = await QuantityChange();
      if (res.status == 200) {
        dispatch({
          type: "ChangeQuantity",
          payload: {
            product_id: id,
            quantity: quantity,
          },
        });
      }

      setbuttonclick(false);
    }
  }

  return (
    <div className="w-20 flex justify-between items-center">
      <button
        onClick={() => {
          setquantity((prev: number) => prev - 1);
          setbuttonclick(true);
        }}
        disabled={quantity <= 1}
        className="border-[1px] border-gray-600 rounded-full h-7 w-7"
      >
        -
      </button>
      <h3>{quantity}</h3>
      <button
        onClick={() => {
          setquantity((prev: number) => prev + 1);
          setbuttonclick(true);
        }}
        className="border-[1px] border-gray-600 rounded-full h-7 w-7"
      >
        +
      </button>
    </div>
  );
};
