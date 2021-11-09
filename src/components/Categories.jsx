import React from "react";

const Categories = React.memo(({ items, onClickItems }) => {
  const [activeItem, setActiveItem] = React.useState(null);

  const onSelectItem = (index) => {
    setActiveItem(index);
    onClickItems(index);
  };
  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => onSelectItem(null)}
          className={activeItem === null ? "active" : ""}
        >
          Все
        </li>
        {items &&
          items.map((name, index) => (
            <li
              className={activeItem === index ? "active" : ""}
              onClick={() => onSelectItem(index)}
              key={name}
            >
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
});

export default Categories;
