import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import HomePage from './pages/HomePage';
import ClanListPage from './pages/ClanListPage';
import UserListPage from './pages/UserListPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/clan-list" element={<ClanListPage/>}></Route>
                <Route path="/user-list" element={<UserListPage/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
