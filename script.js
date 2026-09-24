const stages=[{
	name:'Polinização',
	icon:'✣',
	cost:'5 pólen',
	resource:'polen',
	amount:5,
	message:'O pólen chegou ao estigma. A jornada pode começar.'
	},
	{name:'Germinação do pólen',
		icon:'◌',cost:'50 energia',
		resource:'energia',
		amount:50,
		message:'O grão de pólen germinou e começou a liberar o tubo.'
	},
	{name:'Crescimento do tubo',
		icon:'↗',
		cost:'75 água',
		resource:'agua',
		amount:75,
		message:'O tubo polínico avança pelo estilete em direção ao óvulo.'
	},
	{name:'Fecundação',
		icon:'✦',
		cost:'100 energia',
		resource:'energia',
		amount:100,
		message:'Os gametas se uniram. Um novo zigoto foi formado.'
	},
	{name:'Formação da semente',
		icon:'●',
		cost:'75 energia',
		resource:'energia',
		amount:75,
		message:'O óvulo se transformou em uma semente protegida.'
	},
	{name:'Desenvolvimento do fruto',
		icon:'●',
		cost:'125 água',
		resource:'agua',
		amount:125,
		message:'O ovário amadureceu. O fruto está formado!'
	}];

const resources={agua:0,energia:0,polen:0};

const storeQuestions=[
	{question:'Qual estrutura da planta realiza principalmente a fotossíntese?',
		options:[['folhas','Folhas'],['raizes','Raízes'],['flores','Flores']]},
	{question:'Qual órgão absorve água e sais minerais do solo?',
		options:[['raizes','Raízes'],['folhas','Folhas'],['frutos','Frutos']]},
	{question:'Em qual estrutura ocorre a produção do pólen?',
		options:[['antera','Antera'],['estigma','Estigma'],['ovario','Ovário']]},
	{question:'O que normalmente se forma depois da fecundação no óvulo?',
		options:[['semente','Semente'],['petala','Pétala'],['nectario','Nectário']]},
	{question:'Qual recurso é transportado pelo tubo polínico?',
		options:[['gametas','Gametas'],['agua','Água'],['clorofila','Clorofila']]},
];
const waterQuestions=[
	{question:'Como a água entra principalmente na raiz?',
		options:[['osmose','Por osmose'],['fotossintese','Por fotossíntese'],['polinizacao','Por polinização']]},
	{question:'Qual tecido conduz água e sais minerais para cima?',
		options:[['xilema','Xilema'],['floema','Floema'],['epiderme','Epiderme']]},
	{question:'O que acontece com uma célula vegetal em meio muito concentrado?',
		options:[['perdeagua','Perde água por osmose'],['ganhaagua','Ganha água por osmose'],['produzpolen','Produz pólen']]},
	{question:'Qual processo libera vapor de água pelas folhas?',
		options:[['transpiracao','Transpiração'],['fecundacao','Fecundação'],['germinacao','Germinação']]},
	{question:'Por que a água é importante na fotossíntese?',
		options:[['materiaprima','É uma matéria-prima'],['polinizador','É um polinizador'],['semente','É uma semente']]},
];
const pollenQuestions=[
	{question:'Qual fator externo costuma transportar o pólen entre flores?',
		options:[['insetos','Insetos'],['raizes','Raízes'],['frutos','Frutos']]},
	{question:'Qual parte recebe o grão de pólen?',
		options:[['estigma','Estigma'],['antera','Antera'],['sepala','Sépala']]},
	{question:'O que cresce depois que o pólen germina?',
		options:[['tubo','Tubo polínico'],['raiz','Raiz principal'],['fruto','Fruto maduro']]},
	{question:'Qual fator interno ajuda o pólen a reconhecer a flor compatível?',
		options:[['compatibilidade','Compatibilidade química'],['gravidade','Gravidade'],['coragua','Cor da água']]},
	{question:'Qual condição externa favorece a atividade de muitos polinizadores?',
		options:[['clima','Clima adequado'],['soloescuro','Solo escuro'],['frutomaduro','Fruto maduro']]},
];

const randomEvents=[
	{title:'Chuva passageira',text:'Nuvens carregadas chegaram ao jardim. Como a flor deve aproveitar a chuva?',
		choices:[{label:'Coletar água',resource:'agua',amount:20},{label:'Guardar ATP (energia)',
			resource:'energia',amount:10},{label:'Reter pólen',resource:'polen',amount:1}]},
	{title:'Visita de polinizadores',text:'Uma abelha pousou na flor e trouxe ajuda para o ciclo.',
		choices:[{label:'Receber pólen',resource:'polen',amount:1},{label:'Trocar por energia',
			resource:'energia',amount:15},{label:'Atrair umidade',resource:'agua',amount:15}]},
	{title:'Manhã ensolarada',text:'A luz do sol aquece o jardim e ativa a produção de energia.',
		choices:[{label:'Absorver ATP (energia)',resource:'energia',amount:20},{label:'Economizar água',
			resource:'agua',amount:15},{label:'Proteger o pólen',resource:'polen',amount:1}]},
	{title:'Solo fértil',text:'Microrganismos enriqueceram o solo ao redor da flor.',
		choices:[{label:'Absorver nutrientes em ATP (energia)',
			resource:'energia',amount:15},{label:'Reter água no solo',resource:'agua',amount:20},{label:'Atrair pólen',resource:'polen',amount:1}]},
	{title:'Brisa favorável',text:'Uma corrente de ar atravessou o jardim e trouxe partículas úteis.',
		choices:[{label:'Capturar umidade',resource:'agua',amount:15},{label:'Aproveitar a brisa para gerar ATP (energia)',
			resource:'energia',amount:10},{label:'Recolher pólen',resource:'polen',amount:1}]},
	{title:'Jardim vizinho',text:'Uma planta próxima floresceu e compartilhou seus recursos.',
		choices:[{label:'Receber água',resource:'agua',amount:15},{label:'Receber ATP (energia)',
			resource:'energia',amount:15},{label:'Receber pólen',resource:'polen',amount:1}]},
	{title:'Orvalho da manhã',text:'Gotículas se formaram nas folhas e podem ser aproveitadas pela planta.',
		choices:[{label:'Coletar água',resource:'agua',amount:25},{label:'Converter luz em ATP (energia)',
			resource:'energia',amount:5},{label:'Atrair pólen',resource:'polen',amount:2}]},
	{title:'Floração abundante',text:'As flores vizinhas abriram ao mesmo tempo e fortaleceram o jardim.',
		choices:[{label:'Absorver água do solo',resource:'agua',amount:30},{label:'Aproveitar ATP (energia)',
			resource:'energia',amount:7},{label:'Recolher pólen',resource:'polen',amount:3}]},
];

let eventExpiryTimer=null;let eventCooldownTimer=null;let cooldownTicker=null;

let state={...resources,
	stage:0,
	status:'Flor pronta para a polinização.',
	event:'A flor começa sem recursos. Escolha um evento para iniciar.',
	eventChoices:[],
	eventVisible:true,
	eventAlert:'',
	cooldownUntil:0,
	tool:'store',
	shopTab:'energy-pollen',
	storeQuestion:0,
	waterQuestion:0,
	pollenQuestion:0,
	questionAnswered:false,
	storeFeedback:'',
	skills:{raiz:false,folhas:false,polinizadores:false}};
	const app=document.getElementById('app');

function home(){
	clearEventTimers();
	app.innerHTML=`
	<div class="shell">
		<header class="topbar">
		<div class="brand">✦</div>
		<div>
		<p class="eyebrow">Laboratório de botânica</p>
		<h1>Império das <em>Angiospermas</em></h1></div></header>
		<section class="home-grid">
		<article class="mode-card panel">
		<p class="label">Jogo 01 / Estratégia</p><h2>Formação do fruto</h2>
		<p>Administre água, energia e pólen. Tome as decisões certas na ordem correta para acompanhar uma flor até o nascimento de um fruto.</p>
		<button class="play" id="start">Iniciar missão →</button></article>
		<article class="mode-card panel">
		<p class="label">Jogo 02 / Classificação</p>
		<h2>Frutos ou pseudofrutos?</h2>
		<p>Identifique a origem botânica de cada alimento e teste seus conhecimentos sobre frutos verdadeiros e pseudofrutos.</p>
		<button class="play" id="quiz">Abrir desafio →</button></article></section>
		<footer><span>Biologia em ação</span>
		<span>Escolha um laboratório para começar</span></footer></div>`;
		document.getElementById('start').onclick=game;document.getElementById('quiz').onclick=quiz}

function game(){
	clearEventTimers();
	state={...resources,
		stage:0,
		status:'Flor pronta para a polinização.',
		event:'A flor começa sem recursos. Escolha um evento para iniciar.',
		eventChoices:[],
		eventVisible:true,
		eventAlert:'',
		cooldownUntil:0,
		tool:'store',
		shopTab:'energy-pollen',
		storeQuestion:0,
		waterQuestion:0,
		pollenQuestion:0,
		questionAnswered:false,
		storeFeedback:'',
		skills:{raiz:false,folhas:false,polinizadores:false}};
		newEvent();renderGame()}

