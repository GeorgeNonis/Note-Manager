import { styled, css } from "../../../../globalStyles";

export const FontWeights = {
  100: {
    fontWeight: 100,
  },
  200: {
    fontWeight: 200,
  },
  300: {
    fontWeight: 300,
  },
  400: {
    fontWeight: 400,
  },
  500: {
    fontWeight: 500,
  },
  600: {
    fontWeight: 600,
  },
  700: {
    fontWeight: 700,
  },
  800: {
    fontWeight: 800,
  },
  900: {
    fontWeight: 900,
  },
  bold: {
    fontWeight: "bold",
  },
  bolder: {
    fontWeight: "bolder",
  },
  lighter: {
    fontWeight: "lighter",
  },
  normal: {
    fontWeight: "normal",
  },
};

export const defaultTextStyles = css({
  variants: {
    bold: {
      true: {
        fontWeight: 600,
      },
    },
    ellipsis: {
      true: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    fontWeight: FontWeights,
    italic: {
      true: {
        fontStyle: "italic",
      },
    },
    lighter: {
      true: {
        fontWeight: 300,
      },
    },
    primary: {
      true: {
        color: "$primary600",
      },
    },
    uppercase: {
      true: {
        textTransform: "uppercase",
      },
    },
  },
});

export const TextSizes = {
  xs: {
    fontSize: "0.75rem",
  },
  s: {
    fontSize: "0.875rem",
  },
  m: {
    fontSize: "1rem",
  },
  l: {
    fontSize: "1.125rem",
  },
  xl: {
    fontSize: "1.2rem",
  },
};

export const StyledText = styled("span", defaultTextStyles, {
  variants: {
    size: TextSizes,
    center: {
      true: {
        textAlign: "center",
      },
    },
  },
});
