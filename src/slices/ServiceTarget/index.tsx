import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ServiceTarget`.
 */
export type ServiceTargetProps =
  SliceComponentProps<Content.ServiceTargetSlice>;

/**
 * Component for "ServiceTarget" Slices.
 */
const ServiceTarget = ({ slice }: ServiceTargetProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for service_target (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ServiceTarget;
