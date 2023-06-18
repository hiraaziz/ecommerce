import { client } from "@/lib/sanityClients";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import AddCart from "./AddCart";
import { SanityProductDetail } from "@/type";

export async function generateStaticParams() {
  const response: [_id: string] = await client.fetch(
    `*[_type=="product" && category=="male"]{_id}`
  );

  return response.map((item: any) => ({
    product: item._id,
  }));
}

const Product = async ({ params }: { params: { product: string } }) => {
  const builder = imageUrlBuilder(client);

  function urlFor(source: any) {
    return builder.image(source);
  }

  async function getData() {
    const response: SanityProductDetail = await client.fetch(
      `*[_type=="product" && _id=="${params.product}" ]{
        _id,
        images,
        title,
        price,
        type,
        description
      }[0]`
    );
    return response;
  }

  let data = await getData();

  return (
    <section className="p-10">
      <div className="flex flex-col md:flex-row justify-center w-full space-x-8">
        <Image
          src={urlFor(data?.images[0])?.url()}
          alt="maleimage"
          width={450}
          height={550}
        />
        <div className="flex-col space-y-4 py-4">
          <h1 className="text-xl font-bold">{data?.title}</h1>
          <p className="font-bold text-gray-400">{data?.type}</p>

          {/* Quantity */}
          <label className="font-bold">Quantity</label>
          <br />
          <div className="flex space-x-2 justify-start ">
            <AddCart id={data?._id} />
            <h2 className="text-xl font-bold self-center">${data?.price}</h2>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="w-[70%] m-auto mt-36">
        <h1 className="font-bold text-lg mb-10">Product Information</h1>
        <div className="h-[2px]  w-full bg-gray-400 mb-10" />

        <div className="flex flex-col md:flex-row md:justify-between w-full ">
          <h1 className="font-bold text-md text-gray-500">PRODUCT DETAILS</h1>
          <p className="font-regular w-[100%] md:w-[70%] text-justify">
            {data?.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Product;
