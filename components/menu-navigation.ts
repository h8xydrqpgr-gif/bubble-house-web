export const menuCategorySelectEvent = "bubble-house:select-menu-category";

export interface MenuCategorySelectDetail {
  category: string;
}

export function selectMenuCategory(category: string) {
  window.dispatchEvent(
    new CustomEvent<MenuCategorySelectDetail>(menuCategorySelectEvent, {
      detail: { category },
    }),
  );
}
