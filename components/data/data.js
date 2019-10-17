export const parametersOptions = [
  { value: 'jvm', label: 'JVM'},
  { value: 'branch', label: 'Branch'},
  { value: 'repository', label: 'Repository'},
  { value: 'runnerOptions', label: 'Runner Options'},
  { value: 'location', label: 'Location'},
  { value: 'reportDir', label: 'Reports Dir'},
  { value: 'startHtml', label: 'Start HTML'},

];

export const jvmValues = [
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

export const locationTypes = [
  { value: 'filesystem', label: 'File System'},
  { value: 'git', label: 'Git'},
];

export const runnerTypes = [
  { value: 'gradle', label: 'Gradle'},
  { value: 'command', label: 'Command'},
  { value: 'aet', label: 'AET'},
];

export const reportTypes = [
  { value: 'allure', label: 'Allure'},
  { value: 'allure-trend', label: 'Allure with Trend'},
  { value: 'allure-junit-xml', label: 'Allure For JUnit XML'},
  { value: 'generic', label: 'Generic'},

];