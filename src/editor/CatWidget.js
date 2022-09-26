import styled from "styled-components";
import catsource from "../assets/cat.png";
import { BaseWidget } from "./BaseWidget";

const CatWidgetWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 50px;
  min-height: 50px;
  padding: 10px;
`;

export const CatWidget = ({ nodeData, onMove, isDropable = true }) => {
  return (
    <BaseWidget
      item={{ type: "cat", wid: nodeData?.wid }}
      isDragable={true}
      isDropable={isDropable}
      onMouseOver={(wid, nodeData) => {
        if (!nodeData.wid) return;
        onMove?.(wid, nodeData);
      }}
      onDrop={(wid, nodeData, type) => {
        onMove?.(wid, nodeData, type)
      }}
    >
      ID: {nodeData?.wid || "new"}
      <CatWidgetWrapper>
        <img src={catsource} alt="cat" />
      </CatWidgetWrapper>
    </BaseWidget>
  );
};
