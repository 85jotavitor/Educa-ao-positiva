/* SPA routing + interactivity */
const app = document.getElementById('app');
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

const routes = {
  '/inicio': inicioView,
  '/projetos': projetosView,
  '/cadastro': cadastroView,
};

function navigate(){ 
  const hash = location.hash || '#/inicio';
  const path = hash.replace('#','').split('?')[0].split('#')[0];
  const view = routes[path] || inicioView;
  view();
  // close mobile menu if open
  document.getElementById('navList').classList.remove('open');
  document.querySelectorAll('.has-dropdown').forEach(el=>el.classList.remove('open'));
}

window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);

/* NAV interactions */
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', ()=> {
  document.getElementById('navList').classList.toggle('open');
  hamburger.classList.toggle('active');
});
document.querySelectorAll('[data-link]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    // allow default anchor (hash) behavior
    // close menu for mobile
    document.getElementById('navList').classList.remove('open');
  });
});
document.querySelectorAll('.has-dropdown > a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    // On mobile, toggle dropdown visibility
    if(window.innerWidth <= 880){
      e.preventDefault();
      a.parentElement.classList.toggle('open');
    }
  });
});

/* Views */
function inicioView(){
  app.innerHTML = `
    <section class="container">
      <div class="hero">
        <div class="text">
          <h2>Educação Positiva</h2>
          <p>Promovendo empatia, curiosidade e bem-estar na aprendizagem — um caminho gentil para o crescimento.</p>
        </div>
        <img src="images/hero.svg" alt="Ilustração educação positiva" style="width:220px;height:auto;border-radius:12px">
      </div>

      <div style="display:flex;gap:16px;margin-top:18px;align-items:center;flex-wrap:wrap">
        <div class="card" style="flex:1;min-width:260px">
          <h3>Nossa missão</h3>
          <p>Estimular ambientes de aprendizagem acolhedores usando práticas baseadas em respeito, reforço positivo e habilidades socioemocionais.</p>
        </div>
        <div class="card" style="min-width:260px">
          <h3>Como atuamos</h3>
          <p>Projetos, oficinas e recursos para educadores, famílias e estudantes — tudo pensado para tornar a aprendizagem um processo alegre.</p>
        </div>
      </div>
    </section>
  `;
}

function projetosView(){
  app.innerHTML = `
    <section class="container">
      <h2 style="margin:0 0 12px 0">Projetos</h2>
      <div class="projects-grid">
        <article class="card">
          <img src="images/project1.svg" alt="Projeto 1" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:10px">
          <h3>Bem-estar na escola</h3>
          <p>Intervenções práticas para promover relaxamento, comunicação não violenta e rotina emocional.</p>
        </article>
        <article class="card">
          <img src="images/project2.svg" alt="Projeto 2" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:10px">
          <h3>Aprender com alegria</h3>
          <p>Atividades lúdicas que conectam conteúdo e emoção, favorecendo maior engajamento dos alunos.</p>
        </article>
        <article class="card">
          <img src="images/project3.svg" alt="Projeto 3" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:10px">
          <h3>Formação para educadores</h3>
          <p>Cursos e materiais para aplicar a educação positiva no cotidiano escolar.</p>
        </article>
      </div>
    </section>
  `;
}

