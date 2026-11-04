
import { Routes, Route } from "react-router-dom";

import BlogDetails from "./BlogDetails";
import BlogPage from "./Blogpage";
import NotFound from "./NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BlogPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogDetails />} />
     <Route path="*" element={<NotFound />} />

    </Routes>
    
  );
  
}

export default App;

