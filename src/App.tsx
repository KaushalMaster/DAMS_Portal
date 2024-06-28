import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import {
  RefineThemes,
  ThemedLayoutV2,
  ThemedTitleV2,
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgotpassword";
import { ListVideos } from "./pages/videos/list";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              // {
              //   name: "protected-products",
              //   list: "/products",
              //   show: "/products/:id",
              //   edit: "/products/:id/edit",
              //   create: "/products/create",
              //   meta: { label: "Products" },
              // },
              {
                name: "videos",
                list: "/videos",
                // show: "/videos/:id",
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    <ThemedLayoutV2
                      Title={(props) => (
                        <ThemedTitleV2 {...props} text="DAMS Portal" />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="/videos">
                  <Route index element={<ListVideos />} />
                  {/* <Route path=":id" element={<ShowVideos />} /> */}
                </Route>
                <Route
                  index
                  element={<NavigateToResource resource="videos" />}
                />
                <Route path="/products">
                  <Route index element={<ListProducts />} />
                  <Route path=":id" element={<ShowProduct />} />
                  <Route path=":id/edit" element={<EditProduct />} />
                  <Route path="create" element={<CreateProduct />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="videos" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* <Route path="/register" element={<Register />} /> */}
              </Route>
            </Routes>
          </Refine>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
