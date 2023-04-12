import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./errors";
import RootLayout from "./pages/rootLayout";
import { lazy, Suspense } from "react";
// import { LoginPage } from "./components";

const ExistinNotesSection = lazy(
  () => import("./components/sections/existing-notes-section")
);
const DeletedNotesSection = lazy(
  () => import("./components/sections/deleted-notes-section")
);
const NotesWithLabelsSection = lazy(
  () => import("./components/sections/notes-with-labels-section")
);

const LoginPage = lazy(() => import("./pages/loginPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={"loading"}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "notes",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/notes/",
        element: (
          <Suspense fallback={"loading"}>
            <ExistinNotesSection />
          </Suspense>
        ),
      },
      {
        path: "deletednotes",
        element: (
          <Suspense>
            <DeletedNotesSection />
          </Suspense>
        ),
      },
      {
        path: "labelsnotesection/:labelId",
        element: (
          <Suspense>
            <NotesWithLabelsSection />
          </Suspense>
        ),
      },
    ],
  },
  { path: "*", element: <p>Page could not be found!</p> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
