export type LizardLineConfig = {
  lines: Array<LizardLine>;
  aspectRatio: number;
  xLabels: Array<string>;
  yLabels: Array<string>;
};

export type LizardLine = {
  data: Array<number>;
  color: string;
  background: string;
};
