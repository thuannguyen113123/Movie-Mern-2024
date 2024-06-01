import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenreMovie from "./components/GenreMovie";

import Header from "./components/Layout/Header";
import PrivateRoute from "./components/PrivateRoute";
import CategoryMedia from "./pages/CategoryMedia";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import MediaDetail from "./pages/MediaDetail";
import PersonDetail from "./pages/PersonDetail";
import Search from "./pages/Search";
import Pagenotfound from "./pages/Pagenotfound";
import ScrollToTop from "./components/ScrollToTop";
import FooterCom from "./components/Layout/FooterCom";
import GlobalLoading from "./components/GlobalLoading";

function App() {
  return (
    <BrowserRouter>
      <GlobalLoading />
      <ScrollToTop />
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:id" element={<GenreMovie />} />
        <Route path="/:mediaType" element={<CategoryMedia />} />
        <Route path="/:mediaType/:id" element={<MediaDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/person/:id" element={<PersonDetail />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}

export default App;
