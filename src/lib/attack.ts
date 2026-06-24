// Curated subset of the MITRE ATT&CK Enterprise matrix: the 14 tactics and a
// handful of well-known techniques each. IDs match the official catalogue. This
// is a teaching/checklist subset, not the full STIX bundle, to keep the app
// light. Source: https://attack.mitre.org

export interface Technique {
  id: string;
  name: string;
}

export interface Tactic {
  id: string;
  name: string;
  techniques: Technique[];
}

export const TACTICS: Tactic[] = [
  {
    id: 'TA0043',
    name: 'Reconnaissance',
    techniques: [
      { id: 'T1595', name: 'Active Scanning' },
      { id: 'T1592', name: 'Gather Victim Host Information' },
      { id: 'T1589', name: 'Gather Victim Identity Information' },
      { id: 'T1598', name: 'Phishing for Information' },
    ],
  },
  {
    id: 'TA0042',
    name: 'Resource Development',
    techniques: [
      { id: 'T1583', name: 'Acquire Infrastructure' },
      { id: 'T1587', name: 'Develop Capabilities' },
      { id: 'T1585', name: 'Establish Accounts' },
      { id: 'T1588', name: 'Obtain Capabilities' },
    ],
  },
  {
    id: 'TA0001',
    name: 'Initial Access',
    techniques: [
      { id: 'T1566', name: 'Phishing' },
      { id: 'T1190', name: 'Exploit Public-Facing Application' },
      { id: 'T1133', name: 'External Remote Services' },
      { id: 'T1078', name: 'Valid Accounts' },
    ],
  },
  {
    id: 'TA0002',
    name: 'Execution',
    techniques: [
      { id: 'T1059', name: 'Command and Scripting Interpreter' },
      { id: 'T1203', name: 'Exploitation for Client Execution' },
      { id: 'T1053', name: 'Scheduled Task/Job' },
      { id: 'T1204', name: 'User Execution' },
    ],
  },
  {
    id: 'TA0003',
    name: 'Persistence',
    techniques: [
      { id: 'T1547', name: 'Boot or Logon Autostart Execution' },
      { id: 'T1136', name: 'Create Account' },
      { id: 'T1505', name: 'Server Software Component' },
      { id: 'T1098', name: 'Account Manipulation' },
    ],
  },
  {
    id: 'TA0004',
    name: 'Privilege Escalation',
    techniques: [
      { id: 'T1548', name: 'Abuse Elevation Control Mechanism' },
      { id: 'T1068', name: 'Exploitation for Privilege Escalation' },
      { id: 'T1055', name: 'Process Injection' },
      { id: 'T1078', name: 'Valid Accounts' },
    ],
  },
  {
    id: 'TA0005',
    name: 'Defense Evasion',
    techniques: [
      { id: 'T1070', name: 'Indicator Removal' },
      { id: 'T1027', name: 'Obfuscated Files or Information' },
      { id: 'T1562', name: 'Impair Defenses' },
      { id: 'T1112', name: 'Modify Registry' },
    ],
  },
  {
    id: 'TA0006',
    name: 'Credential Access',
    techniques: [
      { id: 'T1110', name: 'Brute Force' },
      { id: 'T1003', name: 'OS Credential Dumping' },
      { id: 'T1555', name: 'Credentials from Password Stores' },
      { id: 'T1056', name: 'Input Capture' },
    ],
  },
  {
    id: 'TA0007',
    name: 'Discovery',
    techniques: [
      { id: 'T1083', name: 'File and Directory Discovery' },
      { id: 'T1057', name: 'Process Discovery' },
      { id: 'T1018', name: 'Remote System Discovery' },
      { id: 'T1082', name: 'System Information Discovery' },
    ],
  },
  {
    id: 'TA0008',
    name: 'Lateral Movement',
    techniques: [
      { id: 'T1021', name: 'Remote Services' },
      { id: 'T1570', name: 'Lateral Tool Transfer' },
      { id: 'T1550', name: 'Use Alternate Authentication Material' },
    ],
  },
  {
    id: 'TA0009',
    name: 'Collection',
    techniques: [
      { id: 'T1005', name: 'Data from Local System' },
      { id: 'T1113', name: 'Screen Capture' },
      { id: 'T1119', name: 'Automated Collection' },
      { id: 'T1056', name: 'Input Capture' },
    ],
  },
  {
    id: 'TA0011',
    name: 'Command and Control',
    techniques: [
      { id: 'T1071', name: 'Application Layer Protocol' },
      { id: 'T1105', name: 'Ingress Tool Transfer' },
      { id: 'T1573', name: 'Encrypted Channel' },
      { id: 'T1090', name: 'Proxy' },
    ],
  },
  {
    id: 'TA0010',
    name: 'Exfiltration',
    techniques: [
      { id: 'T1041', name: 'Exfiltration Over C2 Channel' },
      { id: 'T1048', name: 'Exfiltration Over Alternative Protocol' },
      { id: 'T1567', name: 'Exfiltration Over Web Service' },
    ],
  },
  {
    id: 'TA0040',
    name: 'Impact',
    techniques: [
      { id: 'T1486', name: 'Data Encrypted for Impact' },
      { id: 'T1490', name: 'Inhibit System Recovery' },
      { id: 'T1498', name: 'Network Denial of Service' },
      { id: 'T1485', name: 'Data Destruction' },
    ],
  },
];

export const ALL_TECHNIQUES: (Technique & { tactic: string })[] = TACTICS.flatMap((tactic) =>
  tactic.techniques.map((t) => ({ ...t, tactic: tactic.name })),
);
