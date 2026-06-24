// STRIDE threat-modelling reference and the user's recorded threats.

export interface StrideCategory {
  id: string;
  letter: string;
  name: string;
  property: string;
  description: string;
  examples: string;
  mitigations: string;
}

export const STRIDE: StrideCategory[] = [
  {
    id: 'spoofing',
    letter: 'S',
    name: 'Spoofing',
    property: 'Autenticação',
    description: 'Fazer-se passar por outro usuário, serviço ou sistema.',
    examples: 'Roubo de credenciais, falsificação de tokens, phishing.',
    mitigations: 'MFA, autenticação forte, assinatura de mensagens.',
  },
  {
    id: 'tampering',
    letter: 'T',
    name: 'Tampering',
    property: 'Integridade',
    description: 'Modificar dados ou código sem autorização.',
    examples: 'Alteração de parâmetros, injeção, modificação em trânsito.',
    mitigations: 'Hashes/assinaturas, validação de entrada, TLS.',
  },
  {
    id: 'repudiation',
    letter: 'R',
    name: 'Repudiation',
    property: 'Não-repúdio',
    description: 'Negar ter realizado uma ação, sem prova em contrário.',
    examples: 'Falta de logs, logs adulteráveis.',
    mitigations: 'Logs assinados/imutáveis, trilha de auditoria.',
  },
  {
    id: 'information-disclosure',
    letter: 'I',
    name: 'Information Disclosure',
    property: 'Confidencialidade',
    description: 'Expor informação a quem não deveria ter acesso.',
    examples: 'Mensagens de erro verbosas, diretórios abertos, vazamento de dados.',
    mitigations: 'Criptografia, controle de acesso, mínimo privilégio.',
  },
  {
    id: 'denial-of-service',
    letter: 'D',
    name: 'Denial of Service',
    property: 'Disponibilidade',
    description: 'Tornar um serviço indisponível para usuários legítimos.',
    examples: 'Flood de requisições, exaustão de recursos.',
    mitigations: 'Rate limiting, quotas, autoscaling, WAF/DDoS.',
  },
  {
    id: 'elevation-of-privilege',
    letter: 'E',
    name: 'Elevation of Privilege',
    property: 'Autorização',
    description: 'Obter privilégios além dos concedidos.',
    examples: 'Exploração de bug, IDOR, escalonamento horizontal/vertical.',
    mitigations: 'Mínimo privilégio, checagem de autorização, sandboxing.',
  },
];

export interface StrideThreat {
  id: string;
  component: string;
  category: string; // StrideCategory.id
  mitigation: string;
}
