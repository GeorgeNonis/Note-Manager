import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./errors";
import RootLayout from "./pages/rootLayout";
import { lazy, Suspense } from "react";
import ArchiveNotesSection from "./components/sections/archive-notes-section";

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
const NoPageFound = lazy(() => import("./pages/noPageFound"));

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
        path: "archivenotes",
        element: (
          <Suspense>
            <ArchiveNotesSection />
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
  { path: "*", element: <NoPageFound /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