function renderGame(){
	app.innerHTML=`
	<div class="shell">
	<header class="topbar">
	<div class="brand">✦</div><div>
	<p class="eyebrow">Laboratório de botânica</p><h1>Império das <em>Angiospermas</em></h1></div>
	<button class="reset" id="home">← <span>Menu</span></button></header>
	<section class="resource-bar">
	<div class="resource">
	<span class="resource-icon">◒</span><div><small>Água</small><strong id="agua">${state.agua}</strong></div>
	<span class="unit">ml</span></div>
	<div class="resource energy">
	<span class="resource-icon">ϟ</span>
	<div><small>Energia</small><strong id="energia">${state.energia}</strong></div>
	<span class="unit">pts</span></div><div class="resource pollen">
	<span class="resource-icon">✣</span>
	<div><small>Pólen</small><strong id="polen">${state.polen}</strong></div>
	<span class="unit">grãos</span></div></section>
	<main class="grid"><section class="flower panel">
	<div class="heading"><span>01</span>
	<h2>Sua flor</h2></div><div class="scene">
	<div class="sun"></div><div class="stem"></div>
	<div class="leaf left"></div><div class="leaf right"></div>
	<div class="head"><i></i><i></i><i></i><i></i><i></i><b></b></div></div>
	<div class="caption"><span class="dot"></span>
	<p id="status">${state.status}</p></div></section>
	<section class="actions panel"><div class="heading">
	<span>02</span>
	<div><h2>Sequência vital</h2>
	<p>Escolha cada etapa na ordem correta.</p></div></div>
	<div class="action-list" id="actions"></div></section></main>
	<section class="progress panel">
	<div class="progress-top">
	<span class="label">03 / Desenvolvimento</span>
	<h2 id="title">A flor está pronta</h2></div>
	<strong class="percent" id="percent">0%</strong></div>
	<div class="track">
	<div class="fill" id="fill"></div></div>
	<div class="steps" id="steps"></div></section>
	<footer><span>Biologia em ação</span><span>Complete o ciclo para formar um fruto.</span></footer></div>`
	;document.getElementById('home').onclick=home;draw();renderTools();renderEventChoices();renderEventAlert()}

function clearEventTimers(){
	clearTimeout(eventExpiryTimer);clearTimeout(eventCooldownTimer);clearInterval(cooldownTicker);eventExpiryTimer=null;eventCooldownTimer=null;cooldownTicker=null}

function newEvent(){
	if(state.cooldownUntil>Date.now())return;const event=randomEvents[Math.floor(Math.random()*randomEvents.length)];state.event=`${event.title}: ${event.text}`;state.eventChoices=event.choices;state.eventVisible=true;state.eventAlert=event.title;clearTimeout(eventExpiryTimer);eventExpiryTimer=setTimeout(expireEvent,10000)}

function expireEvent(){
	state.eventVisible=false;state.eventChoices=[];state.cooldownUntil=Date.now()+20000;state.event='Próximo evento aleatório disponível em 20 segundos.';renderGame();clearInterval(cooldownTicker);cooldownTicker=setInterval(()=>{if(state.cooldownUntil<=Date.now()){clearInterval(cooldownTicker);cooldownTicker=null;eventCooldownTimer=null;newEvent();renderGame()}else{state.event=`Próximo evento aleatório disponível em ${Math.ceil((state.cooldownUntil-Date.now())/1000)} segundos.`;const eventText=document.getElementById('event');if(eventText)eventText.textContent=state.event}},1000);eventCooldownTimer=setTimeout(()=>{clearInterval(cooldownTicker);cooldownTicker=null;eventCooldownTimer=null;newEvent();renderGame()},20000)}

function renderEventAlert(){
	if(!state.eventAlert)return;const alert=document.createElement('div');alert.className='event-alert';alert.innerHTML=`<strong>Evento aleatório</strong><span>${state.eventAlert}</span>`;document.body.append(alert);const duration=state.eventAlertDuration||1000;state.eventAlert='';state.eventAlertDuration=1000;setTimeout(()=>alert.remove(),duration)}

function ensureGameStyles(){
	if(document.getElementById('game-tools-style'))return;const style=document.createElement('style');style.id='game-tools-style';style.textContent=`.event-alert{position:fixed;z-index:20;top:24px;left:50%;display:grid;gap:3px;min-width:220px;padding:12px 18px;border:1px solid #f1c75b;border-radius:8px;color:#65542c;background:#fff8df;box-shadow:0 10px 25px #245f4c22;text-align:center;transform:translateX(-50%);animation:event-alert-in 1s ease both}.event-alert strong{font:700 10px 'DM Mono',monospace;letter-spacing:.1em;text-transform:uppercase}.event-alert span{font-size:13px;font-weight:800}@keyframes event-alert-in{0%{opacity:0;transform:translate(-50%,-12px)}20%,80%{opacity:1;transform:translate(-50%,0)}100%{opacity:0;transform:translate(-50%,-4px)}}.game-tabs{display:flex;gap:8px;margin:20px 0 10px}.game-tabs button{padding:11px 15px;border:1px solid var(--line);border-radius:7px;color:var(--green);background:var(--card);cursor:pointer;font:700 11px 'DM Mono',monospace}.game-tabs button.active{color:#fff;background:var(--green)}.tools{padding:20px 24px;margin-bottom:20px}.tool-heading h2{margin:3px 0 5px}.tool-heading p,.plant-question{color:var(--muted);font-size:12px;line-height:1.5}.quiz-options{display:flex;gap:8px;margin-top:14px}.quiz-options button{padding:9px 13px;border:1px solid var(--line);border-radius:6px;color:var(--green);background:#fff;cursor:pointer;font-weight:700}.plant-question{margin-top:16px;padding-top:15px;border-top:1px solid var(--line)}#store-feedback{margin-top:10px;color:var(--coral);font-weight:700}.skill-tree{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px}.skill{display:grid;gap:10px;padding:14px;border:1px solid var(--line);border-radius:7px;background:#fff}.skill.unlocked{border-color:var(--green);background:#eef7eb}.skill-icon{color:var(--green);font-size:22px}.skill strong{font-size:13px}.skill p{min-height:36px;margin-top:4px;color:var(--muted);font-size:11px;line-height:1.4}.skill button{padding:8px;border:1px solid var(--green);border-radius:5px;color:var(--green);background:#fff;cursor:pointer;font-size:10px;font-weight:700}.skill button:disabled{cursor:default;opacity:.65}.flower>.event{margin:0 20px 20px}.event-actions button:hover{border-color:var(--green)!important}@media(max-width:700px){.skill-tree{grid-template-columns:1fr}.game-tabs{overflow:auto}.game-tabs button{white-space:nowrap}}`;document.head.append(style)}

function renderTools(){
	ensureGameStyles();const flower=document.querySelector('.flower');flower.insertAdjacentHTML('beforeend',`<div class="event"><span>✦</span><div><small>Diário de campo</small><p id="event">${state.event}</p></div></div>`);const bar=document.querySelector('.resource-bar');bar.insertAdjacentHTML('afterend',`<nav class="game-tabs"><button class="${state.tool==='store'?'active':''}" data-tool="store">▣ Loja</button><button class="${state.tool==='skills'?'active':''}" data-tool="skills">✦ Árvore de habilidades</button></nav><section class="tools panel" id="tools"></section>`);document.querySelectorAll('[data-tool]').forEach(button=>button.onclick=()=>{state.tool=button.dataset.tool;renderGame()});renderToolContent()}

function renderToolContent(){
	const tools=document.getElementById('tools');
	if(!tools)return;if(state.tool==='store'){
		const shops=[['energy-pollen','Energia → Pólen'],
		['water-trades','Trocas com Água'],['pollen-trades','Trocas com Pólen']];
		const questions=state.shopTab==='energy-pollen'?storeQuestions:state.shopTab==='water-trades'?waterQuestions:pollenQuestions;
		const questionIndex=state.shopTab==='energy-pollen'?state.storeQuestion:state.shopTab==='water-trades'?state.waterQuestion||0:state.pollenQuestion||0;
		const question=questions[questionIndex];
		const offers=state.shopTab==='energy-pollen'?[['energy-pollen','Trocar 5 energia por 1 pólen']]:state.shopTab==='water-trades'?[['energy-water','Trocar 5 energia por 1 água'],['water-energy','Trocar 5 água por 1 energia'],['water-pollen','Trocar 5 água por 1 pólen']]:[['pollen-energy','Trocar 1 pólen por 5 energia'],['pollen-water','Trocar 1 pólen por 5 água']];
		tools.innerHTML=`
		<div class="shop-tabs">${shops.map(shop=>`
			<button class="${state.shopTab===shop[0]?'active':''}" data-shop-tab="${shop[0]}">${shop[1]}</button>`).join('')}</div>
			<div class="tool-heading"><span class="label">Loja da flor</span>
			<h2>Trocas e conhecimento</h2><p>Responda à pergunta para liberar uma troca de recursos.</p></div>
			<div class="plant-question"><strong>${question.question}</strong>
			<div class="quiz-options">${question.options.map(option=>`<button data-store-answer="${option[0]}">${option[1]}</button>`).join('')}</div>
			<p id="store-feedback">${state.storeFeedback}</p></div>
			<div class="trade-options"><small>Escolha a troca:</small>${offers.map(offer=>`<button data-trade="${offer[0]}">${offer[1]}</button>`).join('')}</div>`;
			document.querySelectorAll('[data-shop-tab]').forEach(button=>button.onclick=()=>{state.shopTab=button.dataset.shopTab;state.storeFeedback='';renderGame()});
			document.querySelectorAll('[data-store-answer]').forEach(button=>button.onclick=()=>answerShop(button.dataset.storeAnswer));
			document.querySelectorAll('[data-trade]').forEach(button=>button.onclick=()=>tradeResource(button.dataset.trade))}else{
			const skills=[{id:'raiz',name:'Raízes eficientes',description:'Reduz em 20% o custo de água das etapas.',cost:3,icon:'⌁'},
				{id:'folhas',name:'Folhas solares',description:'Reduz em 20% o custo de energia das etapas.',cost:3,icon:'☼'},
				{id:'polinizadores',name:'Aliança floral',description:'Cada recompensa de pólen dos eventos recebe +1.',cost:4,icon:'✣'}];
				tools.innerHTML=`
				<div class="tool-heading"><span class="label">Árvore de habilidades</span><h2>Impulsione o crescimento</h2>
				<p>Invista pólen para tornar sua planta mais eficiente.</p></div>
				<div class="skill-tree">${skills.map(skill=>`<article class="skill ${state.skills[skill.id]?'unlocked':''}">
					<span class="skill-icon">${skill.icon}</span><div><strong>${skill.name}</strong><p>${skill.description}</p></div>
					<button data-skill="${skill.id}" ${state.skills[skill.id]?'disabled':''}>${state.skills[skill.id]?'Ativa':'Desbloquear · '+skill.cost+' pólen'}</button></article>`).join('')}</div>`;
					document.querySelectorAll('[data-skill]').forEach(button=>button.onclick=()=>unlockSkill(button.dataset.skill))}}

