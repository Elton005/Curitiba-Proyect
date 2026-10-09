const isPortuguese=(navigator.language||"").toLowerCase().startsWith("pt");
document.documentElement.lang=isPortuguese?"pt":"es";
const illustration=document.querySelector("[data-missing]");
illustration.setAttribute("aria-label",isPortuguese?"Ilustração de erro 404":"Ilustración de error 404");
const img=document.createElement("img");img.src="assets/img/404.jpg";img.alt="";img.width=1280;img.height=720;img.loading="eager";img.decoding="async";
img.addEventListener("load",()=>illustration.querySelector("span").hidden=true,{once:true});
img.addEventListener("error",()=>img.remove(),{once:true});illustration.prepend(img);
if(isPortuguese){document.title="404 — Loop Avante";document.getElementById("title").textContent="Esta página não está aqui.";document.getElementById("description").textContent="O link pode ter mudado ou sido digitado de outra forma. Volte ao início para continuar explorando.";document.getElementById("home").textContent="Voltar ao início"}