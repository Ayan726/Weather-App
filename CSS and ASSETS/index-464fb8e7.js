(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=t(e);fetch(e.href,n)}})();let y=document.querySelector(".loc");const g=document.querySelector(".search-form"),u=document.querySelector(".inp");let h=document.getElementById("temp"),w=document.getElementById("dt"),x=document.getElementById("tm"),T=document.getElementById("wkday"),E=document.querySelector(".weather-icon"),j=document.querySelector(".cond"),q=document.getElementById("cloudyness"),v=document.getElementById("humidity"),I=document.getElementById("windspeed"),l=document.querySelector(".extra-locations").children;l=[...l];const S=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b=document.querySelector(".app");let o="";l.forEach(i=>{i.addEventListener("click",r=>{const t=r.target.innerText;a(t)})});g.addEventListener("submit",i=>{i.preventDefault();const r=u.value;u.value="",a(r)});const a=async i=>{try{const r=await fetch(`https://api.weatherapi.com/v1/current.json?key=bd9bf1ffe1424e62a46111630231704&q=${i}&aqi=no`);if(!r.ok){alert("City doesn't exist");return}const t=await r.json();console.log(t),h.innerText=Math.ceil(t.current.temp_c),y.innerText=t.location.name;let s=t.location.localtime,e=s.split(" ");w.innerText=e[0],x.innerText=e[1];let n=new Date(s).getDay();if(T.innerText=S[n],j.innerText=t.current.condition.text,E.innerHTML=`<img id="ic" src="${t.current.condition.icon}"/>`,window.innerWidth<768){const p=document.getElementById("ic");p.style.width="40px"}q.innerText=t.current.cloud,v.innerText=t.current.humidity,I.innerText=t.current.wind_kph;const c=t.current.condition.code,d=t.current.is_day,m=[1003,1006,1009,1030,10871135,1147],f=[1063,1069,1072,1117,1150,1153,1168,1171,1180,1183,1186,1189,1192,1195,1198,1201,1204,1207,1240,1243,1246,1249,1252,1273,1276];c==1e3?d?o="/assets/clear-7bd5a6e5.jpg":o="/assets/clear-d2f00bb5.jpg":m.includes(c)?d?o="/assets/cloudy-9a0fd042.jpg":o="/assets/cloudy-b9ac3da9.jpg":f.includes(c)?d?o="/assets/rainy-8b933c3c.jpg":o="/assets/rainy-00d0742c.jpg":d?o="/assets/snowy-ee35b5f7.jpg":o="/assets/snowy-729d94f9.jpg",b.style.backgroundImage=`url(${o})`}catch(r){console.log(r)}};a(y.innerText);
