
const defaultData={weight:88,height:186,birth:"1996-03-15",goal:"Perte de graisse",target:80,sex:"Homme",level:"Débutant",days:5,sessions:0,calories:0,distance:0,time:0,history:[],weights:[88,87.7,87.4,87.1,86.8,88]};
let data=JSON.parse(localStorage.getItem("fitcoachData")||"null")||defaultData;
const exercises=[
{name:"Développé couché",muscle:"Pectoraux · épaules · triceps",sets:4,reps:"8–12",rest:90,icon:"🏋️",video:"developpe-couche.mp4"},
{name:"Développé incliné haltères",muscle:"Haut des pectoraux",sets:4,reps:"8–12",rest:90,icon:"💪",video:"developpe-incline.mp4"},
{name:"Écarté haltères",muscle:"Pectoraux",sets:3,reps:"10–15",rest:60,icon:"🪽",video:"ecarte-halteres.mp4"},
{name:"Pompes",muscle:"Pectoraux · triceps",sets:3,reps:"10–20",rest:60,icon:"🤸",video:"pompes.mp4"},
{name:"Dips",muscle:"Pectoraux · triceps",sets:3,reps:"8–12",rest:90,icon:"💪",video:"dips.mp4"},
{name:"Squat",muscle:"Quadriceps · fessiers",sets:4,reps:"8–10",rest:120,icon:"🦵",video:"squat.mp4"},
{name:"Presse à jambes",muscle:"Quadriceps · fessiers",sets:4,reps:"10–12",rest:120,icon:"🦵",video:"presse-jambes.mp4"},
{name:"Fentes",muscle:"Jambes · fessiers",sets:3,reps:"10 / jambe",rest:90,icon:"🦵",video:"fentes.mp4"},
{name:"Soulevé de terre",muscle:"Chaîne postérieure",sets:4,reps:"6–10",rest:150,icon:"🏋️",video:"souleve-terre.mp4"},
{name:"Hip thrust",muscle:"Fessiers",sets:4,reps:"8–12",rest:90,icon:"🍑",video:"hip-thrust.mp4"},
{name:"Mollets debout",muscle:"Mollets",sets:4,reps:"12–20",rest:45,icon:"🦶",video:"mollets.mp4"},
{name:"Tirage vertical",muscle:"Dos · biceps",sets:4,reps:"8–12",rest:90,icon:"🔩",video:"tirage-vertical.mp4"},
{name:"Tractions",muscle:"Dos · biceps",sets:4,reps:"6–10",rest:120,icon:"🧗",video:"tractions.mp4"},
{name:"Rowing barre",muscle:"Dos · biceps",sets:4,reps:"8–12",rest:90,icon:"🏋️",video:"rowing.mp4"},
{name:"Rowing haltère",muscle:"Dos",sets:3,reps:"10–12",rest:75,icon:"💪",video:"rowing-halteres.mp4"},
{name:"Tirage horizontal",muscle:"Dos",sets:3,reps:"10–15",rest:75,icon:"🔩",video:"tirage-horizontal.mp4"},
{name:"Élévations latérales",muscle:"Épaules",sets:3,reps:"12–15",rest:60,icon:"🏋️",video:"elevations-laterales.mp4"},
{name:"Développé épaules",muscle:"Épaules · triceps",sets:4,reps:"8–12",rest:90,icon:"🏋️",video:"shoulder-press.mp4"},
{name:"Oiseau haltères",muscle:"Arrière d'épaule",sets:3,reps:"12–15",rest:60,icon:"🪽",video:"oiseau.mp4"},
{name:"Curl biceps",muscle:"Biceps",sets:3,reps:"10–15",rest:60,icon:"💪",video:"curl-biceps.mp4"},
{name:"Curl marteau",muscle:"Biceps · avant-bras",sets:3,reps:"10–15",rest:60,icon:"💪",video:"curl-marteau.mp4"},
{name:"Extension triceps",muscle:"Triceps",sets:3,reps:"10–15",rest:60,icon:"🔥",video:"extension-triceps.mp4"},
{name:"Planche",muscle:"Abdominaux · gainage",sets:3,reps:"30–60 s",rest:45,icon:"🧘",video:"planche.mp4"},
{name:"Crunch",muscle:"Abdominaux",sets:3,reps:"15–25",rest:45,icon:"🔥",video:"crunch.mp4"},
{name:"Mountain climbers",muscle:"Cardio · abdos",sets:4,reps:"30–45 s",rest:30,icon:"🏃",video:"mountain-climbers.mp4"},
{name:"Burpees",muscle:"Full body · cardio",sets:4,reps:"8–15",rest:60,icon:"🔥",video:"burpees.mp4"},
{name:"Tapis de course",muscle:"Cardio · endurance",sets:1,reps:"20–45 min",rest:0,icon:"🏃",video:"tapis-course.mp4"},
{name:"Marche active",muscle:"Cardio doux",sets:1,reps:"30–60 min",rest:0,icon:"🚶",video:"marche-active.mp4"},
{name:"Vélo",muscle:"Cardio · jambes",sets:1,reps:"30–60 min",rest:0,icon:"🚴",video:"velo.mp4"},
{name:"Rameur",muscle:"Cardio · full body",sets:1,reps:"20–40 min",rest:0,icon:"🚣",video:"rameur.mp4"},
{name:"HIIT",muscle:"Intervalles · cardio",sets:8,reps:"30 s effort",rest:30,icon:"⚡",video:"hiit.mp4"}
];
let timer=null,timerSec=0,cardio=false,cardioStart=0,cardioElapsed=0,cardioInterval=null;

