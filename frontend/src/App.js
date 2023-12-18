import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ArticlesPage from './pages/Articles';

function App() {
  return (
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/articles" element={<ArticlesPage/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
