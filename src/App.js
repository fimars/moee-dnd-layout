import "./App.css";
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";
import { Editor } from "./editor/Editor";
import "7.css/dist/7.css";

function App() {
  return (
    <div className="App">
      <ul style={{'textAlign': 'left'}}>
        <li>允许嵌套布局 √</li>
        <li>同级允许重新排列 √</li>
      </ul>
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <Editor />
      </DndProvider>
    </div>
  );
}

export default App;