function answerShop(answer){
	const questions=state.shopTab==='energy-pollen'?storeQuestions:state.shopTab==='water-trades'?waterQuestions:pollenQuestions;
	const index=state.shopTab==='energy-pollen'?state.storeQuestion:state.shopTab==='water-trades'?state.waterQuestion||0:state.pollenQuestion||0;
	if(answer!==questions[index].options[0][0])
		{state.questionAnswered=false;state.storeFeedback='Resposta incorreta. Tente outra alternativa.';renderGame();
		return}state.questionAnswered=true;state.storeFeedback='Resposta correta! Agora escolha uma troca.';renderGame()}

function tradeResource(trade){
	const costs={"energy-pollen":['energia','polen',5,1],"energy-water":['energia','agua',5,1],"water-energy":['agua','energia',5,1],"water-pollen":['agua','polen',5,1],"pollen-energy":['polen','energia',1,5],"pollen-water":['polen','agua',1,5]};const offer=costs[trade];
	const questions=state.shopTab==='energy-pollen'?storeQuestions:state.shopTab==='water-trades'?waterQuestions:pollenQuestions;
	const index=state.shopTab==='energy-pollen'?state.storeQuestion:state.shopTab==='water-trades'?state.waterQuestion||0:state.pollenQuestion||0;
	if(!state.questionAnswered){state.storeFeedback='Responda corretamente ao questionário antes de trocar recursos.';renderGame();return}
	if(!offer||state[offer[0]]<offer[2]){state.storeFeedback=`Você precisa de ${offer[2]} ${offer[0]} para realizar essa troca.`;renderGame();return}state[offer[0]]-=offer[2];state[offer[1]]+=offer[3];state.questionAnswered=false;
	if(state.shopTab==='energy-pollen')state.storeQuestion=(index+1)%questions.length;
	else if(state.shopTab==='water-trades')state.waterQuestion=(index+1)%questions.length;
	else state.pollenQuestion=(index+1)%questions.length;state.storeFeedback=`Troca concluída: +${offer[3]} ${offer[1]}.`;renderGame()}

function unlockSkill(id){
	const costs={raiz:3,folhas:3,polinizadores:4};
	const cost=costs[id];if(state.energia<0||state.polen<cost)return;
	state.polen-=cost;state.skills[id]=true;state.event='Habilidade desbloqueada! A planta ficou mais eficiente.';renderGame()}

function effectiveCost(stage){
	const discount=(stage.resource==='agua'&&state.skills.raiz)||(stage.resource==='energia'&&state.skills.folhas);
	return discount?Math.ceil(stage.amount*.8):stage.amount}

function renderEventChoices(){
	const eventText=document.getElementById('event');
	if(!eventText)return;const parent=eventText.parentElement;parent.querySelector('.event-actions')?.remove();
	if(!state.eventChoices.length)return;
	const choices=document.createElement('div');
	choices.className='event-actions';
	choices.style.cssText='display:grid;gap:6px;margin-top:10px';
	choices.innerHTML=state.eventChoices.map((choice,index)=>`
	<button type="button" data-choice="${index}" style="padding:8px 10px;border:1px solid #d9ded4;border-radius:6px;color:#245f4c;background:#fffdf8;cursor:pointer;text-align:left;font:600 11px Manrope,sans-serif">${choice.label} <small style="float:right;color:#70817b">+${choice.amount} ${choice.resource}</small></button>`).join('');parent.append(choices);
	choices.querySelectorAll('button').forEach(button=>button.onclick=()=>collectResource(Number(button.dataset.choice)))}

function collectResource(index){
	const choice=state.eventChoices[index];
	if(!choice)return;
	const bonus=choice.resource==='polen'&&state.skills.polinizadores?1:0;
	const amount=choice.amount+bonus;state[choice.resource]+=amount;state.event=`Você adquiriu +${amount} ${choice.resource}. Escolha a próxima etapa da missão.`;state.eventChoices=[];renderGame()}

function draw(){
	const n=state.stage;document.getElementById('actions').innerHTML=stages.map((s,i)=>{const cost=effectiveCost(s);const costText=cost===s.amount?s.cost:`<s>${s.amount} ${s.resource}</s> ${cost} ${s.resource}`;
	return `<button class="action ${i===n?'ready':''}" data-i="${i}" ${i!==n?'disabled':''}>
	<span>${s.icon}</span>${s.name}<small>${costText}</small></button>`})
	.join('');document.getElementById('steps').innerHTML=stages.map((s,i)=>`<div class="step ${i<n?'done':''}">${s.name}</div>`).join('');
	const pct=Math.round(n/stages.length*100);document.getElementById('fill').style.width=`${pct}%`;
	document.getElementById('percent').textContent=`${pct}%`;
	document.getElementById('title').textContent=n===6?'Fruto formado com sucesso':n?'Próxima etapa: '+stages[n].name:'A flor está pronta';
	updatePlantGrowth(n);document.querySelectorAll('.action').forEach(b=>b.onclick=()=>advance(Number(b.dataset.i)))}

function plantStageImage(stage){
	const stages=[
	['Broto recém-germinado','<path d="M150 220V145" stroke="#245f4c" stroke-width="8" stroke-linecap="round"/><path d="M150 155C115 130 95 155 118 170" fill="#77af75"/>'],
	['Caule jovem','<path d="M150 220V95" stroke="#245f4c" stroke-width="9" stroke-linecap="round"/><path d="M148 165C105 130 82 160 120 180" fill="#5f9b6b"/><path d="M152 145C195 110 215 140 180 164" fill="#77af75"/>'],
	['Planta com folhas','<path d="M150 220V70" stroke="#245f4c" stroke-width="10" stroke-linecap="round"/><path d="M148 170C90 125 65 165 118 188" fill="#4f9163"/><path d="M152 145C210 98 235 140 180 168" fill="#69a971"/><path d="M148 115C112 78 92 108 126 132" fill="#8bbd7c"/>'],
	['Botão floral','<path d="M150 220V68" stroke="#245f4c" stroke-width="10" stroke-linecap="round"/><path d="M148 170C90 125 65 165 118 188" fill="#4f9163"/><path d="M152 145C210 98 235 140 180 168" fill="#69a971"/><circle cx="150" cy="60" r="25" fill="#f1c75b" stroke="#dc765c" stroke-width="7"/>'],
	['Flor aberta','<path d="M150 220V70" stroke="#245f4c" stroke-width="10" stroke-linecap="round"/><path d="M148 170C90 125 65 165 118 188" fill="#4f9163"/><path d="M152 145C210 98 235 140 180 168" fill="#69a971"/><g fill="#e98783" stroke="#dc765c" stroke-width="4"><ellipse cx="150" cy="42" rx="24" ry="39"/><ellipse cx="150" cy="78" rx="24" ry="39" transform="rotate(180 150 60)"/><ellipse cx="130" cy="60" rx="39" ry="24"/><ellipse cx="170" cy="60" rx="39" ry="24"/></g><circle cx="150" cy="60" r="14" fill="#f1c75b"/>'],
	['Fruto formado','<path d="M150 220V75" stroke="#245f4c" stroke-width="10" stroke-linecap="round"/><path d="M148 170C90 125 65 165 118 188" fill="#4f9163"/><path d="M152 145C210 98 235 140 180 168" fill="#69a971"/><path d="M150 38c-29 0-42 25-42 48 0 35 22 55 42 55s42-20 42-55c0-23-13-48-42-48Z" fill="#dc765c"/><path d="M150 38V22" stroke="#245f4c" stroke-width="7"/><path d="M150 25c18-16 32-5 34 10-15 4-27 1-34-10Z" fill="#77af75"/>'],
];
const [label,art]=stages[Math.min(stage,stages.length-1)];
return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240">
	<rect width="300" height="240" rx="14" fill="#e2f0df"/>
	<circle cx="235" cy="45" r="28" fill="#f1c75b" opacity=".65"/>${art}
	<title>${label}</title></svg>`)}`}

function updatePlantGrowth(stage){
	const scene=document.querySelector('.scene');
	if(!scene)return;
	scene.classList.remove('growth-0','growth-1','growth-2','growth-3','growth-4','growth-5','growth-6');
	scene.classList.add(`growth-${stage}`);
	let image=scene.querySelector('.plant-stage-image');
	if(!image){image=document.createElement('img');
		image.className='plant-stage-image';
		image.alt='Estágio de crescimento da planta';
		scene.append(image)}image.src=plantStageImage(stage);
		image.alt=`Planta no estágio ${stage+1} de crescimento`}

