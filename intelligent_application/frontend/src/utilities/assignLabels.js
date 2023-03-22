let labelColors = [
  { bgColor: "#0066CC", txtColor: "#FFFFFF" },
  { bgColor: "#4CB140", txtColor: "#FFFFFF" },
  { bgColor: "#009596", txtColor: "#FFFFFF" },
  { bgColor: "#5752D1", txtColor: "#FFFFFF" },
  { bgColor: "#F4C145", txtColor: "#FFFFFF" },
  { bgColor: "#EC7A08", txtColor: "#FFFFFF" },
  { bgColor: "#7D1007", txtColor: "#FFFFFF" },
  { bgColor: "#8BC1F7", txtColor: "#000000" },
  { bgColor: "#23511E", txtColor: "#FFFFFF" },
  { bgColor: "#A2D9D9", txtColor: "#000000" },
  { bgColor: "#2A265F", txtColor: "#FFFFFF" },
  { bgColor: "#F9E0A2", txtColor: "#000000" },
  { bgColor: "#8F4700", txtColor: "#FFFFFF" },
  { bgColor: "#C9190B", txtColor: "#FFFFFF" },
  { bgColor: "#002F5D", txtColor: "#FFFFFF" },
  { bgColor: "#BDE2B9", txtColor: "#000000" },
  { bgColor: "#003737", txtColor: "#FFFFFF" },
  { bgColor: "#B2B0EA", txtColor: "#000000" },
  { bgColor: "#C58C00", txtColor: "#FFFFFF" },
  { bgColor: "#F4B678", txtColor: "#000000" },
  { bgColor: "#2C0000", txtColor: "#FFFFFF" },
  { bgColor: "#519DE9", txtColor: "#FFFFFF" },
  { bgColor: "#38812F", txtColor: "#FFFFFF" },
  { bgColor: "#73C5C5", txtColor: "#FFFFFF" },
  { bgColor: "#3C3D99", txtColor: "#FFFFFF" },
  { bgColor: "#F6D173", txtColor: "#FFFFFF" },
  { bgColor: "#C46100", txtColor: "#FFFFFF" },
  { bgColor: "#A30000", txtColor: "#FFFFFF" },
  { bgColor: "#004B95", txtColor: "#FFFFFF" },
  { bgColor: "#7CC674", txtColor: "#FFFFFF" },
  { bgColor: "#005F60", txtColor: "#FFFFFF" },
  { bgColor: "#8481DD", txtColor: "#FFFFFF" },
  { bgColor: "#F0AB00", txtColor: "#FFFFFF" },
  { bgColor: "#EF9234", txtColor: "#FFFFFF" },
  { bgColor: "#470000", txtColor: "#FFFFFF" },
];

function assignLabels(currentLabels, responseData) {
  let { detections } = responseData;
  let usedColors = new Set();
  let newLabels = {};
  detections.sort((a, b) => a.score - b.score);
  let labelColorsIdx = 0;
  detections.forEach((d) => {
    let color = newLabels[d.label];

    if (!color) {
      color = currentLabels[d.label];
    }

    if (color) {
      newLabels[d.label] = color;
      usedColors.add(color.bgColor);
    }
  });

  detections.forEach((d) => {
    let color = newLabels[d.label];

    if (!color) {
      for (let i = labelColorsIdx; i < labelColors.length; i++) {
        color = labelColors[i];
        if (!usedColors.has(color.bgColor)) {
          labelColorsIdx = i;
          break;
        }
      }
    }

    if (!color) {
      let randomIdx = Math.floor(Math.random() * labelColors.length);
      color = labelColors[randomIdx];
    }

    newLabels[d.label] = color;
    usedColors.add(color.bgColor);
  });

  return newLabels;
}

export default assignLabels;
