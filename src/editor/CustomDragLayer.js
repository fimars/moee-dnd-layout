import { useDragLayer } from "react-dnd";

import cat from "../assets/cat.png";
import cao from "../assets/cao.png";
import wall from "../assets/wall.png";
import cookie from "../assets/cookie.png";
import styled from "styled-components";
const assetsMap = {
  cat,
  cao,
  wall,
  cookie,
};

export function snapToGrid(x, y) {
  const snappedX = Math.round(x / 32) * 32;
  const snappedY = Math.round(y / 32) * 32;
  return [snappedX, snappedY];
}

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let { x, y } = currentOffset;
  if (isSnapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

const FlexPreview = styled.div`
  width: 80px;
  height: 80px;
  border: dashed 2px;
`;
const ImagePreview = styled.img`
  width: 80px;
  height: 80px;
  border: dashed 1px;
  display: block;
`;

export const CustomDragLayer = () => {
  const { itemType, item, isDragging, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));
  function renderItem() {
    if (!itemType) return null;
    if (item.type === "flex") return <FlexPreview />;
    return <ImagePreview src={assetsMap[item.type]} />;
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset, true)}>
        {renderItem()}
      </div>
    </div>
  );
};