function advance(i){
	if(i!==state.stage)return;
	const s=stages[i];
	const cost=effectiveCost(s);
	if(state[s.resource]<cost){
		state.event='Recursos insuficientes. Visite a Loja, escolha um evento ou desbloqueie uma habilidade.';
		renderGame();return}
		state[s.resource]-=cost;state.stage++;state.status=state.stage===6?'Ciclo completo: seu fruto nasceu!':`${s.name} concluída. Próxima: ${stages[state.stage].name}.`;
		if(state.stage===6){state.event=s.message;state.eventChoices=[];confetti()}else{newEvent()}renderGame()}

function ensureQuizStyles(){
	if(document.getElementById('quiz-design-style'))return;
	const style=document.createElement('style');
	style.id='quiz-design-style';style.textContent=`.quiz-shell{width:min(100%,920px)}.quiz-status{display:flex;justify-content:center;gap:10px;margin-bottom:18px}.quiz-status span{padding:10px 13px;border:1px solid var(--line);border-radius:7px;background:var(--card);color:var(--muted);font:500 11px 'DM Mono',monospace}.quiz-status strong{color:var(--green);font-weight:700}.quiz-image-frame{display:grid;place-items:center;width:min(100%,760px);height:min(58vh,480px);min-height:340px;margin:10px auto 18px;border-radius:8px;background:linear-gradient(135deg,#e2f0df,#f5eedb);overflow:hidden}.quiz-image-frame img{display:block;width:100%;height:100%;object-fit:contain}.quiz-card h2{font-size:30px}.quiz-card #quiz-text{margin-top:7px;color:var(--muted);font-size:13px}.quiz-buttons{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:22px}.quiz-buttons button{padding:13px;border:1px solid var(--line);border-radius:7px;color:var(--green);background:#fff;cursor:pointer;font:700 13px Manrope,sans-serif;transition:.2s}.quiz-buttons button:hover:not(:disabled){border-color:var(--green);transform:translateY(-2px)}.quiz-buttons button:disabled{cursor:not-allowed;opacity:.5}.quiz-card #quiz-result{min-height:22px;margin-top:15px;color:var(--coral);font-size:12px;line-height:1.45}.quiz-final{margin:12px 0 22px;color:var(--muted);font-size:14px}.quiz-final strong{color:var(--green)}@media(max-width:520px){.quiz-status{gap:5px}.quiz-status span{padding:9px 7px;font-size:9px}.quiz-image-frame{height:58vh;min-height:260px}.quiz-buttons{grid-template-columns:1fr}}
`;document.head.append(style)}
const quizItems=[
	{name:'Abacate',
		type:'Fruto',
		image:'abacate.jpeg',
		fact:'O abacate se desenvolve a partir do ovário da flor.'},
	{name:'Abóbora',
		type:'Fruto',
		image:'abóbora.jpeg',
		fact:'A abóbora se desenvolve a partir do ovário da flor.'},
	{name:'Açaí',
		type:'Fruto',
		image:'açaí.jpeg',
		fact:'O açaí se desenvolve a partir do ovário da flor.'},
	{name:'Berinjela',
		type:'Fruto',
		image:'berinjela.jpeg',
		fact:'A berinjela se desenvolve a partir do ovário da flor.'},
	{name:'Cacau',
		type:'Fruto',
		image:'cacau.jpeg',
		fact:'O cacau se desenvolve a partir do ovário da flor.'},
	{name:'Café',
		type:'Fruto',
		image:'café.jpeg',
		fact:'O café se desenvolve a partir do ovário da flor.'},
	{name:'Damasco',
		type:'Fruto',
		image:'damasco.jpeg',
		fact:'O damasco é fruto carnudo que se desenvolve a partir do ovário da flor.'},
	{name:'Jabuticaba',
		type:'Fruto',
		image:'jabuticaba.jpeg',
		fact:'A jabuticaba se desenvolve a partir do ovário da flor.'},
	{name:'Laranja',
		type:'Fruto',
		image:'laranja.jpeg',
		fact:'A laranja se desenvolve a partir do ovário da flor.'},
	{name:'Limão',
		type:'Fruto',
		image:'limão.jpeg',
		fact:'O limão se desenvolve a partir do ovário da flor.'},
	{name:'Mamão',
		type:'Fruto',
		image:'mamão.jpeg',
		fact:'O mamão se desenvolve a partir do ovário da flor.'},
	{name:'Melancia',
		type:'Fruto',
		image:'melancia.jpeg',
		fact:'A melancia se desenvolve a partir do ovário da flor.'},
	{name:'Melão',
		type:'Fruto',
		image:'melão.jpeg',
		fact:'O melão se desenvolve a partir do ovário da flor.'},
	{name:'Mexerica',
		type:'Fruto',
		image:'mexerica.jpeg',
		fact:'A mexerica se desenvolve a partir do ovário da flor.'},
	{name:'Pera',
		type:'Pseudofruto',
		image:'pera.jpeg',
		fact:'Na pera a parte suculenta e carnosa se desenvolve a partir do receptáculo floral.'},
	{name:'Pitaia',
		type:'Fruto',
		image:'pitaia.jpeg',
		fact:'A pitaia se desenvolve a partir do ovário da flor.'},
	{name:'Pitanga',
		type:'Fruto',
		image:'pitanga.jpeg',
		fact:'A pitanga se desenvolve a partir do ovário da flor.'},
	{name:'Vagem',
		type:'Fruto',
		image:'vagem.jpeg',
		fact:'A vagem se desenvolve a partir do ovário da flor.'},
	{name:'Amora',
		type:'Pseudofruto',
		image:'amora.jpeg',
		fact:'A amora se desenvolve a partir de vários ovários da flor.'},
	{name:'Framboesa',
		type:'Pseudofruto',
		image:'framboesa.jpeg',
		fact:'A framboesa se desenvolve a partir de vários ovários da flor.'},
	{name:'Rosa-Mosqueta',
		type:'Pseudofruto',
		image:'rosa.jpg',
		fact:'A rosa-mosqueta se desenvolve a partir do receptáculo floral.'},
	{name:'Jaca',
		type:'Pseudofruto',
		image:'jaca.jpg',
		fact:'A jaca se desenvolve a partir de vários ovários da flor.'},
	{name:'Abacaxi',
		type:'Pseudofruto',
		image:'abacaxi.jpeg',
		fact:'O abacaxi se desenvolve a partir de várias flores de uma mesma inflorescência.'},
	{name:'Banana',
		type:'Fruto',
		image:'banana.jpeg',
		fact:'A banana é um fruto desenvolvido a partir do ovário.'},
	{name:'Caju',
		type:'Pseudofruto',
		image:'caju.jpg',
		fact:'A parte carnosa do caju se origina principalmente do pedúnculo floral.'},
	{name:'Figo',
		type:'Pseudofruto',
		image:'figo.jpeg',
		fact:'O figo é uma inflorescência cuja parte carnosa não é apenas o ovário.'},
	{name:'Goiaba',
		type:'Fruto',
		image:'goiaba.jpeg',
		fact:'A goiaba se forma a partir do ovário da flor.'},
	{name:'Maçã',
		type:'Pseudofruto',
		image:'maçã.jpeg',
		fact:'A parte carnosa da maçã se desenvolve principalmente do receptáculo floral.'},
	{name:'Morango',
		type:'Pseudofruto',
		image:'morango.jpeg',
		fact:'A parte vermelha do morango é um receptáculo floral desenvolvido.'},
	{name:'Pêssego',
		type:'Fruto',
		image:'pêssego.jpeg',
		fact:'O pêssego é uma drupa formada a partir do ovário.'},
	{name:'Tomate',
		type:'Fruto',
		image:'tomate.jpeg',
		fact:'O tomate é um fruto porque se desenvolve do ovário e contém sementes.'},
	{name:'Uva',
		type:'Fruto',
		image:'uva.jpeg',
		fact:'A uva é um fruto simples originado do ovário da flor.'},
];
let quizTimer=null;
let quizAdvanceTimer=null;

function shuffleQuiz(){
	const copy=[...quizItems];
	for(let index=copy.length-1;index>0;index-=1){
		const target=Math.floor(Math.random()*(index+1));
		[copy[index],copy[target]]=[copy[target],copy[index]]}return copy}

