import Image from "next/image";
import hp1 from "../public/hp1.png";
import hp2 from "../public/hp2.png";
import hp3 from "../public/hp3.png";

const products = [
  {
    name: "Brushed Raglan Sweatshirt",
    img: hp1,
  },
  {
    name: "Cameryn Sash Tie Dress",
    img: hp2,
  },
  {
    name: "Flex Sweatshirt",
    img: hp3,
  },
];
const Products = () => {
  return (
    <div className=" w-full py-16">
      {/* Headings  */}
      <div className="flex flex-col items-center justify-center gap-4 px-16 py-8">
        <span className="uppercase text-[#0000ff] text-base font-bold leading-[15px] tracking-[1.2px]">
          Products
        </span>
        <h2 className="text-[32px] text-center leading-10 tracking-[.03rem] font-bold">
          Check What We Have
        </h2>
      </div>

      <div className="flex flex-col items-center px-4 lg:flex-row justify-evenly lg:px-0 w-full lg:flex lg:w-4/5 m-auto">
        {products.map((item: { name: string; img: any }) => (
          <div className="mt-8 lg:mt-0">
            <Image
              src={item.img}
              alt="product"
              className="w-[380px] h-[400px]"
            />
            <p className="text-lg font-semibold tracking-[0.03rem] text-[#212121] leading-6 mt-2">
              {item.name}
            </p>
            <p className="mt-2 font-semibold text-[#212121] leading-6 ">$195</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
