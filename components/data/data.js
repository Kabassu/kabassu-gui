export const parametersOptions = [
  { value: 'jvm', label: 'JVM'},
  { value: 'branch', label: 'Branch'},
  { value: 'repository', label: 'Repository'},
];

var jvmValues = [
  { value: '1.8', label: '1.8'},
  { value: '1.8_2', label: '1.8_2'},
];

export const parametersValues = new Map(
[['jvm', jvmValues ]]
)

export const suggestedTypes = [
  { value: 'execution', label: 'Execution'},
  { value: 'definition', label: 'Definition'},
  { value: 'other', label: 'Other'},
];