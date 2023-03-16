import React from 'react';

const Selector = ({ className, name, id, options }) => {
  const listOfOptions = options.map((option) => (
    <option value={option.value} key={option.value}>
      {option.description}
    </option>
  ));

  return (
    <div className={className}>
      <select name={name} id={id}>
        {listOfOptions}
      </select>
    </div>
  );
};

export default Selector;