function quiz(){
	clearInterval(quizTimer);
	clearTimeout(quizAdvanceTimer);
	ensureQuizStyles();
	const record=Number(localStorage.getItem('angiospermasQuizRecord')||0);
	let rounds=shuffleQuiz();let current=0;
	let score=0;let time=15;
	let quizDeadline=0;
	app.innerHTML=`
	<div class="shell quiz-shell"><header class="topbar">
	<div class="brand">✦</div><div><p class="eyebrow">Laboratório de botânica</p>
	<h1>Frutos ou <em>pseudofrutos?</em></h1></div>
	<button class="back" id="back">← Menu</button></header>
	<section class="quiz-status"><span>⏱ Tempo: <strong id="quiz-time">15</strong>s</span>
	<span>Pontuação: <strong id="quiz-score">0</strong></span><span>Recorde: <strong id="quiz-record">${record}</strong></span></section>
	<section class="quiz-card panel"><p class="label">Jogo 02 / Classificação</p><div class="quiz-image-frame"><img id="quiz-image" alt="Imagem do alimento" /></div>
	<h2 id="fruit"></h2><p id="quiz-text"></p><div class="quiz-buttons"><button data-answer="Fruto">Fruto</button>
	<button data-answer="Pseudofruto">Pseudofruto</button></div><p id="quiz-result" role="status"></p></section></div>`;
	document.getElementById('back').onclick=()=>{clearInterval(quizTimer);
		clearTimeout(quizAdvanceTimer);home()};
		const image=document.getElementById('quiz-image');
		const fruit=document.getElementById('fruit');
		const text=document.getElementById('quiz-text');
		const result=document.getElementById('quiz-result');
		const buttons=document.querySelectorAll('[data-answer]');
		function loadQuizRound(){if(current>=rounds.length)rounds=shuffleQuiz();
		const item=rounds[current%rounds.length];quizDeadline=Date.now()+15000;time=15;image.src=item.image;image.alt=`Imagem de ${item.name}`;
		fruit.textContent=item.name;text.textContent='Este alimento é um fruto verdadeiro ou um pseudofruto?';
		result.textContent='';buttons.forEach(button=>{button.disabled=false});
		document.getElementById('quiz-time').textContent=time}
		function answerQuiz(answer){
			const item=rounds[current%rounds.length];buttons.forEach(button=>button.disabled=true);
			clearInterval(quizTimer);if(answer===item.type){score+=10;result.textContent=`Correto! ${item.fact}`;
			document.getElementById('quiz-score').textContent=score;current+=1;quizAdvanceTimer=setTimeout(loadQuizRound,900)}
			else{score=Math.max(0,score-5);
				document.getElementById('quiz-score').textContent=score;
				finishQuiz(`Resposta incorreta. ${item.fact}`)}}
				function timeoutQuiz(){
					const item=rounds[current%rounds.length];buttons.forEach(button=>button.disabled=true);
					finishQuiz(`Tempo esgotado. A resposta era ${item.type}.`)}
					function finishQuiz(message=''){
						clearInterval(quizTimer);
						clearTimeout(quizAdvanceTimer);
						const previous=Number(localStorage.getItem('angiospermasQuizRecord')||0);
						if(score>previous)localStorage.setItem('angiospermasQuizRecord',score);
						document.querySelector('.quiz-card').innerHTML=`
						<p class="label">Jogo encerrado</p><h2>${message?'Rodada encerrada':'Rodada finalizada'}</h2>
						<p class="quiz-final">${message?message+' ':''}Você fez <strong>${score}</strong> pontos. Recorde: <strong>${Math.max(score,previous)}</strong>.</p>
						<button class="play" id="restart-quiz">↻ Jogar novamente</button>`;
						document.getElementById('restart-quiz').onclick=quiz}buttons.forEach(button=>button.onclick=()=>answerQuiz(button.dataset.answer));
						loadQuizRound();
						quizTimer=setInterval(()=>{time=Math.max(0,Math.ceil((quizDeadline-Date.now())/1000));
						document.getElementById('quiz-time').textContent=time;
						if(time<=0){clearInterval(quizTimer);timeoutQuiz()}},200)}

function renderShopStyles(){
	if(document.getElementById('shop-design-style'))return;
	const style=document.createElement('style');style.id='shop-design-style';style.textContent=`.shop-tabs,.trade-options{display:flex;flex-wrap:wrap;gap:8px}.shop-tabs{margin-bottom:22px;padding-bottom:14px;border-bottom:1px solid var(--line)}.shop-tab,.trade-button{border:1px solid var(--line);border-radius:7px;background:var(--card);color:var(--green);cursor:pointer;font:700 11px 'DM Mono',monospace;transition:.2s}.shop-tab{padding:11px 14px}.shop-tab:hover,.trade-button:hover{border-color:var(--green);transform:translateY(-1px)}.shop-tab.active{background:var(--green);border-color:var(--green);color:#fff}.trade-options{align-items:center;margin-top:18px;padding-top:16px;border-top:1px solid var(--line)}.trade-options>small{width:100%;color:var(--muted);font:500 10px 'DM Mono',monospace;text-transform:uppercase;letter-spacing:.08em}.trade-button{padding:11px 13px;text-align:left;font-family:Manrope,sans-serif;font-size:11px}.trade-button strong{display:block;color:var(--ink);font-size:12px}.trade-button span{display:block;margin-top:3px;color:var(--muted);font:500 10px 'DM Mono',monospace}`;
	document.head.append(style)}

function renderToolContent(){
	const tools=document.getElementById('tools');
	if(!tools)return;renderShopStyles();
	const energyLabel=document.querySelector('.resource.energy small');
	if(energyLabel)energyLabel.textContent='ATP (energia)';
	document.querySelectorAll('.action small').forEach(label=>{label.innerHTML=label.innerHTML.replaceAll('energia','ATP (energia)')});
	if(state.tool!=='store')return;
	const shops=[['energy-pollen','ATP → pólen'],['water-trades','Água ↔ recursos'],['pollen-trades','Pólen ↔ recursos']];
	const questions=state.shopTab==='energy-pollen'?storeQuestions:state.shopTab==='water-trades'?waterQuestions:pollenQuestions;
	const questionIndex=state.shopTab==='energy-pollen'?state.storeQuestion:state.shopTab==='water-trades'?state.waterQuestion||0:state.pollenQuestion||0;
	const question=questions[questionIndex];
	const offers=state.shopTab==='energy-pollen'?[['energy-pollen','Trocar 5 ATP por 1 pólen','Consome 5 pontos de ATP (energia)']]:
	state.shopTab==='water-trades'?[['energy-water','Trocar 1 ATP por 5 água','Conversão equivalente: 5 água = 1 ATP'],['water-energy','Trocar 5 água por 1 ATP','Conversão equivalente: 5 água = 1 ATP'],['water-pollen','Trocar 25 água por 1 pólen','Conversão equivalente: 25 água = 1 pólen']]:[['pollen-energy','Trocar 1 pólen por 5 ATP','Conversão equivalente: 5 água = 1 ATP'],['pollen-water','Trocar 1 pólen por 25 água','Conversão equivalente: 25 água = 1 pólen']];
	tools.innerHTML=`<div class="shop-tabs">${shops.map(shop=>`
		<button class="shop-tab ${state.shopTab===shop[0]?'active':''}" data-shop-tab="${shop[0]}">${shop[1]}</button>`)
		.join('')}</div><div class="tool-heading"><span class="label">Loja da flor</span><h2>Trocas e conhecimento</h2>
		<p>Responda corretamente para liberar uma troca de recursos.</p></div><div class="plant-question"><strong>${question.question}</strong>
		<div class="quiz-options">${question.options.map(option=>`
			<button data-store-answer="${option[0]}">${option[1]}</button>`)
			.join('')}</div><p id="store-feedback">${state.storeFeedback}</p></div><div class="trade-options"><small>Escolha a troca</small>${offers.map(offer=>`
				<button class="trade-button" data-trade="${offer[0]}"><strong>${offer[1]}</strong><span>${offer[2]}</span></button>`).join('')}</div>`;
				document.querySelectorAll('[data-shop-tab]').forEach(button=>button.onclick=()=>{state.shopTab=button.dataset.shopTab;state.storeFeedback='';state.questionAnswered=false;
					renderGame()});document.querySelectorAll('[data-store-answer]').forEach(button=>button.onclick=()=>answerShop(button.dataset.storeAnswer));
					document.querySelectorAll('[data-trade]').forEach(button=>button.onclick=()=>tradeResource(button.dataset.trade))}

function tradeResource(trade){
	const costs={'energy-pollen':['energia','polen',5,1],'energy-water':['energia','agua',1,5],'water-energy':['agua','energia',5,1],'water-pollen':['agua','polen',25,1],'pollen-energy':['polen','energia',1,5],'pollen-water':['polen','agua',1,25]};
	const offer=costs[trade];
	const questions=state.shopTab==='energy-pollen'?storeQuestions:state.shopTab==='water-trades'?waterQuestions:pollenQuestions;
	const index=state.shopTab==='energy-pollen'?state.storeQuestion:state.shopTab==='water-trades'?state.waterQuestion||0:state.pollenQuestion||0;
	if(!state.questionAnswered){state.storeFeedback='Responda corretamente ao questionário antes de trocar recursos.';
		renderGame();return}
		if(!offer||state[offer[0]]<offer[2]){
			const names={energia:'ATP (energia)',agua:'água',polen:'pólen'};state.storeFeedback=`Você precisa de ${offer[2]} ${names[offer[0]]} para realizar essa troca.`;
			renderGame();
			return}state[offer[0]]-=offer[2];state[offer[1]]+=offer[3];
			state.questionAnswered=false;
			if(state.shopTab==='energy-pollen')state.storeQuestion=(index+1)%questions.length;
			else if(state.shopTab==='water-trades')state.waterQuestion=(index+1)%questions.length;
			else state.pollenQuestion=(index+1)%questions.length;state.storeFeedback='Troca concluída com sucesso.';
			renderGame()}

const skillRounds=[
	[{id:'raiz-forte',
		name:'Raízes fortes',
		description:'Reduz em 20% os custos de água.',
		cost:3,
		icon:'⌁'},
	{id:'folhas-solares',
			name:'Folhas solares',
			description:'Reduz em 20% os custos de ATP.',
			cost:3,
			icon:'☼'},
	{id:'polen-extra',
		name:'Pólen abundante',
		description:'Eventos de pólen rendem +1.',
		cost:4,
		icon:'✣'}],
	[{id:'cuticula',
		name:'Cutícula protetora',
		description:'A primeira ameaça causa 20% menos dano.',
		cost:5,
		icon:'◇'},
	{id:'xilema',
		name:'Xilema eficiente',
		description:'Reduz em 20% os custos de água novamente.',
		cost:5,
		icon:'╎'},
	{id:'nectario',
		name:'Néctar atraente',
		description:'Eventos de ATP rendem +5.',
		cost:6,
		icon:'✺'}],
	[{id:'defesa',
		name:'Defesa natural',
		description:'Ameaças causam 30% menos dano.',
		cost:7,
		icon:'⬡'},
	{id:'reserva',
		name:'Reserva nutritiva',
		description:'Ao defender, recupera 10 de vida.',
		cost:7,
		icon:'●'},
	{id:'maturacao',
		name:'Maturação acelerada',
		description:'Reduz em 15% todos os custos restantes.',
		cost:8,
		icon:'✦'}],
];

