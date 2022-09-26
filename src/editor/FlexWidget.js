import { useState } from "react";
import styled from "styled-components";
import { widgetNodeFactory } from "../data/widgetNode";
import { BaseWidget } from "./BaseWidget";
import update from "immutability-helper";

const FlexWidgetWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 auto;
  border: dashed 2px;
  min-width: 50px;
  min-height: 120px;
  .window-body & {
    min-width: 400px;
  }
`;

export const FlexWidget = ({ nodeData, isDropable = true }) => {
  const [partData, setPartData] = useState(() => nodeData);
  const findNode = (wid) => {
    const node = partData.children.find((c) => c.wid === wid);
    return {
      node,
      index: partData.children.indexOf(node),
    };
  };
  const moveNode = (wid, currentId) => {
    const { node, index } = findNode(wid);
    const { _, index: cIndex } = findNode(currentId);
    if (cIndex === -1) return partData;
    return update(partData, {
      children: {
        $splice: [
          [index, 1],
          [cIndex, 0, node],
        ],
      },
    });
  };
  const insertNode = (wid, type) => {
    const { _node, index } = findNode(wid);
    return update(partData, {
      children: {
        $splice: [
          [index, 0, { type, wid: Math.random(), children: [] }],
        ],
      },
    });    
  }
  const onMove = (wid, data) => {
    if (data.wid) {
      if (data.wid === wid) return;
      const newData = moveNode(wid, data.wid);
      setPartData(newData);
    } else {
      const newData = insertNode(wid, data.type);
      console.log(JSON.stringify(newData));
      setPartData(newData);
    }
  };
  return (
    <BaseWidget
      item={{ type: "flex", wid: nodeData?.wid }}
      isDragable={true}
      isDropable={isDropable}
      onMouseOver={() => {}}
      onDrop={(pid, { type, wid }) => {
        if (wid) return;
        const newData = update(partData, {
          children: {
            $push: [{ type, wid: Math.random(), children: [] }],
          },
        });
        console.log(newData);
        setPartData(newData);
      }}
    >
      <FlexWidgetWrapper>
        {partData?.children.map((nodeData) =>
          widgetNodeFactory.createWidget(nodeData, onMove)
        )}
      </FlexWidgetWrapper>
    </BaseWidget>
  );
};
