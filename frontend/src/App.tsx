import { DeletedNotesSection, ExistinNotesSection } from "./components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/rootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "notes", element: <ExistinNotesSection /> },
      { path: "deletednotes", element: <DeletedNotesSection /> },
      { path: "labelsnotesection", element: <DeletedNotesSection /> },
      { errorElement: <p>Something went wrong</p> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
