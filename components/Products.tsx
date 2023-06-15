import Image from "next/image";
import hp1 from "../public/hp1.png";
import hp2 from "../public/hp2.png";
import hp3 from "../public/hp3.png";

const Products = () => {
  return (
    <div className=" w-full py-16">
      {/* Headings  */}
      <div className="flex flex-col items-center justify-center gap-4 px-16 py-8">
        <span className="uppercase text-[#0000ff] text-base font-bold leading-[15px] tracking-[1.2px]">
          Products
        </span>
        <h2 className="text-[32px] leading-10 tracking-[.03rem] font-bold">
          Check What We Have
        </h2>
      </div>

      <div className="flex w-4/5 m-auto">
        <div>
          <Image src={hp1} alt="product 1" className="w-[380px] h-[400px]" />
          <p className="text-lg font-semibold tracking-[0.03rem] text-[#212121] leading-6 mt-2">
            Brushed Raglan Sweatshirt
          </p>
          <p className="mt-2 font-semibold text-[#212121] leading-6 ">$195</p>
        </div>

        <div>
          <Image src={hp2} alt="Product 2" className="w-[380px] h-[400px]" />
          <p className="text-lg font-semibold tracking-[0.03rem] text-[#212121] leading-6 mt-2">
            Cameryn Sash Tie Dress
          </p>
          <p className="mt-2 font-semibold text-[#212121] leading-6 ">$545</p>
        </div>

        <div>
          <Image src={hp3} alt="Product 3" className="w-[380px] h-[400px]" />
          <p className="text-lg font-semibold tracking-[0.03rem] text-[#212121] leading-6 mt-2">
            Flex Sweatshirt
          </p>
          <p className="mt-2 font-semibold text-[#212121] leading-6 ">$175</p>
        </div>
      </div>
    </div>
  );
};

export default Products;
