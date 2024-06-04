import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ContactInfo`.
 */
export type ContactInfoProps = SliceComponentProps<Content.ContactInfoSlice>;

/**
 * Component for "ContactInfo" Slices.
 */
const ContactInfo = ({ slice }: ContactInfoProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for contact_info (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ContactInfo;
