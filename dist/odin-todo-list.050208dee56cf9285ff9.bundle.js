!function(){"use strict";function t(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function e(e,n){return+t(e)==+t(n)}function n(e,n){const r=t(e),a=t(n);return r.getTime()>a.getTime()}function r(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}Math.pow(10,8);const a=6048e5,o=864e5,i=36e5,u=43200,s=1440;function d(e,n){return function(e,n){return r(e,+t(e)+n)}(e,n*i)}function c(t,e,n){for(var r=arguments.length,a=new Array(r>3?r-3:0),o=3;o<r;o++)a[o-3]=arguments[o];if("string"!=typeof t)throw TypeError("Missing 'tagName' of type 'string'!");const i=document.createElement(t);if(e&&(i.className=e),n&&(i.textContent=n),1===a.length&&Array.isArray(a[0])&&Array.isArray(a[0][0])&&(a=a.flat(1)),a.length>0)for(let t=0;t<a.length;t++){if(!Array.isArray(a[t])||2!==a[t].length||!a[t][0]||"string"!=typeof a[t][0])throw TypeError("A given attribute in '...attrs' must be in the form of [string, string]");(a[t][1]||0===a[t][1]||""===a[t][1])&&i.setAttribute(a[t][0],a[t][1])}return i}const l={},h={CREATE_NEW_TODO:"create-new-todo",NEW_TODO_CREATED:"new-todo-created",EDIT_TODO:"edit-todo",TODO_EDITED:"todo-edited",DELETE_TODO:"delete-todo",CANCEL_DELETE_TODO:"cancel-delete-todo",CONFIRM_DELETE_TODO:"confirm-delete-todo",add(t){l[t]||(l[t]=[]);for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];n.forEach((e=>l[t].push(e)))},remove(t,e){l[t]&&l[t].forEach(((n,r)=>{e.includes(n)&&l[t].splice(r,1)}))},emit(t,e){l[t]&&l[t].forEach((t=>t(e)))}};Object.freeze(h),Object.freeze(h.add),Object.freeze(h.remove),Object.freeze(h.emit);var m=h;function f(t){return c("button",t.className?t.className+" hmk-btn":" hmk-btn",t.textContent,t.type?["type",t.type]:["type","button"])}const g={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function p(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const w={date:p({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:p({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:p({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},y={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function b(t){return(e,n)=>{let r;if("formatting"===(n?.context?String(n.context):"standalone")&&t.formattingValues){const e=t.defaultFormattingWidth||t.defaultWidth,a=n?.width?String(n.width):e;r=t.formattingValues[a]||t.formattingValues[e]}else{const e=t.defaultWidth,a=n?.width?String(n.width):t.defaultWidth;r=t.values[a]||t.values[e]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function D(t){return(e,n={})=>{const r=n.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],o=e.match(a);if(!o)return null;const i=o[0],u=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],s=Array.isArray(u)?function(t,e){for(let e=0;e<t.length;e++)if(t[e].test(i))return e}(u):function(t,e){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&t[e].test(i))return e}(u);let d;return d=t.valueCallback?t.valueCallback(s):s,d=n.valueCallback?n.valueCallback(d):d,{value:d,rest:e.slice(i.length)}}}var v;const M={code:"en-US",formatDistance:(t,e,n)=>{let r;const a=g[t];return r="string"==typeof a?a:1===e?a.one:a.other.replace("{{count}}",e.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:w,formatRelative:(t,e,n,r)=>y[t],localize:{ordinalNumber:(t,e)=>{const n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:b({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:b({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:b({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:b({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:b({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(v={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,e={})=>{const n=t.match(v.matchPattern);if(!n)return null;const r=n[0],a=t.match(v.parsePattern);if(!a)return null;let o=v.valueCallback?v.valueCallback(a[0]):a[0];return o=e.valueCallback?e.valueCallback(o):o,{value:o,rest:t.slice(r.length)}}),era:D({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:D({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:D({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:D({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:D({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let T={};function E(){return T}function x(e){const n=t(e);return n.setHours(0,0,0,0),n}function O(e){const n=t(e),r=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds(),n.getMilliseconds()));return r.setUTCFullYear(n.getFullYear()),+e-+r}function k(e){const n=t(e);return function(t,e){const n=x(t),r=x(e),a=+n-O(n),i=+r-O(r);return Math.round((a-i)/o)}(n,function(e){const n=t(e),a=r(e,0);return a.setFullYear(n.getFullYear(),0,1),a.setHours(0,0,0,0),a}(n))+1}function C(e,n){const r=E(),a=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??r.weekStartsOn??r.locale?.options?.weekStartsOn??0,o=t(e),i=o.getDay(),u=(i<a?7:0)+i-a;return o.setDate(o.getDate()-u),o.setHours(0,0,0,0),o}function S(t){return C(t,{weekStartsOn:1})}function N(e){const n=t(e),a=n.getFullYear(),o=r(e,0);o.setFullYear(a+1,0,4),o.setHours(0,0,0,0);const i=S(o),u=r(e,0);u.setFullYear(a,0,4),u.setHours(0,0,0,0);const s=S(u);return n.getTime()>=i.getTime()?a+1:n.getTime()>=s.getTime()?a:a-1}function P(e){const n=t(e),o=+S(n)-+function(t){const e=N(t),n=r(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),S(n)}(n);return Math.round(o/a)+1}function W(e,n){const a=t(e),o=a.getFullYear(),i=E(),u=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??i.firstWeekContainsDate??i.locale?.options?.firstWeekContainsDate??1,s=r(e,0);s.setFullYear(o+1,0,u),s.setHours(0,0,0,0);const d=C(s,n),c=r(e,0);c.setFullYear(o,0,u),c.setHours(0,0,0,0);const l=C(c,n);return a.getTime()>=d.getTime()?o+1:a.getTime()>=l.getTime()?o:o-1}function L(e,n){const o=t(e),i=+C(o,n)-+function(t,e){const n=E(),a=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,o=W(t,e),i=r(t,0);return i.setFullYear(o,0,a),i.setHours(0,0,0,0),C(i,e)}(o,n);return Math.round(i/a)+1}function Y(t,e){return(t<0?"-":"")+Math.abs(t).toString().padStart(e,"0")}const A={y(t,e){const n=t.getFullYear(),r=n>0?n:1-n;return Y("yy"===e?r%100:r,e.length)},M(t,e){const n=t.getMonth();return"M"===e?String(n+1):Y(n+1,2)},d(t,e){return Y(t.getDate(),e.length)},a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h(t,e){return Y(t.getHours()%12||12,e.length)},H(t,e){return Y(t.getHours(),e.length)},m(t,e){return Y(t.getMinutes(),e.length)},s(t,e){return Y(t.getSeconds(),e.length)},S(t,e){const n=e.length,r=t.getMilliseconds();return Y(Math.trunc(r*Math.pow(10,n-3)),e.length)}},H={G:function(t,e,n){const r=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){const e=t.getFullYear(),r=e>0?e:1-e;return n.ordinalNumber(r,{unit:"year"})}return A.y(t,e)},Y:function(t,e,n,r){const a=W(t,r),o=a>0?a:1-a;return"YY"===e?Y(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):Y(o,e.length)},R:function(t,e){return Y(N(t),e.length)},u:function(t,e){return Y(t.getFullYear(),e.length)},Q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return Y(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return Y(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){const r=t.getMonth();switch(e){case"M":case"MM":return A.M(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){const r=t.getMonth();switch(e){case"L":return String(r+1);case"LL":return Y(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){const a=L(t,r);return"wo"===e?n.ordinalNumber(a,{unit:"week"}):Y(a,e.length)},I:function(t,e,n){const r=P(t);return"Io"===e?n.ordinalNumber(r,{unit:"week"}):Y(r,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getDate(),{unit:"date"}):A.d(t,e)},D:function(t,e,n){const r=k(t);return"Do"===e?n.ordinalNumber(r,{unit:"dayOfYear"}):Y(r,e.length)},E:function(t,e,n){const r=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){const a=t.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return Y(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){const a=t.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return Y(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){const r=t.getDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return Y(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){const r=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){const r=t.getHours();let a;switch(a=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(t,e,n){const r=t.getHours();let a;switch(a=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){let e=t.getHours()%12;return 0===e&&(e=12),n.ordinalNumber(e,{unit:"hour"})}return A.h(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getHours(),{unit:"hour"}):A.H(t,e)},K:function(t,e,n){const r=t.getHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):Y(r,e.length)},k:function(t,e,n){let r=t.getHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):Y(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):A.m(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getSeconds(),{unit:"second"}):A.s(t,e)},S:function(t,e){return A.S(t,e)},X:function(t,e,n){const r=t.getTimezoneOffset();if(0===r)return"Z";switch(e){case"X":return F(r);case"XXXX":case"XX":return j(r);default:return j(r,":")}},x:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"x":return F(r);case"xxxx":case"xx":return j(r);default:return j(r,":")}},O:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+q(r,":");default:return"GMT"+j(r,":")}},z:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+q(r,":");default:return"GMT"+j(r,":")}},t:function(t,e,n){return Y(Math.trunc(t.getTime()/1e3),e.length)},T:function(t,e,n){return Y(t.getTime(),e.length)}};function q(t,e=""){const n=t>0?"-":"+",r=Math.abs(t),a=Math.trunc(r/60),o=r%60;return 0===o?n+String(a):n+String(a)+e+Y(o,2)}function F(t,e){return t%60==0?(t>0?"-":"+")+Y(Math.abs(t)/60,2):j(t,e)}function j(t,e=""){const n=t>0?"-":"+",r=Math.abs(t);return n+Y(Math.trunc(r/60),2)+e+Y(r%60,2)}const _=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},X=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},z={p:X,P:(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],r=n[1],a=n[2];if(!a)return _(t,e);let o;switch(r){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;default:o=e.dateTime({width:"full"})}return o.replace("{{date}}",_(r,e)).replace("{{time}}",X(a,e))}},Q=/^D+$/,I=/^Y+$/,G=["D","DD","YY","YYYY"];function B(t){return t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}const R=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,$=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,J=/^'([^]*?)'?$/,V=/''/g,U=/[a-zA-Z]/;function K(e,n,r){const a=E(),o=r?.locale??a.locale??M,i=r?.firstWeekContainsDate??r?.locale?.options?.firstWeekContainsDate??a.firstWeekContainsDate??a.locale?.options?.firstWeekContainsDate??1,u=r?.weekStartsOn??r?.locale?.options?.weekStartsOn??a.weekStartsOn??a.locale?.options?.weekStartsOn??0,s=t(e);if(!function(e){if(!B(e)&&"number"!=typeof e)return!1;const n=t(e);return!isNaN(Number(n))}(s))throw new RangeError("Invalid time value");let d=n.match($).map((t=>{const e=t[0];return"p"===e||"P"===e?(0,z[e])(t,o.formatLong):t})).join("").match(R).map((t=>{if("''"===t)return{isToken:!1,value:"'"};const e=t[0];if("'"===e)return{isToken:!1,value:Z(t)};if(H[e])return{isToken:!0,value:t};if(e.match(U))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return{isToken:!1,value:t}}));o.localize.preprocessor&&(d=o.localize.preprocessor(s,d));const c={firstWeekContainsDate:i,weekStartsOn:u,locale:o};return d.map((t=>{if(!t.isToken)return t.value;const a=t.value;return(!r?.useAdditionalWeekYearTokens&&function(t){return I.test(t)}(a)||!r?.useAdditionalDayOfYearTokens&&function(t){return Q.test(t)}(a))&&function(t,e,n){const r=function(t,e,n){const r="Y"===t[0]?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(t,e,n);if(console.warn(r),G.includes(t))throw new RangeError(r)}(a,n,String(e)),(0,H[a[0]])(s,a,o.localize,c)})).join("")}function Z(t){const e=t.match(J);return e?e[1].replace(V,"'"):t}function tt(t){const r=K(new Date,"yyyy-MM-dd'T'HH:mm"),a=K(t?t.dueDate:d(new Date,2),"yyyy-MM-dd'T'HH:mm"),o=250,i=c("form","todo-form",null,["action",""],["method","get"]),u=c("div","title"),s=c("label","title","Title ",["for","title"]),l=c("span","char-limit"),h=c("span","typed-chars","0"),g=c("span","char-limit-sep"," / "),p=c("span","remain-chars","50"),w=c("input","title",null,["id","title"],["name","title"],["type","text"],["value",t?t.title:""],["autocomplete","on"],["autofocus",""],["maxlength","50"],["required",""]);l.append(h,g,p),s.append(l),u.append(s,w),w.addEventListener("input",(()=>{w.value.length>50&&(w.value=w.value.slice(0,50)),h.textContent=w.value.length,p.textContent=50-w.value.length}));const y=c("div","description"),b=c("label","description","Description ",["for","description"]),D=c("span","char-limit"),v=c("span","typed-chars","0"),M=c("span","char-limit-sep"," / "),T=c("span","remain-chars",""+o),E=c("textarea","description",t?t.description:null,["id","description"],["name","description"],["maxlength",""+o]);D.append(v,M,T),b.append(D),y.append(b,E),E.addEventListener("input",(()=>{E.value.length>o&&(E.value=E.value.slice(0,o)),v.textContent=E.value.length,T.textContent=o-E.value.length}));const x=c("div","due-date"),O=c("label","due-date","Due Date ",["for","due-date"]),k=c("input","due-date",null,["id","due-date"],["name","due-date"],["type","datetime-local"],["value",a],["min",r],["required",""]);x.append(O,k);const C=c("fieldset","priority"),S=c("legend","priority","Priority "),N=c("div","priority"),P=c("label","priority","High ",["for","high-priority"]),W=c("input","priority",null,["id","high-priority"],["name","priority"],["value","high"],["type","radio"]);N.append(W,P);const L=c("div","priority"),Y=c("label","priority","Medium ",["for","medium-priority"]),A=c("input","priority",null,["type","radio"],["id","medium-priority"],["name","priority"],["value","medium"]);L.append(A,Y);const H=c("div","priority"),q=c("label","priority","Low ",["for","low-priority"]),F=c("input","priority",null,["id","low-priority"],["name","priority"],["value","low"],["type","radio"]);if(H.append(F,q),t)switch(t.priority){case"low":F.checked=!0;break;case"high":W.checked=!0;break;default:A.checked=!0}else A.checked=!0;C.append(S,N,L,H);const j=c("div","submit"),_=f({className:"submit",type:"submit",textContent:t?"Confirm Todo Edit":"Create New Todo"});return j.appendChild(_),i.append(u,y,x,C,j),i.addEventListener("submit",(a=>{a.preventDefault();const o=a.target;o.title.value||(o.title.setCustomValidity("Todo's title cannot be empty!"),o.title.addEventListener("input",(()=>{o.title.setCustomValidity("")}))),e(new Date(o["due-date"].value),new Date(r))||n(new Date(o["due-date"].value),new Date(r))||(o["due-date"].setCustomValidity("The date/time must be after or equal to the current date/time!"),o["due-date"].addEventListener("change",(()=>{o["due-date"].setCustomValidity("")})));const i={title:o.title.value,description:o.description.value,dueDate:new Date(o["due-date"].value),priority:o.priority.value};t?m.emit(m.TODO_EDITED,Object.assign({},t,i)):m.emit(m.CREATE_NEW_TODO,i)})),i}function et(e,n){const r=t(e),a=t(n),o=r.getTime()-a.getTime();return o<0?-1:o>0?1:o}function nt(e){const n=t(e);return+function(e){const n=t(e);return n.setHours(23,59,59,999),n}(n)==+function(e){const n=t(e),r=n.getMonth();return n.setFullYear(n.getFullYear(),r+1,0),n.setHours(23,59,59,999),n}(n)}function rt(e,n){const r=t(e),a=t(n),o=et(r,a),i=Math.abs(function(e,n){const r=t(e),a=t(n);return 12*(r.getFullYear()-a.getFullYear())+(r.getMonth()-a.getMonth())}(r,a));let u;if(i<1)u=0;else{1===r.getMonth()&&r.getDate()>27&&r.setDate(30),r.setMonth(r.getMonth()-o*i);let n=et(r,a)===-o;nt(t(e))&&1===i&&1===et(e,a)&&(n=!1),u=o*(i-Number(n))}return 0===u?0:u}function at(e,n,r){const a=function(e,n){return+t(e)-+t(n)}(e,n)/1e3;return(o=r?.roundingMethod,t=>{const e=(o?Math[o]:Math.trunc)(t);return 0===e?0:e})(a);var o}function ot(e,n){return function(e,n,r){const a=E(),o=r?.locale??a.locale??M,i=et(e,n);if(isNaN(i))throw new RangeError("Invalid time value");const d=Object.assign({},r,{addSuffix:r?.addSuffix,comparison:i});let c,l;i>0?(c=t(n),l=t(e)):(c=t(e),l=t(n));const h=at(l,c),m=(O(l)-O(c))/1e3,f=Math.round((h-m)/60);let g;if(f<2)return r?.includeSeconds?h<5?o.formatDistance("lessThanXSeconds",5,d):h<10?o.formatDistance("lessThanXSeconds",10,d):h<20?o.formatDistance("lessThanXSeconds",20,d):h<40?o.formatDistance("halfAMinute",0,d):h<60?o.formatDistance("lessThanXMinutes",1,d):o.formatDistance("xMinutes",1,d):0===f?o.formatDistance("lessThanXMinutes",1,d):o.formatDistance("xMinutes",f,d);if(f<45)return o.formatDistance("xMinutes",f,d);if(f<90)return o.formatDistance("aboutXHours",1,d);if(f<s){const t=Math.round(f/60);return o.formatDistance("aboutXHours",t,d)}if(f<2520)return o.formatDistance("xDays",1,d);if(f<u){const t=Math.round(f/s);return o.formatDistance("xDays",t,d)}if(f<2*u)return g=Math.round(f/u),o.formatDistance("aboutXMonths",g,d);if(g=rt(l,c),g<12){const t=Math.round(f/u);return o.formatDistance("xMonths",t,d)}{const t=g%12,e=Math.trunc(g/12);return t<3?o.formatDistance("aboutXYears",e,d):t<9?o.formatDistance("overXYears",e,d):o.formatDistance("almostXYears",e+1,d)}}(e,Date.now(),n)}function it(t,e){return+x(t)==+x(e)}function ut(e){return it(e,function(e,n){const a=t(e);return isNaN(n)?r(e,NaN):n?(a.setDate(a.getDate()+n),a):a}(Date.now(),1))}function st(e,n){let r=!1,a="Due ";var o;B(e.dueDate)?(o=e.dueDate,new Date,+t(o)<Date.now()?(r=!0,a=ot(e.dueDate)+" Overdue!"):function(t){return it(t,Date.now())}(e.dueDate)?a+="today at "+K(e.dueDate,"hh:mm a"):ut(e.dueDate)?a+="tomorrow at "+K(e.dueDate,"hh:mm a"):a+=ot(e.dueDate)):a+=e.dueDate;const i=c("div","todo-card"),u=c("div","title",e.title),s=c("div","due-date"+(r?" overdue":""),a),d=c("div","description",e.description?e.description:"..."),l=c("div","priority "+e.priority,function(t){const e=String(t),n=e.length>1?e.slice(1):"";return e.charAt(0).toLocaleUpperCase()+n}(e.priority)+" priority");if(n)i.append(u,s,d,l);else{const t=f({className:"edit",type:"button",textContent:"Edit"}),n=f({className:"delete",type:"button",textContent:"Delete"});t.addEventListener("click",(()=>{m.emit(m.EDIT_TODO,e.id)})),n.addEventListener("click",(()=>{m.emit(m.DELETE_TODO,e.id)})),i.append(u,s,d,l,t,n)}return i}const dt="todo-info-list",ct=()=>`${Math.random()}${(new Date).getTime()}`.slice(2);let lt=[],ht=!1,mt=!1,ft=null,gt=null;const pt=c("header","todo-header");pt.appendChild(c("h1","todo-head","Odin Todo List"));const wt=c("main"),yt=()=>{[...wt.children].forEach((t=>wt.removeChild(t)))},bt=()=>{lt.forEach((t=>wt.appendChild(st(t))))},Dt=t=>{if(yt(),t){for(let e=0;e<lt.length;e++)if(lt[e].id===t){ft=lt[e],wt.appendChild(tt(ft));break}ft||wt.appendChild(tt())}else wt.appendChild(tt());Mt.textContent="Home",mt=!0},vt=()=>{yt(),bt(),mt=!1,Mt.textContent="Add New Todo"},Mt=f({className:"new-todo",type:"button",textContent:"Add New Todo"});if(Mt.addEventListener("click",(()=>{mt?vt():Dt()})),pt.appendChild(Mt),m.add(m.CREATE_NEW_TODO,(t=>{t.id=ct(),lt.push(t),lt.sort(((t,r)=>e(t.dueDate,r.dueDate)?0:n(t.dueDate,r.dueDate)?1:-1)),vt()})),m.add(m.EDIT_TODO,(t=>{Dt(t)})),m.add(m.TODO_EDITED,(t=>{if(!ft||ft.id!==t.id)throw Error("Todo edit cannot be confirmed!");Object.assign(ft,t),ft=null,vt()})),m.add(m.DELETE_TODO,(t=>{(t=>{if(t)for(let e=0;e<lt.length;e++)if(lt[e].id===t){gt=lt[e];break}if(!gt)throw Error("Cannot find a todo to delete!");yt(),wt.append(st(gt,!0),function(){const t=c("form","del-todo-form"),e=c("div","del-todo-msg","Are you sure you to DELETE this todo?"),n=c("div","del-todo-options"),r=f({type:"submit",className:"del-todo-option del-todo-confirm",textContent:"Yes, Delete."}),a=f({type:"submit",className:"del-todo-option del-todo-cancel",textContent:"No, Cancel."});return r.addEventListener("click",(t=>{t.preventDefault(),m.emit(m.CONFIRM_DELETE_TODO)})),a.addEventListener("click",(t=>{t.preventDefault(),m.emit(m.CANCEL_DELETE_TODO)})),n.append(a,r),t.append(e,n),t}()),Mt.textContent="Home",mt=!0})(t)})),m.add(m.CONFIRM_DELETE_TODO,(()=>{if(!gt)throw Error("Todo delete cannot be confirmed!");lt.splice(lt.indexOf(gt),1),gt=null,vt()})),m.add(m.CANCEL_DELETE_TODO,(()=>{gt=null,vt()})),localStorage){let t=localStorage.getItem(dt);t&&(t=JSON.parse(t,((t,e)=>"dueDate"===t?new Date(e):e)),t.length>0?lt=t:(lt=[{id:ct(),title:"Todo Sample #1",description:"Sed consectetur adipiscing elit, sed do eiusmod.",dueDate:d(new Date,2),priority:"high"},{id:ct(),title:"Todo Sample #2",description:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",dueDate:d(new Date,4),priority:"medium"},{id:ct(),title:"Todo Sample #3",description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",dueDate:d(new Date,6),priority:"low"}],ht=!0),bt()),ht||document.defaultView.addEventListener("beforeunload",(()=>{localStorage.setItem(dt,JSON.stringify(lt))}))}document.body.append(pt,wt),wt.setAttribute("style",`margin-top: calc(${pt.offsetHeight}px + 1rem);`)}();
//# sourceMappingURL=odin-todo-list.050208dee56cf9285ff9.bundle.js.map