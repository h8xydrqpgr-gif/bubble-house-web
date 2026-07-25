import Menu from "@/components/Menu";
import { getMenuData } from "@/sanity/lib/get-menu-data";
import type { SectionContent } from "@/types/site-content";

export default async function MenuSection({
  section,
}: {
  section: SectionContent;
}) {
  const menu = await getMenuData();

  return (
    <Menu
      categories={menu.categories}
      drinks={menu.products}
      section={section}
    />
  );
}
