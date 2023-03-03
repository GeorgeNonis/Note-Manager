import {
  DeletedNotesSection,
  ExistinNotesSection,
  NotesWithLabelsSection,
} from "./components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./errors";
import RootLayout from "./pages/rootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    // loader: ''
    id: "initial-state",
    children: [
      { path: "notes", element: <ExistinNotesSection /> },
      { path: "deletednotes", element: <DeletedNotesSection /> },
      { path: "labelsnotesection/:label", element: <NotesWithLabelsSection /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
