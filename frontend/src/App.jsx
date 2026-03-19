import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './i18n'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Resume from './pages/Resume'
import Skills from './pages/Skills'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/projects"      element={<Projects />} />
        <Route path="/projects/:id"  element={<ProjectDetail />} />
        <Route path="/resume"        element={<Resume />} />
        <Route path="/skills"        element={<Skills />} />
        <Route path="/contact"       element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
