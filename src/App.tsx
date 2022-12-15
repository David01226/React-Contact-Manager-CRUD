import { BrowserRouter, NavLink, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './module/Layout';

function App() {
  return (
    <BrowserRouter>
    <nav style={{width: 200, display: "flex", justifyContent: "space-evenly"}}>
      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/list">List</NavLink>
      <NavLink to="/add">Add</NavLink>
    </nav>
        <Routes>
            <Route path="/" element={<>This is home page</>}></Route>
            <Route path="/list" element={<>This is list page</>}></Route>
            <Route path="/add" element={<>This is add page</>}></Route>
        </Routes>
        {/* <Layout /> */}
    </BrowserRouter>
  ); 
}

export default App;
