import ProductList from "@/components/ProductList";
import Image from "next/image";

const Homepage = async () => {
  return (
    <div className="">
      <div className="relative mb-12 aspect-[3/1]">
        <Image src="/featured.png" alt="featured product" fill />
      </div>
      <ProductList />
    </div>
  );
};

export default Homepage;
