import { PropertyValue, createStitches, keyframes } from "@stitches/react";

export const { styled } = createStitches({
  theme: {
    colors: {
      primaryDisableBackground: "rgb(255, 144, 79)",
      primaryDisableText: "#ffffff8c",
    },
    radii: {
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
    },
    space: {
      0: "0px",
      1: "4px",
      2: "8px",
      3: "16px",
      4: "32px",
    },
    sizes: {
      0: "20px",
      1: "40px",
      2: "60px",
      3: "80px",
      4: "100px",
      defaultSize: "200px",
    },
  },
  media: {
    mobile: "(max-width: 640px)",
    desktop: "(min-width: 641px)",
  },
  utils: {
    //margin utils
    m: (value: PropertyValue<"margin">) => ({
      margin: value,
    }),
    mt: (value: PropertyValue<"marginTop">) => ({
      marginTop: value,
    }),
    mr: (value: PropertyValue<"marginRight">) => ({
      marginRight: value,
    }),
    mb: (value: PropertyValue<"marginBottom">) => ({
      marginBottom: value,
    }),
    ml: (value: PropertyValue<"marginLeft">) => ({
      marginLeft: value,
    }),
    mx: (value: PropertyValue<"marginLeft">) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: PropertyValue<"marginTop">) => ({
      marginTop: value,
      marginBottom: value,
    }),

    //padding utils
    p: (value: PropertyValue<"padding">) => ({
      padding: value,
    }),
    pt: (value: PropertyValue<"paddingTop">) => ({
      paddingTop: value,
    }),
    pr: (value: PropertyValue<"paddingRight">) => ({
      paddingRight: value,
    }),
    pb: (value: PropertyValue<"paddingBottom">) => ({
      paddingBottom: value,
    }),
    pl: (value: PropertyValue<"paddingLeft">) => ({
      paddingLeft: value,
    }),
    px: (value: PropertyValue<"paddingLeft">) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: PropertyValue<"paddingTop">) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    //sizes utils
    h: (value: PropertyValue<"height">) => ({
      height: value,
    }),
    minH: (value: PropertyValue<"minHeight">) => ({
      minHeight: value,
    }),
    maxH: (value: PropertyValue<"maxHeight">) => ({
      maxHeight: value,
    }),
    w: (value: PropertyValue<"width">) => ({
      width: value,
    }),
    minW: (value: PropertyValue<"minWidth">) => ({
      minWidth: value,
    }),
    maxW: (value: PropertyValue<"maxWidth">) => ({
      maxWidth: value,
    }),
    size: (value: PropertyValue<"height">) => ({
      height: value,
      width: value,
    }),
    minSize: (value: PropertyValue<"minHeight">) => ({
      minHeight: value,
      minWidth: value,
    }),
    maxSize: (value: PropertyValue<"maxHeight" | "maxWidth">) => ({
      maxHeight: value,
      maxWidth: value,
    }),

    bgc: (value: PropertyValue<"backgroundColor">) => ({
      backgroundColor: value,
    }),
    linearGradient: (value: PropertyValue<"backgroundImage">) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),

    bc: (value: PropertyValue<"borderColor">) => ({
      borderColor: value,
    }),
    br: (value: PropertyValue<"borderRadius">) => ({
      borderRadius: value,
    }),
  },
});

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const StyledLoadingSemiCircle = styled("div", {
  display: "grid",
  width: "100%",
  height: "100%",
  placeContent: "center",

  "&:after": {
    content: '""',
    display: "block",
    width: "20px",
    height: "20px",
    margin: "8px",
    borderRadius: "50%",
    border: "2px solid #fff",
    borderColor: "#fff transparent #fff transparent",
    animation: `${rotate} 1.2s linear infinite`,
  },
});
