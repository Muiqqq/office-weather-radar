import React from 'react';

const Selector = ({ selected, className, name, id, options, onChange }) => {
  const listOfOptions = options.map((option) => (
    <option value={option.value} key={option.value}>
      {option.description}
    </option>
  ));

  return (
    <div className={className}>
      <select name={name} id={id} onChange={onChange} value={selected}>
        {listOfOptions}
      </select>
    </div>
  );
};

export default Selector;
