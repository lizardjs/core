import { LizardLine, LizardLineConfig } from "../types";

const x = (data: Array<number>, index: number, aspectRatio: number) => {
  return (100 / (data.length - 1)) * index * (aspectRatio ?? 16 / 9);
};

const y = (data: Array<number>, yi: number, max: number) => {
  return ((data[yi] ?? 0) / max) * 100;
};

export const lineSvgD = (line: LizardLine, config: LizardLineConfig) => {
  return (
    line.data.reduce((acc, val, i) => {
      const cordX = x(line.data, i, config.aspectRatio ?? 16 / 9);
      const cordY = 100 - y(line.data, i, max(config));

      return `${acc} L ${cordX} ${cordY}`;
    }, "M0,100") + ` L${100 * config.aspectRatio},100`
  );
};

export const lineSvgPath = (line: LizardLine, config: LizardLineConfig) => {
  const data = line.data ?? [];
  if (data.length === 0) return "";
  const d = lineSvgD(line, config);
  return `<path d="${d}" fill="${line?.background}" stroke="${line?.color}" vector-effect="non-scaling-stroke" />`;
};

export const lineSvg = (config: LizardLineConfig) => {
  const svg = `
    <svg 
        viewBox="0 0 ${100 * config.aspectRatio} 100" 
        xmlns="http://www.w3.org/2000/svg">
        ${config.lines.map((line) => lineSvgPath(line, config)).join("")}
        <path d="M0,0 L0,100 L${
          100 * config.aspectRatio
        } 100" fill="none" stroke="black" vector-effect="non-scaling-stroke" stroke-width="2" />
    </svg>
  `;

  const labelsX = config.xLabels.map((label) => `<div>${label}</div>`).join("");

  const labelsY = config.yLabels.map((label) => `<div>${label}</div>`).join("");

  return `
    <div style="display: grid; grid-template-columns: auto 1fr;">
        <div style="display: flex; flex-direction: column; justify-content: space-between; padding-right: 6px">${labelsX}</div>
        ${svg}
        <div></div>
        <div style="display: flex; flex-direction: row; justify-content: space-between; padding-top: 6px">${labelsY}</div>
    </div>
    `;
};

const max = (data: LizardLineConfig) => {
  return Math.max(...data.lines.map((line) => Math.max(...line.data)));
};
