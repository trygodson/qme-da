import React from "react";
import { Col } from "reactstrap";

const Colxx = (props) => (
  <Col {...props} widths={["xxs", "xs", "sm", "md", "lg", "xl", "xxl"]} />
);
const Separator = ({ className }) => (
  <div className={`separator ${className}`} />
);

const LoaderStyle = (theme) => {
  return {
    overlay: (base) => ({
      ...base,
      background:
        theme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
    }),
    content: (base) => ({
      ...base,
      color: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)",
    }),
    spinner: (base) => ({
      ...base,
      width: "100px",
      "& svg circle": {
        stroke: "#1d477a",
      },
    }),
  };
};
export { Colxx, Separator, LoaderStyle };
