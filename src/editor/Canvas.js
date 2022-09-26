import { memo } from "react";
import styled from "styled-components";
import { CustomDragLayer } from './CustomDragLayer'
import { FlexWidget } from "./FlexWidget";

const CanvasWrapper = styled.div`
  height: 400px;
  background-color: #dedede;
`;

export const Canvas = memo(function Canvas({ nodeData }) {
  return (
    <>
      <CustomDragLayer></CustomDragLayer>
      <CanvasWrapper>
        Drop here
        <FlexWidget nodeData={nodeData}></FlexWidget>
      </CanvasWrapper>
    </>
  );
});
