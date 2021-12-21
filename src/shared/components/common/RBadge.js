import React from "react";

const RBadge = ({ success, title = "true" }) => {
  //console.log(success);
  return (
    <>
      {success ? (
        <span className="badge bg-soft-success font-size-12">{title}</span>
      ) : (
        <span className="badge bg-soft-danger font-size-12">{title}</span>
      )}
    </>
  );
};

export default RBadge;
