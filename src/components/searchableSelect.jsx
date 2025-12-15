import React from "react";
import Select from "react-select";


const SearchableSelectMulti = ({ name, options, value, onChange, placeholder }) => {
  const selectedOptions = options.filter(opt => value?.includes(opt.value));

  return (
    <Select
      isMulti
      name={name}
      options={options}
      value={selectedOptions}
      onChange={(selected) => {
        const ids = selected ? selected.map((s) => s.value) : [];
        onChange(ids);
      }}
      placeholder={placeholder}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
};

export default SearchableSelectMulti;
