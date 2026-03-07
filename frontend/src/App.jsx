import { Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Home from "./components/pages/Home";

function App() {
  return (
    <>
      <Layout >
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<div>Profile</div>} />
        </Routes>
      </Layout >
    </>
  )
}

export default App
