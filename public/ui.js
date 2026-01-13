(function(){
  // Create a themed alert modal and expose showAlert(msg)
  const css = `
  .ui-alert-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:9999}
  .ui-alert-card{width:90%;max-width:420px;background:rgba(0,0,0,0.9);border:1px solid rgba(220,38,38,0.7);color:#fff;border-radius:12px;padding:18px;box-shadow:0 0 30px rgba(220,38,38,0.6),inset 0 0 20px rgba(0,0,0,0.6);font-family:"Times New Roman",serif}
  .ui-alert-title{color:#dc2626;font-weight:bold;margin-bottom:8px;letter-spacing:2px}
  .ui-alert-msg{color:#fca5a5;margin-bottom:12px}
  .ui-alert-btn{display:inline-block;padding:10px 18px;border-radius:999px;border:none;background:#dc2626;color:black;font-weight:bold;cursor:pointer}
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function createModal() {
    const wrap = document.createElement('div');
    wrap.className = 'ui-alert-backdrop';
    wrap.style.display = 'none';

    const card = document.createElement('div');
    card.className = 'ui-alert-card';

    const title = document.createElement('div');
    title.className = 'ui-alert-title';
    title.textContent = 'LITABLAZE';

    const msg = document.createElement('div');
    msg.className = 'ui-alert-msg';

    const actions = document.createElement('div');
    actions.style.textAlign = 'center';

    const btn = document.createElement('button');
    btn.className = 'ui-alert-btn';
    btn.textContent = 'OK';

    actions.appendChild(btn);
    card.appendChild(title);
    card.appendChild(msg);
    card.appendChild(actions);
    wrap.appendChild(card);
    document.body.appendChild(wrap);

    return { wrap, msg, btn };
  }

  const modal = createModal();

  function showAlert(message, opts){
    return new Promise(resolve => {
      modal.msg.textContent = message || '';
      modal.wrap.style.display = 'flex';
      // trap focus
      setTimeout(()=> modal.btn.focus(), 50);
      function close(){
        modal.wrap.style.display = 'none';
        modal.btn.removeEventListener('click', onClick);
        document.removeEventListener('keydown', onKey);
        resolve();
      }
      function onClick(){ close(); }
      function onKey(e){ if(e.key==='Escape' || e.key==='Enter') close(); }
      modal.btn.addEventListener('click', onClick);
      document.addEventListener('keydown', onKey);
    });
  }

  window.showAlert = showAlert;
})();
