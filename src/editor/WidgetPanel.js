import styled from "styled-components";
import { CatWidget } from "./CatWidget";
import { CookieWidget } from "./CookieWidget";
import { FlexWidget } from "./FlexWidget";

const WidgetPanelWrapper = styled.div`
  border: solid 1px #e6e6e6;
  border-top: solid 4px black;
  padding: 12px;
`;
const WidgetBox = styled.div`
  border: solid 2px black;
  margin: 8px;
  min-width: 50px;
  min-height: 50px;
`;

export const WidgetPanel = () => {
  return (
    <WidgetPanelWrapper>
      <WidgetBox>
        <CatWidget isDropable={false} />
      </WidgetBox>
      <WidgetBox>
        <CookieWidget isDropable={false} />
      </WidgetBox>
      <WidgetBox>
        <FlexWidget isDropable={false} />
      </WidgetBox>
      <WidgetBox />
    </WidgetPanelWrapper>
  );
};
