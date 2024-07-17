import "./App.css";
import Start from "./views/Start";
import Language from "./views/Language";
import Intro from "./views/Intro";
import Signup from "./views/Signup";
import Tutorial from "./views/Tutorial";
import Menu from "./views/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Room from "./views/Room";
import "./fonts/EasyReadingPRO.ttf";
import "./fonts/EasyReadingPROBold.ttf";
import "./fonts/EasyReadingPROBoldItalic.ttf";
import "./fonts/EasyReadingPROItalic.ttf";
import "./fonts/EasyReadingPROXBBlack.ttf";
import { ThemeContextProvider, VisitorContextProvider } from "./contexts";
function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <VisitorContextProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Start />} />
              <Route exact path="/language" element={<Language />} />
              <Route exact path="/intro" element={<Intro />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/tutorial" element={<Tutorial />} />
              <Route exact path="/menu" element={<Menu />} />
              <Route exact path="/room" element={<Room />} />
            </Routes>
          </BrowserRouter>{" "}
        </VisitorContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
