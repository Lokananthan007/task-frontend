import './App.css';
import Rootlayout from './layout/Rootlayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './components/User';
import Login from './Login';

function App() {
  return (
   <div>
     <BrowserRouter>
       <Routes>
          <Route path='/' element={<Rootlayout/>}>
            <Route index  element={<User/>} />
            <Route path="login" element={<Login/>}/>
          </Route>
       </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;