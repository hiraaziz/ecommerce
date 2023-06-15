import Image from "next/image";
import poster1 from "../public/poster1.webp";
import poster2 from "../public/poster2.webp";
import poster3 from "../public/poster3.webp";

export default function Promotions() {
  return (
    <div className="w-full bg-slate-200  py-8 ">
      <div className="flex flex-col items-center justify-center gap-4 px-16 py-8">
        <span className="uppercase text-[#0000ff] text-base font-bold leading-[15px] tracking-[1.2px]">
          Promotions
        </span>
        <h2 className="text-[32px] leading-10 tracking-[.03rem] font-bold">
          Our Promotions Events
        </h2>
      </div>
      <div className="flex flex-col w-full px-4 lg:flex-row lg:w-3/4 gap-8 lg:m-auto">
        {/* Pictures  */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center space-between px-8 bg-[#d6d6d8] w-[453px] h-[200px]">
            <div className="flex flex-col  text-[#212121]">
              <h3 className="font-bold text-[28px] leading-[35px]">
                Get upto 60%
              </h3>
              <p>For the summer season</p>
            </div>
            <div className="flex ">
              <Image
                src={poster1}
                alt="Poster 1"
                className="w-[350px] h-[200px]"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-[#212121] px-8 text-white w-[453px] h-[196px]">
            <h3 className="uppercase font-extrabold text-4xl leading-[45px] mb-4 tracking-[0.03rem]">
              Get 30% off
            </h3>
            <p className="uppercase font-normal text-[0.875rem] leading-[18px] tracking-[0.03rem]">
              Use Promo Code
            </p>
            <button className="font-bold text-[17px] leading-[21px] tracking-[0.25rem] bg-[#474747] m-2 py-2 px-10 rounded-md ">
              DINEWEEKENDSALE
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#efe1c7] pt-6 w-[280px] h-[412px]">
            <div className="flex flex-col pl-6">
              <p className="font-normal text-[15px] leading-6 tracking-[.03rem]">
                Flex Sweatshirt
              </p>
              <div className="flex gap-[10px] ">
                <span className="line-through">$100.00</span>
                <span className="font-semibold text-lg leading-[23px]">
                  $75.00
                </span>
              </div>
            </div>
            <Image
              src={poster2}
              alt="Poster 2"
              className="w-[280px] h-[340px]"
            />
          </div>

          <div className="bg-[#d7d7d9] pt-6 w-[280px] h-[412px]">
            <div className="flex flex-col pl-6">
              <p className="font-normal text-[15px] leading-6 tracking-[.03rem]">
                Flex Push Button Bomber
              </p>
              <div className="flex gap-[10px] ">
                <span className="line-through">$225.00</span>
                <span className="font-semibold text-lg leading-[23px]">
                  $190.00
                </span>
              </div>
            </div>
            <Image
              src={poster3}
              alt="Poster 3"
              className="w-[280px] h-[340px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
