import { useState } from "react";
import "../styles/Card.css";

export const Card = ({
  name,
  country,
  index,
  copyListCards,
  setCopyListCards,
  dragItem,
  dragOverItem,
}) => {
  const [isDragged, setIsDragged] = useState(false);

  const dragStart = (e, index) => {
    dragItem.current = index;
  };

  const dragEnter = (e, index) => {
    dragOverItem.current = index;
    setIsDragged(true);
  };

  const dragEnd = () => {
    let companies = [...copyListCards];
    const draggedCardContent = companies[dragItem.current];
    companies.splice(dragItem.current, 1);
    companies.splice(dragOverItem.current, 0, draggedCardContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setCopyListCards(companies);
    setIsDragged(false);
  };

  const dragExit = (e) => {
    e.preventDefault();
    setIsDragged(false);
  };

  return (
    <>
      <li
        className={`card ${isDragged ? "drag-over" : ""}`}
        draggable
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragLeave={dragExit}
        onDragEnd={dragEnd}
      >
        <strong>Company:</strong>
        <p>{name}</p>
        <strong>Country:</strong>
        <p>{country}</p>
      </li>
    </>
  );
};
