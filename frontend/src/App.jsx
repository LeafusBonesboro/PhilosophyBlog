import { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import { ColorModeContext, useMode } from './theme';
import Myteams from './scenes/Myteams';
import MyAccount from './scenes/myaccount';
import SiteAccessModal from './components/SiteAccessModal';
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import RegisterPage from "./components/RegisterPage";
import Rankings from './scenes/Rankings';
import DraftGuide from './scenes/DraftGuide';
import Prospects from './scenes/Prospects';
import MockDraft from './scenes/MockDraft';
import TradeFinder from './scenes/TradeFinder';
import Calculator from './scenes/Calculator';
import Comparison from './scenes/Comparison';
import RangeOfOutcomes from './scenes/RangeOfOutcomes';
import MyReviews from './scenes/MyReviews';
import Subscribe from './scenes/Subscribe';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSiteAuthenticated, setIsSiteAuthenticated] = useState(false);
  const [showSiteAccessModal, setShowSiteAccessModal] = useState(false);

  const handleSiteAccess = () => setShowSiteAccessModal(true);

  const SiteProtectedRoute = ({ element }) =>
    isSiteAuthenticated ? element : <Navigate to="/" />;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          
          {/* Topbar */}
          <Topbar
            isSidebarCollapsed={isSidebarCollapsed}
            setIsSidebarCollapsed={setIsSidebarCollapsed}
          />

          {/* Sidebar + main content */}
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            
            {/* Sidebar */}
            <Sidebar
              isSidebarCollapsed={isSidebarCollapsed}
              setIsSidebarCollapsed={setIsSidebarCollapsed}
            />

            {/* Main content */}
            <main
  className="content"
  style={{
    flex: 1,
    padding: '1rem',
    transition: 'all 0.3s ease',
    overflowY: 'auto',
  }}
>

              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/myteams" element={<SiteProtectedRoute element={<Myteams />} />} />
                <Route path="/myaccount" element={<MyAccount />} /> 
                <Route path="/LoginPage" element={<LoginPage />} />
                <Route path="/RegisterPage" element={<RegisterPage />} /> 
                <Route path="/LandingPage" element={<LandingPage />} /> 
                <Route path="/NotFound" element={<NotFound />} /> 
                <Route path="/Rankings" element={<Rankings />} /> 
                <Route path="/DraftGuide" element={<DraftGuide />} />    
                <Route path="/MockDraft" element={<MockDraft />} />
                <Route path="/TradeFinder" element={<TradeFinder />} />
                <Route path="/Calculator" element={<Calculator />} />
                <Route path="/Comparison" element={<Comparison />} />
                <Route path="/RangeOfOutcomes" element={<RangeOfOutcomes />} />
                <Route path="/MyReviews" element={<MyReviews />} />
                <Route path="/Subscribe" element={<Subscribe />} />
                <Route path="/Prospects" element={<Prospects />} />       
              </Routes>

              <SiteAccessModal
                isVisible={showSiteAccessModal}
                onClose={() => setShowSiteAccessModal(false)}
                onLoginSuccess={() => {
                  setIsSiteAuthenticated(true);
                  setShowSiteAccessModal(false);
                }}
              />
            </main>

          </div>
        </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
