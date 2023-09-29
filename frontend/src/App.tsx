import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./errors";
import { lazy, Suspense } from "react";
import ArchiveNotesSection from "./components/sections/archive-notes-section";
import { LoadingSpinner } from "./components";

const RootLayout = lazy(() => import("./pages/rootLayout"));
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
      <Suspense fallback={<LoadingSpinner />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "notes",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/notes/",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ExistinNotesSection />
          </Suspense>
        ),
      },
      {
        path: "deletednotes",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DeletedNotesSection />
          </Suspense>
        ),
      },
      {
        path: "archivenotes",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ArchiveNotesSection />
          </Suspense>
        ),
      },
      {
        path: "labelsnotesection/:labelId",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
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
