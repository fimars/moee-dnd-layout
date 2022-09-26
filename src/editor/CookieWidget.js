import styled from "styled-components";
import cookiesource from "../assets/cookie.png";
import { BaseWidget } from "./BaseWidget";

const CookieWidgetWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 50px;
  min-height: 50px;
  padding: 10px;
`;

export const CookieWidget = ({ nodeData, onMove, isDropable = true }) => {
  return (
    <BaseWidget
      item={{ type: "cookie", wid: nodeData?.wid }}
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
      <CookieWidgetWrapper>
        <img src={cookiesource} alt="cookie" />
      </CookieWidgetWrapper>
    </BaseWidget>
  );
};
