(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function l(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=l(n);fetch(n.href,s)}})();const p={template:"modern",zoom:1,skills:["React.js","JavaScript (ES6+)","TypeScript","HTML5 & CSS3","Node.js","Tailwind CSS","Git & GitHub","REST APIs"],experienceCount:2,educationCount:1,projectsCount:2,certificationsCount:1,currentTab:"personal",tabs:["personal","summary","experience","education","skills","projects","certifications","all"]},N={fullName:"Mukesh Ambani",jobTitle:"Managing Director & Chairman",email:"mukesh.ambani@example.com",phone:"+91 8103013690",location:"Mumbai",linkedIn:"linkedin.com/in/Mukeshambani",github:"github.com/mukeshambani",portfolio:"mukeshambani.dev",summary:"Visionary business leader and industrialist with decades of experience driving global scale, digital transformation, and sustainable infrastructure. Pioneer in expanding telecommunications, energy, and retail ecosystems across India and international markets.",experiences:[{title:"Managing Director & Chairman",company:"Reliance Industries Limited",location:"Mumbai, India",start:"2002",end:"Present",desc:`• Spearheaded expansion into digital services with Jio, revolutionizing telecommunications for 450M+ users.
• Accelerated retail growth into India’s largest omnichannel retail network with 18,000+ stores.
• Driving transition towards renewable energy and green hydrogen technology manufacturing.`},{title:"Director",company:"Reliance Industries Limited",location:"Mumbai, India",start:"1981",end:"2002",desc:`• Led creation of world-scale petrochemicals and refining complexes at Jamnagar.
• Engineered vertical integration across textile, polymer, and polyester manufacturing businesses.`}],educations:[{degree:"B.E. in Chemical Engineering",school:"Institute of Chemical Technology (ICT)",location:"Mumbai, India",year:"1979",desc:"Distinguished alumnus; recognized for transformative contributions to Indian industry and innovation."}],skills:["Executive Leadership","Strategic Vision","Digital Transformation","Global Operations","Telecom Infrastructure","Energy & Petrochemicals","Supply Chain & Retail","Financial Strategy","5G & Cloud Ecosystems","Sustainability & Innovation"],projects:[{title:"Jio Digital Revolution",role:"Founding Visionary",link:"https://jio.com",github:"https://github.com/mukeshambani/jio-ecosystem",tech:"5G Architecture, Cloud Platforms, AI & IoT",desc:"Architected India’s largest nationwide broadband data network, democratizing high-speed internet for 450M+ citizens."},{title:"Green Energy Gigacomplex",role:"Lead Strategist",link:"https://ril.com",github:"https://github.com/mukeshambani/green-energy",tech:"Solar PV, Green Hydrogen, Energy Storage",desc:"Developing one of the world’s largest integrated clean energy manufacturing complexes in Jamnagar, Gujarat."}],certifications:[{name:"Othmer Gold Medal",issuer:"Chemical Heritage Foundation",date:"2016",id:"CHF-OGM-2016"}]};document.addEventListener("DOMContentLoaded",()=>{if(W(),F(),O(),ee(),ie(),ne(),X(),oe(),se(),re(),document.getElementById("fullName")){R(N),G(),L(),x();const e=new URLSearchParams(window.location.search).get("template");e&&["modern","minimal","creative"].includes(e)&&D(e)}});function W(){const t=document.getElementById("navbar"),e=document.getElementById("hamburger"),l=document.getElementById("nav-links");window.addEventListener("scroll",()=>{t==null||t.classList.toggle("scrolled",window.scrollY>40)},{passive:!0}),e==null||e.addEventListener("click",()=>{l==null||l.classList.toggle("open")}),l==null||l.querySelectorAll(".nav-link").forEach(i=>{i.addEventListener("click",()=>l.classList.remove("open"))})}function F(){const t=localStorage.getItem("rf-theme")||"light";z(t),document.querySelectorAll("#theme-toggle, .theme-toggle-btn").forEach(e=>{e.addEventListener("click",l=>{l.preventDefault();const n=(document.documentElement.getAttribute("data-theme")||"light")==="dark"?"light":"dark";z(n),S(n==="light"?"☀️ Light mode active":"🌙 Dark mode active")})})}function z(t){document.documentElement.setAttribute("data-theme",t),document.documentElement.dataset.theme=t,localStorage.setItem("rf-theme",t),document.querySelectorAll(".theme-icon").forEach(e=>{e.textContent=t==="dark"?"☀️":"🌙"}),document.querySelectorAll("#theme-toggle, .theme-toggle-btn").forEach(e=>{const l=t==="dark"?"Switch to Light Mode":"Switch to Dark Mode";e.title=l,e.setAttribute("aria-label",l)})}function O(){const t=document.querySelectorAll(".tab-btn"),e=document.getElementById("prev-tab-btn"),l=document.getElementById("next-tab-btn");t.forEach(i=>{i.addEventListener("click",()=>{q(i.dataset.tab)})}),e==null||e.addEventListener("click",()=>{const i=p.tabs.indexOf(p.currentTab);i>0&&q(p.tabs[i-1])}),l==null||l.addEventListener("click",()=>{const i=p.tabs.indexOf(p.currentTab);i<p.tabs.length-2&&q(p.tabs[i+1])})}function q(t){p.currentTab=t,document.querySelectorAll(".tab-btn").forEach(n=>{n.classList.toggle("active",n.dataset.tab===t)}),t==="all"?document.querySelectorAll(".tab-content").forEach(n=>{n.classList.add("active")}):document.querySelectorAll(".tab-content").forEach(n=>{n.classList.toggle("active",n.id===`tab-content-${t}`)});const e=p.tabs.indexOf(t),l=document.getElementById("prev-tab-btn"),i=document.getElementById("next-tab-btn");l&&(l.disabled=e===0),i&&(i.disabled=e===p.tabs.length-1)}function G(){const t=document.querySelector(".builder-form-card")||document.body;t&&!t._hasLiveListeners&&(t._hasLiveListeners=!0,t.addEventListener("input",()=>{x(),L()}),t.addEventListener("change",()=>{x(),L()})),document.querySelectorAll(".form-input").forEach(e=>{e.removeEventListener("input",C),e.addEventListener("input",C),e.removeEventListener("change",C),e.addEventListener("change",C)})}function C(){x(),L()}function L(){const t=["fullName","jobTitle","email","phone","location","summary","exp-title-0","edu-degree-0","proj-title-0","cert-name-0"];let e=0;t.forEach(r=>{const c=document.getElementById(r);c&&c.value.trim().length>0&&e++}),p.skills.length>0&&e++;const l=t.length+1,i=Math.round(e/l*100),n=document.getElementById("progress-bar"),s=document.getElementById("progress-text");n&&(n.style.width=`${i}%`),s&&(s.textContent=`${i}% Complete`)}function x(){const t=w();Z(t),K(t),Q(t);const e=document.getElementById("page-count-badge");e&&(t.isTwoPages?(e.textContent="📄 2 Pages (A4)",e.classList.add("two-pages")):(e.textContent="📄 1 Page (A4)",e.classList.remove("two-pages")))}function a(t){const e=document.getElementById(t);return e?e.value.trim():""}function Y(){const t=document.querySelectorAll("#experience-entries .entry-card"),e=[];if(t.length>0)t.forEach(l=>{var y,f,$,g,b,v;const i=((y=l.querySelector('input[id^="exp-title-"]'))==null?void 0:y.value.trim())||"",n=((f=l.querySelector('input[id^="exp-company-"]'))==null?void 0:f.value.trim())||"",s=(($=l.querySelector('input[id^="exp-location-"]'))==null?void 0:$.value.trim())||"",r=((g=l.querySelector('input[id^="exp-start-"]'))==null?void 0:g.value.trim())||"",c=((b=l.querySelector('input[id^="exp-end-"]'))==null?void 0:b.value.trim())||"",d=((v=l.querySelector('textarea[id^="exp-desc-"]'))==null?void 0:v.value.trim())||"";(i||n||s||r||c||d)&&e.push({title:i,company:n,location:s,start:r,end:c,desc:d})});else for(let l=0;l<p.experienceCount;l++){const i=a(`exp-title-${l}`),n=a(`exp-company-${l}`),s=a(`exp-location-${l}`),r=a(`exp-start-${l}`),c=a(`exp-end-${l}`),d=a(`exp-desc-${l}`);(i||n||s||r||c||d)&&e.push({title:i,company:n,location:s,start:r,end:c,desc:d})}return e}function U(){const t=document.querySelectorAll("#education-entries .entry-card"),e=[];if(t.length>0)t.forEach(l=>{var c,d,y,f;const i=((c=l.querySelector('input[id^="edu-degree-"]'))==null?void 0:c.value.trim())||"",n=((d=l.querySelector('input[id^="edu-school-"]'))==null?void 0:d.value.trim())||"",s=((y=l.querySelector('input[id^="edu-year-"]'))==null?void 0:y.value.trim())||"",r=((f=l.querySelector('input[id^="edu-desc-"]'))==null?void 0:f.value.trim())||"";(i||n||s||r)&&e.push({degree:i,school:n,year:s,desc:r})});else for(let l=0;l<p.educationCount;l++){const i=a(`edu-degree-${l}`),n=a(`edu-school-${l}`),s=a(`edu-year-${l}`),r=a(`edu-desc-${l}`);(i||n||s||r)&&e.push({degree:i,school:n,year:s,desc:r})}return e}function J(){const t=document.querySelectorAll("#projects-entries .entry-card"),e=[];if(t.length>0)t.forEach(l=>{var y,f,$,g,b,v;const i=((y=l.querySelector('input[id^="proj-title-"]'))==null?void 0:y.value.trim())||"",n=((f=l.querySelector('input[id^="proj-role-"]'))==null?void 0:f.value.trim())||"",s=(($=l.querySelector('input[id^="proj-link-"]'))==null?void 0:$.value.trim())||"",r=((g=l.querySelector('input[id^="proj-github-"]'))==null?void 0:g.value.trim())||"",c=((b=l.querySelector('input[id^="proj-tech-"]'))==null?void 0:b.value.trim())||"",d=((v=l.querySelector('textarea[id^="proj-desc-"]'))==null?void 0:v.value.trim())||"";(i||n||s||r||c||d)&&e.push({title:i,role:n,link:s,github:r,tech:c,desc:d})});else for(let l=0;l<p.projectsCount;l++){const i=a(`proj-title-${l}`),n=a(`proj-role-${l}`),s=a(`proj-link-${l}`),r=a(`proj-github-${l}`),c=a(`proj-tech-${l}`),d=a(`proj-desc-${l}`);(i||n||s||r||c||d)&&e.push({title:i,role:n,link:s,github:r,tech:c,desc:d})}return e}function V(){const t=document.querySelectorAll("#certifications-entries .entry-card"),e=[];if(t.length>0)t.forEach(l=>{var c,d,y,f;const i=((c=l.querySelector('input[id^="cert-name-"]'))==null?void 0:c.value.trim())||"",n=((d=l.querySelector('input[id^="cert-issuer-"]'))==null?void 0:d.value.trim())||"",s=((y=l.querySelector('input[id^="cert-date-"]'))==null?void 0:y.value.trim())||"",r=((f=l.querySelector('input[id^="cert-id-"]'))==null?void 0:f.value.trim())||"";(i||n||s||r)&&e.push({name:i,issuer:n,date:s,id:r})});else for(let l=0;l<p.certificationsCount;l++){const i=a(`cert-name-${l}`),n=a(`cert-issuer-${l}`),s=a(`cert-date-${l}`),r=a(`cert-id-${l}`);(i||n||s||r)&&e.push({name:i,issuer:n,date:s,id:r})}return e}function w(){const t=Y(),e=U(),l=J(),i=V(),n=a("summary"),s=680;let r=80;n&&(r+=Math.max(48,Math.ceil(n.length/65)*16+28));const c=[],d=[];t.forEach(m=>{let E=52;m.desc&&(E+=Math.ceil(m.desc.length/58)*16),d.length===0&&r+E<=s?(c.push(m),r+=E):d.push(m)});const y=[],f=[];e.forEach(m=>{let E=46;m.desc&&(E+=Math.ceil(m.desc.length/58)*16),d.length===0&&f.length===0&&r+E<=s?(y.push(m),r+=E):f.push(m)});const $=[],g=[];l.forEach(m=>{let E=50;m.desc&&(E+=Math.ceil(m.desc.length/58)*16),d.length===0&&f.length===0&&g.length===0&&r+E<=s?($.push(m),r+=E):g.push(m)});const b=[],v=[];i.forEach(m=>{let E=36;d.length===0&&f.length===0&&g.length===0&&v.length===0&&r+E<=s?(b.push(m),r+=E):v.push(m)});const h=d.length>0||f.length>0||g.length>0||v.length>0;return{expP1:c,expP2:d,eduP1:y,eduP2:f,projP1:$,projP2:g,certP1:b,certP2:v,isTwoPages:h}}function Z(t){t||(t=w());const e=a("fullName"),l=a("jobTitle"),i=a("email"),n=a("phone"),s=a("location"),r=a("linkedIn"),c=a("github"),d=a("portfolio"),y=a("summary"),f=e?e.trim().charAt(0).toUpperCase():"·";k("tpl-m-avatar",f),k("tpl-m-name",e||"Your Name"),k("tpl-m-title",l||"Professional Title"),u("tpl-m-summary-sec",!!y),k("tpl-m-summary",y);const $=(m,E)=>{const T=document.getElementById(m);T&&(E?(T.style.display="",T.textContent=E):(T.style.display="none",T.textContent=""))};$("tpl-m-email",i),$("tpl-m-phone",n),$("tpl-m-location",s),$("tpl-m-linkedin",r),$("tpl-m-github",c),$("tpl-m-portfolio",d);const g=document.getElementById("tpl-m-skills");g&&(g.innerHTML=p.skills.length?p.skills.map(m=>`<span class="live-m-skill-pill">${o(m)}</span>`).join(""):'<span class="live-m-skill-pill" style="opacity:0.6">No skills added</span>'),j("tpl-m-exp-entries-p1",t.expP1,"exp"),u("tpl-m-exp-sec-p1",t.expP1.length>0),j("tpl-m-edu-entries-p1",t.eduP1,"edu"),u("tpl-m-edu-sec-p1",t.eduP1.length>0),j("tpl-m-proj-entries-p1",t.projP1,"proj"),u("tpl-m-proj-sec-p1",t.projP1.length>0),j("tpl-m-cert-entries-p1",t.certP1,"cert"),j("tpl-m-cert-body-entries-p1",t.certP1,"cert"),u("tpl-m-cert-section-p1",t.certP1.length>0),u("tpl-m-cert-body-sec-p1",t.certP1.length>0);const b=document.getElementById("tpl-m-page-2"),v=document.getElementById("tpl-m-page-break"),h=document.getElementById("tpl-m-footer-p1");t.isTwoPages?(b&&(b.style.display="flex"),v&&v.classList.add("active"),h&&(h.innerHTML="Page 1 of 2"),k("tpl-m-avatar-p2",f),k("tpl-m-name-side-p2",e||"Your Name"),k("tpl-m-name-p2",e||"Your Name"),j("tpl-m-exp-entries-p2",t.expP2,"exp"),u("tpl-m-exp-sec-p2",t.expP2.length>0),j("tpl-m-edu-entries-p2",t.eduP2,"edu"),u("tpl-m-edu-sec-p2",t.eduP2.length>0),j("tpl-m-proj-entries-p2",t.projP2,"proj"),u("tpl-m-proj-sec-p2",t.projP2.length>0),j("tpl-m-cert-entries-p2",t.certP2,"cert"),j("tpl-m-cert-body-entries-p2",t.certP2,"cert"),u("tpl-m-cert-section-p2",t.certP2.length>0),u("tpl-m-cert-body-sec-p2",t.certP2.length>0)):(b&&(b.style.display="none"),v&&v.classList.remove("active"),h&&(h.innerHTML="Page 1 of 1"))}function u(t,e){const l=document.getElementById(t);l&&(l.style.display=e?"":"none")}function j(t,e,l){const i=document.getElementById(t);if(i){if(!e||e.length===0){i.innerHTML="";return}l==="exp"?i.innerHTML=e.map(n=>{const s=[n.start,n.end].filter(Boolean).join(" – "),r=[n.company,n.location].filter(Boolean).join(" · ");return`
      <div class="live-m-entry">
        <div class="live-m-entry-head">
          <span>${o(n.title||n.company||"Experience")}</span>
          ${s?`<span class="live-m-entry-date">${o(s)}</span>`:""}
        </div>
        ${r?`<div class="live-m-entry-sub">${o(r)}</div>`:""}
        ${n.desc?`<div class="live-m-entry-desc">${o(n.desc)}</div>`:""}
      </div>`}).join(""):l==="edu"?i.innerHTML=e.map(n=>`
      <div class="live-m-entry">
        <div class="live-m-entry-head">
          <span>${o(n.degree||n.school||"Education")}</span>
          ${n.year?`<span class="live-m-entry-date">${o(n.year)}</span>`:""}
        </div>
        ${n.school?`<div class="live-m-entry-sub">${o(n.school)}</div>`:""}
        ${n.desc?`<div class="live-m-entry-desc">${o(n.desc)}</div>`:""}
      </div>`).join(""):l==="proj"?i.innerHTML=e.map(n=>{const s=[];if(n.link){const r=n.link.startsWith("http")?n.link:`https://${n.link}`;s.push(`<a href="${o(r)}" target="_blank" style="font-size:0.68rem;color:#0d9488;font-weight:600;">Demo ↗</a>`)}if(n.github){const r=n.github.startsWith("http")?n.github:`https://${n.github}`;s.push(`<a href="${o(r)}" target="_blank" style="font-size:0.68rem;color:#0d9488;font-weight:600;">GitHub ↗</a>`)}return`
      <div class="live-m-entry">
        <div class="live-m-entry-head">
          <span>${o(n.title||"Project")}${n.role?` <small style="color:#64748b">(${o(n.role)})</small>`:""}</span>
          ${s.length?`<div>${s.join(' <span style="color:#94a3b8">·</span> ')}</div>`:""}
        </div>
        ${n.tech?`<div class="live-m-entry-sub" style="font-size:0.7rem;color:#475569">Stack: ${o(n.tech)}</div>`:""}
        ${n.desc?`<div class="live-m-entry-desc">${o(n.desc)}</div>`:""}
      </div>`}).join(""):l==="cert"&&(i.innerHTML=e.map(n=>{const s=[n.issuer,n.id?`ID: ${n.id}`:""].filter(Boolean).join(" · ");return`
      <div class="live-m-entry">
        <div class="live-m-entry-head">
          <span>${o(n.name||"Certification")}</span>
          ${n.date?`<span class="live-m-entry-date">${o(n.date)}</span>`:""}
        </div>
        ${s?`<div class="live-m-entry-sub">${o(s)}</div>`:""}
      </div>`}).join(""))}}function K(t){t||(t=w());const e=a("fullName"),l=a("jobTitle"),i=a("email"),n=a("phone"),s=a("location"),r=a("linkedIn"),c=a("github"),d=a("portfolio"),y=a("summary");k("tpl-mn-name",e||"Your Name"),k("tpl-mn-title",l||"Professional Title"),k("tpl-mn-summary",y),u("tpl-mn-summary-sec",!!y);const f=document.getElementById("tpl-mn-contacts");if(f){const h=[];if(i&&h.push(`<a href="mailto:${o(i)}">${o(i)}</a>`),n&&h.push(`<span>${o(n)}</span>`),s&&h.push(`<span>${o(s)}</span>`),d){const m=d.startsWith("http")?d:`https://${d}`;h.push(`<a href="${o(m)}" target="_blank">${o(d.replace(/^https?:\/\//,""))}</a>`)}if(r){const m=r.startsWith("http")?r:`https://${r}`;h.push(`<a href="${o(m)}" target="_blank">${o(r.replace(/^https?:\/\//,""))}</a>`)}if(c){const m=c.startsWith("http")?c:`https://${c}`;h.push(`<a href="${o(m)}" target="_blank">${o(c.replace(/^https?:\/\//,""))}</a>`)}f.innerHTML=h.join(' <span class="mn-sep">•</span> '),f.style.display=h.length>0?"":"none"}const $=document.getElementById("tpl-mn-skills-p1");$&&($.innerHTML=p.skills.length?p.skills.map(h=>`<span class="live-mn-skill-item">${o(h)}</span>`).join(' <span class="mn-sep">•</span> '):"—"),u("tpl-mn-skills-sec-p1",p.skills.length>0),P("tpl-mn-exp-entries-p1",t.expP1,"exp"),u("tpl-mn-exp-sec-p1",t.expP1.length>0),P("tpl-mn-edu-entries-p1",t.eduP1,"edu"),u("tpl-mn-edu-sec-p1",t.eduP1.length>0),P("tpl-mn-proj-entries-p1",t.projP1,"proj"),u("tpl-mn-proj-sec-p1",t.projP1.length>0),P("tpl-mn-cert-entries-p1",t.certP1,"cert"),u("tpl-mn-cert-sec-p1",t.certP1.length>0);const g=document.getElementById("tpl-mn-page-2"),b=document.getElementById("tpl-mn-page-break"),v=document.getElementById("tpl-mn-footer-p1");t.isTwoPages?(g&&(g.style.display="block"),b&&b.classList.add("active"),v&&(v.innerHTML="Page 1 of 2"),k("tpl-mn-name-p2",e||"Your Name"),P("tpl-mn-exp-entries-p2",t.expP2,"exp"),u("tpl-mn-exp-sec-p2",t.expP2.length>0),P("tpl-mn-edu-entries-p2",t.eduP2,"edu"),u("tpl-mn-edu-sec-p2",t.eduP2.length>0),P("tpl-mn-proj-entries-p2",t.projP2,"proj"),u("tpl-mn-proj-sec-p2",t.projP2.length>0),P("tpl-mn-cert-entries-p2",t.certP2,"cert"),u("tpl-mn-cert-sec-p2",t.certP2.length>0)):(g&&(g.style.display="none"),b&&b.classList.remove("active"),v&&(v.innerHTML="Page 1 of 1"))}function P(t,e,l){const i=document.getElementById(t);if(i){if(!e||e.length===0){i.innerHTML="";return}l==="exp"?i.innerHTML=e.map(n=>{const s=[n.start,n.end].filter(Boolean).join(" – ");return`
      <div class="live-mn-entry">
        <div class="live-mn-entry-head">
          <div><strong>${o(n.title||n.company||"Experience")}</strong>${n.company?` — <span class="live-mn-company">${o(n.company)}</span>`:""}</div>
          ${s?`<span class="live-mn-date">${o(s)}</span>`:""}
        </div>
        ${n.location?`<div class="live-mn-location">${o(n.location)}</div>`:""}
        ${n.desc?`<div class="live-mn-entry-desc">${o(n.desc)}</div>`:""}
      </div>`}).join(""):l==="edu"?i.innerHTML=e.map(n=>`
      <div class="live-mn-entry">
        <div class="live-mn-entry-head">
          <div><strong>${o(n.degree||n.school||"Education")}</strong>${n.school?` — <span class="live-mn-company">${o(n.school)}</span>`:""}</div>
          ${n.year?`<span class="live-mn-date">${o(n.year)}</span>`:""}
        </div>
        ${n.desc?`<div class="live-mn-entry-desc">${o(n.desc)}</div>`:""}
      </div>`).join(""):l==="proj"?i.innerHTML=e.map(n=>{const s=[];if(n.link){const r=n.link.startsWith("http")?n.link:`https://${n.link}`;s.push(`<a href="${o(r)}" target="_blank" style="font-size:0.71rem;color:#0f172a;text-decoration:underline;font-weight:600;">Demo ↗</a>`)}if(n.github){const r=n.github.startsWith("http")?n.github:`https://${n.github}`;s.push(`<a href="${o(r)}" target="_blank" style="font-size:0.71rem;color:#0f172a;text-decoration:underline;font-weight:600;">GitHub ↗</a>`)}return`
      <div class="live-mn-entry">
        <div class="live-mn-entry-head">
          <div><strong>${o(n.title||"Project")}</strong>${n.role?` <span style="font-weight:400;color:#64748b">(${o(n.role)})</span>`:""}</div>
          ${s.length?`<div>${s.join(" ")}</div>`:""}
        </div>
        ${n.tech?`<div class="live-mn-proj-tech">Stack: ${o(n.tech)}</div>`:""}
        ${n.desc?`<div class="live-mn-entry-desc">${o(n.desc)}</div>`:""}
      </div>`}).join(""):l==="cert"&&(i.innerHTML=e.map(n=>{const s=[n.issuer,n.id?`ID: ${n.id}`:""].filter(Boolean).join(" · ");return`
      <div class="live-mn-entry">
        <div class="live-mn-entry-head">
          <div><strong>${o(n.name||"Certification")}</strong>${s?` — <span class="live-mn-company">${o(s)}</span>`:""}</div>
          ${n.date?`<span class="live-mn-date">${o(n.date)}</span>`:""}
        </div>
      </div>`}).join(""))}}function Q(t){t||(t=w());const e=a("fullName"),l=a("jobTitle"),i=a("email"),n=a("phone"),s=a("location"),r=a("linkedIn"),c=a("github"),d=a("portfolio"),y=a("summary");k("tpl-cr-name",e||"Your Name"),k("tpl-cr-title",l||"Professional Title"),k("tpl-cr-summary",y),u("tpl-cr-summary-sec",!!y);const f=document.getElementById("tpl-cr-contacts");if(f){const h=[];if(i&&h.push(`<div>✉ ${o(i)}</div>`),n&&h.push(`<div>✆ ${o(n)}</div>`),s&&h.push(`<div>📍 ${o(s)}</div>`),d){const m=d.startsWith("http")?d:`https://${d}`;h.push(`<div><a href="${o(m)}" target="_blank">🌐 ${o(d.replace(/^https?:\/\//,""))}</a></div>`)}if(r){const m=r.startsWith("http")?r:`https://${r}`;h.push(`<div><a href="${o(m)}" target="_blank">💼 ${o(r.replace(/^https?:\/\//,""))}</a></div>`)}if(c){const m=c.startsWith("http")?c:`https://${c}`;h.push(`<div><a href="${o(m)}" target="_blank">🐙 ${o(c.replace(/^https?:\/\//,""))}</a></div>`)}f.innerHTML=h.join(""),f.style.display=h.length>0?"":"none"}const $=document.getElementById("tpl-cr-skills");$&&($.innerHTML=p.skills.length?p.skills.map(h=>`<span class="live-cr-skill-pill">${o(h)}</span>`).join(""):"—"),I("tpl-cr-exp-entries-p1",t.expP1,"exp"),u("tpl-cr-exp-sec-p1",t.expP1.length>0),I("tpl-cr-proj-entries-p1",t.projP1,"proj"),u("tpl-cr-proj-sec-p1",t.projP1.length>0),I("tpl-cr-edu-entries-p1",t.eduP1,"edu"),u("tpl-cr-edu-sec-p1",t.eduP1.length>0),I("tpl-cr-cert-entries-p1",t.certP1,"cert"),u("tpl-cr-cert-sec-p1",t.certP1.length>0);const g=document.getElementById("tpl-cr-page-2"),b=document.getElementById("tpl-cr-page-break"),v=document.getElementById("tpl-cr-footer-p1");t.isTwoPages?(g&&(g.style.display="block"),b&&b.classList.add("active"),v&&(v.innerHTML="Page 1 of 2"),k("tpl-cr-name-p2",e||"Your Name"),I("tpl-cr-exp-entries-p2",t.expP2,"exp"),u("tpl-cr-exp-sec-p2",t.expP2.length>0),I("tpl-cr-proj-entries-p2",t.projP2,"proj"),u("tpl-cr-proj-sec-p2",t.projP2.length>0),I("tpl-cr-edu-entries-p2",t.eduP2,"edu"),u("tpl-cr-edu-sec-p2",t.eduP2.length>0),I("tpl-cr-cert-entries-p2",t.certP2,"cert"),u("tpl-cr-cert-sec-p2",t.certP2.length>0)):(g&&(g.style.display="none"),b&&b.classList.remove("active"),v&&(v.innerHTML="Page 1 of 1"))}function I(t,e,l){const i=document.getElementById(t);if(i){if(!e||e.length===0){i.innerHTML="";return}l==="exp"?i.innerHTML=e.map(n=>{const s=[n.start,n.end].filter(Boolean).join(" – "),r=[n.company,n.location].filter(Boolean).join(" · ");return`
      <div class="live-cr-card">
        <div class="live-cr-card-top">
          <span class="live-cr-card-title">${o(n.title||n.company||"Experience")}</span>
          ${s?`<span class="live-cr-card-badge">${o(s)}</span>`:""}
        </div>
        ${r?`<div class="live-cr-card-sub">${o(r)}</div>`:""}
        ${n.desc?`<div class="live-cr-card-desc">${o(n.desc)}</div>`:""}
      </div>`}).join(""):l==="proj"?i.innerHTML=e.map(n=>{const s=[];if(n.link){const r=n.link.startsWith("http")?n.link:`https://${n.link}`;s.push(`<a href="${o(r)}" target="_blank" class="live-cr-link">Demo ↗</a>`)}if(n.github){const r=n.github.startsWith("http")?n.github:`https://${n.github}`;s.push(`<a href="${o(r)}" target="_blank" class="live-cr-link">GitHub ↗</a>`)}return`
      <div class="live-cr-card">
        <div class="live-cr-card-top">
          <span class="live-cr-card-title">${o(n.title||"Project")}${n.role?` <small style="font-weight:400;color:#64748b">(${o(n.role)})</small>`:""}</span>
          ${s.length?`<div>${s.join(" ")}</div>`:""}
        </div>
        ${n.tech?`<div class="live-cr-card-sub" style="color:#0284c7;font-size:0.68rem;">Stack: ${o(n.tech)}</div>`:""}
        ${n.desc?`<div class="live-cr-card-desc">${o(n.desc)}</div>`:""}
      </div>`}).join(""):l==="edu"?i.innerHTML=e.map(n=>`
      <div class="live-cr-side-item live-cr-side-edu">
        <div class="live-cr-side-title">${o(n.degree||n.school||"Education")}</div>
        ${n.school?`<div class="live-cr-side-sub">${o(n.school)}</div>`:""}
        ${n.year?`<div class="live-cr-side-date">${o(n.year)}</div>`:""}
        ${n.desc?`<div class="live-cr-card-desc" style="font-size:0.68rem;">${o(n.desc)}</div>`:""}
      </div>`).join(""):l==="cert"&&(i.innerHTML=e.map(n=>{const s=[n.issuer,n.id?`ID: ${n.id}`:""].filter(Boolean).join(" · ");return`
      <div class="live-cr-side-item live-cr-side-cert">
        <div class="live-cr-side-title">${o(n.name||"Certification")}</div>
        ${s?`<div class="live-cr-side-sub">${o(s)}</div>`:""}
        ${n.date?`<div class="live-cr-side-date">${o(n.date)}</div>`:""}
      </div>`}).join(""))}}function X(){document.querySelectorAll(".template-tab-btn").forEach(t=>{t.addEventListener("click",()=>{D(t.dataset.template)})}),document.querySelectorAll(".template-card").forEach(t=>{t.addEventListener("click",()=>{var l;const e=t.id.replace("tpl-card-","");e&&(D(e),(l=document.getElementById("builder"))==null||l.scrollIntoView({behavior:"smooth"}))})})}function D(t){p.template=t,document.querySelectorAll(".template-tab-btn").forEach(e=>{e.classList.toggle("active",e.dataset.template===t)}),document.querySelectorAll(".live-template").forEach(e=>{e.classList.toggle("active",e.id===`tpl-${t}`),e.style.display=""}),x(),S(`✨ ${_(t)} template active`)}function ee(){var l;const t=document.getElementById("skill-input"),e=document.getElementById("add-skill-btn");e==null||e.addEventListener("click",()=>H(t==null?void 0:t.value)),t==null||t.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===",")&&(i.preventDefault(),H(t.value))}),(l=document.getElementById("skills-tags"))==null||l.addEventListener("click",i=>{const n=i.target.closest(".skill-remove");n&&te(n.dataset.skill)}),document.querySelectorAll(".suggested-chip").forEach(i=>{i.addEventListener("click",()=>{H(i.dataset.skill||i.textContent.trim())})}),B()}function H(t){if(!t)return;const e=t.trim();if(!e)return;if(p.skills.some(i=>i.toLowerCase()===e.toLowerCase())){S("⚠️ Skill already added");return}p.skills.push(e);const l=document.getElementById("skill-input");l&&(l.value=""),B(),x(),L()}function te(t){p.skills=p.skills.filter(e=>e!==t),B(),x(),L()}function B(){const t=document.getElementById("skills-tags");t&&(t.innerHTML=p.skills.map(e=>`
      <span class="skill-tag">
        ${o(e)}
        <span class="skill-remove" data-skill="${o(e)}">&times;</span>
      </span>`).join(""))}function ne(){var t,e,l,i;(t=document.getElementById("add-experience-btn"))==null||t.addEventListener("click",()=>{M("experience")}),(e=document.getElementById("add-education-btn"))==null||e.addEventListener("click",()=>{M("education")}),(l=document.getElementById("add-project-btn"))==null||l.addEventListener("click",()=>{M("projects")}),(i=document.getElementById("add-certification-btn"))==null||i.addEventListener("click",()=>{M("certifications")}),["experience","education","projects","certifications"].forEach(n=>{const s=document.getElementById(`${n}-entries`);s==null||s.addEventListener("click",r=>{const c=r.target.closest(".entry-remove-btn");c&&c.dataset.type===n&&le(n,parseInt(c.dataset.index,10))})})}function M(t){const e=p[`${t}Count`];p[`${t}Count`]++;const l=document.getElementById(`${t}-entries`),i=document.createElement("div");i.className="entry-card",i.id=`${t}-entry-${e}`,t==="experience"?i.innerHTML=`
      <div class="entry-card-header">
        <span class="entry-card-title">💼 Experience #${e+1}</span>
        <button type="button" class="entry-remove-btn" data-type="experience" data-index="${e}" title="Remove">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label" for="exp-title-${e}">Job Title <span class="req">*</span></label>
        <input class="form-input" type="text" id="exp-title-${e}" placeholder="e.g. Frontend Developer" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="exp-company-${e}">Company <span class="req">*</span></label>
          <input class="form-input" type="text" id="exp-company-${e}" placeholder="Company Name" />
        </div>
        <div class="form-group">
          <label class="form-label" for="exp-location-${e}">Location</label>
          <input class="form-input" type="text" id="exp-location-${e}" placeholder="City, Country / Remote" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="exp-start-${e}">Start Date</label>
          <input class="form-input" type="text" id="exp-start-${e}" placeholder="Jan 2022" />
        </div>
        <div class="form-group">
          <label class="form-label" for="exp-end-${e}">End Date</label>
          <input class="form-input" type="text" id="exp-end-${e}" placeholder="Present" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="exp-desc-${e}">Responsibilities & Achievements</label>
        <textarea class="form-input form-textarea" id="exp-desc-${e}" rows="3" placeholder="• Spearheaded refactoring of billing service..."></textarea>
      </div>`:t==="education"?i.innerHTML=`
      <div class="entry-card-header">
        <span class="entry-card-title">🎓 Education #${e+1}</span>
        <button type="button" class="entry-remove-btn" data-type="education" data-index="${e}" title="Remove">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label" for="edu-degree-${e}">Degree / Program <span class="req">*</span></label>
        <input class="form-input" type="text" id="edu-degree-${e}" placeholder="e.g. B.S. in Computer Science" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="edu-school-${e}">School / University <span class="req">*</span></label>
          <input class="form-input" type="text" id="edu-school-${e}" placeholder="University Name" />
        </div>
        <div class="form-group">
          <label class="form-label" for="edu-year-${e}">Duration / Year</label>
          <input class="form-input" type="text" id="edu-year-${e}" placeholder="2018 – 2022" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="edu-desc-${e}">Notable Achievements / GPA</label>
        <input class="form-input" type="text" id="edu-desc-${e}" placeholder="GPA 3.8/4.0, Honors..." />
      </div>`:t==="projects"?i.innerHTML=`
      <div class="entry-card-header">
        <span class="entry-card-title">📁 Project #${e+1}</span>
        <button type="button" class="entry-remove-btn" data-type="projects" data-index="${e}" title="Remove">✕</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="proj-title-${e}">Project Title <span class="req">*</span></label>
          <input class="form-input" type="text" id="proj-title-${e}" placeholder="e.g. DevPulse" />
        </div>
        <div class="form-group">
          <label class="form-label" for="proj-role-${e}">Role / Subtitle</label>
          <input class="form-input" type="text" id="proj-role-${e}" placeholder="e.g. Lead Creator" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="proj-link-${e}">Demo Link</label>
          <input class="form-input" type="url" id="proj-link-${e}" placeholder="https://..." />
        </div>
        <div class="form-group">
          <label class="form-label" for="proj-github-${e}">GitHub Link</label>
          <input class="form-input" type="url" id="proj-github-${e}" placeholder="https://github.com/..." />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="proj-tech-${e}">Technologies Used</label>
        <input class="form-input" type="text" id="proj-tech-${e}" placeholder="React, Node.js, Docker..." />
      </div>
      <div class="form-group">
        <label class="form-label" for="proj-desc-${e}">Description</label>
        <textarea class="form-input form-textarea" id="proj-desc-${e}" rows="2" placeholder="Describe the goal and measurable impact..."></textarea>
      </div>`:t==="certifications"&&(i.innerHTML=`
      <div class="entry-card-header">
        <span class="entry-card-title">🏅 Certification #${e+1}</span>
        <button type="button" class="entry-remove-btn" data-type="certifications" data-index="${e}" title="Remove">✕</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="cert-name-${e}">Certificate Name <span class="req">*</span></label>
          <input class="form-input" type="text" id="cert-name-${e}" placeholder="e.g. AWS Solutions Architect" />
        </div>
        <div class="form-group">
          <label class="form-label" for="cert-issuer-${e}">Issuing Organization <span class="req">*</span></label>
          <input class="form-input" type="text" id="cert-issuer-${e}" placeholder="e.g. Amazon Web Services" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="cert-date-${e}">Issue & Expiry Date</label>
          <input class="form-input" type="text" id="cert-date-${e}" placeholder="2023 – 2026" />
        </div>
        <div class="form-group">
          <label class="form-label" for="cert-id-${e}">Credential ID / URL</label>
          <input class="form-input" type="text" id="cert-id-${e}" placeholder="Credential ID or link" />
        </div>
      </div>`),l==null||l.appendChild(i),G(),S(`Added ${_(t.slice(0,-1))} #${e+1}`)}function le(t,e){const l=document.getElementById(`${t}-entry-${e}`);l&&(l.style.opacity="0",l.style.transform="translateY(-10px)",l.style.transition="all 0.2s ease",setTimeout(()=>{l.remove(),p[`${t}Count`]>1&&p[`${t}Count`]--,x(),L()},200))}function ie(){var t,e,l;(t=document.getElementById("zoom-in-btn"))==null||t.addEventListener("click",()=>A(p.zoom+.1)),(e=document.getElementById("zoom-out-btn"))==null||e.addEventListener("click",()=>A(p.zoom-.1)),(l=document.getElementById("zoom-level"))==null||l.addEventListener("click",()=>A(1))}function A(t){p.zoom=Math.min(Math.max(t,.4),1.6);const e=document.getElementById("resume-sheet"),l=document.getElementById("zoom-level");e&&(e.style.transform=`scale(${p.zoom})`),l&&(l.textContent=`${Math.round(p.zoom*100)}%`)}function se(){var t,e;(t=document.getElementById("load-sample-btn"))==null||t.addEventListener("click",()=>{R(N),x(),L(),S("✨ Sample data loaded")}),(e=document.getElementById("clear-form-btn"))==null||e.addEventListener("click",()=>{confirm("Clear all form fields?")&&(document.querySelectorAll(".form-input").forEach(l=>l.value=""),p.skills=[],B(),x(),L(),S("Form cleared"))})}function R(t){const e=(l,i)=>{const n=document.getElementById(l);n&&(n.value=i||"")};e("fullName",t.fullName),e("jobTitle",t.jobTitle),e("email",t.email),e("phone",t.phone),e("location",t.location),e("linkedIn",t.linkedIn),e("github",t.github),e("portfolio",t.portfolio),e("summary",t.summary),p.skills=[...t.skills],B(),t.experiences.forEach((l,i)=>{e(`exp-title-${i}`,l.title),e(`exp-company-${i}`,l.company),e(`exp-location-${i}`,l.location),e(`exp-start-${i}`,l.start),e(`exp-end-${i}`,l.end),e(`exp-desc-${i}`,l.desc)}),t.educations.forEach((l,i)=>{e(`edu-degree-${i}`,l.degree),e(`edu-school-${i}`,l.school),e(`edu-year-${i}`,l.year),e(`edu-desc-${i}`,l.desc)}),t.projects.forEach((l,i)=>{e(`proj-title-${i}`,l.title),e(`proj-role-${i}`,l.role),e(`proj-link-${i}`,l.link),e(`proj-github-${i}`,l.github),e(`proj-tech-${i}`,l.tech),e(`proj-desc-${i}`,l.desc)}),t.certifications.forEach((l,i)=>{e(`cert-name-${i}`,l.name),e(`cert-issuer-${i}`,l.issuer),e(`cert-date-${i}`,l.date),e(`cert-id-${i}`,l.id)})}function oe(){var t;(t=document.getElementById("download-btn"))==null||t.addEventListener("click",()=>{window.print()})}function re(){const t=document.getElementById("fullscreen-btn"),e=document.getElementById("fullscreen-icon"),l=document.getElementById("fullscreen-text");function i(){const n=document.body.classList.toggle("fullscreen-active");t&&(t.classList.toggle("btn-primary",n),t.classList.toggle("btn-soft",!n)),e&&(e.textContent=n?"✕":"⛶"),l&&(l.textContent=n?"Exit Full Screen":"Full Screen"),S(n?"⛶ Full Screen active (Navbar hidden, press Esc to exit)":"Exited full screen")}t==null||t.addEventListener("click",i),document.addEventListener("keydown",n=>{n.key==="Escape"&&document.body.classList.contains("fullscreen-active")&&i()})}function k(t,e){const l=document.getElementById(t);l&&(l.textContent=e)}function o(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function _(t){return t.charAt(0).toUpperCase()+t.slice(1)}function S(t,e=2400){let l=document.getElementById("toast");l||(l=document.createElement("div"),l.id="toast",l.className="toast",document.body.appendChild(l)),l.textContent=t,l.classList.add("show"),clearTimeout(l._timer),l._timer=setTimeout(()=>l.classList.remove("show"),e)}
