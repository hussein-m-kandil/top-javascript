!function(){"use strict";document.body.appendChild(function(t,r,e){for(var n=arguments.length,i=new Array(n>3?n-3:0),o=3;o<n;o++)i[o-3]=arguments[o];if("string"!=typeof t)throw TypeError("Missing 'tagName' of type 'string'!");const s=document.createElement(t);if(r&&(s.className=r),e&&(s.textContent=e),1===i.length&&Array.isArray(i[0])&&Array.isArray(i[0][0])&&(i=i.flat(1)),i.length>0)for(let t=0;t<i.length;t++){if(!Array.isArray(i[t])||2!==i[t].length||!i[t][0]||"string"!=typeof i[t][0])throw TypeError("A given attribute in '...attrs' must be in the form of [string, string]");(i[t][1]||0===i[t][1]||""===i[t][1])&&s.setAttribute(i[t][0],i[t][1])}return s}("h1","head","Odin Todo List"))}();
//# sourceMappingURL=odin-todo-list.9d3d7276170fb5fc0c92.bundle.js.map