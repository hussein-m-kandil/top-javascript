!function(){const t=function(){let t;return{init:function(){t={}},add:function(e,n){"string"==typeof e&&"function"==typeof n&&(t[e]=t[e]??[],t[e].push(n))},remove:function(e,n){if("string"==typeof e){const E=t[e];if(Array.isArray(E)){const i=E.indexOf(n);i>-1&&(E.splice(i,1),E.length<1&&delete t[e])}}},emit:function(e){for(var n=arguments.length,E=new Array(n>1?n-1:0),i=1;i<n;i++)E[i-1]=arguments[i];if("string"==typeof e){const n=t[e];Array.isArray(n)&&n.forEach((t=>t(...E)))}},START_EVENT_NAME:"start",STARTED_EVENT_NAME:"started",HARD_GAME_EVENT_NAME:"hard",MEDIUM_GAME_EVENT_NAME:"medium",EASY_GAME_EVENT_NAME:"easy",ONE_PLAYER_GAME_EVENT_NAME:"oneplayergame",WIN_EVENT_NAME:"win",MARK_EVENT_NAME:"mark",MARKING_EVENT_NAME:"marking",MARKED_EVENT_NAME:"marked",TIE_EVENT_NAME:"tie",RESET_EVENT_NAME:"reset",RESET_BOARD_EVENT_NAME:"resetboard",RESTART_EVENT_NAME:"restart",COMPUTER_TURN_EVENT_NAME:"computerturn",USER_TURN_EVENT_NAME:"userturn"}}(),e=function(){const e=Array(9),n=[];let E,i,o,r,c;function d(){e.fill("",0),n.splice(0),clearTimeout(E),i=!1}function u(t){return t[0]&&t[0]===t[1]&&t[1]===t[2]||t[3]&&t[3]===t[4]&&t[4]===t[5]||t[6]&&t[6]===t[7]&&t[7]===t[8]||t[0]&&t[0]===t[3]&&t[3]===t[6]||t[1]&&t[1]===t[4]&&t[4]===t[7]||t[2]&&t[2]===t[5]&&t[5]===t[8]||t[0]&&t[0]===t[4]&&t[4]===t[8]||t[6]&&t[6]===t[4]&&t[4]===t[2]}function N(){for(let t=0;t<e.length;t++)if(!e[t])return!0}function _(E,o){i=!1;const r=function(t){const e=Number(t);return Number.isInteger(e)&&e>=0&&e<9?e:-1}(E);r>-1&&N()&&function(t){return!e[t]}(r)&&(e[r]=o,n.push(r),function(n){u(e)?t.emit(t.WIN_EVENT_NAME,n):N()||t.emit(t.TIE_EVENT_NAME)}(o),t.emit(t.MARKED_EVENT_NAME,r,o))}function a(){let t;do{t=Math.floor(9*Math.random())}while(n.includes(t));return t}function T(t,e){for(let E=0;E<9;E++)if(!n.includes(E)){const n=t[E];if(t[E]=e,u(t))return E;t[E]=n}return null}function A(c,d){let u;u=o||r?function(t,E){const i=[...e];return o?T(i,t)??T(i,E)??function(){if(!n.includes(4))return 4;const t=function(t){const e=[0,2,6,8];for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}();for(let e=0;e<t.length;e++)if(!n.includes(t[e]))return t[e];return null}()??a():T(i,t)??T(i,E)??a()}(c,d):function(t,E){const i=[...e],o=Math.floor(2*Math.random())+2;return T(i,t)??(n.length%o==0?T(i,E):null)??a()}(c,d),E=setTimeout((()=>{_(u,c),t.emit(t.MARKED_EVENT_NAME,u,c),t.emit(t.USER_TURN_EVENT_NAME)}),i?1500:1e3)}function l(t,e){_(t,e)}function s(){d()}function M(){i=!0}function f(){o=!0}function p(){r=!0}function m(){c=!0}return{init:function(){o=!1,r=!1,c=!1,d(),t.add(t.RESET_BOARD_EVENT_NAME,s),t.add(t.START_EVENT_NAME,M),t.add(t.HARD_GAME_EVENT_NAME,f),t.add(t.MEDIUM_GAME_EVENT_NAME,p),t.add(t.EASY_GAME_EVENT_NAME,m),t.add(t.COMPUTER_TURN_EVENT_NAME,A),t.add(t.MARKING_EVENT_NAME,l)}}}(),n=function(){const e=document.createElement("dialog"),n=[];let E,i,o,r,c,d,u;function N(t){t.setAttribute("style","opacity: 0; transform: scale(75%);")}function _(t){setTimeout((()=>{t.setAttribute("style","opacity: 1; transform: scale(100%);"),t.removeAttribute("style")}),200)}function a(t,e,n,E){const i=document.createElement(t);if(e&&(i.className=e),n&&(i.textContent=n),Array.isArray(E)&&E.length>0)for(let t=0;t<E.length;t++)Array.isArray(E[t])&&2===E[t].length&&i.setAttribute(E[t][0],E[t][1]);return i}function T(){N(E),document.body.appendChild(E),_(E)}function A(t,e,n){const E=[];for(let i=0;i<e.length;i++)E[i]=a("button",t,e[i],[["type","button"],["value",e[i].slice(0,1).toLowerCase()]]),E[i].addEventListener("click",n);return E}function l(t){e.children.length>0&&[...e.children].forEach((t=>t.remove()));const n=a("div","dialog-content");n.append(...t),e.appendChild(n)}function s(){document.body.appendChild(e),N(e),e.showModal(),_(e)}function M(){e.close(),setTimeout((()=>e.remove()),500)}function f(t){const e=a("button","dialog-close circle-btn","x",[["type","button"]]);e.addEventListener("click",M),l([e,a("div","message",t)]),setTimeout(s,500)}function p(e){const n=Number(e.target.value);t.emit(t.START_EVENT_NAME,n),i.textContent=1===n?"1 Player":"2 Players"}function m(){n.forEach((t=>t.textContent=""))}function V(e){1===e?l(A("players-type-choice",["X","O"],(e=>{var n;n=e.target.value,l(A("difficulty-level",["Easy","Medium","Hard"],(e=>{const E=e.target.value;M(),T(),t.emit(t.ONE_PLAYER_GAME_EVENT_NAME,n,E)})))}))):(M(),T())}function R(t){d.textContent=t}function y(t,e){n[t].textContent=e,function(t){"x"===t.toLowerCase()?d.textContent="O":d.textContent="X"}(e)}function v(t){if(f(t+" Win!"),"X"===t){let t=Number(o.textContent);o.textContent=t?++t:1}else{let t=Number(r.textContent);r.textContent=t?++t:1}}function g(){f("Tie!");let t=Number(c.textContent);c.textContent=t?++t:1}function h(t){d.textContent=t,m()}function C(){const t=a("span","game-level"," (Hard)");i.appendChild(t)}function S(){const t=a("span","game-level"," (Medium)");i.appendChild(t)}function x(){const t=a("span","game-level"," (Easy)");i.appendChild(t)}return{init:function(){E||function(){const e=a("div","settings");i=a("div","players-num","2 Players"),u=a("button","reset circle-btn","↺",[["type","button"]]),u.addEventListener("click",(()=>t.emit(t.RESET_EVENT_NAME))),e.append(i,u);const N=a("div","scores"),_=a("div");o=a("span","x-score","0"),_.append(document.createTextNode("X: "),o);const T=a("div");c=a("span","ties","0"),T.append(document.createTextNode("Ties: "),c);const A=a("div");r=a("span","o-score","0"),A.append(document.createTextNode("O: "),r),N.append(_,T,A);const l=a("div","control");l.append(e,N);const s=a("div","player-turn");d=a("span","current-player","X"),s.append(d,document.createTextNode(" Turn"));const M=a("div","board-container");for(let e=0;e<9;e++){const E=a("div","board-cell");E.addEventListener("click",(()=>{t.emit(t.MARK_EVENT_NAME,e)})),M.appendChild(E),n.push(E)}M.append(a("div","horizontal-divider first-h-div"),a("div","horizontal-divider last-h-div"),a("div","vertical-divider first-v-div"),a("div","vertical-divider last-v-div"));const f=a("div","game");f.append(s,M),E=a("div","container"),E.append(l,f)}(),t.add(t.START_EVENT_NAME,V),t.add(t.STARTED_EVENT_NAME,R),t.add(t.WIN_EVENT_NAME,v),t.add(t.TIE_EVENT_NAME,g),t.add(t.MARKED_EVENT_NAME,y),t.add(t.RESET_BOARD_EVENT_NAME,h),t.add(t.HARD_GAME_EVENT_NAME,C),t.add(t.MEDIUM_GAME_EVENT_NAME,S),t.add(t.EASY_GAME_EVENT_NAME,x),i.textContent="1 Player",o.textContent="0",r.textContent="0",c.textContent="0",d.textContent="X",m(),l(A("players-num-choice",["1 Player","2 Players"],p)),s()}}}(),E=function(){let e,n,E,i,o,r,c,d,u,N,_,a;function T(t){let e=0;return{getType:function(){return t},getScore:function(){return e},incrementScore:function(){return++e}}}function A(){a++,E=n[a%2]}function l(){N=!1,_=!1,a=e,E=n[a%2],u=!0,c=1===i&&r===E.getType()}function s(e){const n=Number(e);Number.isNaN(n)||(i=n,d=2===n,d&&t.emit(t.STARTED_EVENT_NAME,E.getType()))}function M(e,i){!function(t){t.toUpperCase()===n[0].getType()?[o,r]=[n[0].getType(),n[1].getType()]:[r,o]=[n[0].getType(),n[1].getType()]}(e),function(e){"h"===(e=e.toLowerCase())?t.emit(t.HARD_GAME_EVENT_NAME):"m"===e?t.emit(t.MEDIUM_GAME_EVENT_NAME):t.emit(t.EASY_GAME_EVENT_NAME)}(i),c=r===E.getType(),c&&t.emit(t.COMPUTER_TURN_EVENT_NAME,r,o),t.emit(t.STARTED_EVENT_NAME,E.getType()),d=!0}function f(e){!d||c||N||_||t.emit(t.MARKING_EVENT_NAME,e,E.getType())}function p(){A(),1!==i||c||N||_||(t.emit(t.COMPUTER_TURN_EVENT_NAME,r,o),c=!0),u=!1}function m(){c=!1,A()}function V(){e++,N=!0,_=!1}function R(){e++,_=!0,N=!1}function y(){u?t.emit(t.RESTART_EVENT_NAME,E.getType()):(l(),t.emit(t.RESET_BOARD_EVENT_NAME,E.getType()),c&&t.emit(t.COMPUTER_TURN_EVENT_NAME,r,o))}return{init:function(){e=0,n=[T("X"),T("O")],E=n[0],i=0,o=null,r=null,d=!1,l(),t.add(t.START_EVENT_NAME,s),t.add(t.ONE_PLAYER_GAME_EVENT_NAME,M),t.add(t.MARK_EVENT_NAME,f),t.add(t.MARKED_EVENT_NAME,p),t.add(t.WIN_EVENT_NAME,V),t.add(t.TIE_EVENT_NAME,R),t.add(t.RESET_EVENT_NAME,y),t.add(t.USER_TURN_EVENT_NAME,m)}}}();!function i(){t.init(),t.add(t.RESTART_EVENT_NAME,i),e.init(),E.init(),n.init()}()}();
//# sourceMappingURL=odin-tic-tac-toe.0edbf7822cd81a7ed671.bundle.js.map