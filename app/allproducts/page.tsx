import { client } from "../../lib/sanityClients";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Image from "next/image";
import { SanityProducts } from "@/type";

export const getProdData = async () => {
  const res: SanityProducts[] = await client.fetch(`*[_type=="product"]{
    _id,
    images,
    title,
    type,
    price
  }`);
  return res;
};

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

async function AllProducts() {
  const data: SanityProducts[] = await getProdData();

  return (
    <section className=" h-max w-full p-4  flex flex-wrap  lg:space-x-10 justify-center items-center ">
      {data &&
        data.map((allprod: SanityProducts) => (
          <div className="p-4" key={allprod._id}>
            <Link href={allprod._id}>
              <Image
                src={urlFor(allprod.images[0]).url()}
                alt="maleimage"
                width={250}
                height={300}
              />

              <div className="flex flex-col space-y-1 mt-2">
                <h1 className="font-bold">{allprod.title}</h1>
                <p className="font-bold text-gray-400">{allprod.type}</p>
                <h2 className="font-bold">${allprod.price}</h2>
              </div>
            </Link>
          </div>
        ))}
    </section>
  );
}
export default AllProducts;
