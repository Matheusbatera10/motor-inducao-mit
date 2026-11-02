// Banco de questões de revisão, feito a partir do Cap. III.
// origem 'apostila' = exercício proposto na própria apostila. As demais são inéditas.

export const TEMAS = {
  construcao: 'Construção',
  campo: 'Campo e operação',
  escorregamento: 'Escorregamento',
  circuito: 'Circuito e potência',
  torque: 'Torque e curvas',
  categorias: 'Categorias',
  servico: 'FS e regimes',
  termico: 'Térmico',
  ambiente: 'Ambiente e IP',
  ligacoes: 'Ligações',
  placa: 'Placa',
} as const

export type Tema = keyof typeof TEMAS

export interface Discursiva {
  id: string
  tema: Tema
  pergunta: string
  resposta: string
  pontos: string[]
}

export interface Marcar {
  id: string
  tema: Tema
  pergunta: string
  opcoes: string[]
  correta: number
  explicacao: string
}

export interface Calculo {
  id: string
  tema: Tema
  enunciado: string
  formula: string
  passos: string[]
  resposta: string
  origem?: 'apostila'
}

export const discursivas: Discursiva[] = [
  {
    id: 'd-esc-1',
    tema: 'escorregamento',
    pergunta: 'O que é escorregamento e por que ele sempre existe no motor de indução operando como motor?',
    resposta:
      'Escorregamento é a diferença entre a velocidade do campo girante (ns) e a velocidade do rotor (n), geralmente em pu da velocidade síncrona: s = (ns − n)/ns. Ele sempre existe porque a corrente do rotor é produzida por indução. Para haver tensão induzida, os condutores do rotor precisam ser cortados pelo campo, ou seja, precisa haver velocidade relativa. Se o rotor alcançasse ns, a velocidade relativa seria nula: não haveria tensão induzida, corrente nem torque.',
    pontos: ['Definição com a fórmula', 'Corrente do rotor vem de indução', 'Precisa de velocidade relativa', 'Em ns o torque seria zero'],
  },
  {
    id: 'd-esc-2',
    tema: 'escorregamento',
    pergunta: 'Explique o que acontece com a frequência da corrente do rotor desde a partida até a operação em carga.',
    resposta:
      'A frequência do rotor é f2 = s·f1. Na partida, o rotor está parado, s = 1, e o campo corta os condutores na velocidade síncrona, então f2 é igual à frequência da rede. À medida que o rotor acelera, a velocidade relativa diminui, s cai e f2 também. Em carga, s é pequeno e f2 fica com poucos hertz: por exemplo, com s = 5% em 60 Hz, f2 = 3 Hz. Na velocidade síncrona, f2 seria zero.',
    pontos: ['f2 = s·f1', 'Partida: f2 = f1', 'Diminui com a aceleração', 'Em carga, poucos Hz'],
  },
  {
    id: 'd-esc-3',
    tema: 'escorregamento',
    pergunta: 'Quando a carga no eixo aumenta, o que acontece com a rotação, o escorregamento, a corrente e o torque do motor? Explique a sequência.',
    resposta:
      'Com mais carga, o torque resistente supera o torque do motor e o rotor desacelera. A rotação cai e o escorregamento aumenta. Com maior velocidade relativa, aumenta a f.e.m. induzida no rotor e, com ela, a corrente. O torque do motor cresce até igualar o torque da carga, e a rotação se estabiliza em um valor um pouco menor. Isso vale até o torque máximo: acima dele, a rotação cai bruscamente.',
    pontos: ['Rotação cai', 's aumenta', 'f.e.m. e corrente do rotor aumentam', 'Novo equilíbrio de torque', 'Limite: Tmáx'],
  },
  {
    id: 'd-campo-1',
    tema: 'campo',
    pergunta: 'Como é produzido o campo magnético girante em um motor de indução trifásico? Quais são suas duas características?',
    resposta:
      'É produzido aplicando correntes trifásicas, defasadas 120° elétricos no tempo, a enrolamentos deslocados 120° elétricos no espaço. Cada fase cria uma contribuição de fluxo na direção do seu eixo, e a soma vetorial resulta em um fluxo de módulo 3/2 do fluxo máximo de uma fase. A cada 90° elétricos no tempo, esse fluxo gira 90° elétricos no espaço. As duas características são amplitude constante e velocidade constante, a velocidade síncrona ns = 120·f/p.',
    pontos: ['120° no espaço e no tempo', 'Soma vetorial: 3/2·φm', 'Amplitude constante', 'Velocidade constante, ns'],
  },
  {
    id: 'd-campo-2',
    tema: 'campo',
    pergunta: 'Descreva o princípio de funcionamento do motor de indução trifásico, da energização do estator até o movimento do rotor.',
    resposta:
      'Ao ligar o estator a um sistema trifásico equilibrado, forma-se o campo girante. Nesse instante, a velocidade relativa entre o campo e o rotor é a própria velocidade síncrona. O campo induz tensões nos condutores do rotor e, como eles formam caminhos fechados, circula corrente. Essa corrente, imersa no campo, gera força e um torque sobre o rotor no sentido do campo girante. Se esse torque for maior que o torque resistente, o motor parte. A energia passa do estator ao rotor de forma indutiva, sem conexão elétrica.',
    pontos: ['Campo girante', 'Tensão induzida no rotor', 'Corrente em caminho fechado', 'Torque no sentido do campo', 'Tmotor > Tresistente', 'Sem conexão elétrica'],
  },
  {
    id: 'd-con-1',
    tema: 'construcao',
    pergunta: 'Compare o rotor em gaiola de esquilo com o rotor bobinado. Quando o bobinado é preferível?',
    resposta:
      'A gaiola tem barras de alumínio curto-circuitadas por anéis nas extremidades, sem terminais acessíveis e sem isolação entre barras e chapas. É robusta e a mais comum. O bobinado tem enrolamento geralmente trifásico de cobre, com terminais ligados a anéis coletores e escovas acessíveis externamente. É mais caro e menos robusto. O bobinado é preferível quando se deseja controlar as características de torque e velocidade ou quando o processo exige torque de partida mais elevado.',
    pontos: ['Gaiola: barras e anéis, sem acesso', 'Bobinado: anéis coletores e escovas', 'Custo e robustez', 'Controle e torque de partida'],
  },
  {
    id: 'd-con-2',
    tema: 'construcao',
    pergunta: 'Por que o estator é feito de chapas magnéticas e por que se diz que o MIT é uma máquina de excitação única?',
    resposta:
      'As chapas magnéticas são usadas para reduzir perdas e melhorar o rendimento. Além disso, as ranhuras alojam o enrolamento, diminuem o entreferro efetivo e a corrente de magnetização, e ajudam a transmitir calor para fora. O MIT é de excitação única porque, em operação normal, a fonte é conectada só ao enrolamento do estator. O rotor recebe energia por indução, sem contato elétrico, o que reduz custo e manutenção.',
    pontos: ['Chapas reduzem perdas', 'Melhoram o rendimento', 'Fonte só no estator', 'Rotor por indução'],
  },
  {
    id: 'd-cir-1',
    tema: 'circuito',
    pergunta: 'Explique o significado de cada elemento do circuito equivalente do motor de indução.',
    resposta:
      'Vas é a tensão aplicada à fase, e E1 é a força contraeletromotriz. Rs e Xls são a resistência e a reatância de dispersão do estator. Xm é a reatância de magnetização, e Rc representa as perdas no núcleo, por histerese e Foucault. Xlr e Rr são a reatância de dispersão e a resistência do rotor. (1−s)Rr/s é uma resistência fictícia cuja potência corresponde à convertida em mecânica. Rr somada a ela dá Rr/s, que representa toda a potência manipulada pelo rotor.',
    pontos: ['Ramo do estator: Rs, Xls', 'Magnetização: Xm, Rc', 'Ramo do rotor: Xlr, Rr', 'Resistência fictícia = potência mecânica'],
  },
  {
    id: 'd-cir-2',
    tema: 'circuito',
    pergunta: 'Compare o motor de indução com o transformador. Por que a corrente de magnetização do motor é muito maior?',
    resposta:
      'O circuito equivalente é o mesmo: uma única fonte e enlaces de fluxo variáveis entre os enrolamentos. A diferença está no módulo dos parâmetros. A corrente de magnetização do motor é de 25% a 40% da nominal, contra 2% a 5% no transformador, porque o circuito magnético do motor inclui necessariamente um entreferro. A reatância de dispersão também é maior, pelo entreferro e porque os enrolamentos são distribuídos ao longo da periferia, e não concentrados em um núcleo.',
    pontos: ['Mesmo circuito, parâmetros diferentes', '25-40% contra 2-5%', 'Causa: entreferro', 'Dispersão maior: enrolamentos distribuídos'],
  },
  {
    id: 'd-cir-3',
    tema: 'circuito',
    pergunta: 'Descreva o fluxo de potência no motor de indução, da entrada elétrica até a saída no eixo.',
    resposta:
      'A potência elétrica de entrada sofre as perdas no núcleo e no cobre do estator. O restante é transferido através do entreferro, sendo a potência de entrada no rotor. Dela saem as perdas no cobre do rotor, e o que sobra é a potência mecânica gerada. Por fim, descontam-se as perdas rotacionais, de atrito nos mancais e ventilação, resultando na potência mecânica de saída no eixo. Como há perdas em todas as etapas, o rendimento é sempre menor que 100% e a diferença vira calor.',
    pontos: ['Perdas no núcleo e no cobre do estator', 'Potência no entreferro', 'Perdas no cobre do rotor', 'Mecânica gerada', 'Rotacionais', 'Saída no eixo'],
  },
  {
    id: 'd-cir-4',
    tema: 'circuito',
    pergunta: 'Por que um motor operando com escorregamento alto tem baixo rendimento e aquece mais?',
    resposta:
      'Porque as perdas no cobre do rotor são proporcionais ao escorregamento: Pcu,r = s·Pag. Da potência que atravessa o entreferro, só a parte (1−s) vira potência mecânica. Com s alto, uma parcela maior vira calor no rotor em vez de trabalho no eixo. Na partida, com s = 1, praticamente toda a potência do entreferro é dissipada no rotor, por isso partidas longas ou repetidas aquecem o motor.',
    pontos: ['Pcu,r = s·Pag', 'Pmec = (1−s)·Pag', 'Mais s, mais calor no rotor', 'Partida: s = 1'],
  },
  {
    id: 'd-tor-1',
    tema: 'torque',
    pergunta: 'Desenhe e explique a curva torque × velocidade, definindo Tp, Tmín, Tmáx e Tn.',
    resposta:
      'No eixo vertical fica o torque e no horizontal a velocidade, de zero a ns. A curva começa em Tp, o torque com rotor bloqueado, cai até Tmín, sobe até Tmáx e desce rapidamente até zero em ns, passando por Tn perto de ns. Tp é o torque mínimo com rotor bloqueado em todas as posições angulares, sob tensão e frequência nominais. Tmín é o menor torque ao acelerar da velocidade zero até a de Tmáx. Tmáx é o maior torque sem queda brusca de velocidade. Tn é o torque na potência nominal, ao qual corresponde a rotação nominal nr. A distância entre nr e ns é o escorregamento.',
    pontos: ['Eixos corretos', 'Ordem: Tp, Tmín, Tmáx, Tn, zero em ns', 'As 4 definições', 'Escorregamento entre nr e ns'],
  },
  {
    id: 'd-tor-2',
    tema: 'torque',
    pergunta: 'Por que o torque de partida e o torque máximo devem ser altos? E por que Tmín não pode ser muito baixo?',
    resposta:
      'Tp deve ser alto para que o rotor vença a inércia inicial da carga e a acelere rapidamente, principalmente com tensão reduzida. Tmáx deve ser alto para vencer picos de carga, como em britadores, calandras e misturadores, e para o motor não “arriar” em quedas momentâneas de tensão. Tmín não pode ser muito baixo porque uma depressão acentuada na curva torna a partida demorada e sobreaquece o motor, especialmente com alta inércia ou tensão reduzida.',
    pontos: ['Tp: vencer a inércia', 'Tmáx: picos e quedas de tensão', 'Tmín: evitar partida longa e aquecimento'],
  },
  {
    id: 'd-tor-3',
    tema: 'torque',
    pergunta: 'O que acontece se o torque da carga ultrapassar o torque máximo? O motor pode trabalhar continuamente em Tmáx?',
    resposta:
      'Se a carga ultrapassar Tmáx, a rotação cai bruscamente e o rotor pode travar. Ao passar do pico, o torque do motor diminui com a queda de rotação, então ele não consegue mais igualar a carga. Trabalhar continuamente em Tmáx não é possível, porque as correntes excessivas destruiriam a isolação. O Tmáx serve só para picos momentâneos.',
    pontos: ['Queda brusca, pode travar', 'Após o pico, o torque diminui', 'Correntes excessivas', 'Destruição da isolação'],
  },
  {
    id: 'd-tor-4',
    tema: 'torque',
    pergunta: 'Qual o efeito da tensão aplicada sobre o torque? Por que isso importa na partida com tensão reduzida?',
    resposta:
      'O torque é proporcional ao quadrado da tensão. Reduzindo a tensão a 80%, o torque cai a 64%. Métodos de partida com tensão reduzida diminuem a corrente de partida, mas também derrubam o Tp e o Tmín. Se o torque resultante ficar abaixo do torque da carga, o motor não parte, ou a aceleração fica demorada, sobreaquecendo o motor. Por isso, é preciso verificar o torque disponível antes de escolher o método.',
    pontos: ['T proporcional a V²', 'Reduz corrente e torque', 'Pode não partir', 'Partida longa aquece'],
  },
  {
    id: 'd-cat-1',
    tema: 'categorias',
    pergunta: 'Explique as categorias N, H e D, com característica e aplicação de cada uma.',
    resposta:
      'As categorias são definidas pela NBR 17094 para motores de gaiola. N: torque de partida normal, corrente de partida normal e baixo escorregamento; é a maioria do mercado, para cargas normais como bombas e máquinas operatrizes. H: torque de partida alto, corrente de partida baixa e baixo escorregamento; para peneiras, transportadores carregados e cargas de alta inércia. D: torque de partida alto, corrente de partida baixa e alto escorregamento, acima de 5%; para prensas excêntricas e cargas com picos periódicos.',
    pontos: ['N: normal, bombas', 'H: Tp alto, s baixo, peneiras', 'D: Tp alto, s alto, prensas', 'NBR 17094, rotor de gaiola'],
  },
  {
    id: 'd-cat-2',
    tema: 'categorias',
    pergunta: 'Compare o formato das curvas das categorias N, H e D. Por que a D é adequada a cargas com picos periódicos?',
    resposta:
      'A N parte em torno de 150%, tem um vale e depois sobe ao máximo. A H parte mais alto, em torno de 215%, com vale pouco acentuado e pico em torno de 255%. A D parte em torno de 250% e o torque só diminui até ns, sem vale, com alto escorregamento. Nos picos periódicos, como em prensas excêntricas, o alto escorregamento permite que a rotação caia sem grande perda de torque disponível. (A explicação sobre a queda de rotação é um complemento à apostila.)',
    pontos: ['N com vale', 'H mais alta', 'D sem vale', 'Alto escorregamento'],
  },
  {
    id: 'd-ser-1',
    tema: 'servico',
    pergunta: 'O que é fator de serviço? Qual a diferença entre usar o FS e o torque máximo?',
    resposta:
      'Fator de serviço é uma reserva de potência que dá ao motor condições de funcionar em situações desfavoráveis. Ele indica a sobrecarga permissível aplicada continuamente, sob condições especificadas. Com FS = 1,15, o motor suporta continuamente 15% acima da potência nominal. A diferença é que o FS é contínuo, enquanto o Tmáx é um limite para picos momentâneos: entregá-lo continuamente destruiria a isolação.',
    pontos: ['Reserva de potência', 'Sobrecarga contínua', 'Exemplo 1,15', 'FS contínuo, Tmáx momentâneo'],
  },
  {
    id: 'd-ser-2',
    tema: 'servico',
    pergunta: 'Diferencie os regimes S1, S2 e S3.',
    resposta:
      'Regime é a regularidade de carga a que o motor é submetido. S1 é contínuo: carga constante por tempo suficiente para alcançar o equilíbrio térmico. S2 é de tempo limitado: carga constante por tempo inferior ao necessário para o equilíbrio, seguida de repouso até igualar a temperatura com o meio refrigerante. S3 é intermitente periódico: ciclos idênticos de carga e repouso, curtos demais para alcançar o equilíbrio térmico em um ciclo, e a corrente de partida não afeta significativamente a elevação de temperatura.',
    pontos: ['S1: equilíbrio térmico', 'S2: repouso até esfriar', 'S3: ciclos sem equilíbrio', 'Corrente de partida pouco importa em S3'],
  },
  {
    id: 'd-ser-3',
    tema: 'servico',
    pergunta: 'O que é o fator de duração do ciclo? Por que em S7 ele vale 100%?',
    resposta:
      'O fator de duração do ciclo (ED) é a relação, em %, entre o tempo em que o motor fica solicitado e o tempo total do ciclo. No S3, por exemplo, ED = tN/(tN+tR). No S7, o ciclo tem partida, carga constante e frenagem elétrica, e não existe período de repouso. Como não há tempo parado no denominador, o motor está solicitado durante todo o ciclo e o ED é 100%.',
    pontos: ['Solicitado ÷ total', 'S7: partida, carga, frenagem', 'Sem repouso', 'ED = 100%'],
  },
  {
    id: 'd-ter-1',
    tema: 'termico',
    pergunta: 'Por que a temperatura é o fator mais importante para a vida útil do motor? O que significa “vida útil” nesse contexto?',
    resposta:
      'O motor é robusto e de construção simples, então sua vida útil depende quase exclusivamente da isolação dos enrolamentos. Entre os fatores que a afetam, como umidade e vibração, o mais importante é a temperatura de trabalho: um aumento de 8 a 10°C reduz a vida útil pela metade. Vida útil não se refere à queima repentina, mas ao envelhecimento gradual do isolante, que resseca e perde o poder isolante até não suportar a tensão e produzir o curto-circuito.',
    pontos: ['Depende da isolação', '+8 a 10°C = metade', 'Envelhecimento gradual', 'Não é queima imediata'],
  },
  {
    id: 'd-ter-2',
    tema: 'termico',
    pergunta: 'O que define uma classe de isolamento? Como se compõe a temperatura do ponto mais quente?',
    resposta:
      'A classe de isolamento é definida pelo limite de temperatura, a maior temperatura que o material suporta continuamente sem afetar a vida útil: A 105°C, E 120°C, B 130°C, F 155°C e H 180°C. As classes B e F são as mais comuns. A temperatura do ponto mais quente é a soma da temperatura ambiente (no máximo 40°C), da elevação de temperatura Δt e da diferença entre o ponto mais quente e a média do enrolamento. Na classe B: 40 + 80 + 10 = 130°C.',
    pontos: ['Limite contínuo sem afetar a vida útil', 'Os 5 limites', 'Ambiente + Δt + diferença', 'Exemplo com números'],
  },
  {
    id: 'd-ter-3',
    tema: 'termico',
    pergunta: 'Medir a temperatura da carcaça com a mão indica o aquecimento do motor? Justifique.',
    resposta:
      'Não. Esse método é completamente errado para motores modernos. Os projetos atuais aprimoram a transmissão de calor interna para que o enrolamento fique pouco acima da temperatura da carcaça, onde o calor de fato é dissipado. Assim, a temperatura da carcaça não indica o aquecimento interno nem a qualidade do motor. Um motor frio por fora pode ter perdas maiores e enrolamento mais quente do que um motor quente por fora, justamente por transferir mal o calor.',
    pontos: ['Não indica', 'Transmissão de calor interna', 'Frio por fora pode estar mais quente por dentro'],
  },
  {
    id: 'd-ter-4',
    tema: 'termico',
    pergunta: 'Compare PT-100, termistor PTC e termostato bimetálico como proteções térmicas.',
    resposta:
      'O PT-100 tem resistência calibrada que varia linearmente com a temperatura, permitindo acompanhamento contínuo com alta precisão, e o mesmo sensor serve para alarme e desligamento; a desvantagem é o alto custo. O PTC é um semicondutor cuja resistência sobe bruscamente em uma temperatura definida, interrompendo a corrente e acionando um relé; é pequeno, rápido e barato, mas não permite acompanhamento contínuo. O termostato é um bimetálico com contatos normalmente fechados, que abrem ao atingir a temperatura e fecham ao esfriar, instalado nas cabeças de bobina e ligado em série com a bobina do contator.',
    pontos: ['PT-100: contínuo, linear, caro', 'PTC: brusco, relé, sem leitura contínua', 'Termostato: bimetálico NF', 'Alarme e desligamento'],
  },
  {
    id: 'd-ter-5',
    tema: 'termico',
    pergunta: 'De que depende uma boa dissipação de calor no motor? Por que se busca reduzir a queda interna de temperatura?',
    resposta:
      'Depende da eficiência da ventilação, que deve “varrer” toda a carcaça; da área total de dissipação, ampliada pelas aletas; e da diferença de temperatura entre a superfície da carcaça e o ar. Busca-se reduzir a queda interna, melhorando a transferência de calor com bobinas compactas, boa impregnação e bom contato entre chapas e carcaça, porque assim sobra uma queda externa maior, e é ela que realmente dissipa o calor.',
    pontos: ['Ventilação', 'Área e aletas', 'Diferença carcaça-ar', 'Queda externa é a que dissipa'],
  },
  {
    id: 'd-amb-1',
    tema: 'ambiente',
    pergunta: 'Por que a altitude reduz a potência útil do motor? Quais são as soluções para operar acima de 1000 m?',
    resposta:
      'Acima de 1000 m o ar é rarefeito e refrigera menos. A troca de calor insuficiente exige reduzir as perdas, o que significa reduzir a potência. As soluções são: usar material isolante de classe superior; usar motor com fator de serviço maior que 1,0, solicitando só a potência nominal; ou reduzir os limites de elevação de temperatura em 1% a cada 100 m acima de 1000 m, conforme a NBR 17094.',
    pontos: ['Ar rarefeito', 'Menos refrigeração', 'Classe superior', 'FS > 1', 'Reduzir Δt em 1% a cada 100 m'],
  },
  {
    id: 'd-amb-2',
    tema: 'ambiente',
    pergunta: 'Explique o código IP. O que significa IP55 e por que um IP44 pode substituir um IP23?',
    resposta:
      'O código IP, da ABNT NBR-IEC 60034-5, tem dois algarismos: o primeiro indica proteção contra corpos sólidos e contato acidental, e o segundo contra penetração de água. IP55 significa proteção contra acúmulo de poeiras nocivas e contra jatos de água, comum onde há lavagem com mangueira. Um IP44 substitui um IP23 porque qualquer grau de proteção satisfaz os graus inferiores, ou seja, de algarismos mais baixos.',
    pontos: ['1º dígito: sólidos', '2º dígito: água', 'IP55: poeira e jatos', 'Grau maior atende os inferiores'],
  },
  {
    id: 'd-lig-1',
    tema: 'ligacoes',
    pergunta: 'Explique a diferença entre as ligações triângulo e estrela, e como um motor com bobinas de 220 V pode ser ligado em redes de 220 V e 380 V.',
    resposta:
      'No triângulo, cada bobina fica ligada entre fases, então a tensão na bobina é igual à de linha. Na estrela, cada bobina fica entre fase e um ponto neutro, e a tensão de linha é √3 vezes a da bobina. Com bobina de 220 V: na rede de 220 V liga-se em triângulo, recebendo 220 V; na rede de 380 V liga-se em estrela, e cada bobina recebe 380/√3 ≈ 220 V. Nos dois casos a bobina trabalha na sua tensão de projeto.',
    pontos: ['Δ: Ub = UL', 'Y: UL = √3·Ub', 'Bobina sempre com 220 V'],
  },
  {
    id: 'd-lig-2',
    tema: 'ligacoes',
    pergunta: 'O que é a ligação Dahlander? Diferencie os tipos de conjugado constante e potência constante.',
    resposta:
      'É um sistema de duas velocidades por comutação de polos, com relação de polos e rotação de 1:2. A mudança é feita alterando a ligação ou invertendo o sentido da corrente em um conjunto de bobinas, o que muda o número de polos. No conjugado constante, ligação D/YY, o conjugado é igual nas duas rotações e a relação de potência é da ordem de 0,63:1. Na potência constante, ligação YY/D, a potência se mantém e a relação de conjugado é 1:2.',
    pontos: ['Comutação de polos 1:2', 'Inverter corrente em parte do enrolamento', 'D/YY: conjugado constante', 'YY/D: potência constante'],
  },
  {
    id: 'd-lig-3',
    tema: 'ligacoes',
    pergunta: 'Como funciona a partida série-paralelo em um motor de 9 terminais? Qual o objetivo?',
    resposta:
      'Na partida, as bobinas de cada fase ficam em série e cada uma recebe metade da tensão: UL/2 em triângulo série, ou seja, 110 V em rede de 220 V. Depois da aceleração, a chave comuta para paralelo e cada bobina passa a receber sua tensão nominal. O objetivo é reduzir a corrente de partida. Com menos tensão, o torque de partida também diminui.',
    pontos: ['Série na partida', 'Metade da tensão', 'Paralelo em regime', 'Reduz corrente de partida'],
  },
  {
    id: 'd-lig-4',
    tema: 'ligacoes',
    pergunta: 'Descreva o procedimento para identificar e verificar a polaridade das bobinas de um motor de 6 terminais.',
    resposta:
      'Com um ohmímetro, faz-se o teste de continuidade e define-se cada par de terminais: 1-4, 2-5 e 3-6. Para a polaridade, liga-se a bobina 1 em série com a 2, alimenta-se e coloca-se uma lâmpada de 12 V ou um voltímetro nos terminais 3-6. Se acender, a bobina 1 está invertida e troca-se 1 por 4. Se ficar apagada, estão corretas. Depois, liga-se as bobinas 2 e 3 em série e a lâmpada nos terminais 1-4. Se acender, troca-se 3 por 6 e testa-se novamente.',
    pontos: ['Continuidade: pares', 'Duas bobinas em série', 'Lâmpada ou voltímetro na terceira', 'Acendeu: inverter'],
  },
  {
    id: 'd-pla-1',
    tema: 'placa',
    pergunta: 'Uma placa indica: 75 kW (100 cv), 220/380/440 V, 236/137/118 A, 1780 rpm, 60 Hz, FS 1,25, Ip/In 7,5, cosφ 0,87, η 95,5%, categoria N, isolamento F, IP55, S1. Interprete esses dados.',
    resposta:
      'O motor entrega 75 kW (100 cv) no eixo. Pode ser ligado em 220, 380 ou 440 V, com correntes nominais de 236, 137 e 118 A, respectivamente. Gira a 1780 rpm a plena carga em 60 Hz, logo tem 4 polos, ns = 1800 rpm e s ≈ 1,1%. FS 1,25 permite 25% de sobrecarga contínua. A corrente de partida é 7,5 vezes a nominal. Fator de potência 0,87 e rendimento 95,5%. Categoria N: torque e corrente de partida normais, baixo escorregamento. Isolamento F: ponto mais quente limitado a 155°C. IP55: protegido contra poeira nociva e jatos de água. S1: regime contínuo.',
    pontos: ['Potência no eixo', 'Tensão e corrente correspondentes', '4 polos e s', 'FS e Ip/In', 'Categoria, classe, IP e regime'],
  },
  {
    id: 'd-pla-2',
    tema: 'placa',
    pergunta: 'Como descobrir o número de polos e o escorregamento de um motor apenas pela placa?',
    resposta:
      'Usa-se a frequência e a rotação nominal. Como o motor gira um pouco abaixo da síncrona, a velocidade síncrona é o valor padrão logo acima da rotação da placa. Em 60 Hz, os valores são 3600, 1800, 1200 e 900 rpm, para 2, 4, 6 e 8 polos. Por exemplo, para 1725 rpm, ns = 1800 rpm, logo 4 polos. O escorregamento é s = (1800 − 1725)/1800 = 4,17%.',
    pontos: ['Valor padrão logo acima', 'ns = 120·f/p', 's = (ns − n)/ns'],
  },
  {
    id: 'd-pla-3',
    tema: 'placa',
    pergunta: 'Por que a corrente é diferente para cada tensão da placa, se a potência é a mesma? E por que o rendimento aparece na fórmula da corrente?',
    resposta:
      'A potência é a mesma em qualquer ligação, então, pela fórmula In = P/(√3·UL·cosφ·η), a corrente é inversamente proporcional à tensão de linha: tensão maior, corrente menor. O rendimento aparece porque a potência da placa é a de saída, no eixo. A rede precisa fornecer mais que isso, P/η, para cobrir as perdas. O cosφ aparece porque só a parcela ativa da potência aparente realiza trabalho.',
    pontos: ['In inversamente proporcional a UL', 'Potência da placa é de saída', 'P1 = P/η', 'cosφ: parcela ativa'],
  },
]

