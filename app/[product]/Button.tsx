"use client";
import { CartContext } from "@/components/State";
import React, { useState, useContext, useEffect } from "react";

export const Button = ({ id, quantity, setquantity }: any) => {
  const { state, dispatch } = useContext(CartContext);

  useEffect(() => {
    changeQuantity();
  }, [quantity]);

  useEffect(() => {
    const product = state.filter((item: any) => id == item.product_id);
    if (product[0]) {
      setquantity(product[0].quantity);
    }
  }, []);

  async function QuantityChange() {
    const res = await fetch("/api/quantity", {
      method: "POST",
      body: JSON.stringify({
        product_id: id,
        quantity: quantity,
      }),
    });
    return await res.json();
  }

  async function changeQuantity() {
    const product = state.filter((item: any) => id == item.product_id);
    if (product[0]?.product_id) {
      dispatch({
        type: "IncreaseQuantity",
        payload: {
          product_id: product[0]?.product_id,
          quantity: quantity,
        },
      });
    }
    const res = await QuantityChange();
  }

  return (
    <div className="w-20 flex justify-between items-center">
      <button
        onClick={() => {
          setquantity((prev: number) => prev - 1);
          changeQuantity();
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
