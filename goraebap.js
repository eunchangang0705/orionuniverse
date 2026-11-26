const sectorData = [
  {kicker:'THE BEGINNING', title:'모든 모험의<br />출발점.', description:'따뜻한 과자 부스러기가 떠다니는 작은 우주 항구. 함선의 기본 조작을 익히고 첫 항해를 준비하는 곳입니다.', theme:'첫 항해 · 기본 재료 수집', ready:'함선 점검, 탐험 지도', symbol:'◎'},
  {kicker:'A LIGHT IN THE DEEP', title:'어둠 속에서<br />빛나는 발견.', description:'반짝이는 산호와 별 조각이 떠다니는 구역. 작은 신호를 따라 탐험하며 함선 성장에 필요한 재료를 찾아보세요.', theme:'숨은 항로 · 별 조각 탐사', ready:'확장 적재함, 탐사 장비', symbol:'✦'},
  {kicker:'BEYOND THE HORIZON', title:'더 먼 우주로<br />흐르는 길.', description:'유백색 별가루가 거대한 해류처럼 흐르는 구역. 성장한 함선으로 긴 항해에 도전하고 별바다의 새로운 모습을 만나보세요.', theme:'장거리 항해 · 새로운 발견', ready:'강화 엔진, 정밀 스캐너', symbol:'≈'}
];
const sectorButtons = [...document.querySelectorAll('[data-sector]')];
function selectSector(index, focus = false) {
  const data = sectorData[index];
  sectorButtons.forEach((button,i) => { button.setAttribute('aria-selected',String(i===index)); button.tabIndex = i===index ? 0 : -1; });
  document.querySelector('#sector-panel').setAttribute('aria-labelledby','sector-tab-'+index);
  document.querySelector('.destination-art').dataset.zone=index;
  document.querySelector('#sector-number').textContent=String(index+1).padStart(2,'0');
  ['kicker','description','theme','ready'].forEach(key => document.querySelector('#sector-'+key).textContent=data[key]);
  document.querySelector('#sector-title').innerHTML=data.title;
  if(focus) sectorButtons[index].focus();
}
sectorButtons.forEach((button,index) => {
  button.addEventListener('click',()=>selectSector(index));
  button.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight') next=(index+1)%3;
    if(event.key==='ArrowLeft') next=(index+2)%3;
    if(event.key==='Home') next=0;
    if(event.key==='End') next=2;
    if(next!==undefined) { event.preventDefault(); selectSector(next,true); }
  });
});
const shipData = [
  {title:'첫 항해를 위한 준비', description:'가볍고 작은 선체에 탐험의 필수 장비를 담았습니다. 가까운 구역을 누비며 성장에 필요한 재료를 모으세요.', type:'SCOUT CLASS / 정찰형', range:'근거리 항로', cargo:'기본 적재함', scan:'기초 스캐너'},
  {title:'더 많은 발견을 담아', description:'선체와 적재함을 확장해 탐험의 여유를 더했습니다. 넓어진 항로에서 재료를 모으고 다음 목적지를 준비하세요.', type:'VOYAGER CLASS / 항해형', range:'확장 항로', cargo:'확장 적재함', scan:'광역 스캐너'},
  {title:'별바다 너머로', description:'강화 엔진과 정밀 탐사 장비를 갖춘 탐험 함선입니다. 멀리 떨어진 구역까지 항해하며 새로운 발견에 도전하세요.', type:'EXPLORER CLASS / 탐험형', range:'장거리 항로', cargo:'대형 적재함', scan:'정밀 스캐너'}
];
document.querySelectorAll('button[data-level]').forEach(button => button.addEventListener('click',()=>{
  const level=Number(button.dataset.level), data=shipData[level-1];
  document.querySelectorAll('button[data-level]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  document.querySelector('.ship-blueprint').dataset.level=level;
  document.querySelector('#ship-code').textContent='MK—0'+level;
  document.querySelector('.ship-hull span').textContent='0'+level;
  document.querySelector('#ship-class').textContent=data.type;
  document.querySelector('#ship-title').textContent=data.title;
  document.querySelector('#ship-description').textContent=data.description;
  ['range','cargo','scan'].forEach(key=>{document.querySelector('#'+key+'-label').textContent=data[key];document.querySelector('#'+key+'-meter').value=level;});
}));
