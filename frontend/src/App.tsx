import {
  DeletedNotesSection,
  ExistinNotesSection,
  NotesWithLabelsSection,
} from "./components";
import {
  createBrowserRouter,
  RouterProvider,
  HashRouter,
} from "react-router-dom";
import Error from "./errors";
import RootLayout from "./pages/rootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    id: "initial-state",
    children: [
      { path: "notes", element: <ExistinNotesSection /> },
      { path: "deletednotes", element: <DeletedNotesSection /> },
      {
        path: "labelsnotesection/:labelId",
        element: <NotesWithLabelsSection />,
      },
    ],
  },
  { path: "*", element: <p>Page could not be found!</p> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
