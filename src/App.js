import "./index.css";
import { Nav } from "./core";
import { Chats, Settings, Profile } from "./pages";
import { ThemeProvider } from "./Theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Web3Context } from "./services";

function App() {
  const context = Web3Context;
  return (
    <ThemeProvider>
      <Router basename={process.env.REACT_APP_BASENAME}>
        <Nav context={context} />
        <div className="container">
          <Routes>
            {/* FYI: "Routes" is the same as "Switch" - the name has changed */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/s/*" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/p/*" element={<Profile />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/c/*" element={<Chats />} />
            <Route path="/" element={<Chats />} />
            <Route path="/*" element={<Chats />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
