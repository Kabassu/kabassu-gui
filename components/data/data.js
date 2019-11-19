export const parametersOptions = [
  { value: 'jvm', label: 'JVM'},
  { value: 'branch', label: 'Branch'},
  { value: 'repository', label: 'Repository'},
  { value: 'runnerOptions', label: 'Runner Options'},
  { value: 'location', label: 'Location'},
  { value: 'reportDir', label: 'Reports Dir'},
  { value: 'startHtml', label: 'Start HTML'},
  { value: 'url', label: 'url'},
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
  { value: 'none', label: 'No Location'},
];

export const runnerTypes = [
  { value: 'gradle', label: 'Gradle'},
  { value: 'command', label: 'Command'},
  { value: 'aet', label: 'AET'},
  { value: 'lighthouse', label: 'Lighthouse'},
];

export const reportTypes = [
  { value: 'allure', label: 'Allure'},
  { value: 'allure-trend', label: 'Allure with Trend'},
  { value: 'allure-junit-xml', label: 'Allure For JUnit XML'},
  { value: 'allure-junit-xml-trend', label: 'Allure Trend For JUnit XML'},
  { value: 'generic', label: 'Generic'},
  { value: 'lighthouse', label: 'Lighthouse'},

];

export const lighthouseOptions = [
  { value: '--config-path', label: '--config-path'},
  { value: '--chrome-flags', label: '--chrome-flags'},
  { value: '--preset', label: '--preset'},
  { value: '--max-wait-for-load', label: '--max-wait-for-load'},
  { value: '--emulated-form-factor', label: '--emulated-form-factor'},
  { value: '--additional-trace-categories', label: '--additional-trace-categories'},
  { value: '--output', label: '--output'},
  { value: '--blocked-url-patterns', label: '--blocked-url-patterns'},
  { value: '--disable-storage-reset', label: '--disable-storage-reset'},
  { value: '--throttling-method', label: '--throttling-method'},
  { value: '--throttling.throughputKbps', label: '--throttling.throughputKbps'},
  { value: '--throttling.requestLatencyMs', label: '--throttling.requestLatencyMs'},
  { value: '--throttling.cpuSlowdownMultiplier', label: '--throttling.cpuSlowdownMultiplier'},
  { value: '--throttling.downloadThroughputKbps', label: '--throttling.downloadThroughputKbps'},
  { value: '--throttling.uploadThroughputKbps', label: '--throttling.uploadThroughputKbps'},
  { value: '--extra-headers', label: '--extra-headers'},


];