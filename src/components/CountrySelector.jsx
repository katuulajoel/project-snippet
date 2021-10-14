import React, { useEffect, useState } from "react";

const CountrySelector = ({ ...props }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    import("./countries").then(({ Countries }) => {
      setCountries(Countries);
    });
  }, []);

  return (
    <select {...props}>
      {countries.map((item, i) => {
        return <option key={i}>{item.name}</option>;
      })}
    </select>
  );
};

export default CountrySelector;
