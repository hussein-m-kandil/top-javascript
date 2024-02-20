(()=>{"use strict";var n={685:(n,e,t)=>{t.d(e,{A:()=>A});var o=t(354),r=t.n(o),a=t(314),i=t.n(a)()(r());i.push([n.id,':root {\n    --thin-dark-border: 1px solid #ddd;\n    --light-shadow: 0.75px 0.75px 2px 0px #eee;\n    --light-shadow-bigger: 1.5px 1.5px 3px 1px #eee;\n    --danger-color: #d00a;\n    --success-color: #050a;\n    --input-text-color: #555;\n}\n\nhtml {\n    box-sizing: border-box;\n    font-family: sans-serif;\n    color: #3f3f3f;\n}\n\n*::before,\n*,\n*::after {\n    box-sizing: inherit;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n    color: inherit;\n    border: 0;\n}\n\nbody {\n    background-color: #fff;\n    margin: 0 auto;\n    padding: 1.5rem;\n    line-height: 1rem;\n    max-width: 960px;\n    min-height: 100vh;\n    min-height: 100svh;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    flex: 1;\n}\n\nh1 {\n    text-align: center;\n    font-size: 2rem;\n    font-weight: bold;\n    margin: .5rem auto;\n}\n\nlabel,\ninput,\nbutton {\n    -webkit-appearance: none;\n    appearance: none;\n    color: inherit;\n    background-color: transparent;\n    accent-color: #eee;\n    /* Fix blue highlight on chrome mobile */\n    -webkit-tap-highlight-color: transparent;\n}\n\nlabel:active,\ninput:active,\nbutton:active {\n    background-color: #eee;\n    outline: none;\n}\n\nlabel:focus,\ninput:focus,\nbutton:focus {\n    outline: none\n}\n\ninput,\nbutton {\n    border: var(--thin-dark-border);\n    border-radius: .25rem;\n    box-shadow: var(--light-shadow);\n}\n\n/* Fix changes happen on filed after autocompletion */\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus,\ninput:-webkit-autofill:active {\n    -webkit-box-shadow: 0 0 0 30px #fff inset !important;\n    -webkit-text-fill-color: var(--input-text-color) !important;\n    color: var(--input-text-color) !important;\n}\n\nbutton {\n    cursor: pointer;\n    background-color: transparent;\n    padding: .5rem 1rem;\n    font-weight: bold !important;\n}\n\ndialog {\n    padding: 2rem;\n    position: relative;\n    border-radius: 1rem;\n    width: 85%;\n    max-width: 580px;\n}\n\ndiv:has(button.new-book-dialog-close-btn) {\n    position: absolute;\n    top: .75rem;\n    right: .75rem;\n}\n\nbutton.new-book-dialog-show-btn,\nbutton.new-book-dialog-close-btn {\n    padding: .15rem .40rem;\n    font-size: 70%;\n}\n\nbutton.new-book-dialog-show-btn {\n    font-size: 1.5rem;\n    padding: .5rem 1rem;\n}\n\nform.new-book-form {\n    max-width: 480px;\n    font-size: 75%;\n    margin: 0 auto;\n    margin-top: 2rem;\n    display: grid;\n    grid-template-columns: 1fr;\n    row-gap: .5rem;\n}\n\nform.new-book-form div:not(:last-of-type) {\n    display: grid;\n    grid-template-columns: auto 1fr;\n    align-items: center;\n    gap: .5rem;\n}\n\nform.new-book-form div:not(:last-of-type) input[type="text"],\nform.new-book-form div:not(:last-of-type) input[type="tel"] {\n    padding: .35rem .5rem;\n    color: var(--input-text-color);\n    font-weight: light;\n    font-size: 90%;\n}\n\nform.new-book-form div:not(:last-of-type) label {\n    font-size: 90%;\n    font-weight: bold;\n    cursor: pointer;\n}\n\nform.new-book-form div:not(:last-of-type) input[type="checkbox"] {\n    width: 18px;\n    height: 18px;\n    cursor: pointer;\n    position: relative;\n}\n\nform.new-book-form div:not(:last-of-type) input[type="checkbox"]::before {\n    content: "✔️";\n    font-size: 1rem;\n    filter: saturate(0) brightness(.9);\n    position: absolute;\n    transform-origin: 9px 9px;\n    transform: translate(0px, 0px) scale(0) rotate(0);\n    transition: all 50ms ease-in-out;\n}\n\nform.new-book-form div:not(:last-of-type) input[type="checkbox"]:checked::before {\n    transform: translate(1px, -3px) scale(1) rotate(-5deg);\n}\n\nform.new-book-form div:last-of-type {\n    margin-top: 1rem;\n    display: grid;\n    grid-template-columns: 1fr;\n}\n\nform.new-book-form div:last-of-type button[type="submit"] {\n    justify-self: end;\n}\n\n.books-container {\n    margin-top: 2rem;\n    font-size: 90%;\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    justify-content: center;\n    align-content: start;\n    gap: 1rem;\n}\n\n.book-card {\n    padding: 1rem;\n    border: var(--thin-dark-border);\n    border-radius: .5rem;\n    box-shadow: var(--light-shadow-bigger);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n.book-card-title {\n    font-weight: bold;\n    text-align: center;\n    margin-bottom: 1rem;\n    padding-bottom: .5rem;\n    border-bottom: var(--thin-dark-border);\n}\n\n.book-card-body {\n    font-size: 75%;\n    font-weight: light;\n}\n\n.book-card-entry {\n    margin-bottom: .5rem;\n    display: flex;\n    gap: .35rem;\n    justify-content: space-between;\n}\n\n.book-card-entry-title {\n    color: #555;\n}\n\n.book-card-entry-data {\n    font-weight: bold;\n}\n\n.book-card-buttons {\n    margin-top: 1.5rem;\n    display: flex;\n    gap: .5rem;\n    justify-content: space-between;\n}\n\n.book-card-buttons button {\n    font-size: 65%;\n    padding: .5rem;\n}\n\nbutton.danger-border {\n    border: 1px solid var(--danger-color);\n}\n\nbutton.success-border {\n    border: 1px solid var(--success-color);\n}\n\n.success-text {\n    color: var(--success-color);\n}\n\n.danger-text {\n    color: var(--danger-color);\n}',"",{version:3,sources:["webpack://./odin-library/assets/css/styles.css"],names:[],mappings:"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",sourcesContent:[':root {\n    --thin-dark-border: 1px solid #ddd;\n    --light-shadow: 0.75px 0.75px 2px 0px #eee;\n    --light-shadow-bigger: 1.5px 1.5px 3px 1px #eee;\n    --danger-color: #d00a;\n    --success-color: #050a;\n    --input-text-color: #555;\n}\n\nhtml {\n    box-sizing: border-box;\n    font-family: sans-serif;\n    color: #3f3f3f;\n}\n\n*::before,\n*,\n*::after {\n    box-sizing: inherit;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n    color: inherit;\n    border: 0;\n}\n\nbody {\n    background-color: #fff;\n    margin: 0 auto;\n    padding: 1.5rem;\n    line-height: 1rem;\n    max-width: 960px;\n    min-height: 100vh;\n    min-height: 100svh;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    flex: 1;\n}\n\nh1 {\n    text-align: center;\n    font-size: 2rem;\n    font-weight: bold;\n    margin: .5rem auto;\n}\n\nlabel,\ninput,\nbutton {\n    -webkit-appearance: none;\n    appearance: none;\n    color: inherit;\n    background-color: transparent;\n    accent-color: #eee;\n    /* Fix blue highlight on chrome mobile */\n    -webkit-tap-highlight-color: transparent;\n}\n\nlabel:active,\ninput:active,\nbutton:active {\n    background-color: #eee;\n    outline: none;\n}\n\nlabel:focus,\ninput:focus,\nbutton:focus {\n    outline: none\n}\n\ninput,\nbutton {\n    border: var(--thin-dark-border);\n    border-radius: .25rem;\n    box-shadow: var(--light-shadow);\n}\n\n/* Fix changes happen on filed after autocompletion */\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus,\ninput:-webkit-autofill:active {\n    -webkit-box-shadow: 0 0 0 30px #fff inset !important;\n    -webkit-text-fill-color: var(--input-text-color) !important;\n    color: var(--input-text-color) !important;\n}\n\nbutton {\n    cursor: pointer;\n    background-color: transparent;\n    padding: .5rem 1rem;\n    font-weight: bold !important;\n}\n\ndialog {\n    padding: 2rem;\n    position: relative;\n    border-radius: 1rem;\n    width: 85%;\n    max-width: 580px;\n}\n\ndiv:has(button.new-book-dialog-close-btn) {\n    position: absolute;\n    top: .75rem;\n    right: .75rem;\n}\n\nbutton.new-book-dialog-show-btn,\nbutton.new-book-dialog-close-btn {\n    padding: .15rem .40rem;\n    font-size: 70%;\n}\n\nbutton.new-book-dialog-show-btn {\n    font-size: 1.5rem;\n    padding: .5rem 1rem;\n}\n\nform.new-book-form {\n    max-width: 480px;\n    font-size: 75%;\n    margin: 0 auto;\n    margin-top: 2rem;\n    display: grid;\n    grid-template-columns: 1fr;\n    row-gap: .5rem;\n}\n\nform.new-book-form div:not(:last-of-type) {\n    display: grid;\n    grid-template-columns: auto 1fr;\n    align-items: center;\n    gap: .5rem;\n}\n\nform.new-book-form div:not(:last-of-type) input[type="text"],\nform.new-book-form div:not(:last-of-type) input[type="tel"] {\n    padding: .35rem .5rem;\n    color: var(--input-text-color);\n    font-weight: light;\n    font-size: 90%;\n}\n\nform.new-book-form div:not(:last-of-type) label {\n    font-size: 90%;\n    font-weight: bold;\n    cursor: pointer;\n}\n\nform.new-book-form div:not(:last-of-type) input[type="checkbox"] {\n    width: 18px;\n    height: 18px;\n    cursor: pointer;\n    position: relative;\n}\n\nform.new-book-form div:not(:last-of-type) input[type="checkbox"]::before {\n    content: "✔️";\n    font-size: 1rem;\n    filter: saturate(0) brightness(.9);\n    position: absolute;\n    transform-origin: 9px 9px;\n    transform: translate(0px, 0px) scale(0) rotate(0);\n    transition: all 50ms ease-in-out;\n}\n\nform.new-book-form div:not(:last-of-type) input[type="checkbox"]:checked::before {\n    transform: translate(1px, -3px) scale(1) rotate(-5deg);\n}\n\nform.new-book-form div:last-of-type {\n    margin-top: 1rem;\n    display: grid;\n    grid-template-columns: 1fr;\n}\n\nform.new-book-form div:last-of-type button[type="submit"] {\n    justify-self: end;\n}\n\n.books-container {\n    margin-top: 2rem;\n    font-size: 90%;\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    justify-content: center;\n    align-content: start;\n    gap: 1rem;\n}\n\n.book-card {\n    padding: 1rem;\n    border: var(--thin-dark-border);\n    border-radius: .5rem;\n    box-shadow: var(--light-shadow-bigger);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n.book-card-title {\n    font-weight: bold;\n    text-align: center;\n    margin-bottom: 1rem;\n    padding-bottom: .5rem;\n    border-bottom: var(--thin-dark-border);\n}\n\n.book-card-body {\n    font-size: 75%;\n    font-weight: light;\n}\n\n.book-card-entry {\n    margin-bottom: .5rem;\n    display: flex;\n    gap: .35rem;\n    justify-content: space-between;\n}\n\n.book-card-entry-title {\n    color: #555;\n}\n\n.book-card-entry-data {\n    font-weight: bold;\n}\n\n.book-card-buttons {\n    margin-top: 1.5rem;\n    display: flex;\n    gap: .5rem;\n    justify-content: space-between;\n}\n\n.book-card-buttons button {\n    font-size: 65%;\n    padding: .5rem;\n}\n\nbutton.danger-border {\n    border: 1px solid var(--danger-color);\n}\n\nbutton.success-border {\n    border: 1px solid var(--success-color);\n}\n\n.success-text {\n    color: var(--success-color);\n}\n\n.danger-text {\n    color: var(--danger-color);\n}'],sourceRoot:""}]);const A=i},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,r,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(o)for(var A=0;A<this.length;A++){var d=this[A][0];null!=d&&(i[d]=!0)}for(var s=0;s<n.length;s++){var l=[].concat(n[s]);o&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),e.push(l))}},e}},354:n=>{n.exports=function(n){var e=n[1],t=n[3];if(!t)return e;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),a="/*# ".concat(r," */");return[e].concat([a]).join("\n")}return[e].join("\n")}},72:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var a={},i=[],A=0;A<n.length;A++){var d=n[A],s=o.base?d[0]+o.base:d[0],l=a[s]||0,c="".concat(s," ").concat(l);a[s]=l+1;var p=t(c),u={css:d[1],media:d[2],sourceMap:d[3],supports:d[4],layer:d[5]};if(-1!==p)e[p].references++,e[p].updater(u);else{var m=r(u,o);o.byIndex=A,e.splice(A,0,{identifier:c,updater:m,references:1})}i.push(c)}return i}function r(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,r){var a=o(n=n||[],r=r||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var A=t(a[i]);e[A].references--}for(var d=o(n,r),s=0;s<a.length;s++){var l=t(a[s]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}a=d}}},659:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},56:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(o){var r=e[o];if(void 0!==r)return r.exports;var a=e[o]={id:o,exports:{}};return n[o](a,a.exports,t),a.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0,(()=>{class n{static#n=0;constructor(e,t,o,r){this.id=String(++n.#n),this.title=e,this.author=t,this.numOfPages=o,this.readState=Boolean(r)}setReadState(n){"boolean"==typeof n&&(this.readState=n)}}function e(n,e){if(n&&n.setAttribute&&e&&Array.isArray(e))for(let t=0;t<e.length;t++)Array.isArray(e)&&2===e[t].length&&n.setAttribute(e[t][0],e[t][1])}function o(n,t,o){const r=document.createElement("label");n&&"string"==typeof n&&r.appendChild(document.createTextNode(n)),e(r,t);const a=document.createElement("input");return e(a,o),[r,a]}function r(n,e){const t=document.createElement("span");return t.className=e??"",t.appendChild(document.createTextNode(n??"")),t}function a(n,e){const t=document.createElement("div");return t.className="book-card-entry",t.appendChild(r(n+": ","book-card-entry-title")),t.appendChild(r(e,"book-card-entry-data")),t}function i(n,e,t,o,r,a,i,A){n.textContent=e,n.classList.replace(t,o),n.classList.replace(A,i),r.textContent=a,r.classList.replace(i,A)}function A(n,e,t,o,r){const a=document.createElement("button");return a.appendChild(document.createTextNode(n)),a.setAttribute("type",e),a.className=t??"",a.id=o??"",a.value=r??"",a}function d(n,e){if(localStorage){const t=JSON.stringify(e);t.length<3145728&&localStorage.setItem(n,t)}}const s="odin-library-books";function l(n,e,t){const o=document.createElement("div");o.className="book-card";const r=document.createElement("div").appendChild(document.createTextNode(n.title)).parentElement;r.className="book-card-title";const l=document.createElement("div");l.className="book-card-body",l.appendChild(a("Author",n.author)),l.appendChild(a("Number of Pages",n.numOfPages));const c=a("Read",n.readState?"Yes":"No");c.id="read-state-"+n.id,c.lastChild.classList.add(n.readState?"success-text":"danger-text"),l.appendChild(c);const p=document.createElement("div");p.className="book-card-buttons";const u=A("Mark as "+(n.readState?"not read":"read"),"button",n.readState?"danger-border danger-text":"success-border success-text","read-state-toggler-"+n.id,n.id);u.addEventListener("click",(n=>{const e=n.target.value;for(let o=0;o<t.length;o++)if(t[o].id===e){t[o].setReadState(!t[o].readState),t[o].readState?i(n.target,"Mark as not read","success-border","danger-border",document.querySelector("#read-state-"+e).lastChild,"Yes","danger-text","success-text"):i(n.target,"Mark as read","danger-border","success-border",document.querySelector("#read-state-"+e).lastChild,"No","success-text","danger-text");break}d(s,t)}));const m=A("Delete","button","danger-text danger-border","book-card-del-btn-"+n.id,n.id);m.addEventListener("click",(n=>{for(let e=0;e<t.length;e++)if(t[e].id===n.target.value){t.splice(e,1);try{document.querySelector(".books-container")?.removeChild(n.target.parentElement.parentElement)}catch(n){console.log(n.message)}break}d(s,t)})),p.append(u,m),o.append(r,l,p),e.insertBefore(o,e.firstChild)}function c(e,t){const r=document.createElement("form");r.className="new-book-form";const[a,i]=o("Title: ",[["for","title"]],[["type","text"],["id","title"],["name","title"],["autocomplete","on"],["required",""]]);window.HTMLDialogElement&&(i.autofocus=!0),r.appendChild(document.createElement("div").appendChild(a).parentElement.appendChild(i).parentElement);const[c,p]=o("Author: ",[["for","author"]],[["type","text"],["id","author"],["name","author"],["autocomplete","on"],["required",""]]);r.appendChild(document.createElement("div").appendChild(c).parentElement.appendChild(p).parentElement);const[u,m]=o("Number of Pages: ",[["for","pages-number"]],[["type","tel"],["id","pages-number"],["name","pages-number"],["pattern","^[0-9]{1,7}$"],["autocomplete","on"],["required",""]]);m.addEventListener("invalid",(n=>{n.target.validity.patternMismatch?n.target.setCustomValidity("Numbers only are allowed here."):n.target.setCustomValidity("")})),m.addEventListener("input",(n=>{n.target.checkValidity()&&n.target.validity.customError&&n.target.setCustomValidity("")})),r.appendChild(document.createElement("div").appendChild(u).parentElement.appendChild(m).parentElement);const[b,f]=o(" Did you read this book?",[["for","read-state"]],[["type","checkbox"],["id","read-state"],["name","read-state"]]);r.appendChild(document.createElement("div").appendChild(f).parentElement.appendChild(b).parentElement);const g=A("Add New Book","submit","success-color");r.appendChild(document.createElement("div").appendChild(g).parentElement),e.appendChild(r),r.addEventListener("submit",(e=>{e.preventDefault();const o=e.target.elements,r=new n(o.title.value,o.author.value,o["pages-number"].value,o["read-state"].checked);t.unshift(r),d(s,t),l(r,document.querySelector(".books-container"),t);for(let n=0;n<o.length;n++)o[n].value="","checkbox"===o[n].type&&(o[n].checked=!1);e.target.parentElement instanceof HTMLDialogElement&&e.target.parentElement.close()}))}var p=t(72),u=t.n(p),m=t(825),b=t.n(m),f=t(659),g=t.n(f),C=t(56),h=t.n(C),B=t(540),I=t.n(B),v=t(113),x=t.n(v),k=t(685),y={};y.styleTagTransform=x(),y.setAttributes=h(),y.insert=g().bind(null,"head"),y.domAPI=b(),y.insertStyleElement=I(),u()(k.A,y),k.A&&k.A.locals&&k.A.locals;const w=[];if(localStorage){const n=localStorage.getItem(s);n&&w.push(...JSON.parse(n))}w.length>0?w.splice(0,w.length,...w.map((e=>new n(e.title,e.author,e.numOfPages,e.readState)))):(w.push(new n("Murder On The Orient Express","Agatha Christie","256")),w.push(new n("Death on the Nile","Agatha Christie","288",!0))),document.body.appendChild(document.createElement("h1").appendChild(document.createTextNode("Odin Library")).parentElement),window.HTMLDialogElement?function(n){const t=A("+","button","new-book-dialog-show-btn");t.addEventListener("click",(()=>{document.querySelector("dialog").showModal()})),e(t,[["aria-label","Add new book"],["title","Add new book"]]),document.body.appendChild(document.createElement("div").appendChild(t).parentElement);const o=document.createElement("dialog"),r=A("x","button","new-book-dialog-close-btn");e(r,[["aria-label","Close"],["title","Close"]]),o.appendChild(document.createElement("div").appendChild(r).parentElement),r.addEventListener("click",(()=>document.querySelector("dialog").close())),c(o,n),document.body.appendChild(o)}(w):c(document.body,w);const E=document.createElement("div");E.className="books-container",document.body.appendChild(E);for(let n=w.length-1;n>=0;n--)l(w[n],E,w)})()})();
//# sourceMappingURL=2f7ffb27c004a53e27b8.odin-library.bundle.js.map