import Menu from "@/components/Menu";
import { getMenuData } from "@/sanity/lib/get-menu-data";
import { SanityLive } from "@/sanity/lib/live";

export default async function MenuSection() {
  const menu = await getMenuData();

  return (
    <>
      <Menu categories={menu.categories} drinks={menu.products} />
      <SanityLive />
    </>
  );
}
