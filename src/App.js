// eslint-disable-next-line
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PreviewFrom from "./Pages/PreviewFrom";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<PreviewFrom/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
