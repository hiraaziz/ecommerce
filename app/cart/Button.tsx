"use client";
import { CartContext } from "@/components/State";
import React, { useState, useContext, useEffect } from "react";
import Cookies from "universal-cookie";

export const Button = ({ tquantity }: any) => {
  const { state, dispatch } = useContext(CartContext);
  const [quantity, setquantity] = useState(0);

  useEffect(() => {
    changeQuantity();
  }, [quantity]);

  useEffect(() => {
    const product = state.filter(
      (item: any) => tquantity.product_id == item.product_id
    );
    if (product[0]) {
      setquantity(product[0].quantity);
    }
    setquantity(tquantity.quantity);
  }, []);

  async function QuantityChange() {
    const cookies = new Cookies();
    const userId = cookies.get("user_id");
    const res = await fetch("/api/quantity", {
      method: "POST",
      body: JSON.stringify({
        product_id: tquantity.product_id,
        quantity: quantity,
        userid: userId,
      }),
    });
    const data = await res.json();
    return data;
  }

  async function changeQuantity() {
    const res = await QuantityChange();
    if (res.status == 200) {
      const product = state.filter(
        (item: any) => tquantity.product_id == item.product_id
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
  }

  return (
    <div className="w-20 flex justify-between items-center md:mt-10">
      <button
        onClick={() => {
          setquantity((prev: number) => prev - 1);
        }}
        disabled={quantity == 1}
        className="border-[1px] border-gray-600 rounded-full h-7 w-7"
      >
        -
      </button>
      <h3>{quantity}</h3>
      <button
        onClick={() => {
          setquantity((prev: number) => prev + 1);
        }}
        className="border-[1px] border-gray-600 rounded-full h-7 w-7"
      >
        +
      </button>
    </div>
  );
};
