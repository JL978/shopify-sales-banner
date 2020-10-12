import React from "react";

export default function Banner({ bgColor, textColor, img, form }) {
  const bgRGB = `rgba(${bgColor.red},${bgColor.green},${bgColor.blue})`;
  const textRBG = `rgba(${textColor.red},${textColor.green},${textColor.blue})`;

  return (
    <div style={wrapperStyle(bgRGB)}>
      <img src={img} style={imageStyle} />
      <div style={textWrapperStyle(textRBG)}>
        <h2
          style={{ fontWeight: "500", fontSize: "3rem", marginBottom: "3rem" }}
        >
          {form.title}
        </h2>
        <p style={{ fontWeight: "500", fontSize: "5rem" }}>
          {form.percentage}% OFF
        </p>
      </div>
    </div>
  );
}

function wrapperStyle(bg) {
  return {
    width: "100%",
    display: "flex",
    maxWidth: "1200px",
    padding: "40px 20px",
    background: bg,
  };
}

function textWrapperStyle(color) {
  return {
    flexGrow: 1,
    color: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };
}

const imageStyle = {
  width: "200px",
};
