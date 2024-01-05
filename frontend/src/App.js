import Error from "./Pages/Errorpage";
import Formpage1 from "./Pages/Formpage1";
import Formpage2 from "./Pages/Formpage2";
import Heropage from "./Pages/Heropage";
import { BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route 
      path="/"
      element={<Heropage />}
      />
      <Route
      path="/page1"
      element={<Formpage1 />}
      />
      <Route
      path="/page2"
      element={<Formpage2 />}
      />
      <Route
      path="*"
      element={<Error />}
      />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