function save(){localStorage.setItem("fitcoachData",JSON.stringify(data))}
function age(){let b=new Date(data.birth),n=new Date(),a=n.getFullYear()-b.getFullYear();if(n<new Date(n.getFullYear(),b.getMonth(),b.getDate()))a--;return a}
function bmi(){return data.weight/Math.pow(data.height/100,2)}
function showPage(id){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));document.getElementById(id).classList.add("active");document.querySelectorAll("nav button").forEach(x=>x.classList.toggle("active",x.dataset.page===id));render()}
function toast(t){let x=document.getElementById("toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1800)}
function render(){
let b=bmi();document.getElementById("dashWeight").textContent=data.weight+" kg";document.getElementById("dashHeight").textContent=data.height+" cm";document.getElementById("dashAge").textContent=age()+" ans";document.getElementById("dashBmi").textContent=b.toFixed(1);
document.getElementById("statSessions").textContent=data.sessions;document.getElementById("statCalories").textContent=Math.round(data.calories);document.getElementById("statDistance").textContent=data.distance.toFixed(1);document.getElementById("statTime").textContent=Math.round(data.time)+" min";
document.getElementById("goalText").textContent=data.goal;document.getElementById("goalWeight").textContent="Objectif : "+data.target+" kg";
let pct=Math.max(5,Math.min(100,((data.weight-data.target)/Math.max(1,data.weight-60))*100));document.getElementById("goalProgress").style.width=(100-pct)+"%";
document.getElementById("bmiBig").textContent=b.toFixed(1);document.getElementById("bmiBar").style.width=Math.min(100,b/40*100)+"%";document.getElementById("bmiLabel").textContent=b<18.5?"Maigreur":b<25?"IMC normal":b<30?"Surpoids léger":"Obésité";
["pWeight","pHeight","pBirth","pGoal","pTarget","pSex","pLevel","pDays"].forEach((id)=>{
let v=id==="pWeight"?data.weight:id==="pHeight"?data.height:id==="pBirth"?data.birth:id==="pGoal"?data.goal:id==="pTarget"?data.target:id==="pSex"?data.sex:id==="pLevel"?(data.level||"Débutant"):(data.days||5);
let el=document.getElementById(id); if(el) el.value=v;
});
document.getElementById("statsWeight").textContent=data.weight+" kg";document.getElementById("statsActivity").textContent=data.sessions+" séances";document.getElementById("sCal").textContent=Math.round(data.calories);document.getElementById("sDist").textContent=data.distance.toFixed(1)+" km";document.getElementById("sTime").textContent=Math.round(data.time)+" min";
document.getElementById("exerciseList").innerHTML=exercises.map((e,i)=>`<div class="exercise"><div class="thumb">${e.icon}</div><div class="grow"><b>${e.name}</b><div class="tag">${e.muscle} · ${e.sets} × ${e.reps}</div></div><button class="btn secondary" onclick="openExercise(${i})">Voir</button></div>`).join("");
renderCalendar();renderWeekPlan();renderHistory();renderCharts();
}
function openModal(html){document.getElementById("sheet").innerHTML=html;document.getElementById("modal").classList.add("show")}
function closeModal(){document.getElementById("modal").classList.remove("show");clearInterval(timer);clearInterval(cardioInterval)}
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
function openProfile(){showPage("profile")}
function saveProfile(){
data.weight=+pWeight.value;data.height=+pHeight.value;data.birth=pBirth.value;data.goal=pGoal.value;data.target=+pTarget.value;data.sex=pSex.value;
data.level=pLevel.value;data.days=+pDays.value;data.weights.push(data.weight);save();toast("Profil enregistré ✓");showPage("home")
}
function openExercise(i){
  const e=exercises[i];
  openModal(`<div class="row"><div><div class="small">COACH EXERCICE</div><h1>${e.name}</h1></div><button class="iconbtn" onclick="closeModal()">✕</button></div>
  <div class="video-coach">
    <video id="coachVideo" controls playsinline webkit-playsinline preload="metadata" muted src="assets/videos/${e.video}">
      Ton navigateur ne peut pas lire cette vidéo.
    </video>
    <div class="video-overlay">🎬 Coach animé · démonstration 12 s</div>
  </div>
  <div class="video-actions"><button class="btn" onclick="playCoachVideo()">▶ Lire la démonstration</button><button class="btn secondary" onclick="restartCoachVideo()">↺ Rejouer</button></div>
  <a class="btn secondary full" href="assets/videos/${e.video}" target="_blank" rel="noopener" style="display:block;text-align:center;margin-top:8px">↗ Ouvrir la vidéo</a>
  <div id="videoError" class="video-error">Impossible de charger la vidéo. Utilise « Ouvrir la vidéo » pour tester le fichier MP4 directement.</div>
  <div class="video-note">La vidéo montre le placement, l’amplitude, le rythme et la respiration.</div>
  <div class="section card"><h2>Comment faire ?</h2><ol><li>Installe-toi correctement et garde une posture stable.</li><li>Effectue le mouvement lentement et sans à-coups.</li><li>Contrôle la phase de descente puis remonte en expirant.</li><li>Arrête la série si ta technique se dégrade.</li></ol></div>
  <div class="grid grid2"><div class="card"><span class="small">Séries</span><div class="value">${e.sets}</div></div><div class="card"><span class="small">Répétitions</span><div class="value">${e.reps}</div></div></div>
  <button class="btn full section" onclick="startExercise(${i})">▶ Démarrer l'exercice</button>`);
  const v=document.getElementById('coachVideo');
  if(v){
    v.addEventListener('error',()=>{const er=document.getElementById('videoError');if(er)er.style.display='block'});
    v.addEventListener('loadeddata',()=>{const er=document.getElementById('videoError');if(er)er.style.display='none'});
    v.addEventListener('canplay',()=>{const er=document.getElementById('videoError');if(er)er.style.display='none'});
  }
}
function playCoachVideo(){const v=document.getElementById('coachVideo');if(!v)return;v.muted=true;v.load();setTimeout(()=>v.play().catch(()=>{const er=document.getElementById('videoError');if(er)er.style.display='block'}),120);}
function restartCoachVideo(){const v=document.getElementById('coachVideo');if(!v)return;v.pause();v.currentTime=0;playCoachVideo();}

function startExercise(i){let e=exercises[i];timerSec=0;openModal(`<div class="row"><div><div class="small">SÉRIE 1 / ${e.sets}</div><h1>${e.name}</h1><span class="pill">${e.reps} · repos ${e.rest}s</span></div><button class="iconbtn" onclick="closeModal()">✕</button></div><div class="timerCircle" id="timerCircle"><div class="timer" id="timer">00:00</div></div><div class="row"><button class="btn secondary" onclick="timerSec=Math.max(0,timerSec-10);updateTimer()">−10s</button><button class="btn" id="timerBtn" onclick="toggleTimer()">▶ Démarrer</button><button class="btn secondary" onclick="timerSec+=10;updateTimer()">+10s</button></div><div class="section card"><div class="row"><span>🏋️ ${e.sets} séries</span><span>🔁 ${e.reps}</span><span>⏱️ ${e.rest}s repos</span></div></div><button class="btn green full" onclick="finishWorkout('${e.name}')">✓ Terminer la séance</button>`) }
function toggleTimer(){if(timer){clearInterval(timer);timer=null;timerBtn.textContent="▶ Reprendre";timerCircle.classList.remove("running")}else{timer=setInterval(()=>{timerSec++;updateTimer()},1000);timerBtn.textContent="⏸ Pause";timerCircle.classList.add("running")}}
function updateTimer(){let m=String(Math.floor(timerSec/60)).padStart(2,"0"),s=String(timerSec%60).padStart(2,"0");let el=document.getElementById("timer");if(el)el.textContent=m+":"+s}
function finishWorkout(name){clearInterval(timer);data.sessions++;data.time+=Math.max(1,Math.round(timerSec/60));data.history.unshift({date:new Date().toLocaleDateString("fr-FR"),name:name,duration:Math.max(1,Math.round(timerSec/60)),cal:0,dist:0});save();toast("Séance enregistrée ✓");closeModal();render()}
function openWorkout(type){
  const cfg={
    muscle:{title:"💪 Musculation · prise de muscle",ids:[0,1,5,6,11,13,16,19,21]},
    fat:{title:"🔥 Perte de graisse · sèche",ids:[3,7,22,24,25,30]},
    custom:{title:"🎯 Bibliothèque complète",ids:exercises.map((_,i)=>i)},
    cardio:{title:"🏃 Programme cardio",ids:[26,27,28,29]},
    hiit:{title:"⚡ Programme HIIT",ids:[24,25,30]}
  }[type]||null;
  if(!cfg)return openCardio();
  const list=cfg.ids.map(i=>exercises[i]);
  openModal(`<div class="row"><div><div class="small">PROGRAMME</div><h1>${cfg.title}</h1></div><button class="iconbtn" onclick="closeModal()">✕</button></div><p class="muted">Chaque exercice possède sa propre démonstration vidéo et son chronomètre.</p>${list.map(e=>`<div class="exercise"><div class="thumb">${e.icon}</div><div class="grow"><b>${e.name}</b><div class="tag">${e.muscle} · ${e.sets} × ${e.reps}</div></div><button class="btn" onclick="openExercise(${exercises.indexOf(e)})">▶ Voir</button></div>`).join("")}`)
}
function openCardio(){cardio=true;cardioElapsed=0;openModal(`<div class="row"><div><div class="small">CARDIO</div><h1>🏃 Tapis de course</h1></div><button class="iconbtn" onclick="closeModal()">✕</button></div><div class="grid grid2"><div class="field"><label>Objectif durée (min)</label><input id="cGoal" type="number" value="30"></div><div class="field"><label>Objectif distance (km)</label><input id="cDistGoal" type="number" value="5" step=".1"></div></div><div class="timerCircle" id="cardioCircle"><div class="timer" id="cardioTimer">00:00</div></div><div class="grid grid2"><div class="card stat"><span class="small">Distance</span><strong id="cDistance">0.00 km</strong></div><div class="card stat"><span class="small">Calories estimées</span><strong id="cCalories">0 kcal</strong></div><div class="card stat"><span class="small">Vitesse</span><strong><input id="cSpeed" type="number" value="10" step=".1" style="width:80px;background:#081524;border:1px solid #20344d;color:white;border-radius:8px;padding:5px"> km/h</strong></div><div class="card stat"><span class="small">Objectif</span><strong id="cProgress">0%</strong></div></div><button class="btn full" id="cardioBtn" onclick="toggleCardio()">▶ Démarrer</button><button class="btn green full section" onclick="finishCardio()">✓ Enregistrer le cardio</button>`)}
function toggleCardio(){if(cardioInterval){clearInterval(cardioInterval);cardioInterval=null;cardioBtn.textContent="▶ Reprendre";return}cardioStart=Date.now()-cardioElapsed*1000;cardioInterval=setInterval(updateCardio,500);cardioBtn.textContent="⏸ Pause";cardioCircle.classList.add("running")}
function updateCardio(){cardioElapsed=Math.floor((Date.now()-cardioStart)/1000);let m=String(Math.floor(cardioElapsed/60)).padStart(2,"0"),s=String(cardioElapsed%60).padStart(2,"0");cardioTimer.textContent=m+":"+s;let speed=+cSpeed.value||10,dist=speed*cardioElapsed/3600,cal=dist*data.weight*.9;cDistance.textContent=dist.toFixed(2)+" km";cCalories.textContent=Math.round(cal)+" kcal";cProgress.textContent=Math.min(100,Math.round(cardioElapsed/Math.max(1,(+cGoal.value||30)*60)*100))+"%"}
function finishCardio(){let speed=+cSpeed.value||10,dist=speed*cardioElapsed/3600,cal=dist*data.weight*.9;data.sessions++;data.calories+=cal;data.distance+=dist;data.time+=cardioElapsed/60;data.history.unshift({date:new Date().toLocaleDateString("fr-FR"),name:"Cardio · Tapis",duration:Math.round(cardioElapsed/60),cal:Math.round(cal),dist:+dist.toFixed(2)});save();toast("Cardio enregistré ✓");closeModal();render()}
function openHIIT(){openWorkout("hiit")}
function startHIIT(){timerSec=0;openModal(`<div class="small">ROUND 1 / 8</div><h1>⚡ Effort</h1><div class="timerCircle running"><div class="timer" id="timer">00:30</div></div><button class="btn full" onclick="finishWorkout('HIIT')">✓ Terminer</button>`);let t=30;timer=setInterval(()=>{t--;document.getElementById("timer").textContent="00:"+String(t).padStart(2,"0");if(t<=0){clearInterval(timer);toast("Récupération !")}},1000)}
function renderWeekPlan(){
  const el=document.getElementById("weekPlan"), sum=document.getElementById("weekSummary");
  if(!el||!sum)return;
  if(!data.generated){sum.textContent="Génère ton programme depuis Profil.";el.innerHTML="";return}
  sum.textContent=data.generated.goal+" · "+data.generated.level+" · "+data.generated.days+" jours";
  const labels=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
  el.innerHTML=data.generated.week.map((p,i)=>`<div class="exercise" style="margin:7px 0">
    <div class="thumb">${p==="Repos"?"😴":p.includes("Cardio")||p.includes("Tapis")||p.includes("Vélo")?"🏃":"🏋️"}</div>
    <div class="grow"><b>${labels[i]}</b><div class="tag">${p}</div></div>
    ${p==="Repos"?`<span class="pill">Repos</span>`:`<button class="btn" onclick="openDayPlanByWeek(${i})">▶ Séance</button>`}
  </div>`).join("");
}
function openDayPlanByWeek(i){
  const now=new Date();
  const target=new Date(now.getFullYear(),now.getMonth(),now.getDate()-((now.getDay()+6)%7)+i);
  openDayPlan(target.getDate(),target);
}

function renderHistory(){history.innerHTML=data.history.length?data.history.slice(0,8).map(h=>`<div class="exercise"><div class="thumb">${h.name.includes("Cardio")?"🏃":"🏋️"}</div><div class="grow"><b>${h.name}</b><div class="tag">${h.date} · ${h.duration} min · ${h.cal||0} kcal ${h.dist?"· "+h.dist+" km":""}</div></div><span class="pill">✓</span></div>`).join(""):`<p class="muted">Aucune séance enregistrée pour le moment.</p>`}
function plannedProgram(day, dateObj=null){
  const fallback=["Musculation · Haut du corps","Musculation · Bas du corps","Cardio · Tapis","Repos","Musculation · Haut du corps","Cardio + Abdos","Repos"];
  const week=(data.generated&&data.generated.week)?data.generated.week:fallback;
  const date=dateObj||new Date(new Date().getFullYear(),new Date().getMonth(),day);
  const weekday=(date.getDay()+6)%7;
  return week[weekday];
}
function openDayPlan(day,dateObj=null){
  const date=dateObj||new Date(new Date().getFullYear(),new Date().getMonth(),day);
  const p=plannedProgram(day,date);
  const labels=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
  const weekday=labels[(date.getDay()+6)%7];
  const dateLabel=date.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"});
  const rest=p==="Repos";
  const map={
    "Haut du corps":[0,1,11,16,19,21],"Bas du corps":[5,6,7,9,10,22],"Push":[0,1,3,16,21],"Pull":[11,12,13,14,19,20],"Jambes":[5,6,7,8,9,10],
    "Full body + HIIT":[5,0,11,22,30],"Full body":[5,0,11,16,22],"Cardio + abdos":[26,22,24],"Circuit training":[3,5,24,25,30],"Cardio":[26,27,28],
    "Tapis · endurance":[26],"Intervalles":[26,30],"Vélo / rameur":[28,29],"Tapis · tempo":[26],"Cardio léger":[27],"Cardio doux":[27],"Full body léger":[3,5,22],"Mobilité + cardio":[27,22],"Marche active":[27]
  };
  const idxs=map[p]||[0,5,11,22];
  const exercisesForDay=rest?[]:idxs.map(i=>exercises[i]);
  openModal(`<div class="row"><div><div class="small">${weekday.toUpperCase()} · ${dateLabel}</div><h1>${p}</h1></div><button class="iconbtn" onclick="closeModal()">✕</button></div>
  ${rest?`<div class="card" style="text-align:center;padding:35px"><div style="font-size:55px">😴</div><h2>Jour de repos</h2><p class="muted">Récupération, hydratation et sommeil. Les 2 jours de repos sont intégrés automatiquement.</p></div>`:
  `<p class="muted">Séance prévue pour <b>${weekday}</b>. Ouvre un exercice pour voir la démonstration et lancer le chronomètre.</p>${exercisesForDay.map(e=>{const idx=exercises.indexOf(e);return `<div class="exercise"><div class="thumb">${e.icon}</div><div class="grow"><b>${e.name}</b><div class="tag">${e.muscle||""} · ${e.sets} × ${e.reps}</div></div><button class="btn" onclick="${idx>=0?`openExercise(${idx})`:`openCardio()`}">▶ Voir</button></div>`}).join("")}
  <button class="btn green full" onclick="finishWorkout('${p.replace(/'/g,"\\'")}')">✓ Marquer la séance comme terminée</button>`}`);
}
function renderCalendar(){
  let d=new Date(),y=d.getFullYear(),m=d.getMonth(),first=(new Date(y,m,1).getDay()+6)%7;
  let days=new Date(y,m+1,0).getDate(),today=d.getDate();
  const monthLabel=d.toLocaleDateString("fr-FR",{month:"long",year:"numeric"});
  let s=`<div class="row" style="grid-column:1/-1;margin-bottom:4px"><h3 style="margin:0;text-transform:capitalize">${monthLabel}</h3><span class="pill">${data.generated?data.generated.days:5} + 2 repos</span></div>`;
  s+=`<div class="calendar-weekdays" style="grid-column:1/-1"><span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span></div>`;
  for(let i=0;i<first;i++)s+="<div></div>";
  for(let n=1;n<=days;n++){
    const date=new Date(y,m,n),done=data.history.some(h=>h.date===date.toLocaleDateString("fr-FR"));
    const p=plannedProgram(n,date),rest=p==="Repos",wd=date.toLocaleDateString("fr-FR",{weekday:"short"}).replace('.','');
    const type=rest?"😴 Repos":p.includes("Cardio")||p.includes("Tapis")?"🏃 Cardio":"🏋️ Muscu";
    s+=`<button class="day ${n===today?"today":""} ${done?"done":""}" onclick="openDayPlan(${n},new Date(${y},${m},${n}))"><b>${wd} ${n}</b><br><span style="font-size:10px">${type}</span>${done?"<br>✓": ""}</button>`;
  }
  calendar.innerHTML=s;
}

function renderCharts(){weightChart.innerHTML=data.weights.slice(-7).map(v=>`<div class="bar" style="height:${Math.max(18,(v-60)*4)}%"><span>${v}</span></div>`).join("");activityChart.innerHTML=[0,1,2,3,4,5,6].map((_,i)=>`<div class="bar" style="height:${Math.max(10,Math.min(100,(data.sessions-i*0.2)*18))}%"><span>${i+1}</span></div>`).join("")}

function generateProgram(){
  const goal=document.getElementById("gGoal").value;
  const level=document.getElementById("gLevel").value;
  const days=+document.getElementById("gDays").value;
  const duration=document.getElementById("gDuration").value;
  const plans={
    "Prise de muscle":["Haut du corps","Bas du corps","Repos","Push","Pull","Jambes","Repos"],
    "Perte de graisse":["Full body + HIIT","Cardio","Repos","Full body","Cardio + abdos","Circuit training","Repos"],
    "Cardio / endurance":["Tapis · endurance","Intervalles","Repos","Vélo / rameur","Tapis · tempo","Cardio léger","Repos"],
    "Remise en forme":["Full body léger","Cardio doux","Repos","Full body léger","Mobilité + cardio","Marche active","Repos"]
  };
  let week=[...plans[goal]];
  if(days===3) week=[week[0],week[1],"Repos",week[3],"Repos",week[5],"Repos"];
  if(days===4) week=[week[0],week[1],"Repos",week[3],week[4],week[5],"Repos"];
  if(days===5) week=plans[goal];
  const labels=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
  data.generated={goal,level,days,duration,week}; save();
  document.getElementById("generatedProgram").innerHTML=`
    <div class="card" style="background:#08182a">
      <div class="row"><div><b>Programme personnalisé</b><div class="small">${goal} · ${level} · ${duration}</div></div><span class="pill">${days} entraînements</span></div>
      <div style="margin-top:10px">${week.map((p,i)=>`<div class="exercise" style="margin:7px 0">
        <div class="thumb">${p==="Repos"?"😴":p.includes("Cardio")||p.includes("Tapis")||p.includes("Vélo")?"🏃":"🏋️"}</div>
        <div class="grow"><b>${labels[i]}</b><div class="tag">${p}</div></div>
        <span class="pill">${p==="Repos"?"Repos":"Séance"}</span>
      </div>`).join("")}</div>
    </div>`;
  toast("Programme personnalisé créé ✓");
}
function openCalendar(){toast("Sélectionne un programme puis démarre la séance pour l'ajouter à l'historique.")}
render();
