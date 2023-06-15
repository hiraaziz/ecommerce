import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import Featured1 from "../public/Featured1.webp";
import Featured2 from "../public/Featured2.webp";
import Featured3 from "../public/Featured3.webp";
import Featured4 from "../public/Featured4.webp";
import Girl from "../public/Girl.webp";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex">
      {/* Header Content  */}
      <div className="flex flex-col lg:w-1/2 sm:w-full px-32 gap-10 pt-12">
        <p className="flex items-center justify-center bg-[#e1edff] rounded-md h-10 w-[120px] font-semibold text-[#0000ff]">
          Sale 70%
        </p>
        <h1 className="font-bold text-5xl leading-[#55px] tracking-wide text-[#212121]">
          An Industrial Take on Streetwear
        </h1>
        <p className="font-normal text-base leading-6 text-[#666] w-">
          Anyone can beat you but no one can beat your outfit as long as you
          wear Dine outfits.
        </p>

        <Link
          href="/allproducts"
          className="flex w-52  items-center justify-center bg-[#212121]  text-white font-semibold gap-2 py-3 px-6"
        >
          <AiOutlineShoppingCart className="" />
          <div className="text-base w-20">
            Start <br /> Shopping{" "}
          </div>
        </Link>

        <div className="flex gap-10 lg:gap-4">
          <Image src={Featured1} alt="" />
          <Image src={Featured2} alt="" />
          <Image src={Featured3} alt="" />
          <Image src={Featured4} alt="" />
        </div>
      </div>
      <div className="sm:hidden lg:flex">
        <div className=" bg-[#FFECE3] rounded-full absolute w-[550px] h-[550px] top-40"></div>
        <Image src={Girl} alt="" className="relative" />
      </div>
    </div>
  );
};

export default HeroSection;
