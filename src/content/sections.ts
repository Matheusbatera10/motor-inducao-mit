// Conteúdo estático extraído do Capítulo III — Máquinas de Indução Trifásicas
// (disciplina Aplicação de Máquinas Elétricas). Usado pelas páginas de cada rota.

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'tree'; items: { text: string; indent: number }[] }
  | { type: 'formula'; label: string; expr: string; note?: string }
  | { type: 'note'; text: string }
  | { type: 'subheading'; text: string }

export interface SectionDef {
  slug: string
  numero: string
  titulo: string
  resumo: string
  blocks: Block[]
}

export const sections: SectionDef[] = [
  {
    slug: 'introducao',
    numero: '3.1',
    titulo: 'Introdução',
    resumo: 'O motor de indução trifásico responde por ~25% da carga elétrica do Brasil.',
    blocks: [
      {
        type: 'p',
        text: 'O motor de indução trifásico (MIT) corresponde a cerca de 25% da carga elétrica do Brasil (50% da carga industrial, que por sua vez é 50% da carga total). É uma máquina de excitação única: embora tenha enrolamento de campo (estator) e de armadura (rotor), na operação normal apenas o estator é energizado — o MIT opera sem contato elétrico com o rotor, o que reduz custo e manutenção.',
      },
      {
        type: 'p',
        text: 'Alimentação: corrente alternada trifásica, normalmente pelo estator. O rotor pode ser:',
      },
      {
        type: 'list',
        items: [
          'Gaiola de esquilo: barras condutoras curto-circuitadas por anéis — robusto, é o mais comum.',
          'Bobinado: enrolamento trifásico com anéis coletores e escovas — permite acesso externo às correntes do rotor, usado quando se quer controlar torque/velocidade na partida.',
        ],
      },
      {
        type: 'note',
        text: 'A velocidade do MIT é sempre menor que a velocidade síncrona — por isso ele é chamado de motor assíncrono.',
      },
    ],
  },
  {
    slug: 'partes-construtivas',
    numero: '3.2',
    titulo: 'Partes Construtivas',
    resumo: 'Carcaça, estator e os dois tipos de rotor — gaiola de esquilo e bobinado.',
    blocks: [
      { type: 'subheading', text: 'Carcaça' },
      {
        type: 'p',
        text: 'Estrutura que suporta as demais partes (tampas, caixa de ligação); geralmente em ferro fundido, com aletas para dissipação de calor.',
      },
      { type: 'subheading', text: 'Estator' },
      {
        type: 'p',
        text: 'Núcleo de chapas magnéticas com ranhuras axiais para o enrolamento (trifásico ou monofásico). As chapas reduzem perdas e melhoram o rendimento; a isolação entre chapas e bobinas evita colocar a carcaça sob tensão.',
      },
      { type: 'subheading', text: 'Rotor' },
      {
        type: 'list',
        items: [
          'Gaiola de esquilo: barras de alumínio conectadas por anéis em ambas as extremidades, injetadas sob alta pressão/temperatura, sem isolação entre barras e núcleo; a forma das ranhuras influencia a curva de torque.',
          'Bobinado: enrolamento trifásico (geralmente em cobre) semelhante ao do estator, com terminais ligados a anéis coletores e escovas acessíveis externamente; mais caro e menos robusto, usado quando se precisa de torque de partida elevado.',
        ],
      },
    ],
  },
  {
    slug: 'graus-eletricos-mecanicos',
    numero: '3.3',
    titulo: 'Graus Elétricos x Graus Mecânicos',
    resumo: 'Um par de polos equivale a 360° elétricos.',
    blocks: [
      { type: 'p', text: 'Um par de polos = 360° elétricos = 2π rad.' },
      { type: 'formula', label: 'Conversão', expr: 'θ°mecânico = (2/p) · θ°elétrico' },
      { type: 'note', text: 'Ex.: máquina de 8 polos, 180° elétricos → 45° mecânicos.' },
    ],
  },
  {
    slug: 'campo-girante',
    numero: '3.4',
    titulo: 'Campo Magnético Girante',
    resumo: 'Como as três correntes defasadas 120° criam um campo girante de amplitude constante.',
    blocks: [
      {
        type: 'p',
        text: 'A tensão trifásica aplicada ao enrolamento trifásico do estator cria um campo girante que, por efeito de transformador, induz f.e.m. no rotor. As três fases (a, b, c) estão deslocadas 120° elétricos no espaço, e as correntes 120° defasadas no tempo.',
      },
      {
        type: 'p',
        text: 'A soma vetorial das contribuições de fluxo de cada fase resulta em um vetor de fluxo de amplitude constante (φr = 3/2·φm) e velocidade constante — a cada 90° elétricos de avanço no tempo, o vetor resultante gira 90° no espaço.',
      },
      { type: 'formula', label: 'Velocidade síncrona', expr: 'ns = 120·f / p', note: 'ns em rpm, f = frequência (Hz), p = nº de polos' },
      {
        type: 'note',
        text: 'Generalização para q fases: um campo girante de amplitude/velocidade constante exige (1) deslocamento espacial de 2π/q graus elétricos entre enrolamentos e (2) correntes equilibradas deslocadas no tempo por 2π/q. Exceção: a máquina bifásica usa q=4 (caso especial do sistema de 4 fases).',
      },
    ],
  },
  {
    slug: 'principio-operacao',
    numero: '3.5',
    titulo: 'Princípio de Operação',
    resumo: 'O campo girante induz corrente no rotor, que gera torque no sentido do campo.',
    blocks: [
      {
        type: 'p',
        text: 'Com os enrolamentos do estator ligados a um sistema trifásico equilibrado (120° elétricos entre fases), forma-se o campo girante na velocidade síncrona. Esse campo induz tensões nos condutores do rotor; como formam caminhos fechados, circula corrente induzida, que gera torque no rotor no sentido do campo girante. Se o torque motor for maior que o torque resistente, o motor parte.',
      },
      {
        type: 'note',
        text: 'O motor não pode atingir a velocidade síncrona — se isso ocorresse, a velocidade relativa entre campo e rotor seria zero, não haveria tensão induzida, logo nenhum torque. Por isso opera sempre abaixo de ns → motor assíncrono. A transferência de energia estator→rotor é indutiva, sem conexão elétrica.',
      },
    ],
  },
  {
    slug: 'escorregamento',
    numero: '3.6',
    titulo: 'Escorregamento (s)',
    resumo: 'A diferença entre a velocidade síncrona e a velocidade real do rotor.',
    blocks: [
      { type: 'formula', label: 'Escorregamento', expr: 's = ns - nr  (rpm)  ou  s = (ns - n)/ns  (pu)' },
      { type: 'formula', label: 'Frequência induzida no rotor', expr: 'f2 = s·f1', note: 'com f2 = p(ns-n)/120' },
      {
        type: 'list',
        items: [
          'Partida: nr = 0 → s = 1 (frequência do rotor = frequência da rede)',
          'Rotor à velocidade síncrona (hipotético): nr = ns → s = 0 (frequência nula)',
          'Em operação normal: 0 < s < 1',
          'Com rotor bloqueado (rb): εr = s·εrb, fr = s·frb',
        ],
      },
      { type: 'subheading', text: 'Exercícios do capítulo' },
      {
        type: 'p',
        text: 'Motor de indução trifásico de 6 polos, 3 ranhuras/polo/fase, 60Hz: (a) nº total de ranhuras do estator = 54; (b) velocidade do campo girante = 1200 rpm; (c) velocidade do rotor com s=3% = 1164 rpm; (d) frequência da corrente do rotor = 1,8 Hz.',
      },
      {
        type: 'p',
        text: 'Motor de 4 polos, 60Hz, s=5% a plena carga: frequência induzida no rotor na partida = 60Hz; a plena carga = 3Hz. (A apostila escreve “tensão induzida”, mas as respostas estão em Hz: o que se calcula é a frequência.)',
      },
    ],
  },
  {
    slug: 'circuito-equivalente',
    numero: '3.7',
    titulo: 'Circuito Equivalente',
    resumo: 'O MIT comparado a um transformador, com a resistência fictícia (1-s)Rr/s.',
    blocks: [
      {
        type: 'p',
        text: 'O MIT pode ser comparado a um transformador (fonte de energia única, enlaces de fluxo variáveis entre estator e rotor). É um único circuito por fase que já une o ramo do estator e o ramo do rotor — não são dois diagramas separados.',
      },
      {
        type: 'list',
        items: [
          'Ramo do estator (ligado à fonte Vas): Rs (resistência do enrolamento do estator) em série com jXls (reatância de dispersão do estator).',
          'Ramo de magnetização (em paralelo, alimentado por E1 — a f.c.e.m.): jXm (reatância de magnetização) em paralelo com Rc (perdas no núcleo — histerese e Foucault).',
          'Ramo do rotor (referido ao estator): jXlr (reatância de dispersão do rotor) em série com Rr (resistência do enrolamento do rotor) em série com (1-s)·Rr/s — a "resistência fictícia" que não existe fisicamente, mas representa toda a potência convertida em mecânica.',
        ],
      },
      {
        type: 'note',
        text: 'Os sliders de s afetam visualmente apenas o ramo do rotor — é ali que (1-s)Rr/s cresce/diminui — enquanto o ramo do estator permanece fixo, já que suas perdas (Rs, Xls) não dependem do escorregamento.',
      },
      {
        type: 'p',
        text: 'Diferenças em relação ao transformador: a corrente de magnetização Im é 25-40% da nominal (contra 2-5% no transformador) por causa do entreferro; a reatância de dispersão também é maior; os enrolamentos são distribuídos na periferia do entreferro em vez de concentrados em núcleo.',
      },
    ],
  },
  {
    slug: 'fluxo-potencias',
    numero: '3.8',
    titulo: 'Perdas e Fluxo de Potências',
    resumo: 'Do que é a potência de entrada até a potência mecânica de saída no eixo.',
    blocks: [
      {
        type: 'tree',
        items: [
          { text: 'Potência elétrica de entrada: P1 = 3·Vf·If·cosφ', indent: 0 },
          { text: 'Perdas no núcleo (histerese + Foucault, no ramo Rc)', indent: 1 },
          { text: 'Perdas no cobre do estator: Pcu,s = 3·Rs·Is²', indent: 1 },
          { text: 'Potência transferida pelo entreferro / potência de entrada no rotor (Pag)', indent: 1 },
          { text: 'Perdas no cobre do rotor: Pcu,r = 3·Rr·Ir² = s·Pag', indent: 2 },
          { text: 'Potência mecânica gerada: Pmec = (1-s)·Pag', indent: 2 },
          { text: 'Perdas rotacionais (atrito nos mancais + ventilação)', indent: 3 },
          { text: 'Potência mecânica de saída no eixo: Peixo = Pmec − Perdas rotacionais', indent: 3 },
        ],
      },
      { type: 'formula', label: 'Perdas no cobre do rotor', expr: 'Pcu,rotor = s · Pentreferro' },
      { type: 'formula', label: 'Potência mecânica', expr: 'Pmecânica = (1 - s) · Pentreferro' },
      {
        type: 'note',
        text: 'O rendimento do motor é sempre menor que 100% — a diferença entre a potência elétrica de entrada e a potência útil no eixo é justamente a soma de todas essas perdas, transformada em calor (ver seção 3.13 — Aquecimento do enrolamento).',
      },
    ],
  },
  {
    slug: 'torque-velocidade',
    numero: '3.9',
    titulo: 'Curva Torque x Velocidade',
    resumo: 'Tp, Tmín, Tmáx, Tn — os pontos-chave definidos pela NBR 17094.',
    blocks: [
      {
        type: 'p',
        text: 'O torque é zero na velocidade síncrona. Conforme a carga aumenta, a rotação cai gradativamente até o torque máximo que o motor suporta em rotação normal; se a carga aumentar mais, a rotação cai bruscamente (podendo travar o rotor).',
      },
      {
        type: 'list',
        items: [
          'Tn — torque nominal/de plena carga: desenvolvido na potência nominal, sob tensão/frequência nominais.',
          'nr — rotação nominal; ns — rotação síncrona.',
          'Tmín — torque mínimo: o menor torque entre a partida e o torque máximo; não deve ser muito baixo (evita partida demorada/sobreaquecimento, especialmente com alta inércia ou tensão reduzida).',
          'Tmáx — torque máximo: maior torque sem queda brusca de velocidade; tipicamente 200-300% do torque nominal; deve ser alto para vencer picos de carga (britadores, calandras, misturadores) sem "arriar" com quedas momentâneas de tensão — mas não pode ser exigido continuamente (correntes excessivas destroem a isolação).',
          'Tp — torque de partida (rotor bloqueado): torque mínimo desenvolvido pelo motor bloqueado, em qualquer posição angular do rotor, sob tensão/frequência nominais; deve ser alto o bastante para vencer a inércia inicial e acelerar rapidamente, principalmente com partida em tensão reduzida.',
        ],
      },
    ],
  },
  {
    slug: 'categorias',
    numero: '3.10',
    titulo: 'Categorias N, H, D',
    resumo: 'Classificação normalizada por torque e corrente de partida (NBR 17094).',
    blocks: [
      {
        type: 'p',
        text: 'Conforme a curva torque x velocidade e a corrente de partida (NBR 17094), motores de rotor gaiola se classificam em:',
      },
      {
        type: 'list',
        items: [
          'Categoria N: torque/corrente de partida normais, baixo escorregamento. É a maioria dos motores do mercado; usada em cargas normais (bombas, máquinas operatrizes).',
          'Categoria H: torque de partida alto, corrente de partida baixa, baixo escorregamento. Usada em cargas que exigem maior torque na partida (peneiras, transportadores carregados, alta inércia).',
          'Categoria D: torque de partida alto, corrente de partida baixa, alto escorregamento (>5%). Usada em prensas excêntricas e cargas com picos periódicos/torque de partida muito alto e corrente limitada.',
        ],
      },
      {
        type: 'note',
        text: 'Os valores completos (Cp = torque com rotor bloqueado, Cmín = torque mínimo de partida, Cmáx = torque máximo, todos em pu do torque nominal) estão nas Tabelas 3.1 e 3.2, disponíveis nesta página como consulta. Na prova, responda como na apostila: H e D com corrente de partida baixa. Alguns catálogos de fabricante descrevem essa corrente como “normal”.',
      },
    ],
  },
  {
    slug: 'fator-servico',
    numero: '3.11',
    titulo: 'Fator de Serviço',
    resumo: 'A reserva de potência que o motor suporta continuamente acima da nominal.',
    blocks: [
      {
        type: 'p',
        text: 'Reserva de potência que permite operação em condições desfavoráveis — indica a sobrecarga contínua permissível. Ex.: FS = 1,15 → o motor suporta continuamente 15% de sobrecarga acima da potência nominal.',
      },
    ],
  },
  {
    slug: 'regime-servico',
    numero: '3.12',
    titulo: 'Regime de Serviço (S1-S10)',
    resumo: 'A regularidade de carga a que o motor é submetido, conforme a NBR 17094.',
    blocks: [
      {
        type: 'p',
        text: 'A NBR 17094 define dez regimes de serviço padronizados (S1 a S10), que descrevem a regularidade de carga a que o motor é submetido — veja o seletor abaixo.',
      },
      {
        type: 'formula',
        label: 'Fator de duração do ciclo (ED) — exemplo S3',
        expr: 'ED = tN/(tN+tR) · 100%',
        note: 'Variações específicas para S4-S8 somam tD, tF, tV conforme o regime. Todas estão na aba Fórmulas.',
      },
      {
        type: 'note',
        text: 'S7 tem ED = 100%, porque não existe período de repouso. S1 alcança o equilíbrio térmico, S2 não alcança e depois repousa até igualar a temperatura com o meio refrigerante. S10 tem no máximo 4 valores distintos de carga, cada um até o equilíbrio térmico.',
      },
    ],
  },
  {
    slug: 'aquecimento',
    numero: '3.13',
    titulo: 'Aquecimento do Enrolamento',
    resumo: 'Classes de isolamento, dissipação de calor e proteção térmica.',
    blocks: [
      {
        type: 'p',
        text: 'Perdas: a potência útil no eixo é sempre menor que a potência absorvida da linha → o rendimento é sempre menor que 100%; a diferença vira calor.',
      },
      {
        type: 'p',
        text: 'Dissipação: o calor sai pela superfície da carcaça, auxiliado por um ventilador no eixo em motores fechados. Uma boa dissipação depende de: eficiência da ventilação, área total de dissipação (aletas), e diferença de temperatura entre carcaça e ambiente.',
      },
      {
        type: 'p',
        text: 'Queda interna de temperatura, do ponto mais quente até o ambiente: A (ponto mais quente do enrolamento) → AB (transferência até os fios externos) → B (isolamento da ranhura/contato com o núcleo) → BC (transmissão pelas chapas) → C (contato núcleo-carcaça) → CD (espessura da carcaça) → ambiente.',
      },
      {
        type: 'note',
        text: 'A temperatura externa da carcaça NÃO indica o aquecimento interno real — um motor "frio por fora" pode ter enrolamento mais quente que um "quente por fora".',
      },
      { type: 'subheading', text: 'Classes de isolamento (NBR 17094)' },
      {
        type: 'note',
        text: 'Classes B e F são as mais usadas em motores normais. Um aumento de 8-10°C na temperatura de isolação reduz a vida útil pela metade. Vida útil aqui é o envelhecimento gradual do isolante, que resseca até não suportar a tensão e causar curto-circuito, e não a queima imediata.',
      },
      {
        type: 'formula',
        label: 'Temperatura do ponto mais quente',
        expr: 'T total = T ambiente + Δt + (ponto mais quente − média)',
        note: 'Ex.: classe F = 40 + 105 + 10 = 155°C. Atenção: o texto da apostila cita diferença de 15°C para a classe F, mas a Tabela 3.3 usa 10°C, e é a tabela que fecha os 155°C.',
      },
      { type: 'subheading', text: 'Proteção térmica' },
      {
        type: 'list',
        items: [
          'Termorresistores PT-100: resistência varia linearmente com a temperatura (platina/níquel/cobre), permite acompanhamento contínuo via display; alto custo.',
          'Termistores PTC/NTC: semicondutores que mudam resistência bruscamente numa temperatura definida; o PTC é o mais usado em motores (interrompe corrente, aciona relé); tamanho reduzido, resposta rápida, mas sem leitura contínua.',
          'Termostatos bimetálicos: contatos que abrem ao atingir a temperatura de atuação e fecham ao esfriar; instalados nas cabeças de bobina, 1 ou 2 por fase.',
          'Protetores fenólicos: bimetálico com resistência interna, usados principalmente em monofásicos, contra sobrecarga/rotor travado/queda de tensão; religamento automático ou manual. Em trifásicos, apenas com ligação Y.',
        ],
      },
      {
        type: 'formula',
        label: 'Temperatura pelo PT-100',
        expr: 't(°C) = (r − 100) / 0,385',
        note: 'r = resistência medida em ohms. Ex.: r = 138,5 Ω → t = 100°C.',
      },
    ],
  },
  {
    slug: 'ambiente-altitude',
    numero: '3.14',
    titulo: 'Características do Ambiente',
    resumo: 'Como altitude e temperatura ambiente reduzem a potência útil disponível.',
    blocks: [
      {
        type: 'p',
        text: 'Condições usuais de serviço (NBR 17094): altitude ≤ 1000m; temperatura do meio refrigerante ≤ 40°C.',
      },
      {
        type: 'p',
        text: 'Altitude: acima de 1000m o ar rarefeito reduz a capacidade de refrigeração → exige redução de perdas/potência. Soluções: isolamento de classe superior; motor com fator de serviço >1,0; ou reduzir a elevação de temperatura em 1% a cada 100m acima de 1000m (arredondando a redução para o °C inteiro imediatamente superior).',
      },
      {
        type: 'formula',
        label: 'Exemplo da apostila: classe B, 1500 m',
        expr: 'Δt = 80 − (0,05 · 80) = 76°C',
        note: '500 m acima de 1000 m = redução de 5%.',
      },
      {
        type: 'p',
        text: 'Temperatura ambiente: abaixo de -20°C → condensação e formação de gelo nos mancais (exigem lubrificante especial); acima de 40°C constante → exige isolamento especial ou redução de potência.',
      },
      {
        type: 'note',
        text: 'A tabela abaixo combina os dois efeitos num fator de multiplicação α da potência útil (ex.: 100cv, isolamento F, 2000m, 55°C → α=0,83 → o motor só pode fornecer 83% da potência nominal).',
      },
    ],
  },
  {
    slug: 'atmosfera-ip',
    numero: '3.15',
    titulo: 'Atmosfera Ambiente / Grau de Proteção (IP)',
    resumo: 'O código IPxx explicado algarismo por algarismo.',
    blocks: [
      {
        type: 'p',
        text: 'Ambientes agressivos (estaleiros, instalações portuárias, indústria naval/química/petroquímica) exigem: enrolamento duplamente impregnado, pintura anticorrosiva, placa em aço inox, elementos zincados, ventilador não faiscante, retentores de vedação, juntas de borracha, massa de calafetar, caixa de ligação em ferro fundido.',
      },
      { type: 'note', text: 'Ambientes com poeira/fibras: verificar tamanho/quantidade — podem obstruir a ventilação.' },
      {
        type: 'p',
        text: 'O código IP (NBR-IEC 60034-5) tem 2 algarismos — use o explorador abaixo para montar um código e ver o significado de cada dígito.',
      },
      {
        type: 'note',
        text: 'Graus mais usados em baixa tensão: IP21, IP22, IP23 (motores abertos) e IP44 (motor fechado); para ambientes rigorosos: IP54, IP55.',
      },
    ],
  },
  {
    slug: 'ligacoes',
    numero: '3.16',
    titulo: 'Ligação dos Motores de Indução Trifásicos',
    resumo: '6, 9 e 12 terminais — Triângulo, Estrela e a comutação Dahlander.',
    blocks: [
      { type: 'subheading', text: '6 terminais (3 bobinas, 1 por fase)' },
      {
        type: 'p',
        text: 'Ligação Triângulo (Δ) — cada bobina entre duas fases, UF = UL. Ligação Estrela (Y) — cada bobina entre fase e neutro, UL = UF·√3. Para inverter o sentido de rotação, inverte-se 2 das 3 fases de alimentação.',
      },
      { type: 'subheading', text: '9 terminais (2 bobinas por fase, já em paralelo internamente)' },
      {
        type: 'p',
        text: 'Permite ligar em UL igual à tensão de bobina ou o dobro dela, usando chave de partida Triângulo Série-Paralelo (Δ-ΔΔ) ou Estrela Série-Paralelo (Y-YY) — na partida as bobinas ficam em série (metade da tensão nos terminais → reduz a corrente de partida); em regime, ficam em paralelo.',
      },
      { type: 'subheading', text: '12 terminais (2 bobinas por fase, totalmente independentes)' },
      {
        type: 'p',
        text: 'Permite 4 tensões de linha diferentes — Triângulo Paralelo, Estrela Paralelo, Triângulo Série, Estrela Série (proporcionais a 1x, √3x, 2x e 2√3x a tensão de bobina).',
      },
      { type: 'formula', label: 'Corrente nominal', expr: 'In = Pn(cv)·736 / (√3·UL·cosφ·η)  [A]' },
      { type: 'subheading', text: 'Identificação das bobinas (6 terminais)' },
      {
        type: 'list',
        items: [
          'Continuidade: com o ohmímetro, encontre os pares de terminais de cada bobina e numere 1-4, 2-5 e 3-6.',
          'Polaridade das bobinas 1 e 2: ligue as duas em série e coloque a lâmpada (12 V) ou um voltímetro nos terminais 3-6. Se acender, a bobina 1 está invertida: troque 1 por 4. Se ficar apagada, está correta.',
          'Polaridade da bobina 3: ligue as bobinas 2 e 3 em série e coloque a lâmpada nos terminais 1-4. Se acender, troque 3 por 6 e teste de novo.',
        ],
      },
      { type: 'subheading', text: 'Motores de duas velocidades' },
      {
        type: 'list',
        items: [
          'Enrolamentos separados: um enrolamento por número de polos desejado — mais flexível, porém motor maior/mais caro.',
          'Comutação de polos (ligação Dahlander): relação de polos 1:2 (relação de rotação 1:2), obtida invertendo o sentido da corrente em parte do enrolamento. Exemplos 1:2: IV/II e VIII/IV polos. Duas variantes: conjugado (torque) constante (ligação D/YY, relação de potência ≈0,63:1) e potência constante (ligação YY/D, relação de conjugado 1:2).',
          'Mudança de número de polos em geral: a apostila lista as relações 2/4, 2/6, 2/8, 4/6, 4/8 e 6/8. Só 2/4 e 4/8 são 1:2. As demais não cabem na Dahlander clássica. Velocidades síncronas em 60Hz: 3600, 1800, 1200 e 900 rpm para 2, 4, 6 e 8 polos.',
        ],
      },
      {
        type: 'note',
        text: 'Hoje, a variação de velocidade é feita principalmente por inversor de frequência (variando tensão e frequência), mas o conceito de comutação de polos ainda aparece em aplicações específicas.',
      },
    ],
  },
  {
    slug: 'placa-identificacao',
    numero: '3.17',
    titulo: 'Placa de Identificação',
    resumo: 'Como ler cada dado da placa e o que calcular com ele.',
    blocks: [
      {
        type: 'p',
        text: 'A placa contém as características nominais e de desempenho definidas pela NBR 17094. A apostila numera 27 campos. Abaixo estão as duas placas WEG da apostila: escolha um motor, clique num número e veja o valor, o significado e como aquilo pode cair na prova.',
      },
    ],
  },
]

export function getSection(slug: string): SectionDef | undefined {
  return sections.find((sec) => sec.slug === slug)
}
