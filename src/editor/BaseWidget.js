import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import { GlobalXY } from "../components/GlobalXY";

const BaseWidgetWrapper = styled.div`
  border: 2px solid;
  box-sizing: border-box;
  padding: 4px;
`;

/**
 * easily the most important method in the algorithm
 *
 * @param r1 space1
 * @param r2 space 2
 * @returns boolean if it is colliding
 */
function areOverlapping(r1, r2) {
  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}

function areContain({ x, y }, r2) {
  return x >= r2.left && x <= r2.right && y >= r2.top && y <= r2.bottom;
}

const DropableWrapper = ({ denis, onMouseOver, wid, onDrop, type }) => {
  const ref = useRef(null);
  const [point, setPoint] = useState(() => ({ x: 0, y: 0 }));
  const [{ isOver }, drop] = useDrop({
    accept: "Widget",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isOver: monitor.isOver({ shallow: true }),
    }),
    drop: (item, monitor) => {
      const isOver = monitor.isOver({ shallow: true });

      isOver && onDrop?.(wid, item, type);
    },
    hover(item, monitor) {
      const clientOffset = monitor.getClientOffset();
      setPoint(clientOffset);
      const isOver = monitor.isOver({ shallow: true });
      isOver && onMouseOver?.(wid, item);
    },
  });
  drop(ref);
  return (
    <>
      { isOver && <GlobalXY point={point} /> }
      <div style={{ background: isOver ? "pink" : "" }} ref={ref}>
        {denis}
      </div>
    </>
  );
};
const DragableWrapper = ({ denis, item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Widget",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      offset: monitor.getClientOffset(),
    }),
  }));
  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {denis}
    </div>
  );
};

export const BaseWidget = ({
  children,
  item,
  isDragable,
  isDropable,
  onMouseOver,
  onDrop,
}) => {
  let content = children;
  if (isDragable)
    content = <DragableWrapper denis={content} item={item}></DragableWrapper>;
  if (isDropable)
    content = (
      <DropableWrapper
        denis={content}
        onMouseOver={onMouseOver}
        onDrop={onDrop}
        wid={item.wid}
        type={item.type}
      ></DropableWrapper>
    );

  return <BaseWidgetWrapper>{content}</BaseWidgetWrapper>;
};