const threatEvents=[
	{title:'Praga de pulgões',
		text:'Pulgões atacaram os brotos. Gaste recursos para proteger a planta.',
		resource:'polen',
		amount:1,
		damage:25},
	{title:'Seca repentina',
		text:'O solo está ressecando e as folhas começam a murchar.',
		resource:'agua',
		amount:20,
		damage:30},
	{title:'Noite fria',
		text:'A temperatura caiu e o metabolismo da flor desacelerou.',
		resource:'energia',
		amount:5,
		damage:20},
	{title:'Fungo nas folhas',
		text:'Manchas surgiram nas folhas. A planta precisa de uma defesa imediata.',
		resource:'agua',
		amount:25,
		damage:35},
	{title:'Lagartas nos brotos',
		text:'Lagartas começaram a comer os brotos novos antes da próxima etapa.',
		resource:'polen',
		amount:1,
		damage:25},
	{title:'Ventania forte',
		text:'Uma ventania danificou folhas e ameaça interromper o crescimento.',
		resource:'energia',
		amount:6,
		damage:30},
];

function resetMission(){
	clearEventTimers();
	state={...resources,stage:0,health:100,maxHealth:100,status:'Flor pronta para a polinização.',event:'A flor começa sem recursos. Escolha um evento para iniciar.',
		eventChoices:[],eventVisible:true,eventAlert:'',eventAlertDuration:1000,eventThreat:null,cooldownUntil:0,eventsCompleted:0,lastEventKey:'',lastEventType:'',eventTypeStreak:0,rewardBoostUnlocked:false,tool:'store',shopTab:'energy-pollen',storeQuestion:0,waterQuestion:0,pollenQuestion:0,questionAnswered:false,storeFeedback:'',skillRound:0,purchasedSkills:[],skills:{raiz:false,folhas:false,polinizadores:false},cycleRewardPending:false,cycleRewardClaimed:false};newEvent();renderGame()}
game=resetMission;

function renderPlantHealth(){
	const flower=document.querySelector('.flower');
	if(!flower)return;
	let healthBox=document.getElementById('plant-health');
	if(!healthBox){healthBox=document.createElement('div');healthBox.id='plant-health';
		healthBox.innerHTML='<div class="health-line"><span>Vida da planta</span><strong id="health-value"></strong></div><div class="health-track"><div id="health-fill"></div></div><button class="restart-game" id="restart-game" type="button">↻ Recomeçar missão</button>';
		flower.insertBefore(healthBox,flower.querySelector('.caption'));
		document.getElementById('restart-game').onclick=resetMission}
		const health=Math.max(0,state.health??100);
		const maximum=Math.max(100,state.maxHealth??100);
		const ratio=health/maximum;
		const scene=document.querySelector('.scene');
		scene.classList.remove('health-100','health-50','health-25','health-0');
		scene.classList.add(health<=0?'health-0':ratio<=.25?'health-25':ratio<=.5?'health-50':'health-100');
		document.getElementById('health-value').textContent=`${health} / ${maximum}`;
		document.getElementById('health-fill').style.width=`${Math.min(100,ratio*100)}%`;
		document.getElementById('health-fill').style.background=ratio<=.25?'#dc765c':ratio<=.5?'#f1a94b':'#61a26d';const eventPanel=document.querySelector('.flower>.event');if(eventPanel)eventPanel.style.display=state.eventVisible===false?'none':'';
		const finished=health<=0||state.stage===stages.length;
		const restartButton=document.getElementById('restart-game');restartButton.style.display=finished?'inline-flex':'none';
		if(health<=0){document.getElementById('status').textContent='A planta morreu. Reinicie a missão para tentar novamente.';
		document.querySelectorAll('.action').forEach(button=>button.disabled=true)}
		else if(state.stage===stages.length){
			document.getElementById('status').textContent='Fruto formado com sucesso! Você completou a missão.'}}

function ensurePlantStyles(){
	if(document.getElementById('plant-health-style'))return;
	const style=document.createElement('style');style.id='plant-health-style';
	style.textContent=`#plant-health{padding:13px 20px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.health-line{display:flex;justify-content:space-between;color:var(--muted);font:500 10px 'DM Mono',monospace;text-transform:uppercase}.health-line strong{color:var(--green)}.health-track{height:7px;margin-top:8px;overflow:hidden;border-radius:8px;background:#e4e8df}.health-track>div{height:100%;border-radius:inherit;transition:width .35s,background .35s}.restart-game{display:none;align-items:center;gap:6px;margin-top:12px;padding:9px 12px;border:1px solid var(--green);border-radius:7px;color:#fff;background:var(--green);cursor:pointer;font:700 11px 'Manrope',sans-serif}.restart-game:hover{background:#347d5d}.cycle-reward{margin:16px 0;padding:16px;border:1px solid #f1c75b;border-radius:8px;background:#fff8df}.cycle-reward h3{margin:3px 0;color:var(--ink);font:700 20px Fraunces,serif}.cycle-reward p{color:var(--muted);font-size:12px}.reward-options{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.reward-options button{padding:10px 12px;border:1px solid var(--green);border-radius:7px;color:var(--green);background:#fff;cursor:pointer;font:700 11px Manrope,sans-serif}.reward-options button:hover{color:#fff;background:var(--green)}.scene{transition:background .5s ease}.scene .stem,.scene .leaf,.scene .head,.plant-stage-image{transition:all .5s ease}.plant-stage-image{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;z-index:3;pointer-events:none}.scene>.sun,.scene>.stem,.scene>.leaf,.scene>.head{opacity:.12}.scene.growth-0{background:linear-gradient(#edf4e8,#f5eedb)}.scene.growth-6{background:linear-gradient(#d6ecda,#f6e9c9)}.scene.health-50 .plant-stage-image{filter:saturate(.55) brightness(.9)}.scene.health-25 .plant-stage-image{filter:saturate(.2) brightness(.75)}.scene.health-0 .plant-stage-image{filter:grayscale(1) brightness(.45)}.skill-progress{margin-top:14px;color:var(--muted);font:500 10px 'DM Mono',monospace;text-transform:uppercase}`;
	document.head.append(style)}

const plantObserver=new MutationObserver(()=>{plantObserver.disconnect();
	ensurePlantStyles();renderPlantHealth();
	plantObserver.observe(app,{childList:true,subtree:true})});
	plantObserver.observe(app,{childList:true,subtree:true});

function renderSkillTree(tools){
	const skills=skillRounds[state.skillRound]||[];
	const rewardPanel=state.cycleRewardPending?`
	<div class="cycle-reward"><span class="label">Recompensa do segundo ciclo</span>
	<h3>Escolha um impulso para a planta</h3><p>Você completou dois ciclos de habilidades.</p>
	<div class="reward-options"><button data-cycle-reward="agua">+100 água</button>
	<button data-cycle-reward="energia">+20 ATP</button><button data-cycle-reward="polen">+4 pólen</button></div></div>`:'';tools.innerHTML=`
	<div class="tool-heading"><span class="label">Árvore de habilidades · Rodada ${Math.min(state.skillRound+1,3)} / 3</span>
	<h2>Impulsione o crescimento</h2><p>Compre os três buffs da rodada para liberar o próximo conjunto. Limite total: 9 buffs.</p></div>${rewardPanel}
	<div class="skill-tree">${skills.map(skill=>{const bought=state.purchasedSkills.includes(skill.id);
		const blocked=state.purchasedSkills.length<state.skillRound*3;
		return `<article class="skill ${bought?'unlocked':''}"><span class="skill-icon">${skill.icon}</span>
		<div><strong>${skill.name}</strong><p>${skill.description}</p></div>
		<button data-skill="${skill.id}" ${bought||blocked?'disabled':''}>${bought?'Ativa':blocked?'Complete a rodada anterior':'Desbloquear · '+skill.cost+' pólen'}</button></article>`}).join('')}</div>
		<p class="skill-progress">Buffs comprados: ${state.purchasedSkills.length} / 9</p>`;
		document.querySelectorAll('[data-skill]').forEach(button=>button.onclick=()=>unlockSkill(button.dataset.skill));
		document.querySelectorAll('[data-cycle-reward]').forEach(button=>button.onclick=()=>claimCycleReward(button.dataset.cycleReward))}

function claimCycleReward(resource){
	if(!state.cycleRewardPending||state.cycleRewardClaimed)return;
	const rewards={agua:100,energia:20,polen:4};
	state[resource]+=rewards[resource];
	state.cycleRewardPending=false;
	state.cycleRewardClaimed=true;
	state.skillRound=2;
	state.event=`Recompensa recebida: +${rewards[resource]} ${resource==='energia'?'ATP (energia)':resource}. Terceiro ciclo de buffs liberado.`;
	renderGame()}

