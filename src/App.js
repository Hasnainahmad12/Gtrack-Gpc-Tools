import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Sidebar from "./Components/Sidebar/Sidebar";
import DataTableProvider from "./Contexts/DataTableContext";
import { CurrentUserProvider } from "./Contexts/CurrentUserContext";
import { SnackbarProvider } from "./Contexts/SnackbarContext";
import GpcTools from "./Pages/GpcTools/GpcTools";

const App = () => {
  const MainLayout = ({ children }) => {
    return (
      <div className="main-layout-container">
        {/* <Sidebar /> */}
        <span className="right-layout">{children}</span>
      </div>
    );
  };
  return (
    <>
      <DataTableProvider>
        <SnackbarProvider>
          <CurrentUserProvider>

            <div>
              <BrowserRouter>
                <Routes>
                  {/* <Route path="/" element={<Login />} /> */}
                  <Route path="/" element={<GpcTools />} />
                  

                  <Route
                    path="/*"
                    element={
                      <MainLayout>
                        <Routes>
                          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                        </Routes>
                      </MainLayout>
                    }
                  />
                </Routes>
              </BrowserRouter>


            </div>
          </CurrentUserProvider>
        </SnackbarProvider>
      </DataTableProvider>


    </>
  );
};

export default App;