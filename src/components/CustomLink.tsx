import React from "react";
import { Link as RouterLink, useInRouterContext } from "react-router-dom";

const CustomLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof RouterLink>
>((props, ref) => {
  const isInRouterContext = useInRouterContext();

  if (isInRouterContext) {
    return <RouterLink {...props} ref={ref} />;
  } else {
    // Fallback to a regular anchor tag if not in Router context
    return <a {...props} ref={ref} />;
  }
});

export default CustomLink;
