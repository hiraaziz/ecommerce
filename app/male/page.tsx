import { client } from "../../lib/sanityClients";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Image from "next/image";
import { SanityProducts } from "@/type";

export const getProdData = async () => {
  const res: SanityProducts[] = await client.fetch(
    `*[_type=="product" && category->name=="male"]{
      _id,
      images,
      title,
      type,
      price
    }`
  );
  return res;
};

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

async function Male() {
  const data = await getProdData();

  return (
    <section className=" h-max w-full p-4  flex flex-wrap lg:space-x-10 justify-center items-center">
      {data &&
        data.map((maledata: SanityProducts) => (
          <div className="p-4" key={maledata._id}>
            <Link href={maledata._id}>
              <Image
                src={urlFor(maledata.images[0]).url()}
                alt="maleimage"
                width={250}
                height={300}
              />

              <div className="flex flex-col space-y-1 mt-2">
                <h1 className="font-bold">{maledata.title}</h1>
                <p className="font-bold text-gray-400">{maledata.type}</p>
                <h2 className="font-bold">${maledata.price}</h2>
              </div>
            </Link>
          </div>
        ))}
    </section>
  );
}
export default Male;
