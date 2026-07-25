import { getBoosterIcon } from "@/components/booster-icons";
import type { MenuProduct } from "@/types/menu";

export default function BoosterCard({
  product,
  formattedPrice,
}: {
  product: MenuProduct;
  formattedPrice: string;
}) {
  return (
    <article className="group flex h-full flex-col items-center rounded-[1.75rem] border border-purple-100/90 bg-white p-6 text-center shadow-[0_10px_30px_rgba(50,30,70,0.05)] transition duration-300 ease-out hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_18px_42px_rgba(50,30,70,0.1)]">
      <div className="grid size-20 place-items-center rounded-2xl border border-purple-100 bg-[#faf7ff] text-purple-700">
        {getBoosterIcon(product.name)}
      </div>

      <h3 className="mt-5 text-xl font-black tracking-tight text-[#23182f]">
        {product.name}
      </h3>

      <p className="mt-3 flex-1 leading-7 text-gray-600">
        {product.description}
      </p>

      <p className="mt-6 rounded-full bg-[#f5effd] px-3 py-1.5 text-sm font-black text-purple-800">
        {formattedPrice}
      </p>
    </article>
  );
}