function renderToolContent(){
	const tools=document.getElementById('tools');
	if(!tools)return;renderShopStyles();
	const energyLabel=document.querySelector('.resource.energy small');
	if(energyLabel)energyLabel.textContent='ATP (energia)';
	document.querySelectorAll('.action small').forEach(label=>{label.innerHTML=label.innerHTML.replaceAll('energia','ATP (energia)')});
	if(state.tool!=='store'){renderSkillTree(tools);
		return}const shops=[['energy-pollen','ATP → pólen'],['water-trades','Água ↔ recursos'],['pollen-trades','Pólen ↔ recursos']];
		const questions=state.shopTab==='energy-pollen'?storeQuestions:state.shopTab==='water-trades'?waterQuestions:pollenQuestions;
		const questionIndex=state.shopTab==='energy-pollen'?state.storeQuestion:state.shopTab==='water-trades'?state.waterQuestion||0:state.pollenQuestion||0;
		const question=questions[questionIndex];
		const offers=state.shopTab==='energy-pollen'?[['energy-pollen','Trocar 5 ATP por 1 pólen','Consome 5 pontos de ATP (energia)']]:state.shopTab==='water-trades'?[['energy-water','Trocar 1 ATP por 5 água','Conversão equivalente: 5 água = 1 ATP'],['water-energy','Trocar 5 água por 1 ATP','Conversão equivalente: 5 água = 1 ATP'],['water-pollen','Trocar 25 água por 1 pólen','Conversão equivalente: 25 água = 1 pólen']]:[['pollen-energy','Trocar 1 pólen por 5 ATP','Conversão equivalente: 5 água = 1 ATP'],['pollen-water','Trocar 1 pólen por 25 água','Conversão equivalente: 25 água = 1 pólen']];
		tools.innerHTML=`
		<div class="shop-tabs">${shops.map(shop=>`
			<button class="shop-tab ${state.shopTab===shop[0]?'active':''}" data-shop-tab="${shop[0]}">${shop[1]}</button>`)
			.join('')}</div><div class="tool-heading">
			<span class="label">Loja da flor</span><h2>Trocas e conhecimento</h2>
			<p>Responda corretamente para liberar uma troca de recursos.</p></div>
			<div class="plant-question"><strong>${question.question}</strong>
			<div class="quiz-options">${question.options.map(option=>`
				<button data-store-answer="${option[0]}">${option[1]}</button>`)
				.join('')}</div><p id="store-feedback">${state.storeFeedback}</p></div>
				<div class="trade-options"><small>Escolha a troca</small>${offers.map(offer=>`
					<button class="trade-button" data-trade="${offer[0]}"><strong>${offer[1]}</strong>
					<span>${offer[2]}</span></button>`).join('')}</div>`;document.querySelectorAll('[data-shop-tab]').forEach(button=>button.onclick=()=>{state.shopTab=button.dataset.shopTab;state.storeFeedback='';
					state.questionAnswered=false;renderGame()});
					document.querySelectorAll('[data-store-answer]').forEach(button=>button.onclick=()=>answerShop(button.dataset.storeAnswer));
					document.querySelectorAll('[data-trade]').forEach(button=>button.onclick=()=>tradeResource(button.dataset.trade))}

function unlockSkill(id){
	const skill=skillRounds[state.skillRound]?.find(item=>item.id===id);
	if(!skill||state.purchasedSkills.includes(id)||state.polen<skill.cost)return;
	state.polen-=skill.cost;
	state.purchasedSkills.push(id);
	if(id==='raiz-forte')state.skills.raiz=true;
	if(id==='folhas-solares')state.skills.folhas=true;
	if(id==='polen-extra')state.skills.polinizadores=true;
	if(state.purchasedSkills.length%3===0&&state.skillRound<2){state.skillRound+=1;state.event='Rodada completa! Novos buffs foram liberados na árvore.'}renderGame()}

function effectiveCost(stage){
	let multiplier=1;
	if((stage.resource==='agua'&&state.skills.raiz)||(stage.resource==='energia'&&state.skills.folhas))multiplier*=.8;
	if(state.purchasedSkills.includes('xilema')&&stage.resource==='agua')multiplier*=.8;
	if(state.purchasedSkills.includes('maturacao'))multiplier*=.85;
	return Math.ceil(stage.amount*multiplier)}

function newEvent(){
	if(state.cooldownUntil>Date.now())return;
	const isThreat=Math.random()<.4;
	state.eventThreat=isThreat?threatEvents[Math.floor(Math.random()*threatEvents.length)]:null;
	if(state.eventThreat){state.event=`${state.eventThreat.title}: ${state.eventThreat.text}`;state.eventChoices=[]}
	else{const event=randomEvents[Math.floor(Math.random()*randomEvents.length)];
		state.event=`${event.title}: ${event.text}`;state.eventChoices=event.choices}
		state.eventVisible=true;state.eventAlert=isThreat?'Ameaça à planta!':state.event.split(':')[0];
		clearTimeout(eventExpiryTimer);eventExpiryTimer=setTimeout(expireEvent,10000)}

function renderEventChoices(){
	const eventText=document.getElementById('event');
	if(!eventText)return;
	const parent=eventText.parentElement;parent.querySelector('.event-actions')?.remove();
	const actions=document.createElement('div');
	actions.className='event-actions';
	actions.style.cssText='display:grid;gap:6px;margin-top:10px';
	if(state.eventThreat){
		actions.innerHTML=`
		<button type="button" data-defend="true" style="padding:8px 10px;border:1px solid #dc765c;border-radius:6px;color:#9d4939;background:#fff;cursor:pointer;text-align:left;font:700 11px Manrope,sans-serif">Defender a planta: ${state.eventThreat.amount} ${state.eventThreat.resource}</button>`;
		actions.querySelector('[data-defend]').onclick=defendPlant}
		else if(state.eventChoices.length){
			actions.innerHTML=state.eventChoices.map((choice,index)=>`
			<button type="button" data-choice="${index}" style="padding:8px 10px;border:1px solid #d9ded4;border-radius:6px;color:#245f4c;background:#fffdf8;cursor:pointer;text-align:left;font:600 11px Manrope,sans-serif">${choice.label} <small style="float:right;color:#70817b">+${choice.amount} ${choice.resource==='energia'?'ATP (energia)':choice.resource}</small></button>`)
			.join('');
			actions.querySelectorAll('[data-choice]').forEach(button=>button.onclick=()=>collectResource(Number(button.dataset.choice)))}
			if(actions.innerHTML)parent.append(actions)}

function defendPlant(){
	const threat=state.eventThreat;
	if(!threat)return;
	if(state[threat.resource]<threat.amount){state.event='Você não tem recursos suficientes. A ameaça ainda está ativa.';
		renderGame();return}state[threat.resource]-=threat.amount;state.event='Ameaça neutralizada! A planta está protegida.';
		if(state.purchasedSkills.includes('reserva'))state.health=Math.min(100,state.health+10);state.eventThreat=null;
		state.eventChoices=[];renderGame()}

function ensureFeedbackStyles(){
	if(document.getElementById('plant-feedback-style'))return;
	const style=document.createElement('style');
	style.id='plant-feedback-style';style.textContent='.scene{position:relative}.plant-feedback{position:absolute;z-index:8;top:18px;right:18px;padding:7px 10px;border:1px solid #f1c75b;border-radius:999px;background:#fff8df;box-shadow:0 6px 14px #245f4c22;font-size:24px;animation:plant-feedback-pop 1s ease both}.scene.damage-flash .plant-stage-image{animation:plant-damage-shake 1s ease both;filter:sepia(1) saturate(7) hue-rotate(310deg) brightness(.9)}@keyframes plant-feedback-pop{0%{opacity:0;transform:scale(.6) translateY(8px)}20%,80%{opacity:1;transform:scale(1) translateY(0)}100%{opacity:0;transform:scale(.8) translateY(-5px)}}@keyframes plant-damage-shake{0%,100%{transform:translateX(0);filter:sepia(1) saturate(7) hue-rotate(310deg) brightness(.9)}20%{transform:translateX(-7px)}40%{transform:translateX(7px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}';
	document.head.append(style)}

function showPlantFeedback(type){
	ensureFeedbackStyles();
	const scene=document.querySelector('.scene');
	if(!scene)return;
	scene.classList.remove('damage-flash');
	document.querySelector('.plant-feedback')?.remove();
	if(type==='damage')scene.classList.add('damage-flash');
	const bubble=document.createElement('div');
	bubble.className='plant-feedback';bubble.textContent=type==='damage'?'⚠':'😊';
	scene.append(bubble);setTimeout(()=>{scene.classList.remove('damage-flash');bubble.remove()},1000)}

function expireEvent(){
	if(!state.eventThreat&&state.eventChoices.length){
		const selected=Math.floor(Math.random()*state.eventChoices.length);
		collectResource(selected);
		return}const cooldown=eventCooldownSeconds();
		if(state.eventThreat){if(Math.random()<.08){state.eventAlert='A seleção natural te salvou, mas não confie na sua sorte!';state.eventAlertDuration=4000;state.event='A ameaça falhou e não causou dano.';
			beginEventCooldown(state.event);
			return}let damage=state.eventThreat.damage+Math.floor(state.stage/2)*20;if(state.purchasedSkills.includes('cuticula'))damage=Math.ceil(damage*.8);
			if(state.purchasedSkills.includes('defesa'))damage=Math.ceil(damage*.7);state.health=Math.max(0,state.health-damage);
			state.pendingPlantFeedback='damage';state.event=state.health?'A ameaça venceu a defesa. A planta perdeu vida.':'A planta morreu por não conseguir se defender.';
			state.eventThreat=null}
			else{state.event=`Próximo evento aleatório disponível em ${cooldown} segundos.`}
			state.eventChoices=[];state.cooldownUntil=Date.now()+cooldown*1000;renderGame();
			if(state.pendingPlantFeedback){showPlantFeedback(state.pendingPlantFeedback);state.pendingPlantFeedback=''}
			clearInterval(cooldownTicker);cooldownTicker=setInterval(()=>{
				if(state.cooldownUntil<=Date.now()){
					clearInterval(cooldownTicker);cooldownTicker=null;eventCooldownTimer=null;newEvent();renderGame()}
					else{state.event=`Próximo evento aleatório disponível em ${Math.ceil((state.cooldownUntil-Date.now())/1000)} segundos.`;
					const eventText=document.getElementById('event');
					if(eventText)eventText.textContent=state.event}},1000);
					eventCooldownTimer=setTimeout(()=>{clearInterval(cooldownTicker);
						cooldownTicker=null;
						eventCooldownTimer=null;
						newEvent();renderGame()},cooldown*1000)}

