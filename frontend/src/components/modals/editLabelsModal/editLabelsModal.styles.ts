import { styled } from "../../../../globalStyles";
import { Button } from "../../Atoms";
import { Grid } from "noniscomponents";

export const StyledButton = styled(Button, {
  bgc: "rgba(154, 160, 166, 0.039)",
  padding: "20px",
  display: "grid",
  placeContent: "center",
  margin: 0,
  marginInline: "auto",
  width: "100%",
});

export const StyledLabelsDiv = styled(Grid, {
  marginBlock: "$2",
  gridTemplateColumns: "1fr 11fr",
  gap: "$2",
});

const svgGenerator = (backgroundImage: string) =>
  styled("div", {
    width: "1.5rem",
    height: "1.5rem",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    cursor: "pointer",
    backgroundImage: `url(${backgroundImage})`,
    "&:hover": {
      backgroundColor: "rgba(154, 160, 166, 0.157)",
      borderRadius: "50%",
    },
  });

export const StyledXMark = svgGenerator(
  "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0iI2ZmZmZmZiI+CiA8cGF0aCBkPSJtMCAwaDE4djE4aC0xOHpoMTh2MThoLTE4eiIgZmlsbD0ibm9uZSIvPgogPHBhdGggZD0ibTE0LjUzIDQuNTNsLTEuMDYtMS4wNi00LjQ3IDQuNDctNC40Ny00LjQ3LTEuMDYgMS4wNiA0LjQ3IDQuNDctNC40NyA0LjQ3IDEuMDYgMS4wNiA0LjQ3LTQuNDcgNC40NyA0LjQ3IDEuMDYtMS4wNi00LjQ3LTQuNDd6Ii8+Cjwvc3ZnPgo="
);

export const StyledPlus = svgGenerator(
  "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0iI2ZmZmZmZiI+CiA8cGF0aCBkPSJtMzggMjZoLTEydjEyaC00di0xMmgtMTJ2LTRoMTJ2LTEyaDR2MTJoMTJ2NHoiLz4KIDxwYXRoIGQ9Im0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K"
);

export const StyledTick = svgGenerator(
  "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0iI2ZmZmZmZiI+CiA8cGF0aCBkPSJtMCAwaDE4djE4aC0xOHoiIGZpbGw9Im5vbmUiLz4KIDxwYXRoIGQ9Im02LjYxIDExLjg5bC0zLjExLTMuMTEtMS4wNiAxLjA2IDQuMTcgNC4xNiA4Ljk1LTguOTUtMS4wNi0xLjA1eiIvPgo8L3N2Zz4K"
);

export const StyledPencil = svgGenerator(
  "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0iI2ZmZmZmZiI+CiA8cGF0aCBkPSJtNiAzNC41djcuNWg3LjVsMjIuMTMtMjIuMTMtNy41LTcuNS0yMi4xMyAyMi4xM3ptMzUuNDEtMjAuNDFjMC43OC0wLjc4IDAuNzgtMi4wNSAwLTIuODNsLTQuNjctNC42N2MtMC43OC0wLjc4LTIuMDUtMC43OC0yLjgzIDBsLTMuNjYgMy42NiA3LjUgNy41IDMuNjYtMy42NnoiLz4KIDxwYXRoIGQ9Im0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K"
);

export const StyledLabel = svgGenerator(
  "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0iI2ZmZmZmZiI+CiA8cGF0aCBkPSJtMCAwaDQ4djQ4aC00OHoiIGZpbGw9Im5vbmUiLz4KIDxwYXRoIGQ9Im0zNS4yNyAxMS42OWMtMC43My0xLjAyLTEuOTItMS42OS0zLjI3LTEuNjlsLTIyIDAuMDJjLTIuMjEgMC00IDEuNzctNCAzLjk4djIwYzAgMi4yMSAxLjc5IDMuOTggNCAzLjk4bDIyIDAuMDJjMS4zNSAwIDIuNTQtMC42NyAzLjI3LTEuNjlsOC43My0xMi4zMS04LjczLTEyLjMxeiIvPgo8L3N2Zz4K"
);

export const StyledTrashBin = svgGenerator(
  "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4cHgiIHdpZHRoPSIxOHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0iI2ZmZmZmZiI+CiA8cGF0aCBkPSJtMTIgMzhjMCAyLjIxIDEuNzkgNCA0IDRoMTZjMi4yMSAwIDQtMS43OSA0LTR2LTI0aC0yNHYyNHptMjYtMzBoLTdsLTItMmgtMTBsLTIgMmgtN3Y0aDI4di00eiIvPgogPHBhdGggZD0ibTAgMGg0OHY0OGgtNDh6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo="
);