export const marcar: Marcar[] = [
  { id: 'm-esc-1', tema: 'escorregamento', pergunta: 'Com o rotor parado no instante da partida, o escorregamento vale:', opcoes: ['0', '0,05', '0,5', '1'], correta: 3, explicacao: 'Com n = 0, s = (ns − 0)/ns = 1.' },
  { id: 'm-esc-2', tema: 'escorregamento', pergunta: 'A frequência da corrente do rotor na partida é:', opcoes: ['Igual à frequência da rede', 'Zero', 'Metade da frequência da rede', 'O dobro da frequência da rede'], correta: 0, explicacao: 'f2 = s·f1 e s = 1 na partida, então f2 = f1.' },
  { id: 'm-esc-3', tema: 'escorregamento', pergunta: 'Um motor de 4 polos, 60 Hz, gira a 1746 rpm. O escorregamento é:', opcoes: ['1%', '3%', '5%', '54%'], correta: 1, explicacao: 'ns = 1800 rpm. s = (1800 − 1746)/1800 = 0,03.' },
  { id: 'm-esc-4', tema: 'escorregamento', pergunta: 'A f.e.m. induzida no rotor, em relação ao escorregamento, tem:', opcoes: ['Módulo fixo e frequência proporcional', 'Módulo proporcional e frequência fixa', 'Módulo e frequência proporcionais', 'Módulo e frequência fixos'], correta: 2, explicacao: 'εr = s·εrb e fr = s·frb.' },
  { id: 'm-campo-1', tema: 'campo', pergunta: 'A velocidade síncrona de um motor depende:', opcoes: ['Da carga e da tensão', 'Da frequência e do número de polos', 'Da tensão e da corrente', 'Do escorregamento e da carga'], correta: 1, explicacao: 'ns = 120·f/p.' },
  { id: 'm-campo-2', tema: 'campo', pergunta: 'O módulo do fluxo resultante do campo girante trifásico é:', opcoes: ['φm', '√3·φm', '3/2·φm', '3·φm'], correta: 2, explicacao: 'A soma vetorial das três fases dá 3/2 do fluxo máximo de uma fase.' },
  { id: 'm-campo-3', tema: 'campo', pergunta: 'Para inverter o sentido de rotação de um MIT, deve-se:', opcoes: ['Inverter as três fases', 'Inverter duas fases', 'Reduzir a tensão', 'Trocar Δ por Y'], correta: 1, explicacao: 'Trocar duas fases inverte a sequência de fases e o sentido do campo.' },
  { id: 'm-campo-4', tema: 'campo', pergunta: 'Em uma máquina de 8 polos, 180° elétricos equivalem a:', opcoes: ['22,5° mecânicos', '45° mecânicos', '90° mecânicos', '720° mecânicos'], correta: 1, explicacao: 'θmec = (2/8)·180° = 45°.' },
  { id: 'm-con-1', tema: 'construcao', pergunta: 'O rotor em gaiola de esquilo se caracteriza por:', opcoes: ['Anéis coletores e escovas', 'Barras curto-circuitadas por anéis, sem terminais acessíveis', 'Enrolamento de cobre com terminais externos', 'Alimentação direta pela rede'], correta: 1, explicacao: 'A gaiola não tem terminal acessível. Anéis coletores e escovas são do rotor bobinado.' },
  { id: 'm-con-2', tema: 'construcao', pergunta: 'A carcaça do motor normalmente tem aletas para:', opcoes: ['Reduzir o peso', 'Aumentar a área de dissipação de calor', 'Diminuir a corrente', 'Aumentar o torque'], correta: 1, explicacao: 'As aletas aumentam a área de dissipação, sem exigir uma carcaça muito maior.' },
  { id: 'm-con-3', tema: 'construcao', pergunta: 'O rotor bobinado é escolhido principalmente quando se deseja:', opcoes: ['Menor custo', 'Maior robustez', 'Controlar torque e velocidade', 'Eliminar as escovas'], correta: 2, explicacao: 'É mais caro e menos robusto, mas permite esse controle e maior torque de partida.' },
  { id: 'm-cir-1', tema: 'circuito', pergunta: 'No circuito equivalente, a potência convertida em mecânica é representada por:', opcoes: ['Rs', 'Rc', 'Xm', '(1−s)Rr/s'], correta: 3, explicacao: 'É a resistência fictícia. Rc representa as perdas no núcleo.' },
  { id: 'm-cir-2', tema: 'circuito', pergunta: 'A corrente de magnetização do MIT, em relação à nominal, é da ordem de:', opcoes: ['2 a 5%', '10 a 15%', '25 a 40%', '80 a 100%'], correta: 2, explicacao: 'De 2 a 5% é o valor do transformador. No motor é maior por causa do entreferro.' },
  { id: 'm-cir-3', tema: 'circuito', pergunta: 'No diagrama de fluxo de potência, as perdas rotacionais são descontadas:', opcoes: ['Da potência de entrada', 'Da potência no entreferro', 'Da potência mecânica gerada', 'Das perdas no estator'], correta: 2, explicacao: 'Mecânica gerada − rotacionais = saída no eixo.' },
  { id: 'm-cir-4', tema: 'circuito', pergunta: 'Rc, no circuito equivalente, representa:', opcoes: ['Perdas no cobre do rotor', 'Perdas no núcleo (histerese e Foucault)', 'Perdas por atrito', 'A carga mecânica'], correta: 1, explicacao: 'Rc fica no ramo de magnetização, em paralelo com Xm.' },
  { id: 'm-tor-1', tema: 'torque', pergunta: 'O torque do motor de indução na velocidade síncrona é:', opcoes: ['Máximo', 'Igual ao nominal', 'Igual ao de partida', 'Zero'], correta: 3, explicacao: 'Sem velocidade relativa não há tensão induzida, corrente nem torque.' },
  { id: 'm-tor-2', tema: 'torque', pergunta: 'Tmín é:', opcoes: ['O torque em vazio', 'O menor torque ao acelerar de zero até a velocidade de Tmáx', 'O menor torque em toda a curva, incluindo ns', 'O torque nominal'], correta: 1, explicacao: 'É o vale da aceleração, entre a partida e o torque máximo.' },
  { id: 'm-tor-3', tema: 'torque', pergunta: 'O torque máximo apresenta, com frequência, valores de:', opcoes: ['50 a 100% de Tn', '100 a 150% de Tn', '200 a 300% de Tn', '500 a 700% de Tn'], correta: 2, explicacao: 'Faixa citada na apostila.' },
  { id: 'm-tor-4', tema: 'torque', pergunta: 'Se o torque da carga ultrapassar o Tmáx:', opcoes: ['A rotação sobe', 'A rotação cai bruscamente, podendo travar', 'O motor vira gerador', 'Nada muda'], correta: 1, explicacao: 'É o comportamento descrito na seção 3.9.' },
  { id: 'm-tor-5', tema: 'torque', pergunta: 'Se a tensão cair para 70% da nominal, o torque cai para aproximadamente:', opcoes: ['84%', '70%', '49%', '30%'], correta: 2, explicacao: 'T é proporcional a V²: 0,7² = 0,49.' },
  { id: 'm-tor-6', tema: 'torque', pergunta: 'Por definição, Tp considera:', opcoes: ['O máximo entre as posições do rotor', 'O mínimo entre todas as posições angulares do rotor bloqueado', 'O rotor em movimento', 'Tensão reduzida'], correta: 1, explicacao: 'O torque com rotor bloqueado varia um pouco com a posição em que se trava o motor.' },
  { id: 'm-cat-1', tema: 'categorias', pergunta: 'Qual categoria tem alto escorregamento, acima de 5%?', opcoes: ['N', 'H', 'D', 'Nenhuma'], correta: 2, explicacao: 'D: torque de partida alto, corrente baixa e alto escorregamento.' },
  { id: 'm-cat-2', tema: 'categorias', pergunta: 'Peneiras e transportadores carregados tipicamente usam a categoria:', opcoes: ['N', 'H', 'D', 'S1'], correta: 1, explicacao: 'S1 é regime de serviço, não categoria.' },
  { id: 'm-cat-3', tema: 'categorias', pergunta: 'Bombas e máquinas operatrizes tipicamente usam a categoria:', opcoes: ['N', 'H', 'D', 'F'], correta: 0, explicacao: 'F é classe de isolamento, não categoria.' },
  { id: 'm-cat-4', tema: 'categorias', pergunta: 'Motores de rotor de anéis:', opcoes: ['São sempre categoria N', 'São sempre categoria D', 'Não se enquadram nas categorias N, H e D', 'São sempre categoria H'], correta: 2, explicacao: 'As categorias valem para motores de gaiola.' },
  { id: 'm-ser-1', tema: 'servico', pergunta: 'FS = 1,25 significa que o motor suporta:', opcoes: ['25% de sobrecarga por 1 minuto', '25% de sobrecarga contínua', '1,25 vez a corrente de partida', '125% do Tmáx'], correta: 1, explicacao: 'O FS indica a sobrecarga permissível aplicada continuamente.' },
  { id: 'm-ser-2', tema: 'servico', pergunta: 'O regime com carga constante até o equilíbrio térmico é:', opcoes: ['S1', 'S2', 'S3', 'S9'], correta: 0, explicacao: 'S1 é o regime contínuo.' },
  { id: 'm-ser-3', tema: 'servico', pergunta: 'O regime com ciclos de carga e funcionamento em vazio, sem repouso, é:', opcoes: ['S3', 'S4', 'S6', 'S10'], correta: 2, explicacao: 'S6 usa ED = tN/(tN + tV).' },
  { id: 'm-ser-4', tema: 'servico', pergunta: 'O regime com variações não periódicas de carga e velocidade é:', opcoes: ['S5', 'S7', 'S8', 'S9'], correta: 3, explicacao: 'S8 tem mudança periódica. S9 é não periódico e pode ter sobrecargas.' },
  { id: 'm-ser-5', tema: 'servico', pergunta: 'O regime S10 inclui, no máximo:', opcoes: ['2 cargas distintas', '3 cargas distintas', '4 cargas distintas', '10 cargas distintas'], correta: 2, explicacao: 'Até quatro valores, cada um mantido até o equilíbrio térmico.' },
  { id: 'm-ter-1', tema: 'termico', pergunta: 'O limite de temperatura da classe de isolamento F é:', opcoes: ['105°C', '130°C', '155°C', '180°C'], correta: 2, explicacao: 'A 105, E 120, B 130, F 155, H 180 °C.' },
  { id: 'm-ter-2', tema: 'termico', pergunta: 'Um aumento de quantos graus reduz a vida útil da isolação pela metade?', opcoes: ['1 a 2°C', '8 a 10°C', '25 a 30°C', '50°C'], correta: 1, explicacao: 'Valor da seção 3.13.5.' },
  { id: 'm-ter-3', tema: 'termico', pergunta: 'Qual proteção permite acompanhamento contínuo da temperatura?', opcoes: ['PT-100', 'PTC', 'Termostato', 'Protetor fenólico'], correta: 0, explicacao: 'A resistência do PT-100 varia linearmente com a temperatura.' },
  { id: 'm-ter-4', tema: 'termico', pergunta: 'O termistor mais usado em motores é o:', opcoes: ['NTC, cuja resistência cai bruscamente', 'PTC, cuja resistência sobe bruscamente', 'PT-100', 'Bimetálico'], correta: 1, explicacao: 'Os circuitos de controle disponíveis geralmente são para PTC.' },
  { id: 'm-ter-5', tema: 'termico', pergunta: 'As classes mais usadas em motores normais são:', opcoes: ['A e E', 'B e F', 'F e H', 'A e H'], correta: 1, explicacao: 'Afirmação da seção 3.13.4.' },
  { id: 'm-amb-1', tema: 'ambiente', pergunta: 'A condição usual de serviço, conforme a NBR 17094, é:', opcoes: ['Até 500 m e 30°C', 'Até 1000 m e 40°C', 'Até 2000 m e 40°C', 'Até 1000 m e 55°C'], correta: 1, explicacao: 'Nessa condição, o motor entrega a potência nominal sem sobreaquecer.' },
  { id: 'm-amb-2', tema: 'ambiente', pergunta: 'No código IP, o segundo algarismo indica proteção contra:', opcoes: ['Corpos sólidos', 'Contato acidental', 'Água', 'Temperatura'], correta: 2, explicacao: 'O primeiro é para sólidos e contato.' },
  { id: 'm-amb-3', tema: 'ambiente', pergunta: 'Um motor lavado periodicamente com mangueira deve ter, no mínimo:', opcoes: ['IP21', 'IP23', 'IP44', 'IP55'], correta: 3, explicacao: 'IP55 suporta jatos de água em todas as direções.' },
  { id: 'm-amb-4', tema: 'ambiente', pergunta: 'Com 40°C e 2000 m, o fator α da Tabela 3.4 é:', opcoes: ['1,00', '0,97', '0,94', '0,83'], correta: 2, explicacao: 'Na linha de 40°C e coluna de 2000 m, α = 0,94.' },
  { id: 'm-lig-1', tema: 'ligacoes', pergunta: 'Na ligação estrela, a tensão de linha em relação à de bobina é:', opcoes: ['Igual', '√3 vezes maior', '2 vezes maior', '√3 vezes menor'], correta: 1, explicacao: 'UL = √3·Ub. No triângulo, são iguais.' },
  { id: 'm-lig-2', tema: 'ligacoes', pergunta: 'Um motor de 12 terminais com bobinas de 220 V pode ser ligado em:', opcoes: ['220 e 380 V apenas', '220, 380, 440 e 760 V', '110 e 220 V apenas', '380 e 660 V apenas'], correta: 1, explicacao: 'A de 760 V é apenas demonstrativa, pois não há rede com esse valor.' },
  { id: 'm-lig-3', tema: 'ligacoes', pergunta: 'A relação de polos da ligação Dahlander é:', opcoes: ['1:2', '1:3', '2:3', '3:4'], correta: 0, explicacao: 'A rotação também fica na relação 1:2. Exemplo: IV/II polos.' },
  { id: 'm-lig-4', tema: 'ligacoes', pergunta: 'A ligação Dahlander de conjugado constante é a:', opcoes: ['YY/D', 'D/YY', 'Y/Δ', 'Δ/ΔΔ'], correta: 1, explicacao: 'D/YY tem conjugado constante. YY/D tem potência constante.' },
  { id: 'm-lig-5', tema: 'ligacoes', pergunta: 'Hoje, a variação de velocidade de um motor de indução é feita principalmente com:', opcoes: ['Reostato no estator', 'Inversor de frequência', 'Transformador', 'Capacitores'], correta: 1, explicacao: 'O inversor varia a frequência e a tensão.' },
  { id: 'm-pla-1', tema: 'placa', pergunta: 'A potência indicada na placa é:', opcoes: ['A potência elétrica de entrada', 'A potência mecânica no eixo', 'A potência reativa', 'A potência no entreferro'], correta: 1, explicacao: 'Por isso a corrente nominal é calculada com η.' },
  { id: 'm-pla-2', tema: 'placa', pergunta: 'Uma placa indica 1725 rpm em 60 Hz. O motor tem:', opcoes: ['2 polos', '4 polos', '6 polos', '8 polos'], correta: 1, explicacao: 'O valor padrão logo acima de 1725 é 1800 rpm, de 4 polos.' },
  { id: 'm-pla-3', tema: 'placa', pergunta: 'Ip/In = 7,5 significa que:', opcoes: ['A corrente de partida é 7,5 vezes a nominal', 'O motor pode ter 7,5% de sobrecarga', 'O torque de partida é 7,5 vezes o nominal', 'A tensão de partida é 7,5 vezes a nominal'], correta: 0, explicacao: 'É a relação entre a corrente de partida e a nominal.' },
  { id: 'm-pla-4', tema: 'placa', pergunta: 'Na placa 220/380 V com correntes 2,87/1,66 A, a corrente em 380 V é:', opcoes: ['2,87 A', '1,66 A', '4,53 A', '1,21 A'], correta: 1, explicacao: 'A ordem das correntes acompanha a das tensões: tensão maior, corrente menor.' },
  { id: 'm-pla-5', tema: 'placa', pergunta: 'Na placa, a letra N no campo “CAT” indica:', opcoes: ['Neutro acessível', 'Categoria de conjugado N', 'Classe de isolamento N', 'Regime normal'], correta: 1, explicacao: 'Categoria N: torque e corrente de partida normais, baixo escorregamento.' },
]

