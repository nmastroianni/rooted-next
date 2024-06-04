import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FooterElement`.
 */
export type FooterElementProps =
  SliceComponentProps<Content.FooterElementSlice>;

/**
 * Component for "FooterElement" Slices.
 */
const FooterElement = ({ slice }: FooterElementProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for footer_element (variation: {slice.variation})
      Slices
    </section>
  );
};

export default FooterElement;
