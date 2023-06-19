"use client";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/State";
import { Button } from "./Button";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/sanityClients";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import OrderSumary from "./OrderSumary";
import Cookies from "universal-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

type Icart = {
  _id: string;
  images: [];
  price: number;
  title: string;
  type: string;
};

const Page = () => {
  const { state, dispatch } = useContext(CartContext);
  const [cartdata, setcartdata] = useState<Icart[]>([]);
  const [productslist, setproductslist] = useState<any>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const product = Get_Product_From_Store();
    Get_Product_From_Sanity(product);
  }, []);

  useEffect(() => {
    Generate_Data_From_Sanity_Store();
  }, [cartdata]);

  useEffect(() => {
    const product = Get_Product_From_Store();
    Get_Product_From_Sanity(product);
  }, [state]);

  function Generate_Data_From_Sanity_Store() {
    const data = cartdata.map((t: any) => ({
      id: t._id,
      title: t.title,
      type: t.type,
      price: t.price,
      images: t.images,
      quantity: state.filter((item: any) => item.product_id == t._id)[0]
        .quantity,
    }));
    setproductslist(data);
  }

  function Get_Product_From_Store() {
    const product = state.map((item: any) => item.product_id);
    return product;
  }

  async function Get_Product_From_Sanity(products: string[]) {
    const productIds = JSON.stringify(products);
    const res = await client.fetch(
      `*[_type=="product" && _id in ${productIds}]{
        _id,
        title,
        type,
        price,
        images
      }`
    );
    setcartdata(res);
  }

  async function deleteCartItem(id: string) {
    // const cookies = new Cookies();
    // const userId = cookies.get("user_id");
    const res = await fetch(
      `https://hira-ecommerce.vercel.app/api/cart?id=${id}&userid=${session?.user?.email}`,
      {
        method: "DELETE",
      }
    );

    if (res.status == 200) {
      dispatch({
        type: "DELETECART",
        payload: {
          product_id: id,
        },
      });
      toast.success("Item Deleted");
    }
  }

  const builder = imageUrlBuilder(client);

  function urlFor(source: any) {
    return builder.image(source);
  }

  return (
    <div className="w-full">
      <h1 className="font-bold text-xl m-auto w-fit mt-20">Shopping Cart</h1>

      {state.length !== 0 && productslist.length > 0 ? (
        <div className="flex flex-col md:flex-row md:w-4/5 m-auto mt-10">
          <div className="w-[50%] flex-col item-start md:items-center m-auto">
            {productslist?.map((item: any) => (
              <div
                key={item._id}
                className="flex flex-col mt-5 md:flex-row md:items-center md:justify-between md:h-[220px]  md:w-[500px]"
              >
                <div className="flex flex-col md:flex-row md:gap-3">
                  <Image
                    src={urlFor(item.images[0]).url()}
                    alt="product description"
                    width={150}
                    height={150}
                    className="rounded-lg"
                  />
                  <div className="h-full">
                    <h1 className="font-bold text-lg">{item.title}</h1>
                    <h2 className="font-bold text-md text-gray-500">
                      {item.type}
                    </h2>
                    <h2 className="font-bold text-md">Delivery Estimation</h2>
                    <h2 className="font-bold text-lg text-yellow-500">
                      5 Working Days
                    </h2>
                    <h2>${item.price}</h2>
                  </div>
                </div>

                <div className="flex flex-row items-start justify-evenly md:h-full  md:flex-col md:p-2">
                  <button onClick={() => deleteCartItem(item.id)}>
                    <RiDeleteBin6Line />
                  </button>

                  <Button
                    product_id={item.id}
                    product_quantity={item.quantity}
                  />
                </div>
                <Toaster />
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className=" w-full md:w-auto">
            <OrderSumary cartdata={cartdata} />
          </div>
        </div>
      ) : (
        <div>Cart is empty</div>
      )}
    </div>
  );
};

export default Page;
