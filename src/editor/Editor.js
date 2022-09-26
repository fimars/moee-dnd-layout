import { memo } from "react";
import styled from "styled-components";
import { Canvas } from "./Canvas";
import { WidgetPanel } from "./WidgetPanel";

const EditorWarpper = styled.div`
  display: flex;
`;
const SpecWindow = styled.div`
  width: 800px;
  overflow: hidden;
  margin-right: 10px;
`;
const SpecWindowBody = styled.div`
  min-height: 800px;
  overflow: auto;
`;
const WindowWrapper = ({ className, children }) => {
  return (
    <SpecWindow className={`${className} window`}>
      <div className="title-bar">
        <div className="title-bar-text">地图</div>
      </div>
      <SpecWindowBody className="window-body">{children}</SpecWindowBody>
    </SpecWindow>
  );
};

const CanvasData = {
  wid: 0,
  type: 'flex',
  children: []
}

export const Editor = memo(() => {
  return (
    <EditorWarpper>
      <WindowWrapper>
        <Canvas nodeData={CanvasData}></Canvas>
      </WindowWrapper>
      <WidgetPanel />
    </EditorWarpper>
  );
});