export const calculos: Calculo[] = [
  { id: 'c-ap-1a', origem: 'apostila', tema: 'escorregamento', enunciado: 'Motor de 6 polos com 3 ranhuras por polo e por fase. Qual o número total de ranhuras do estator?', formula: 'Q = q · p · m', passos: ['q = 3, p = 6, m = 3 fases', 'Q = 3 · 6 · 3'], resposta: '54 ranhuras' },
  { id: 'c-ap-1b', origem: 'apostila', tema: 'escorregamento', enunciado: 'O mesmo motor, de 6 polos, em 60 Hz. Qual a velocidade do campo girante?', formula: 'ns = 120·f/p', passos: ['ns = 120 · 60 / 6'], resposta: '1200 rpm' },
  { id: 'c-ap-1c', origem: 'apostila', tema: 'escorregamento', enunciado: 'O mesmo motor, com s = 3%. Qual a velocidade do rotor?', formula: 'n = ns·(1 − s)', passos: ['n = 1200 · (1 − 0,03)', 'n = 1200 · 0,97'], resposta: '1164 rpm' },
  { id: 'c-ap-1d', origem: 'apostila', tema: 'escorregamento', enunciado: 'O mesmo motor, com s = 3%. Qual a frequência da corrente do rotor?', formula: 'f2 = s·f1', passos: ['f2 = 0,03 · 60'], resposta: '1,8 Hz' },
  { id: 'c-ap-2', origem: 'apostila', tema: 'escorregamento', enunciado: 'Motor de 4 polos, 60 Hz, com s = 5% a plena carga. Qual a frequência induzida no rotor na partida e a plena carga?', formula: 'f2 = s·f1', passos: ['Partida: s = 1 → f2 = 1 · 60', 'Plena carga: s = 0,05 → f2 = 0,05 · 60'], resposta: '60 Hz na partida e 3 Hz a plena carga' },
  { id: 'c-esc-1', tema: 'escorregamento', enunciado: 'Motor de 8 polos, 60 Hz, a 864 rpm. Calcule ns, s e f2.', formula: 'ns = 120·f/p · s = (ns − n)/ns · f2 = s·f1', passos: ['ns = 120 · 60 / 8 = 900 rpm', 's = (900 − 864)/900 = 0,04', 'f2 = 0,04 · 60'], resposta: 'ns = 900 rpm, s = 4% e f2 = 2,4 Hz' },
  { id: 'c-esc-2', tema: 'escorregamento', enunciado: 'Um motor de 2 polos, 50 Hz, opera com s = 2%. Calcule a rotação.', formula: 'ns = 120·f/p · n = ns·(1 − s)', passos: ['ns = 120 · 50 / 2 = 3000 rpm', 'n = 3000 · 0,98'], resposta: '2940 rpm' },
  { id: 'c-esc-3', tema: 'campo', enunciado: 'Em uma máquina de 6 polos, quantos graus mecânicos equivalem a 360° elétricos?', formula: 'θmec = (2/p)·θelét', passos: ['θmec = (2/6) · 360°'], resposta: '120° mecânicos' },
  { id: 'c-pla-1', tema: 'placa', enunciado: 'Placa de 1 cv: 1725 rpm, 60 Hz. Calcule o número de polos, s e f2.', formula: 'p = 120·f/ns · s = (ns − n)/ns · f2 = s·f1', passos: ['O valor padrão logo acima de 1725 é ns = 1800 rpm', 'p = 120 · 60 / 1800 = 4', 's = (1800 − 1725)/1800 = 0,0417', 'f2 = 0,0417 · 60'], resposta: '4 polos, s ≈ 4,17% e f2 = 2,5 Hz' },
  { id: 'c-pla-2', tema: 'placa', enunciado: 'Placa: In = 236 A em 220 V, Ip/In = 7,5 e FS = 1,25. Calcule a corrente de partida e a corrente no fator de serviço.', formula: 'Ip = (Ip/In)·In · I_FS = FS·In', passos: ['Ip = 7,5 · 236 = 1770 A', 'I_FS = 1,25 · 236 = 295 A'], resposta: 'Ip = 1770 A e I_FS = 295 A' },
  { id: 'c-pla-3', tema: 'placa', enunciado: 'Placa: 0,75 kW, η = 82,6%, cosφ = 0,83, 220/380 V. Confira as correntes.', formula: 'In = P / (√3·UL·cosφ·η)', passos: ['Denominador em 220 V: 1,732 · 220 · 0,83 · 0,826 = 261,2', 'In = 750 / 261,2 = 2,87 A', 'Denominador em 380 V: 1,732 · 380 · 0,83 · 0,826 = 451,2', 'In = 750 / 451,2 = 1,66 A'], resposta: '2,87 A em 220 V e 1,66 A em 380 V, iguais à placa' },
  { id: 'c-cor-1', tema: 'ligacoes', enunciado: 'Motor de 10 cv, 380 V, cosφ = 0,85, η = 90%. Calcule a corrente nominal.', formula: 'In = Pn(cv)·736 / (√3·UL·cosφ·η)', passos: ['Numerador: 10 · 736 = 7360 W', 'Denominador: 1,732 · 380 · 0,85 · 0,90 = 503,5', 'In = 7360 / 503,5'], resposta: 'In ≈ 14,6 A' },
  { id: 'c-cor-2', tema: 'ligacoes', enunciado: 'Motor de 50 cv, 440 V, cosφ = 0,88, η = 93%. Calcule a corrente nominal.', formula: 'In = Pn(cv)·736 / (√3·UL·cosφ·η)', passos: ['Numerador: 50 · 736 = 36800 W', 'Denominador: 1,732 · 440 · 0,88 · 0,93 = 623,7', 'In = 36800 / 623,7'], resposta: 'In ≈ 59 A' },
  { id: 'c-lig-1', tema: 'ligacoes', enunciado: 'Um motor com bobinas de 220 V é ligado em estrela a uma rede de 380 V. Qual a tensão em cada bobina?', formula: 'Ub = UL/√3', passos: ['Ub = 380 / 1,732'], resposta: 'Ub ≈ 220 V' },
  { id: 'c-lig-2', tema: 'ligacoes', enunciado: 'Motor de 12 terminais com bobinas de 220 V. Quais as quatro tensões de linha possíveis?', formula: 'Δ par = Ub · Y par = √3·Ub · Δ sér = 2·Ub · Y sér = 2√3·Ub', passos: ['Triângulo paralelo: 220 V', 'Estrela paralelo: 1,732 · 220 ≈ 380 V', 'Triângulo série: 2 · 220 = 440 V', 'Estrela série: 2 · 380 = 760 V'], resposta: '220, 380, 440 e 760 V' },
  { id: 'c-lig-3', tema: 'ligacoes', enunciado: 'Dahlander IV/II polos em 60 Hz. Quais as velocidades síncronas?', formula: 'ns = 120·f/p', passos: ['4 polos: 120 · 60 / 4 = 1800 rpm', '2 polos: 120 · 60 / 2 = 3600 rpm'], resposta: '1800 rpm e 3600 rpm' },
  { id: 'c-pot-1', tema: 'circuito', enunciado: 'A potência no entreferro é de 10 kW, com s = 4% e perdas rotacionais de 0,2 kW. A entrada é de 10,8 kW. Calcule Pcu,r, Pmec, Peixo e η.', formula: 'Pcu,r = s·Pag · Pmec = (1−s)·Pag · Peixo = Pmec − Prot · η = Peixo/P1', passos: ['Pcu,r = 0,04 · 10 = 0,4 kW', 'Pmec = 0,96 · 10 = 9,6 kW', 'Peixo = 9,6 − 0,2 = 9,4 kW', 'η = 9,4 / 10,8 = 0,870'], resposta: 'Pcu,r = 0,4 kW, Pmec = 9,6 kW, Peixo = 9,4 kW e η ≈ 87%' },
  { id: 'c-pot-2', tema: 'circuito', enunciado: 'Entrada de 50 kW. Perdas no estator e no núcleo: 2 kW. s = 3%. Perdas rotacionais: 0,6 kW. Calcule Peixo e η.', formula: 'Pag = P1 − perdas · Pmec = (1−s)·Pag · η = Peixo/P1', passos: ['Pag = 50 − 2 = 48 kW', 'Pcu,r = 0,03 · 48 = 1,44 kW', 'Pmec = 48 − 1,44 = 46,56 kW', 'Peixo = 46,56 − 0,6 = 45,96 kW', 'η = 45,96 / 50 = 0,919'], resposta: 'Peixo = 45,96 kW e η ≈ 91,9%' },
  { id: 'c-pot-3', tema: 'circuito', enunciado: 'Rr = 0,2 Ω por fase e s = 4%. Calcule a resistência fictícia e Rr/s.', formula: 'R = (1−s)·Rr/s', passos: ['R = 0,96 · 0,2 / 0,04 = 4,8 Ω', 'Rr/s = 0,2 / 0,04 = 5 Ω'], resposta: 'R = 4,8 Ω e Rr/s = 5 Ω' },
  { id: 'c-tor-1', tema: 'torque', enunciado: 'Motor de 75 kW a 1780 rpm. Calcule o torque nominal.', formula: 'T = P/ω · ω = 2π·n/60', passos: ['ω = 2π · 1780 / 60 = 186,4 rad/s', 'T = 75000 / 186,4'], resposta: 'T ≈ 402 N·m' },
  { id: 'c-tor-2', tema: 'categorias', enunciado: 'Motor de 10 cv, 4 polos, categoria N, 1750 rpm. Pela Tabela 3.1, Cp = 1,6, Cmín = 1,1 e Cmáx = 2,0. Calcule Tn, Tp, Tmín e Tmáx.', formula: 'T = P/ω · Tp = Cp·Tn', passos: ['P = 10 · 736 = 7360 W', 'ω = 2π · 1750 / 60 = 183,3 rad/s', 'Tn = 7360 / 183,3 = 40,2 N·m', 'Tp = 1,6 · 40,2 = 64,3 N·m', 'Tmín = 1,1 · 40,2 = 44,2 N·m', 'Tmáx = 2,0 · 40,2 = 80,3 N·m'], resposta: 'Tn ≈ 40,2, Tp ≈ 64,3, Tmín ≈ 44,2 e Tmáx ≈ 80,3 N·m' },
  { id: 'c-tor-3', tema: 'torque', enunciado: 'Um motor tem Tp = 150% de Tn. Ele deve partir com tensão reduzida a 80%, contra uma carga que exige 100% de Tn na partida. Ele parte?', formula: "T' = T·(V'/V)²", passos: ["T' = 150% · 0,8² = 150% · 0,64 = 96%", '96% é menor que 100%'], resposta: 'Não parte: o torque disponível é de 96% de Tn' },
  { id: 'c-ser-1', tema: 'servico', enunciado: 'Regime S3: tN = 10 min e tR = 20 min. Calcule o ED.', formula: 'ED = tN/(tN + tR)·100%', passos: ['ED = 10 / 30 · 100%'], resposta: 'ED ≈ 33,3%' },
  { id: 'c-ser-2', tema: 'servico', enunciado: 'Regime S4: tN = 10 min, tD = 2 min e tR = 20 min. Calcule o ED.', formula: 'ED = (tN + tD)/(tN + tD + tR)·100%', passos: ['ED = 12 / 32 · 100%'], resposta: 'ED = 37,5%' },
  { id: 'c-ser-3', tema: 'servico', enunciado: 'Regime S5: tN = 8 min, tD = 1 min, tF = 1 min e tR = 10 min. Calcule o ED.', formula: 'ED = (tN + tD + tF)/(tN + tD + tF + tR)·100%', passos: ['ED = 10 / 20 · 100%'], resposta: 'ED = 50%' },
  { id: 'c-ser-4', tema: 'servico', enunciado: 'Regime S6: tN = 15 min e tV = 5 min. Calcule o ED.', formula: 'ED = tN/(tN + tV)·100%', passos: ['ED = 15 / 20 · 100%'], resposta: 'ED = 75%' },
  { id: 'c-ser-5', tema: 'servico', enunciado: 'Regime S8: tD = 2, tN1 = 10, tF1 = 1, tN2 = 5, tF2 = 1 e tN3 = 1 min. Calcule EDa, EDb e EDc.', formula: 'EDa = (tD + tN1)/Σ · EDb = (tF1 + tN2)/Σ · EDc = (tF2 + tN3)/Σ', passos: ['Σ = 2 + 10 + 1 + 5 + 1 + 1 = 20 min', 'EDa = 12/20', 'EDb = 6/20', 'EDc = 2/20'], resposta: 'EDa = 60%, EDb = 30% e EDc = 10%' },
  { id: 'c-ser-6', tema: 'servico', enunciado: 'Motor de 20 cv com FS = 1,15. Qual a potência contínua máxima?', formula: 'P = FS·Pn', passos: ['P = 1,15 · 20'], resposta: '23 cv' },
  { id: 'c-ter-1', tema: 'termico', enunciado: 'Classe B: ambiente de 40°C, Δt = 80°C e diferença de 10°C. Qual a temperatura do ponto mais quente?', formula: 'T = Tamb + Δt + dif', passos: ['T = 40 + 80 + 10'], resposta: '130°C' },
  { id: 'c-ter-2', tema: 'termico', enunciado: 'Um PT-100 mede 119,25 Ω. Qual a temperatura?', formula: 't = (r − 100)/0,385', passos: ['t = 19,25 / 0,385'], resposta: '50°C' },
  { id: 'c-amb-1', origem: 'apostila', tema: 'ambiente', enunciado: 'Motor de 100 cv, isolamento B, a 1500 m. Qual a elevação de temperatura permitida?', formula: 'Redução de 1% a cada 100 m acima de 1000 m', passos: ['1500 − 1000 = 500 m → redução de 5%', 'Δt = 80 − (0,05 · 80)'], resposta: '76°C' },
  { id: 'c-amb-2', tema: 'ambiente', enunciado: 'Motor com isolamento F (Δt = 105°C), a 2500 m. Qual a elevação permitida?', formula: 'Redução de 1% a cada 100 m acima de 1000 m', passos: ['2500 − 1000 = 1500 m → redução de 15%', '0,15 · 105 = 15,75°C', 'Arredondando para o inteiro imediatamente superior: 16°C', 'Δt = 105 − 16'], resposta: '89°C' },
  { id: 'c-amb-3', origem: 'apostila', tema: 'ambiente', enunciado: 'Motor de 100 cv, a 2000 m e 55°C. Pela Tabela 3.4, α = 0,83. Qual a potência disponível?', formula: "P' = α·Pn", passos: ["P' = 0,83 · 100"], resposta: '83 cv' },
  { id: 'c-amb-4', tema: 'ambiente', enunciado: 'Motor de 50 cv, a 3000 m e 45°C. Pela Tabela 3.4, α = 0,85. Qual a potência disponível?', formula: "P' = α·Pn", passos: ["P' = 0,85 · 50"], resposta: '42,5 cv' },
]
