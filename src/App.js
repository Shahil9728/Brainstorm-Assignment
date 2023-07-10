import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu'
import About from './About'
import Contact from './Contact'
import Services from './Services'
import Home from './Home'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'


function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/services" element={<Services />} />
      </Routes>
    </div>
  );
}

export default App;
