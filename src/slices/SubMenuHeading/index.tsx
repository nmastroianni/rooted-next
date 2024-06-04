import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `SubMenuHeading`.
 */
export type SubMenuHeadingProps =
  SliceComponentProps<Content.SubMenuHeadingSlice>;

/**
 * Component for "SubMenuHeading" Slices.
 */
const SubMenuHeading = ({ slice }: SubMenuHeadingProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for sub_menu_heading (variation: {slice.variation})
      Slices
    </section>
  );
};

export default SubMenuHeading;
