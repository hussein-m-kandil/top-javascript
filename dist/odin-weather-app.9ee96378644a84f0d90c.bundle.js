!function(){"use strict";function e(e,t,r){for(var n=arguments.length,a=new Array(n>3?n-3:0),o=3;o<n;o++)a[o-3]=arguments[o];if("string"!=typeof e)throw TypeError("Missing 'tagName' of type 'string'!");const i=document.createElement(e);if(t&&(i.className=t),r&&(i.textContent=r),1===a.length&&Array.isArray(a[0])&&Array.isArray(a[0][0])&&(a=a.flat(1)),a.length>0)for(let e=0;e<a.length;e++){if(!Array.isArray(a[e])||2!==a[e].length||!a[e][0]||"string"!=typeof a[e][0])throw TypeError("A given attribute in '...attrs' must be in the form of [string, string]");(a[e][1]||0===a[e][1]||""===a[e][1])&&i.setAttribute(a[e][0],a[e][1])}return i}function t(t,r,n){const a=e("div",`card ${n}`);return a.append(e("div","title",t),e("div","content",r)),a}function r(r,n,a){const o=document.querySelector("input.location");o&&(o.value=n.location.name);const i=document.querySelector(`.${r}`);i&&([...i.children].forEach((e=>e.remove())),i.append(function(r,n){let a,o,i,c;"celsius"===n.toLowerCase()?(o=r.current.feelslike_c,a=r.current.temp_c,i=r.forecast.forecastday[0].day.maxtemp_c,c=r.forecast.forecastday[0].day.mintemp_c):(a=r.current.temp_f,o=r.current.feelslike_f,i=r.forecast.forecastday[0].day.maxtemp_f,c=r.forecast.forecastday[0].day.mintemp_f);const s=e("div","current-weather"),l=e("div","weather-hero"),d=e("div","weather-extras");return l.append(e("div","current-temp",`${a}°`),e("div","condition",`${r.current.condition.text}`),e("span","feels-like",` Feels like ${o}°`)),d.append(t("High",`${i}°`,"high-temp"),t("Low",`${c}°`,"low-temp"),t("Humidity",`${r.current.humidity}%`,"humidity")),s.append(l,d),s}(n,a)))}const n="weather-content",a=["Celsius","Fahrenheit"];let o=a[0],i=null;const c=e("h1","app-title","Odin Weather App"),s=function(t){const a=e("form","weather-location"),c=e("input","location","",["type","text"],["name","location"],["placeholder",'Location (e.g. "Cairo")'],["autocomplete","off"],["autofocus",""]),s=e("button","location","",["type","submit"],["aria-label","Get weather"]),l=e("span","ui-only","🔍",["aria-hidden","true"]),d=e("div","error");return s.appendChild(l),a.append(d,c,s),a.addEventListener("submit",(t=>{t.preventDefault(),a.classList.add("invalid");const c=a.location.value;c?/^[\w-\s'"]+$/.test(c)?(d.textContent="",a.classList.remove("invalid"),(t=>{(function(e){return new Promise(((t,r)=>{(async function(e){try{const t=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=646f26dea5ab4974bc3120515240604&q=${e}`,{mode:"cors"});if(t.ok)return await t.json();throw Error("Fetched response in not ok!")}catch(e){console.log(`${e.name} in 'getWeatherData': \n\t${e.message}`)}return null})(e).then((e=>{e?t(e):r(Error("There is no weather data!"))}))}))})(t).then((e=>{console.dir(e),i=e,r(n,i,o)})).catch((()=>{const t=document.querySelector(`.${n}`);t&&([...t.children].forEach((e=>e.remove())),t.append(e("div","weather-info-error","No weather info! check the location's name and try again.")))}))})(c)):d.textContent="* Invalid location name!":d.textContent="* Location is required!"})),a}(),l=function(t,r){if(!r)throw Error("Missing argument: 'toggleCallback' type 'function'");if(!t)throw Error("Missing argument: 'values' type 'string[]'");if(!Array.isArray(t)||t.length<1)throw TypeError("Invalid argument: 'values' must be non-empty array of strings");const n=e("div","toggler",null,["aria-label","Unit Toggler"]);for(let a=0;a<t.length;a++){const o=e("button","toggler-choice"+(0===a?" toggler-choice-selected":""),t[a],["type","button"]);o.addEventListener("click",(()=>{r({index:a,value:t[a]}),[...n.children].forEach((e=>e.classList.remove("toggler-choice-selected"))),o.classList.add("toggler-choice-selected")})),n.append(o)}return n}(a,(e=>{let{value:t}=e;o=t,i&&r(n,i,o)})),d=e("div",n),u=e("footer","link-back"),m=e("div","bg-credits"),p=e("div","weather-api-credits");m.append(document.createTextNode("Background image by "),e("a","bg-image-owner"," 12019",["href","https://pixabay.com/users/12019-12019/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1985027"]),document.createTextNode(" from "),e("a","bg-image-site"," Pixabay",["href","https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1985027"])),p.append(document.createTextNode("Powered by "),e("a","weather-api"," WeatherAPI.com",["href","https://www.weatherapi.com/"],["title","Weather API"])),u.append(m,p),document.body.append(c,s,l,d,u)}();
//# sourceMappingURL=odin-weather-app.9ee96378644a84f0d90c.bundle.js.map