function advance(i){
	if(i!==state.stage||state.health<=0)return;
	const s=stages[i];
	const cost=effectiveCost(s);
	if(state[s.resource]<cost){state.event='Recursos insuficientes. Visite a Loja ou aguarde um evento.';
		renderGame();
		return}state[s.resource]-=cost;state.stage++;state.maxHealth=(state.maxHealth||100)+100;state.health=state.maxHealth;state.status=state.stage===6?'Ciclo completo: seu fruto nasceu!':`${s.name} concluída. Próxima: ${stages[state.stage].name}.`;
		if(state.stage===6){state.event=s.message;state.eventChoices=[];confetti()}
		else newEvent();renderGame();showPlantFeedback('level')}

function randomRange(min,max){return Math.floor(Math.random()*(max-min+1))+min}

function eventChoiceAmount(resource){
	if(resource==='agua')
		return randomRange(20,35);
	if(resource==='energia')
		return randomRange(3,8);
	return randomRange(1,3)}

function newEvent(){
	if(state.cooldownUntil>Date.now())return;
	const isThreat=Math.random()<.4;
	let pool=isThreat?threatEvents:randomEvents;
	let index=Math.floor(Math.random()*pool.length);
	if(pool.length>1&&index===state.lastEventIndex)index=(index+1)%pool.length;
	const event=pool[index];state.lastEventIndex=index;state.eventThreat=isThreat?event:null;
	if(isThreat){state.event=`${event.title}: ${event.text}`;state.eventChoices=[]}
	else{state.event=`${event.title}: ${event.text}`;
	state.eventChoices=event.choices.map(choice=>({...choice,amount:eventChoiceAmount(choice.resource)}))}state.eventVisible=true;
	state.eventAlert=isThreat?'Ameaça à planta!':event.title;
	clearTimeout(eventExpiryTimer);
	eventExpiryTimer=setTimeout(expireEvent,10000)}

function eventCooldownSeconds(){return 15}

function beginEventCooldown(message){
	const cooldown=eventCooldownSeconds();
	clearTimeout(eventExpiryTimer);
	clearInterval(cooldownTicker);
	eventExpiryTimer=null;
	state.eventVisible=false;
	state.eventChoices=[];
	state.eventThreat=null;
	state.cooldownUntil=Date.now()+cooldown*1000;
	state.event=message||`Próximo evento aleatório disponível em ${cooldown} segundos.`;
	renderGame();
	cooldownTicker=setInterval(()=>{
		if(state.cooldownUntil<=Date.now()){
			clearInterval(cooldownTicker);
			cooldownTicker=null;
			eventCooldownTimer=null;
			newEvent();
			renderGame()}
			else{
				state.event=`Próximo evento aleatório disponível em ${Math.ceil((state.cooldownUntil-Date.now())/1000)} segundos.`}},1000);
				eventCooldownTimer=setTimeout(()=>{clearInterval(cooldownTicker);
					cooldownTicker=null;
					eventCooldownTimer=null;
					newEvent();
					renderGame()},cooldown*1000)}

function collectResource(index){
	const choice=state.eventChoices[index];
	if(!choice)return;
	const bonus=choice.resource==='polen'&&state.skills.polinizadores?1:0;
	const amount=choice.amount+bonus;state[choice.resource]+=amount;beginEventCooldown(`Recurso coletado: +${amount} ${choice.resource==='energia'?'ATP (energia)':choice.resource}. O próximo evento será liberado em 20 segundos.`)}

function defendPlant(){
	const threat=state.eventThreat;if(!threat)return;if(state[threat.resource]<threat.amount){state.event='Você não tem recursos suficientes. A ameaça ainda está ativa.';renderGame();return}state[threat.resource]-=threat.amount;if(state.purchasedSkills.includes('reserva'))state.health=Math.min(100,state.health+10);beginEventCooldown('Ameaça neutralizada! A planta está protegida. Próximo evento em 20 segundos.')}

function eventChoiceAmount(resource){
	const generous=state.purchasedSkills.length>=9;
	if(resource==='agua')
		return randomRange(generous?31:20,generous?35:30);
	if(resource==='energia')
		return randomRange(generous?6:3,generous?8:5);
	return randomRange(generous?3:1,generous?3:2)}

function threatCost(resource){
	if(resource==='agua')
		return randomRange(15,20);
	if(resource==='energia')
		return randomRange(5,8);
	return randomRange(1,2)}

function newEvent(){
	if(state.cooldownUntil>Date.now())return;
	const threatsUnlocked=state.eventsCompleted>=3;
	let eventType=state.lastEventType;
	if(state.eventTypeStreak>=2)eventType=eventType==='threat'?'benefit':'threat';
	else if(!threatsUnlocked)eventType='benefit';
	else eventType=Math.random()<.4?'threat':'benefit';
	if(eventType==='threat'&&!threatsUnlocked)eventType='benefit';
	const pool=eventType==='threat'?threatEvents:randomEvents;
	let index=Math.floor(Math.random()*pool.length);
	let event=pool[index];
	let key=`${eventType}:${event.title}`;
	while(pool.length>1&&key===state.lastEventKey){index=Math.floor(Math.random()*pool.length);
		event=pool[index];key=`${eventType}:${event.title}`}
		state.lastEventKey=key;state.eventTypeStreak=state.lastEventType===eventType?state.eventTypeStreak+1:1;state.lastEventType=eventType;state.eventThreat=eventType==='threat'?{...event,amount:threatCost(event.resource)}:null;
		if(eventType==='threat'){state.event=`${event.title}: ${event.text}`;state.eventChoices=[]}
		else{state.event=`${event.title}: ${event.text}`;
		state.eventChoices=event.choices.map(choice=>({...choice,amount:eventChoiceAmount(choice.resource)}))}
		state.eventVisible=true;state.eventAlert=eventType==='threat'?'Ameaça à planta!':event.title;
		clearTimeout(eventExpiryTimer);eventExpiryTimer=setTimeout(expireEvent,10000)}

function unlockSkill(id){
	const skill=skillRounds[state.skillRound]?.find(item=>item.id===id);
	if(!skill||state.purchasedSkills.includes(id)||state.cycleRewardPending||state.polen<skill.cost)
		return;state.polen-=skill.cost;state.purchasedSkills.push(id);
	if(id==='raiz-forte')state.skills.raiz=true;
	if(id==='folhas-solares')state.skills.folhas=true;
	if(id==='polen-extra')state.skills.polinizadores=true;
	if(state.purchasedSkills.length===3){
		state.rewardBoostUnlocked=true;state.eventAlert='Agora recompensas mais generosas aparecerão!';
		state.event='Agora recompensas mais generosas aparecerão nos eventos aleatórios.'}
		if(state.purchasedSkills.length===6){state.cycleRewardPending=true;state.eventAlert='Segundo ciclo concluído!';
			state.event='Escolha uma recompensa especial na árvore de habilidades.'}
			if(state.purchasedSkills.length===9){state.rewardBoostUnlocked=true;
				state.eventAlert='Terceiro ciclo concluído!';
				state.event='Cooldown reduzido para 15 segundos e recompensas mínimas aumentadas.'}
				else if(state.purchasedSkills.length%3===0&&state.skillRound<2)state.skillRound+=1;
				renderGame()}

function collectResource(index){
	const choice=state.eventChoices[index];
	if(!choice)return;
	const bonus=choice.resource==='polen'&&state.skills.polinizadores?1:0;
	const amount=choice.amount+bonus;state[choice.resource]+=amount;state.eventsCompleted+=1;
	beginEventCooldown(`Recurso coletado: +${amount} ${choice.resource==='energia'?'ATP (energia)':choice.resource}. Próximo evento em ${eventCooldownSeconds()} segundos.`)}

function defendPlant(){
	const threat=state.eventThreat;
	if(!threat)return;
	if(state[threat.resource]<threat.amount){
		state.event='Você não tem recursos suficientes. A ameaça ainda está ativa.';
		renderGame();return}state[threat.resource]-=threat.amount;
		if(state.purchasedSkills.includes('reserva'))state.health=Math.min(100,state.health+10);state.eventsCompleted+=1;
		beginEventCooldown(`Ameaça neutralizada! A planta está protegida. Próximo evento em ${eventCooldownSeconds()} segundos.`)}

function confetti(){
	for(let i=0;i<60;i++){
		const p=document.createElement('i');
		p.className='piece';p.style.left=`${Math.random()*100}%`;
		p.style.background=['#245f4c','#f1c75b','#dc765c'][i%3];
		document.body.append(p);setTimeout(()=>p.remove(),1400)}}home();
