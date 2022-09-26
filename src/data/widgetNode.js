import { Component } from "react";
import { CatWidget } from "../editor/CatWidget";
import { CookieWidget } from "../editor/CookieWidget";
import { FlexWidget } from "../editor/FlexWidget";

export class widgetNodeFactory {
  static createNode(id, type) {
    return { widgetData: { id, type }, children: [], parent: null };
  }

  static createWidget(data, onMove) {
    if (data.type === 'flex') {
      return <FlexWidget key={data.wid} onMove={onMove} nodeData={data}></FlexWidget>
    } 
    if (data.type === 'cat') {
      return <CatWidget key={data.wid} onMove={onMove} nodeData={data}></CatWidget>
    } 
    if (data.type === 'cookie') {
      return <CookieWidget key={data.wid} onMove={onMove} nodeData={data}></CookieWidget>
    } 
  }
}
