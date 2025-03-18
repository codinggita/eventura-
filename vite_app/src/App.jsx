import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { DataProvider } from "./DataFetcher"; 
import './App.css';
import Homepage from "./homepage";
import Venue from "./venue";
import VenueDetails from "./VenueDetails"; 
import CategoryDetails from "./CategoryDetails"; 
import Blogs from "./blogs";
import BlogDetails from "./BlogDetails";
import Events from "./events";
import Contactus from "./contactus";
import Projects from "./projects";
import ProjectDetails from "./ProjectDetails"; 
import Profile from "./profilepage";
import Landingpage from "./landingpage";
import ProtectedRoute from "./ProtecedRoute";
import AboutUs from "./Aboutus";
import Authuser from "./Authuser";
import Discount from "./discount";
import Feedback from "./feedback";
import Booking from "./BookingPage";
import SavedVenues from "./SavedVenues";
import UpcomingEvents from "./UpcomingEvents";
import SuccessPage from "./successpage";
import CancelPage from "./cancelpage";
import ChatBox from "./ChatBox";
import BudgetEstimator from './components/BudgetEstimator';

import VenueCalendar from "./components/VenueCalendar";

// Budget Calculator Component (Extracted for Clarity)
const BudgetCalculatorPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (remove or replace with actual async logic in production)
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="budget-page-container">
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="budget-content">
            <div className="budget-header">
              <h1 className="budget-title">Event Budget Calculator</h1>
              <p className="budget-subtitle">Plan your perfect event with our budget estimation tool</p>
              <button
                onClick={() => setShowChat(!showChat)}
                className="ai-help-button"
              >
                {showChat ? 'Hide Assistant' : 'Get Help'}
              </button>
            </div>

            <div className="budget-grid">
              <div className={`budget-estimator ${showChat ? 'with-chat' : 'full-width'}`}>
                <BudgetEstimator />
              </div>
              {showChat && (
                <div className="chat-interface">
                
                </div>
              )}
            </div>

            <div className="venue-calendar">
              <VenueCalendar />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function App() {
  const { user, isAuthenticated } = useAuth0();
  const userId = user?.sub;

  return (
    <DataProvider>
      <Router>
        {isAuthenticated && <Authuser />}
        <Routes>
          
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Landingpage />} />
          <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path="/venue" element={<ProtectedRoute><Venue /></ProtectedRoute>} />
          <Route path="/venue/:id" element={<ProtectedRoute><VenueDetails /></ProtectedRoute>} />
          <Route path="/category/:id" element={<ProtectedRoute><CategoryDetails /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
          <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
          <Route path="/blog/:id" element={<ProtectedRoute><BlogDetails /></ProtectedRoute>} />
          <Route path="/contactus" element={<ProtectedRoute><Contactus /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/aboutus" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
          <Route path="/discounts" element={<ProtectedRoute><Discount /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
          <Route path="/savedVenues" element={<ProtectedRoute><SavedVenues /></ProtectedRoute>} />
          <Route path="/upcomingEvents" element={<ProtectedRoute><UpcomingEvents /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
          <Route path="/cancel" element={<ProtectedRoute><CancelPage /></ProtectedRoute>} />
          <Route path="/chat-section" element={<ProtectedRoute><ChatBox /></ProtectedRoute>} />
          <Route path="/booking" element={<ProtectedRoute><Booking userId={userId} /></ProtectedRoute>} />
          
          {/* Budget Calculator Route */}
          <Route 
            path="/budget-calculator" 
            element={<ProtectedRoute><BudgetCalculatorPage /></ProtectedRoute>} 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </DataProvider>
  );
}

export default App;