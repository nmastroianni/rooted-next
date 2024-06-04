import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FooterLogo`.
 */
export type FooterLogoProps = SliceComponentProps<Content.FooterLogoSlice>;

/**
 * Component for "FooterLogo" Slices.
 */
const FooterLogo = ({ slice }: FooterLogoProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for footer_logo (variation: {slice.variation})
      Slices
    </section>
  );
};

export default FooterLogo;
