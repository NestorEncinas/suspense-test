import React from "react";

const Number = ({ resource }) => {
  const number = resource.number.read();

  return <div>Timeout Number: {number}</div>;
};

export default Number;
