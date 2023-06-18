import Image from "next/image";
import poster1 from "../public/poster1.webp";
import poster2 from "../public/poster2.webp";
import poster3 from "../public/poster3.webp";

export default function Promotions() {
  return (
    <div className="w-ful py-8 lg:h-screen">
      <div className="flex flex-col items-center justify-center gap-4 px-16 py-8">
        <span className="uppercase text-[#0000ff] text-base font-bold leading-[15px] tracking-[1.2px]">
          Promotions
        </span>
        <h2 className="text-[32px] leading-10 tracking-[.03rem] font-bold">
          Our Promotions Events
        </h2>
      </div>
      {/* Banners */}
      <div className="w-full flex flex-col lg:flex-row px-10 md:px-20 lg:px-32 gap-4 h-full">
        {/* Left Banner */}
        <section className="flex-col basis-1/2 space-y-2 h-full">
          <div className="w-full bg-gray-300 min-h-52 flex flex-col md:flex-row justify-evenly items-center flex-grow">
            <div>
              <h1 className="font-bold text-2xl">GET UP TO 60%</h1>
              <p className="font-medium text-md">For the summer season</p>
            </div>
            <Image
              src={poster1}
              alt="poster 1"
              width={280}
              height={300}
              className="self-end"
            />
          </div>
          <div className="bg-black h-52 flex-grow flex flex-col items-center justify-center px-8 text-white">
            <h3 className="uppercase font-extrabold text-4xl leading-[45px] mb-4 tracking-[0.03rem]">
              Get 30% off
            </h3>
            <p className="uppercase font-normal text-[0.875rem] leading-[18px] tracking-[0.03rem]">
              Use Promo Code
            </p>
            <button className=" min-w-fit font-bold text-sm md:text-[17px] leading-[21px] tracking-[0.25rem] bg-[#474747] mt-2 p-1 md:py-2 md:px-10 rounded-md ">
              DINEWEEKENDSALE
            </button>
          </div>
        </section>
        {/* Right Banner */}
        <section className="flex flex-col lg:flex-row gap-3 basis-1/2">
          <div className="bg-[#EFE1C7] lg:basis-1/2 h-[424px] flex-grow flex flex-col justify-end items-center">
            <p>Flex Sweatshirt</p>
            <p>
              <span className="line-through">$100.00</span>{" "}
              <span className="font-bold">$75.00</span>
            </p>

            <Image src={poster2} alt="poster 2" />
          </div>
          <div className="bg-gray-300 lg:basis-1/2 h-[424px] flex-grow flex flex-col justify-end items-center">
            <p>Flex Push Button Bomber</p>
            <p>
              <span className="line-through">$225.00</span>{" "}
              <span className="font-bold">$190.00</span>
            </p>

            <Image src={poster3} alt="poster 2" />
          </div>
        </section>
      </div>
    </div>
  );
}
