import { client } from "../../lib/sanityClients";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Image from "next/image";

export const getProdData = async () => {
  const res = await client.fetch(
    `*[_type=="product" && category->name=="female"]`
  );
  return res;
};

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

async function Female() {
  const data = await getProdData();

  return (
    <section className=" h-max p-4 md:p-12 flex flex-wrap space-y-6 md:space-y-0 md:space-x-10 justify-center items-center ">
      {data &&
        data.map((femaledata: any) => (
          <div className="">
            <Link href={femaledata._id}>
              <Image
                src={urlFor(femaledata.images[0]).url()}
                alt="maleimage"
                width={250}
                height={300}
              />

              <div className="flex flex-col space-y-1 mt-2">
                <h1 className="font-bold">{femaledata.title}</h1>
                <p className="font-bold text-gray-400">{femaledata.type}</p>
                <h2 className="font-bold">${femaledata.price}</h2>
              </div>
            </Link>
          </div>
        ))}
    </section>
  );
}
export default Female;
