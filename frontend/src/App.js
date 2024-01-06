import { useEffect } from "react";
import Error from "./Pages/Errorpage";
import Formpage1 from "./Pages/Formpage1";
import Formpage2 from "./Pages/Formpage2";
import Heropage from "./Pages/Heropage";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./Pages/Login";

function App() {

  useEffect(() => {
    try{
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.removeItem('phone')
        localStorage.removeItem('experience')
    } catch(err) {
      console.log(err)
    }
  },[])

  return (
    <BrowserRouter>
    <Routes>
      <Route 
      path="/"
      element={<Heropage />}
      />
      <Route
      path="/login"
      element={<Login />}
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