function cadastroView(){
  app.innerHTML = `
    <section class="container">
      <h2>Cadastro</h2>
      <div class="form-card">
        <form id="cadForm" novalidate>
          <div class="field">
            <label for="nome">Nome completo</label>
            <input type="text" id="nome" name="nome" required>
            <div class="error-msg" id="err-nome">Por favor, informe seu nome.</div>
          </div>

          <div class="field">
            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" required>
            <div class="error-msg" id="err-email">E-mail inválido.</div>
          </div>

          <div class="field">
            <label for="cpf">CPF</label>
            <input type="text" id="cpf" name="cpf" placeholder="somente números" maxlength="11" required>
            <div class="error-msg" id="err-cpf">CPF inválido.</div>
          </div>

          <div class="field">
            <label for="telefone">Telefone</label>
            <input type="tel" id="telefone" name="telefone" placeholder="(xx) xxxxx-xxxx" required>
            <div class="error-msg" id="err-telefone">Telefone inválido.</div>
          </div>

          <div class="field">
            <label for="mensagem">Mensagem (opcional)</label>
            <textarea id="mensagem" rows="4"></textarea>
          </div>

          <div style="display:flex;gap:12px;align-items:center">
            <button type="submit" id="submitBtn">Enviar</button>
            <div id="formSuccess" style="color:green;display:none">Cadastro realizado com sucesso!</div>
          </div>
        </form>
      </div>
    </section>
  `;

  // attach validation
  const form = document.getElementById('cadForm');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('telefone');
    let valid = true;

    // nome
    if(!nome.value.trim()){
      setError(nome, 'err-nome', true); valid=false;
    } else setError(nome,'err-nome',false);

    // email
    if(!validateEmail(email.value)){
      setError(email,'err-email',true); valid=false;
    } else setError(email,'err-email',false);

    // cpf
    if(!validateCPF(cpf.value)){
      setError(cpf,'err-cpf',true); valid=false;
    } else setError(cpf,'err-cpf',false);

    // telefone basic
    if(!validatePhone(tel.value)){
      setError(tel,'err-telefone',true); valid=false;
    } else setError(tel,'err-telefone',false);

    if(valid){
      // show success
      document.getElementById('formSuccess').style.display='block';
      form.reset();
      // optional: store in localStorage
      const saved = JSON.parse(localStorage.getItem('cadastros')||'[]');
      saved.push({nome:nome.value,email:email.value,cpf:cpf.value,telefone:tel.value,created:new Date().toISOString()});
      localStorage.setItem('cadastros', JSON.stringify(saved));
      setTimeout(()=>document.getElementById('formSuccess').style.display='none',3000);
    }
  });

  // live validation on blur
  ['nome','email','cpf','telefone'].forEach(id=>{
    const el = document.getElementById(id);
    el && el.addEventListener('blur', ()=>{
      if(id==='email') setError(el,'err-email', !validateEmail(el.value));
      if(id==='cpf') setError(el,'err-cpf', !validateCPF(el.value));
      if(id==='telefone') setError(el,'err-telefone', !validatePhone(el.value));
      if(id==='nome') setError(el,'err-nome', !el.value.trim());
    });
  });

}

/* helpers */
function setError(el, errId, on){
  if(on){ el.classList.add('error'); document.getElementById(errId).classList.add('active'); }
  else { el.classList.remove('error'); document.getElementById(errId).classList.remove('active'); }
}

function validateEmail(email){
  // simple but effective regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone){
  // accepts digits, spaces, parentheses, hyphen; requires at least 10 digits
  const digits = phone.replace(/\D/g,'');
  return digits.length >= 10 && digits.length <= 11;
}

/* CPF validation: standard algorithm (removes non-digits, checks verifying digits) */
function validateCPF(str){
  const cpf = (str||'').replace(/\D/g,'').padStart(11,'0');
  if(!/^[0-9]{11}$/.test(cpf)) return false;
  // reject known invalid sequences
  if(/^([0-9])\1+$/.test(cpf)) return false;

  // calc digit
  function calcDigit(slice){
    let sum=0, mult=slice.length+1;
    for(let i=0;i<slice.length;i++){
      sum += Number(slice.charAt(i)) * (mult - i);
    }
    const res = (sum * 10) % 11;
    return res === 10 ? 0 : res;
  }

  const d1 = calcDigit(cpf.slice(0,9));
  const d2 = calcDigit(cpf.slice(0,10));
  return d1 === Number(cpf.charAt(9)) && d2 === Number(cpf.charAt(10));
}
