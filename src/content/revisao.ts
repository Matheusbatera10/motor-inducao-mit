// Guia de véspera: o que dizer em cada tema, com base no Cap. III.

export interface TemaRevisao {
  id: string
  titulo: string
  secao: string
  foco?: boolean
  rota: string
  umaFrase: string
  explique: string[]
  guarde: string[]
  pegadinhas: string[]
}

export const temas: TemaRevisao[] = [
  {
    id: 'placa',
    titulo: 'Dados de placa',
    secao: '3.17',
    foco: true,
    rota: '/placa-identificacao',
    umaFrase: 'A placa traz as características nominais e de desempenho do motor, definidas pela NBR 17094.',
    explique: [
      'Os dados valem para condição nominal: tensão, frequência, altitude de até 1000 m e ambiente de até 40°C.',
      'A potência da placa é a mecânica, entregue no eixo. Por isso a corrente é calculada dividindo por η e cosφ: a rede precisa fornecer mais do que o eixo entrega.',
      'A rotação da placa é a real, a plena carga. Com ela e a frequência se acham a velocidade síncrona, o número de polos e o escorregamento.',
    ],
    guarde: [
      'FS: sobrecarga permissível contínua.',
      'Ip/In: quantas vezes a corrente de partida supera a nominal.',
      'Categoria N, H ou D: forma da curva de torque.',
      'Isolamento F: ponto mais quente limitado a 155°C.',
      'Regime S1: carga constante até o equilíbrio térmico.',
      'IP55: 1º dígito para sólidos e contato, 2º para água.',
    ],
    pegadinhas: [
      '220/380 V não significa bobina de 380 V. Bobina de 220 V: Δ em 220 V e Y em 380 V.',
      'A maior corrente da placa corresponde à menor tensão.',
      '1780 rpm não é a velocidade síncrona. A síncrona é 1800 rpm.',
      'FS não é o torque máximo. FS é contínuo; Tmáx é só para picos.',
    ],
  },
  {
    id: 'escorregamento',
    titulo: 'Escorregamento',
    secao: '3.6',
    foco: true,
    rota: '/principio-operacao',
    umaFrase: 'É a diferença entre a velocidade do campo girante e a do rotor, normalmente em relação à velocidade síncrona.',
    explique: [
      'O rotor recebe energia por indução. Para haver tensão induzida, os condutores do rotor precisam ser cortados pelo campo, ou seja, precisa existir velocidade relativa.',
      'Se o rotor alcançasse ns, a velocidade relativa seria zero: sem tensão induzida, sem corrente e sem torque. Por isso o motor é assíncrono.',
      'Quando a carga aumenta, a rotação cai, s aumenta, cresce a f.e.m. induzida no rotor e também a corrente, até o torque do motor igualar o da carga.',
    ],
    guarde: [
      'Partida: n = 0, s = 1, f2 = f1.',
      'Se n = ns: s = 0, f2 = 0 (hipotético).',
      'Em carga: 0 < s < 1, e a f.e.m. do rotor tem módulo e frequência proporcionais a s.',
    ],
    pegadinhas: [
      'Use s em pu na conta: 3% é 0,03.',
      'f2 não é a frequência da rede, exceto na partida.',
      'A apostila chama de “tensão induzida” um exercício cuja resposta é em Hz. O cálculo é de frequência.',
    ],
  },
  {
    id: 'torque',
    titulo: 'Torque e a curva T × n',
    secao: '3.9',
    foco: true,
    rota: '/torque-velocidade',
    umaFrase: 'O torque é zero na velocidade síncrona e, conforme a carga aumenta, a rotação cai até o torque máximo. Passando disso, o motor perde velocidade bruscamente.',
    explique: [
      'Tp, torque de partida: é o torque com rotor bloqueado. Deve ser alto para vencer a inércia inicial da carga e acelerar rápido, principalmente com tensão reduzida.',
      'Tmín: é o menor torque entre a velocidade zero e a do torque máximo. Não pode ser muito baixo, senão a partida demora e o motor sobreaquece.',
      'Tmáx: é o maior torque sem queda brusca de velocidade, em geral 200% a 300% do nominal. Vence picos de carga e evita que o motor “arrie” em quedas de tensão, mas não pode ser entregue continuamente: as correntes destruiriam a isolação.',
      'Tn: é o torque na potência nominal, sob tensão e frequência nominais. O motor opera no trecho quase reto à direita de Tmáx, entre Tn e ns.',
    ],
    guarde: [
      'Lendo a curva da esquerda para a direita: Tp → Tmín → Tmáx → Tn → zero em ns.',
      'A faixa entre nr e ns no eixo é o escorregamento.',
      'Exemplos de picos: britadores, calandras, misturadores.',
      'Tensão reduzida: o torque cai com o quadrado da tensão.',
    ],
    pegadinhas: [
      'Tp é definido como o mínimo entre todas as posições angulares do rotor bloqueado.',
      'Tmín não é zero nem o torque nominal: é o vale da aceleração.',
      'Passar de Tmáx não aumenta o torque: a rotação cai e o rotor pode travar.',
    ],
  },
  {
    id: 'categorias',
    titulo: 'Categorias N, H e D',
    secao: '3.10',
    foco: true,
    rota: '/torque-velocidade',
    umaFrase: 'Classificam os motores de gaiola pela característica de torque × velocidade e pela corrente de partida (NBR 17094).',
    explique: [
      'N: torque e corrente de partida normais, baixo escorregamento. É a maioria do mercado: bombas e máquinas operatrizes.',
      'H: torque de partida alto, corrente de partida baixa, baixo escorregamento. Peneiras, transportadores carregados e cargas de alta inércia.',
      'D: torque de partida alto, corrente de partida baixa, alto escorregamento (mais de 5%). Prensas excêntricas e cargas com picos periódicos.',
    ],
    guarde: [
      'Na Figura 3.10, a N parte em cerca de 150%, com vale marcado.',
      'A H parte em cerca de 215%, com pico em cerca de 255%.',
      'A D parte em cerca de 250% e só cai, sem vale.',
      'Motores de anéis não se enquadram nessas categorias.',
    ],
    pegadinhas: [
      'H e D diferem principalmente pelo escorregamento: baixo em H e alto em D.',
      'Na prova, siga a apostila: corrente de partida baixa em H e D. Alguns catálogos dizem “normal”.',
    ],
  },
  {
    id: 'construcao',
    titulo: 'Construção e tipos de rotor',
    secao: '3.1 e 3.2',
    rota: '/partes-construtivas',
    umaFrase: 'Máquina de excitação única: a fonte é ligada só ao estator e a energia chega ao rotor por indução.',
    explique: [
      'Carcaça: suporta o conjunto, em geral de ferro fundido com aletas para dissipar calor.',
      'Estator: núcleo de chapas magnéticas com ranhuras axiais que alojam o enrolamento. As chapas reduzem perdas e melhoram o rendimento.',
      'Gaiola: barras de alumínio curto-circuitadas por anéis, sem terminal acessível e sem isolação entre barras e chapas. Robusto e o mais comum.',
      'Bobinado: enrolamento geralmente trifásico de cobre, com anéis coletores e escovas. Mais caro e menos robusto, mas permite controlar torque e velocidade, com torque de partida mais elevado.',
    ],
    guarde: [
      'MIT: cerca de 25% da carga elétrica do Brasil.',
      'A forma da ranhura do rotor influencia a curva de torque.',
      'Velocidade quase constante e sempre menor que a síncrona.',
    ],
    pegadinhas: ['Não há contato elétrico com o rotor em operação normal: isso reduz custo e manutenção.'],
  },
  {
    id: 'campo',
    titulo: 'Campo girante e princípio de operação',
    secao: '3.3 a 3.5',
    rota: '/campo-girante',
    umaFrase: 'Correntes trifásicas equilibradas em enrolamentos defasados 120° no espaço criam um campo de amplitude e velocidade constantes.',
    explique: [
      'As fases estão deslocadas 120° elétricos no espaço e as correntes 120° no tempo. A soma das contribuições gera um fluxo resultante de módulo 3/2·φm.',
      'A cada 90° elétricos no tempo, o fluxo gira 90° elétricos no espaço. Em uma máquina de 2 polos, cada ciclo da corrente é uma volta do campo.',
      'O campo girante induz tensão nos condutores do rotor. Como eles formam caminhos fechados, circula corrente. Corrente dentro do campo gera força, e o torque aparece no sentido do campo. Se for maior que o torque resistente, o motor parte.',
    ],
    guarde: ['ns = 120·f/p depende só de f e p.', 'Inverter duas fases inverte o sentido de rotação.', 'Duas condições para q fases: deslocamento de 2π/q no espaço e no tempo.'],
    pegadinhas: ['A máquina de duas fases é exceção: usa-se q = 4.', 'Um par de polos corresponde a 360° elétricos, não um polo.'],
  },
  {
    id: 'circuito',
    titulo: 'Circuito equivalente e potências',
    secao: '3.7 e 3.8',
    rota: '/circuito-equivalente',
    umaFrase: 'O circuito é igual ao do transformador. A diferença está no módulo dos parâmetros, causada pelo entreferro.',
    explique: [
      'Rs e Xls: estator. Rc: perdas no núcleo. Xm: magnetização. Xlr e Rr: rotor. (1−s)Rr/s: resistência fictícia cuja potência é a convertida em mecânica.',
      'A corrente de magnetização é de 25% a 40% da nominal, contra 2% a 5% no transformador, porque o circuito magnético inclui um entreferro.',
      'Fluxo: entrada → perdas no núcleo e no cobre do estator → entreferro → perdas no cobre do rotor → potência mecânica → perdas rotacionais → saída no eixo.',
    ],
    guarde: ['Pcu,r = s·Pag e Pmec = (1−s)·Pag.', 'Na partida, s = 1 e a resistência fictícia é zero: não há potência mecânica.', 'Dispersão maior: entreferro e enrolamentos distribuídos.'],
    pegadinhas: ['Perdas rotacionais vêm depois da potência mecânica gerada, não antes.', 'Rr/s é a potência toda do rotor; (1−s)Rr/s é só a parte mecânica.'],
  },
  {
    id: 'servico',
    titulo: 'Fator de serviço e regimes',
    secao: '3.11 e 3.12',
    rota: '/regimes-servico',
    umaFrase: 'FS é a reserva de potência contínua. O regime é a regularidade de carga a que o motor é submetido.',
    explique: [
      'S1: carga constante até o equilíbrio térmico. S2: carga por tempo menor que o do equilíbrio, seguida de repouso até igualar a temperatura com o meio refrigerante.',
      'S3: carga e repouso. S4: acrescenta partida. S5: acrescenta frenagem elétrica. Períodos curtos demais para o equilíbrio térmico.',
      'S6: carga e vazio. S7: partida, carga e frenagem. S8: várias cargas e velocidades. Nenhum dos três tem repouso.',
      'S9: variações não periódicas, com sobrecargas. S10: no máximo 4 cargas distintas, cada uma até o equilíbrio térmico.',
    ],
    guarde: ['ED é a fração do ciclo em que o motor está solicitado.', 'S7 tem ED = 100%.', 'FS 1,15 = 15% de sobrecarga contínua.'],
    pegadinhas: ['S2 não é ciclo repetitivo: o repouso é longo o bastante para esfriar totalmente.', 'S6 tem vazio, não repouso: o motor continua girando.'],
  },
  {
    id: 'termico',
    titulo: 'Aquecimento, isolamento e proteção',
    secao: '3.13',
    rota: '/termico',
    umaFrase: 'A vida útil do motor depende quase só da isolação, e o fator mais importante é a temperatura de trabalho.',
    explique: [
      'As perdas viram calor. Ele deve sair pela carcaça, e uma boa dissipação depende da ventilação, da área de dissipação com aletas e da diferença de temperatura entre carcaça e ar.',
      'Queda interna: do ponto mais quente na ranhura, passando pelo isolamento, chapas, contato com a carcaça e espessura da carcaça. Reduzir essa queda deixa mais queda externa, a que de fato dissipa o calor.',
      'Medir com a mão é errado: um motor frio por fora pode ter enrolamento mais quente que um motor quente por fora.',
      'Proteções: PT-100 (leitura contínua, resistência linear, alto custo), PTC (resistência sobe bruscamente e aciona relé, sem leitura contínua), termostato (bimetálico NF) e fenólico (bimetálico em série, principalmente monofásicos).',
    ],
    guarde: ['A 105, E 120, B 130, F 155, H 180 °C.', '+8 a 10°C = metade da vida útil.', 'O limite vale para o ponto mais quente: basta um ponto fraco para inutilizar o enrolamento.'],
    pegadinhas: [
      'Vida útil é envelhecimento gradual do isolante, não queima.',
      'A apostila cita diferença de 15°C para a classe F no texto, mas a Tabela 3.3 usa 10°C. Use a tabela: 40 + 105 + 10 = 155.',
      'NTC não é o usual em motores: os circuitos disponíveis são para PTC.',
    ],
  },
  {
    id: 'ambiente',
    titulo: 'Ambiente e grau de proteção',
    secao: '3.14 e 3.15',
    rota: '/ambiente',
    umaFrase: 'A potência admissível depende da altitude e da temperatura do meio refrigerante.',
    explique: [
      'Condição usual: até 1000 m e até 40°C. Nesses limites, o motor entrega a potência nominal sem sobreaquecer.',
      'Acima de 1000 m, o ar rarefeito refrigera menos. Soluções: isolamento de classe superior, FS maior que 1,0 usando só a potência nominal, ou reduzir a elevação de temperatura em 1% a cada 100 m.',
      'Abaixo de −20°C: condensação e gelo nos mancais. Acima de 40°C: isolamento especial ou redução de potência.',
      'IP: 1º algarismo para sólidos e contato, 2º para água. Abertos: IP21, IP22, IP23. Fechado: IP44. Rigorosos: IP54 (muita poeira) e IP55 (lavagem com mangueira).',
    ],
    guarde: ["P' = α·Pn, com α da Tabela 3.4.", 'Grau maior satisfaz os inferiores: IP44 substitui IP21, IP22 e IP23.', 'Ambiente agressivo: dupla impregnação, pintura anticorrosiva, placa inox.'],
    pegadinhas: ['α pode ser igual a 1 mesmo acima de 1000 m, se o ambiente for mais frio.', 'No IP, o 1º dígito não fala de água.'],
  },
  {
    id: 'ligacoes',
    titulo: 'Ligações e duas velocidades',
    secao: '3.16',
    rota: '/ligacoes',
    umaFrase: 'A ligação adapta a tensão de cada bobina à tensão de linha da rede.',
    explique: [
      '6 terminais (3 bobinas): Δ com bobina entre fases, Ub = UL; Y com bobina entre fase e neutro, UL = √3·Ub.',
      '9 terminais: UL igual a Ub ou 2·Ub, em chaves série-paralelo. Na partida, as bobinas em série recebem metade da tensão, reduzindo a corrente de partida.',
      '12 terminais (6 bobinas): 220, 380, 440 e 760 V para bobina de 220 V. A de 760 V é só demonstrativa.',
      'Dahlander: mesma bobina, relação de polos e rotação de 1:2, invertendo a corrente em parte do enrolamento. D/YY: conjugado constante, potência 0,63:1. YY/D: potência constante, conjugado 1:2.',
      'Identificação: ohmímetro para achar os pares 1-4, 2-5 e 3-6; depois, duas bobinas em série e lâmpada de 12 V na terceira. Se acender, a polaridade está invertida.',
    ],
    guarde: ['Inverter duas fases inverte a rotação.', 'Enrolamentos separados: qualquer combinação de polos, carcaça maior.', 'Hoje a variação de velocidade é feita com inversor de frequência.'],
    pegadinhas: ['A Dahlander é sempre 1:2. A lista 2/6, 4/6, 6/8 da apostila é de mudança de polos em geral.', 'Em Y, a tensão na bobina é UL/√3, não UL.'],
  },
]

