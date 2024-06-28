!function(){"use strict";function e(e,t,r){for(var n=arguments.length,o=new Array(n>3?n-3:0),a=3;a<n;a++)o[a-3]=arguments[a];if("string"!=typeof e)throw TypeError("Missing 'tagName' of type 'string'!");var i=document.createElement(e);if(t&&(i.className=t),r&&(i.textContent=r),1===o.length&&Array.isArray(o[0])&&Array.isArray(o[0][0])&&(o=o.flat(1)),o.length>0)for(var c=0;c<o.length;c++){if(!Array.isArray(o[c])||2!==o[c].length||!o[c][0]||"string"!=typeof o[c][0])throw TypeError("A given attribute in '...attrs' must be in the form of [string, string]");(o[c][1]||0===o[c][1]||""===o[c][1])&&i.setAttribute(o[c][0],o[c][1])}return i}var t={};function r(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];if("string"!=typeof e||!n.every((function(e){return"function"==typeof e}))){var a="".concat(e).concat(n.length>0?", "+n.toString().replace(/(?:\[|\])/,""):"");throw TypeError("Expect event name of type 'string' and at least 1 callback! Given: '".concat(a,"'"))}var i;t[e]?(i=t[e]).push.apply(i,n):t[e]=n}function n(e,r){if("string"!=typeof e||"function"!=typeof r)throw TypeError("Expect (eventName: string) & (callback: function)! Given: '".concat(e,", ").concat(r,"'"));t[e]&&(t[e]=t[e].filter((function(e){return e!==r})))}function o(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];if("string"!=typeof e)throw TypeError("Expect at least 1 argument of type 'string'! Given: '".concat(e,"'"));t[e]&&t[e].forEach((function(e){e.apply(void 0,n)}))}Object.freeze(r),Object.freeze(r.prototype),Object.freeze(n),Object.freeze(n.prototype),Object.freeze(o),Object.freeze(o.prototype);var a={ATTACK:"Fire",HIT:"Boom",MISS:"Oops",LOSS:"Meh",GAME_OVER:"Bye",SHIP_MOVED:"Voo",SHIP_ROTATED:"Woo",SHIP_SELECTED:"Tick",SHIP_IS_SUNK:"whoa",add:r,remove:n,emit:o};Object.freeze(a);var i=a;function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){var n,o,a,i;n=e,o=t,a=r[t],i=function(e,t){if("object"!=c(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=c(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o),(o="symbol"==c(i)?i:String(i))in n?Object.defineProperty(n,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[o]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function f(e){if(!Number.isInteger(e)||e<2||e>5)throw TypeError("Expect 1 argument (length) of type 'number'; 1 < length < 6! given '".concat(e,"'"));var t=0,r=!1,n=function(){r||(t++,r=t>=e)},o=function(){return r},a={length:e,hits:t,hit:n,isSunk:o};Object.setPrototypeOf(a,f.prototype);var i={configurable:!1,enumerable:!0},c=l(l({},i),{},{writable:!1});return Object.defineProperties(a,{constructor:l(l({},c),{},{enumerable:!1,value:f}),length:l(l({},i),{},{get:function(){return e}}),hits:l(l({},i),{},{get:function(){return t}}),hit:l(l({},c),{},{value:n}),isSunk:l(l({},c),{},{value:o})}),a}function s(e){return function(e){if(Array.isArray(e))return h(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||d(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,l=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(e,t)||d(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){if(e){if("string"==typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(e,t):void 0}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var y=[],v=[];function m(e){for(var t=10,r=[],n=0;n<t;n++){r[n]=[];for(var o=0;o<t;o++)r[n][o]={ship:null,attacked:!1,missed:!1}}var i=[],c=function(e){return Math.floor(Math.random()*e)},u=function(e){var t=p(e,2),n=t[0],o=t[1];return null===r[n][o].ship},l=function(e,t,r){for(var n=[],o=t,a=0;a<e.length;a++){if(!u(o))return[];n.push(s(o)),o[r]++}return n},d=!1,h=function(e){for(var n=[],o=0;0===n.length&&o<100;){o++;var a=c(2),u=0===a?1:0,f=Array(2);f[a]=c(t-e.length),f[u]=c(t),n=l(e,f,a)}d=o>=100,n.forEach((function(t){var n=p(t,2),o=n[0],a=n[1];r[o][a].ship=e})),i.push(s(n))},b=[f(2),f(3),f(3),f(4),f(5)];if(!e&&Array.isArray(y)&&y.length===t)b.splice.apply(b,[0,b.length].concat(v)),r.forEach((function(e,t){e.forEach((function(e,r){if(e.ship=y[t][r].ship,e.ship){var n=b.findIndex((function(t){return t===e.ship}));Array.isArray(i[n])||(i[n]=[]),i[n].push([t,r])}}))})),i.forEach((function(e,t){var n=f(r[e[0][0]][e[0][1]].ship.length);b[t]=n,e.forEach((function(e){var n=p(e,2),o=n[0],a=n[1];r[o][a].ship=b[t]}))}));else do{b.forEach(h)}while(d);var g=function(e){var r=p(e,2),n=r[0],o=r[1];return n>=0&&o>=0&&n<t&&o<t},E=function(){for(var e=0;e<t;e++){y[e]=[];for(var n=0;n<t;n++)y[e][n]={ship:r[e][n].ship,attacked:r[e][n].attacked,missed:r[e][n].missed}}},S=function(){return v.splice.apply(v,[0,v.length].concat(b))},P=function(){r.forEach((function(e){e.attacked=!1,e.missed=!1}))},I=function(e,t){i[e]=t,i[e].forEach((function(t){var n=p(t,2),o=n[0],a=n[1];r[o][a].ship=b[e]}))},O=function(e){e.forEach((function(e){var t=p(e,2),n=t[0],o=t[1];r[n][o].ship=null}))},T=function(e,t){var r=i.filter((function(t,r){return r!==e}));return g(t)&&!r.some((function(e){return e.some((function(e){return"".concat(e)==="".concat(t)}))}))},A=function(e,t){var r=p(t,2),n=r[0],o=r[1];if(e>=i.length)throw TypeError("Invalid ship index! Ships count = ".concat(i.length,". Given index = ").concat(e,"."));for(var c=[],u=i[e],l=0;l<u.length;l++){var f=[u[l][0]+n,u[l][1]+o];if(!T(e,f))return!1;c.push(f)}return O(u),I(e,c),P(),E(),S(),a.emit(a.SHIP_MOVED),!0},w={board:r,ships:b,shipsAreas:i,receiveAttack:function(e){var t=p(e,2),n=t[0],o=t[1];if(!g([n,o]))throw TypeError("Invalid coordinates! It should be in the range from [0,0] to ".concat([9,9],", the given is ").concat([n,o],"."));var c=r[n][o];c.ship&&!c.attacked?(c.ship.hit(),c.attacked=!0,a.emit(a.HIT,[n,o]),c.ship.isSunk()&&a.emit(a.SHIP_IS_SUNK,i[b.indexOf(c.ship)])):c.ship||c.missed||(c.missed=!0,a.emit(a.MISS,[n,o])),b.every((function(e){return e.isSunk()}))&&a.emit(a.LOSS)},moveShipUp:function(e){return A(e,[-1,0])},moveShipDown:function(e){return A(e,[1,0])},moveShipLeft:function(e){return A(e,[0,-1])},moveShipRight:function(e){return A(e,[0,1])},moveShip:function(e,t){if(!Array.isArray(e)||!Array.isArray(t)||2!==e.length||2!==t.length)throw TypeError("Invalid arguments! Expect 2 pairs, given: ".concat(e,", ").concat(t));if("".concat(e)==="".concat(t))return!1;if(!g(e)||!g(t))throw TypeError("Given an out of board's boundary cell! Board sides are from 0 to ".concat(9));var n=p(e,2),o=n[0],a=n[1],c=p(t,2),u=c[0],l=c[1],f=r[u][l],s=r[o][a];if(f.ship&&f.ship!==s.ship)return!1;var d=i.findIndex((function(t){return t.some((function(t){return"".concat(t)==="".concat(e)}))}));return!(d<0)&&A(d,[u-o,l-a])},rotateShip:function(e){if(!Number.isInteger(e)||e<0||e>=i.length)throw TypeError("Invalid ship index! Should be a number from 0 to ".concat(i.length,", given: ").concat(e));var t=i[e];if(t.length<=1)return!1;for(var r=Math.floor(t.length/2),n=t[1][0]>t[0][0],o=[],c=0;c<t.length;c++)if(r===c)o.push(t[c]);else{var u=p(n?[t[r][0],t[r][1]]:[t[r][1],t[r][0]],2),l=u[0],f=u[1],s=[l],d=Math.abs(r-c),h=c<r?f-d:f+d;if(n?s.push(h):s.unshift(h),!T(e,s))return!1;o.push(s)}return O(t),I(e,o),P(),E(),S(),a.emit(a.SHIP_ROTATED),!0}};return Object.setPrototypeOf(w,m.prototype),Object.defineProperty(w,"constructor",{value:m,writable:!1,configurable:!1,enumerable:!1}),Object.freeze(w),w}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,l=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(e,t)||g(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){if(e){if("string"==typeof e)return E(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?E(e,t):void 0}}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function S(e){if(void 0!==e&&e!==S.TYPES.COMPUTER&&e!==S.TYPES.HUMAN)throw TypeError("Invalid type! Only '".concat(S.TYPES.COMPUTER,"' & '").concat(S.TYPES.HUMAN,"' are the valid types. Given: '").concat(e,"'"));var t=void 0===e?S.TYPES.COMPUTER:e,r={type:t,gameBoard:m(t===S.TYPES.COMPUTER)};if(r.type===S.TYPES.COMPUTER){for(var n,o,i=r.gameBoard.board.length,c=null!==(n=null===(o=r.gameBoard.board[0])||void 0===o?void 0:o.length)&&void 0!==n?n:0,u=[],l=0;l<i;l++){u[l]=[];for(var f=0;f<c;f++)u[l][f]={attacked:!1,missed:!1}}var s=[],p=[],d=[];u.forEach((function(e,t){e.forEach((function(e,r){e.attacked||e.missed||d.push([t,r])}))}));var h=function(){return function(){var e="V",t="H";p.splice(0);var r=function(e){var t=b(e,2),r=t[0],n=t[1];return s.some((function(e){return e.some((function(e){var t=b(e,2),o=t[0],a=t[1];return o===r&&a===n}))}))},n=function(e,t,r){return"gtOrEq"===t?e>=r:e<r},o=function(t,o,a,i,c,l){var f,s=t+a,d=b(i===e?[s,o]:[o,s],2),h=d[0],y=d[1],v=null===(f=u[h])||void 0===f?void 0:f[y];if(v&&!r([h,y])){for(;n(s,c,l)&&v.attacked;){var m;s+=a;var g=b(i===e?[s,o]:[o,s],2);h=g[0],y=g[1],v=null===(m=u[h])||void 0===m?void 0:m[y]}var E=p.findIndex((function(e){var t=b(e,2),r=t[0],n=t[1];return r===h&&n===y}))<0;v&&!v.attacked&&!v.missed&&E&&p.push([h,y])}};u.forEach((function(n,a){n.forEach((function(n,l){if(n.attacked&&!r([a,l])){var f,s,d,h,y=p.length;null!==(f=u[a-1])&&void 0!==f&&null!==(f=f[l])&&void 0!==f&&f.attacked&&!r([a-1,l])||null!==(s=u[a+1])&&void 0!==s&&null!==(s=s[l])&&void 0!==s&&s.attacked&&!r([a+1,l])?(o(a,l,-1,e,"gtOrEq",0),o(a,l,1,e,"lt",i)):(null!==(d=u[a][l-1])&&void 0!==d&&d.attacked&&!r([a,l-1])||null!==(h=u[a][l+1])&&void 0!==h&&h.attacked&&!r([a,l+1]))&&(o(l,a,-1,t,"gtOrEq",0),o(l,a,1,t,"lt",c)),y===p.length&&(o(a,l,-1,e,"gtOrEq",0),o(a,l,1,e,"lt",i),o(l,a,-1,t,"gtOrEq",0),o(l,a,1,t,"lt",c))}}))}))}()},y=!1,v=null,P=null;a.add(a.MISS,(function(){if(y){var e=b(P,2),t=e[0],r=e[1];u[t][r].missed=!0,y=!1,h(),p.length>0&&(v=p.shift())}})),a.add(a.HIT,(function(){if(y){var e=b(P,2),t=e[0],r=e[1];u[t][r].attacked=!0,y=!1,p.length>0?v=p.shift():(h(),p.length>0&&(v=p.shift()))}})),a.add(a.SHIP_IS_SUNK,(function(e){var t=[];e.forEach((function(e){return t.push(function(e){if(Array.isArray(e))return E(e)}(r=e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(r)||g(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}());var r})),s.push(t)})),r.play=function(){if(d.length>0){if(v)P=v,v=null;else{var e=Math.floor(Math.random()*d.length);P=d[e]}var t=d.findIndex((function(e){var t=b(e,2),r=t[0],n=t[1];return r===P[0]&&n===P[1]}));t>-1&&d.splice(t,1),y=!0,a.emit(a.ATTACK,P)}else y=!1,a.emit(a.GAME_OVER)}}return Object.setPrototypeOf(r,S.prototype),Object.defineProperty(r,"constructor",{value:S,writable:!1,enumerable:!1,configurable:!1}),Object.freeze(r),r}S.TYPES={COMPUTER:"C",HUMAN:"H"},Object.freeze(S),Object.freeze(S.prototype);var P=null,I=-1,O=0;function T(e){return function(e){if(Array.isArray(e))return A(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return A(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?A(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function w(){return{playersData:[{name:"you",player:S(S.TYPES.HUMAN),playerUI:e("div","first-player")},{name:"computer",player:S(S.TYPES.COMPUTER),playerUI:e("div","second-player")}],allPlayersDisabled:!1,gameStarted:!1,currentPlayerIndex:0,computerPlayTimeOutId:0,switchCurrentPlayer:function(){this.currentPlayerIndex=(this.currentPlayerIndex+1)%2},renderPlayerInfo:function(t){var r=this.playersData[t],n=T(r.playerUI.children);n.forEach((function(e){return e.remove()})),r.playerUI.append(function(t,r,n){if("string"!=typeof t)throw TypeError("Invalid 'name' type; expected: 'string', given: '".concat(t,"'"));var o,a,c,u=e("div","".concat(t,"-info")),l=(o=t.replace("-"," "),c=(a=String(o)).length>1?a.slice(1):"",a.charAt(0).toLocaleUpperCase()+c),f=e("h3","player-name","".concat(l));if(u.append(f),n&&r===S.TYPES.HUMAN){var s=e("div","ship-nav"),p=e("div","select-container"),d=e("select","select-ship",null,["name","select-ship"]);d.append(new Option("Select a ship",-1));var h=[];n.shipsAreas.forEach((function(e,t){h.push(new Option("".padStart(e.length,"◼"),t)),d.append(h.at(-1))}));var y=[e("button","move-up-btn","Up",["type","button"]),e("button","move-down-btn","Down",["type","button"]),e("button","move-left-btn","Left",["type","button"]),e("button","move-right-btn","Right",["type","button"]),e("button","move-rotate-btn","Rotate",["type","button"])],v=y[0],m=y[1],b=y[2],g=y[3],E=y[4],P=function(e){if(d.value){var t=Number(d.value);Number.isInteger(t)&&t>-1&&t<n.shipsAreas.length&&n[e](t)}};v.addEventListener("click",(function(){return P("moveShipUp")})),m.addEventListener("click",(function(){return P("moveShipDown")})),b.addEventListener("click",(function(){return P("moveShipLeft")})),g.addEventListener("click",(function(){return P("moveShipRight")})),E.addEventListener("click",(function(){return P("rotateShip")})),p.append(d),s.append(p,v,m,b,g,E),u.append(e("p","ship-nav-description","Use these buttons (or drag-drop & double-click) to place a ship."),s),i.add(i.SHIP_SELECTED,(function(e){h.forEach((function(t,r){t.selected=r===e}))}))}return u}(r.name,r.player.type,this.gameStarted||this.allPlayersDisabled?null:r.player.gameBoard)),n.length>1&&r.playerUI.appendChild(n[1])},renderPlayerBoard:function(t){var r=this.playersData[t],n=t===this.currentPlayerIndex,o=(this.allPlayersDisabled||n)&&this.gameStarted,i=r.player.type===S.TYPES.COMPUTER&&!n&&!o,c=!this.gameStarted&&!this.allPlayersDisabled;T(r.playerUI.children).length>1&&r.playerUI.removeChild(r.playerUI.lastChild),r.playerUI.appendChild(function(t,r,n,o,i){if([t,r,n].forEach((function(e){if(void 0===e)throw TypeError("'Board' is called with an invalid number of arguments!")})),!(t instanceof m))throw TypeError("'Board' is called with invalid 'playerGameBoard'! Given '".concat(t,"'."));if("boolean"!=typeof r||"boolean"!=typeof n)throw TypeError("'Board' expects 'hidden' & 'disabled' of type 'boolean'! Given '".concat(r," & ").concat(n,"'."));var c=e("div","board-container"+(n?" disabled":"")),u=0,l=function(e){return t.shipsAreas.findIndex((function(t){return t.some((function(t){return"".concat(t)==="".concat(e)}))}))};return t.board.forEach((function(n,f){u=n.length,n.forEach((function(n,u){var s=l([f,u]),p=I>-1&&I===s,d="board-cell";n.ship?(r||(d+=" ship"),n.ship.isSunk()&&(d+=" sunk"),i&&(d+=" movable"),p?d+=" held":n.attacked&&(d+=" attacked")):n.missed&&(d+=" missed");var h=e("div",d);if(o&&h.addEventListener("click",(function(){a.emit(a.ATTACK,[f,u])})),i){var y=function(e){0!==e.button&&"touch"!==e.pointerType||(e.preventDefault(),s>-1&&a.emit(a.SHIP_SELECTED,s),I=l(P=[f,u]))},v=function(){P=null,I=-1,2==++O&&s>-1?(t.rotateShip(s),a.emit(a.SHIP_ROTATED),O=0):(a.emit(a.SHIP_MOVED),setTimeout((function(){O=0}),250))},m=function(){var e=[f,u];P&&"".concat(P)!=="".concat(e)&&t.moveShip(P,e)&&(I=l(P=e))};void 0!==h.onpointerdown||window.navigator.maxTouchPoints>0?(h.addEventListener("touchmove",(function(e){return e.preventDefault()})),h.addEventListener("gotpointercapture",(function(e){try{e.target.releasePointerCapture(e.pointerId)}catch(e){console.log(e.message)}})),h.addEventListener("pointerdown",y),h.addEventListener("pointerenter",m,{passive:!0}),h.addEventListener("pointerup",v),h.addEventListener("pointercancel",v)):(h.addEventListener("mousedown",y),h.addEventListener("mouseenter",m,{passive:!0}),h.addEventListener("mouseup",v))}c.appendChild(h)}))})),c.style.display="grid",c.style.gridTemplateColumns="repeat(".concat(u,", 1fr)"),c.style.gridTemplateRows="repeat(".concat(u,", auto)"),c}(r.player.gameBoard,r.player.type===S.TYPES.COMPUTER,o,i,c))},renderPlayerUI:function(e,t){var r=this.playersData[e];T(r.playerUI.children).forEach((function(e){return e.remove()})),this.renderPlayerInfo(e),this.renderPlayerBoard(e),t&&t.append(r.playerUI)},renderAllPlayersUI:function(e){for(var t=0;t<this.playersData.length;t++)this.renderPlayerUI(t,e)},playIfComputerTurn:function(){var e=this.playersData[this.currentPlayerIndex].player;e.type===S.TYPES.COMPUTER&&(this.computerPlayTimeOutId=setTimeout((function(){e.play()}),1e3))},isComputerCurrentPlayer:function(){return this.playersData[this.currentPlayerIndex].player.type===S.TYPES.COMPUTER}}}var C=w(),U=!1;function j(e){if(!U){U=!0;var t=0===C.currentPlayerIndex?1:0;C.playersData[t].player.gameBoard.receiveAttack(e),U=!1}}function k(){C.renderPlayerUI(0===C.currentPlayerIndex?1:0),C.playIfComputerTurn()}function M(){C.switchCurrentPlayer(),C.renderAllPlayersUI(),C.playIfComputerTurn()}function D(){a.emit(a.GAME_OVER)}function L(){C.gameStarted?C.renderAllPlayersUI():C.renderPlayerBoard(0)}function x(){L()}var H=[e("div","head-container"),e("h1","head","Odin Battleship"),e("button","start-btn control-btn","Start",["type","button"]),e("button","reset-btn control-btn","Reset",["type","button"]),e("div","game-container")],R=H[0],_=H[1],G=H[2],N=H[3],B=H[4],Y=function(e){return{gameContainer:e,initiateNewGame:function(){a.remove(a.SHIP_ROTATED,x),a.remove(a.SHIP_MOVED,L),a.remove(a.ATTACK,j),a.remove(a.HIT,k),a.remove(a.MISS,M),a.remove(a.LOSS,D),C=w(),a.add(a.SHIP_ROTATED,x),a.add(a.SHIP_MOVED,L),a.add(a.ATTACK,j),a.add(a.HIT,k),a.add(a.MISS,M),a.add(a.LOSS,D),T(this.gameContainer.children).forEach((function(e){return e.remove()})),C.renderPlayerUI(0,this.gameContainer)},startGame:function(){C.gameStarted=!0,T(this.gameContainer.children).forEach((function(e){return e.remove()})),C.renderAllPlayersUI(this.gameContainer)},isComputerWon:function(){return C.isComputerCurrentPlayer()},endCurrentGame:function(){clearTimeout(C.computerPlayTimeOutId),C.computerPlayTimeOutId=0,C.gameStarted=!1,C.allPlayersDisabled=!0,C.renderAllPlayersUI()}}}(B),z=!1;G.addEventListener("click",(function(){Y.startGame(),R.removeChild(G),R.appendChild(N)})),N.addEventListener("click",(function(){Y.initiateNewGame(),R.removeChild(N),R.appendChild(G),z=!1})),a.add(a.GAME_OVER,(function(){if(!z){z=!0,Y.endCurrentGame();var t=Y.isComputerWon()?"Game Over!":"You Win!",r=[e("dialog","game-over"),e("h2","message",t),e("p","question","Do want to play again?"),e("button","cancel-btn","Cancel",["type","button"]),e("button","play-again-btn","Play Again",["type","button"])],n=r[0],o=r[1],a=r[2],i=r[3],c=r[4];n.addEventListener("close",(function(){return document.body.removeChild(n)})),i.addEventListener("click",(function(){return n.close()})),c.addEventListener("click",(function(){Y.initiateNewGame(),n.close(),N.click()})),n.append(o,a,i,c),document.body.append(n),n.showModal()}})),Y.initiateNewGame(),R.append(_,G),document.body.append(R,B)}();
//# sourceMappingURL=odin-battleship.294fd5b76f56724eec76.bundle.js.map