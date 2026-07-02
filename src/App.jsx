import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from '@/components/conference/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Themes from '@/pages/Themes';
import Programme from '@/pages/Programme';
import Hackathon from '@/pages/Hackathon';
import Exhibition from '@/pages/Exhibition';
import Sponsorship from '@/pages/Sponsorship';
import Register from '@/pages/Register';
import Contact from '@/pages/Contact';
import Accommodation from '@/pages/Accommodation';
import Gallery from '@/pages/Gallery';
import FAQ from '@/pages/FAQ';
import { ThemeProvider } from '@/lib/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router basename="/tass2026">
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/themes" element={<Themes />} />
              <Route path="/programme" element={<Programme />} />
              <Route path="/hackathon" element={<Hackathon />} />
              <Route path="/exhibition" element={<Exhibition />} />
              <Route path="/sponsorship" element={<Sponsorship />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/accommodation" element={<Accommodation />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/faq" element={<FAQ />} />
            </Route>
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