export const flashcards: { frente: string; verso: string }[] = [
  { frente: 'Por que o MIT é assíncrono?', verso: 'Em ns não há velocidade relativa, logo não há tensão induzida nem torque. Ele sempre gira abaixo de ns.' },
  { frente: 'De que depende ns?', verso: 'Só da frequência e do número de polos: ns = 120·f/p.' },
  { frente: 's na partida e em ns?', verso: 'Partida: s = 1 e f2 = f1. Em ns: s = 0 e f2 = 0.' },
  { frente: 'O que é a resistência fictícia?', verso: '(1−s)Rr/s. Não existe fisicamente; sua potência é a convertida em mecânica.' },
  { frente: 'Por que Im é tão alta no MIT?', verso: 'Pelo entreferro: 25% a 40% da nominal, contra 2% a 5% no transformador.' },
  { frente: 'Por que Tmáx não pode ser contínuo?', verso: 'As correntes excessivas destruiriam a isolação.' },
  { frente: 'Por que Tmín não pode ser baixo?', verso: 'A partida ficaria demorada e o motor sobreaqueceria.' },
  { frente: 'Valor usual de Tmáx?', verso: '200% a 300% do torque nominal.' },
  { frente: 'Categoria N', verso: 'Tp normal, Ip normal, s baixo. Bombas e máquinas operatrizes.' },
  { frente: 'Categoria H', verso: 'Tp alto, Ip baixa, s baixo. Peneiras, transportadores carregados, alta inércia.' },
  { frente: 'Categoria D', verso: 'Tp alto, Ip baixa, s alto (mais de 5%). Prensas excêntricas.' },
  { frente: 'O que significa FS = 1,15?', verso: 'O motor suporta continuamente 15% de sobrecarga acima da potência nominal.' },
  { frente: 'S1 × S2', verso: 'S1 alcança o equilíbrio térmico. S2 não alcança e depois repousa até esfriar.' },
  { frente: 'Limites das classes', verso: 'A 105, E 120, B 130, F 155, H 180 °C.' },
  { frente: 'Efeito de +8 a 10°C', verso: 'A vida útil da isolação cai pela metade.' },
  { frente: 'PT-100 × PTC', verso: 'PT-100: leitura contínua, linear, caro. PTC: atua bruscamente com relé, barato, sem leitura contínua.' },
  { frente: 'Condições usuais', verso: 'Até 1000 m e até 40°C (NBR 17094).' },
  { frente: 'Altitude acima de 1000 m', verso: 'Reduzir Δt em 1% a cada 100 m. O ar rarefeito refrigera menos.' },
  { frente: 'Os dois dígitos do IP', verso: '1º: sólidos e contato. 2º: água. IP55 suporta jatos de água.' },
  { frente: 'Δ × Y', verso: 'Δ: Ub = UL. Y: UL = √3·Ub.' },
  { frente: 'Como inverter a rotação?', verso: 'Trocar duas das três fases.' },
  { frente: 'Dahlander', verso: 'Relação 1:2 de polos e rotação, invertendo a corrente em parte do enrolamento.' },
  { frente: 'Rotor bobinado: quando usar?', verso: 'Para controlar torque e velocidade ou obter torque de partida elevado.' },
  { frente: 'Fluxo de potência em ordem', verso: 'Entrada → núcleo e cobre do estator → entreferro → cobre do rotor → mecânica → rotacionais → eixo.' },
]

export const roteiro = [
  { titulo: 'Guia dos 4 temas de foco', desc: 'Placa, escorregamento, torque e categorias. Leia e diga em voz alta o “Como explicar”.', to: '/revisao' },
  { titulo: 'Fórmulas', desc: 'O professor coloca as fórmulas na prova: treine reconhecer cada uma e saber o que cada letra significa.', to: '/formulas' },
  { titulo: 'Questões de cálculo', desc: 'Faça no papel antes de abrir a resolução.', to: '/questoes?tipo=calculo' },
  { titulo: 'Discursivas', desc: 'Escreva a resposta com suas palavras e só depois compare com a resposta modelo.', to: '/questoes?tipo=discursiva' },
  { titulo: 'Questões de marcar', desc: 'Use para achar os pontos fracos e volte só nas marcadas para revisar.', to: '/questoes?tipo=marcar' },
]
