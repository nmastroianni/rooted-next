import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `SubMenuItem`.
 */
export type SubMenuItemProps = SliceComponentProps<Content.SubMenuItemSlice>;

/**
 * Component for "SubMenuItem" Slices.
 */
const SubMenuItem = ({ slice }: SubMenuItemProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for sub_menu_item (variation: {slice.variation})
      Slices
    </section>
  );
};

export default SubMenuItem;
