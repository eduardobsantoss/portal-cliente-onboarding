export interface AnalysisStepItem {
  id: number;
  label: string;
  detail: string;
}

export interface AnalysisProgressStage {
  untilSeconds: number;
  stepIndex: number;
  progress: number;
}
