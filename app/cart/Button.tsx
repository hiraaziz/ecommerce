"use client";
import { CartContext } from "@/components/State";
import React, { useState, useContext, useEffect } from "react";
import Cookies from "universal-cookie";

export const Button = ({ product_id, product_quantity }: any) => {
  const { state, dispatch } = useContext(CartContext);
  const [quantity, setquantity] = useState(1);
  const [buttonclick, setbuttonclick] = useState(false);

  useEffect(() => {
    changeQuantity();
  }, [quantity]);

  useEffect(() => {
    setquantity(product_quantity);
  }, []);

  async function QuantityChange() {
    const cookies = new Cookies();
    const userId = cookies.get("user_id");
    const res = await fetch("/api/quantity", {
      method: "PATCH",
      body: JSON.stringify({
        product_id: product_id,
        quantity: quantity,
        userid: userId,
      }),
    });
    const data = await res.json();
    return data;
  }

  async function changeQuantity() {
    if (buttonclick == true) {
      const res = await QuantityChange();
      if (res.status == 200) {
        const product = state.filter(
          (item: any) => product_id == item.product_id
        );
        if (product[0]?.product_id) {
          dispatch({
            type: "ChangeQuantity",
            payload: {
              product_id: product[0]?.product_id,
              quantity: quantity,
            },
          });
        }
      }
      setbuttonclick(false);
    }
  }

  return (
    <div className="w-20 flex justify-between items-center md:mt-10">
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
