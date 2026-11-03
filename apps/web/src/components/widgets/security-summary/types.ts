export interface SecurityIssue {
  key: string
  label: string
  count: number
  color: string
}

export interface ChartData {
  value: number
  name: string
  color: string
  key: string
}

export interface ChartSizes {
  donutSize: number
  width: number
  height: number
  thickness: number
  boxPadding: number
}
