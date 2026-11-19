const $ = (s) => document.querySelector(s), app = $('#app');
const LOGO = 'data:image/png;base64,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'; // embedded so the logo shows even if the image file is missing
let S = { token: sessionStorage.token, user: JSON.parse(sessionStorage.user || 'null'), view: 'dashboard', meta: null, f: {} };
const ROLE = { student: 'Student', anchor: 'Anchor', zone: 'Zone Incharge', admin: 'Admin', alumni: 'Alumni' };
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const when = (t) => new Date(t).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
const ago = (t) => { const m = Math.round((Date.now() - t) / 6e4); return m < 1 ? 'just now' : m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + ' h ago' : Math.round(m / 1440) + ' days ago'; };
const toast = (m, e) => { const t = $('#toast'); t.textContent = m; t.className = 'show' + (e ? ' err' : ''); setTimeout(() => (t.className = ''), 3000); };
async function api(url, method = 'GET', body) {
  const r = await fetch('/api' + url, { method, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + S.token }, body: body && JSON.stringify(body) });
  const d = await r.json(); if (!r.ok) { if (r.status === 401 && S.token) logout(); throw new Error(d.error); } return d;
}
const logout = () => { sessionStorage.clear(); S.token = null; S.user = null; S.view = 'dashboard'; S.f = {}; render(); };
function modal(inner, w = 460) {
  const m = document.createElement('div'); m.className = 'modal'; m.innerHTML = `<div class="panel" style="width:min(${w}px,100%)">${inner}</div>`;
  document.body.appendChild(m); m.onclick = (e) => { if (e.target === m || e.target.dataset.close !== undefined) m.remove(); }; return m;
}
const initials = (n) => String(n || '?').trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
const avatar = (u, cls = '') => `<span class="av ${cls}">${esc(initials(u && u.name))}</span>`;
const stText = (q) => q.status === 'Waiting for student' && q.raiserId === (S.user || {}).id ? 'Waiting for your reply' : q.status;
const catOf = (q) => esc(q.category) + (q.categoryOther ? ': ' + esc(q.categoryOther) : '');
const uname = (id) => { if (!id || id === 'none') return 'Not sure'; const M = S.meta, x = [...M.anchors, ...M.zones].find((u) => u.id == id); return x ? x.name : '—'; };
const stTag = (q) => `<span class="tag st-${q.status.split(' ')[0]}">${stText(q)}</span>${q.overdue ? ' <span class="tag od">Overdue</span>' : ''}`;
const crumbOf = (q, you) => `<div class="crumb"><span class="c">${you ? 'You' : esc(q.raiserName)}</span>${q.route.map((r) => `<span class="c ${r.id === q.toId ? 'now' : ''}">${esc(r.name)}<small>${ROLE[r.role]}</small></span>`).join('')}</div>`;

/* ---------- sign in / sign up ---------- */
function authShell(inner) {
  app.innerHTML = `<div class="login"><section class="hero"><i class="ring r1"></i><i class="ring r2"></i><i class="ring r3"></i>
  <div><img class="logo" src="${LOGO}" alt="Maatram Foundation"><h1>No student query<br><em>left behind.</em></h1>
  <p>Ask once. Maatram routes your query to the right person, and you can see exactly who is working on it.</p></div></section>
  <section class="side"><div class="box"><div class="bar-y"></div>${inner}</div></section></div>`;
}
const pwField = (id, label, ac) => `<label for="${id}">${label}</label><div class="pw"><input id="${id}" type="password" autocomplete="${ac}" required><button type="button" class="tg">Show</button></div>`;
function wireToggle() { document.querySelectorAll('.tg').forEach((b) => (b.onclick = () => { const p = b.previousElementSibling, h = p.type === 'password'; p.type = h ? 'text' : 'password'; b.textContent = h ? 'Hide' : 'Show'; })); }
function loginView() {
  authShell(`<h2>Welcome back</h2><p class="muted">Sign in to the Maatram support desk.</p><form id="lf" style="margin-top:14px"><label for="rl">I am signing in as</label>
  <select id="rl" required><option value="">Select your role</option>${Object.entries(ROLE).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select>
  <label for="em">Email</label><input id="em" type="email" placeholder="you@example.com" autocomplete="username" required>${pwField('pw', 'Password', 'current-password')}
  <p id="le" style="color:var(--bad);min-height:22px;margin-top:8px"></p><button class="btn">Sign in</button></form>
  <p class="foot">New student or alumni? <a href="#" id="su" style="color:#FFB800;font-weight:600">Create an account</a></p>`);
  wireToggle(); $('#su').onclick = (e) => { e.preventDefault(); registerView(); };
  $('#lf').onsubmit = async (e) => { e.preventDefault(); try { enter(await api('/login', 'POST', { role: $('#rl').value, email: $('#em').value, password: $('#pw').value })); } catch (x) { $('#le').textContent = x.message; } };
}
function registerView() {
  authShell(`<h2>Create your account</h2><p class="muted">Choose your role and set a password. You will complete your profile next.</p><form id="rf" style="margin-top:14px"><label for="rl">I am a</label>
  <select id="rl" required><option value="">Choose your role</option>${Object.entries(ROLE).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select>
  <label for="nm">Full name</label><input id="nm" required autocomplete="name"><label for="em">Email</label><input id="em" type="email" autocomplete="username" required>${pwField('pw', 'Password (6+ characters)', 'new-password')}
  <div id="cd" hidden><label for="code">Registration code *</label><input id="code" autocomplete="off" placeholder="Ask the Maatram office for this code"></div>
  <p id="le" style="color:var(--bad);min-height:22px;margin-top:8px"></p><button class="btn">Create account</button></form>
  <p class="foot">Already registered? <a href="#" id="si" style="color:#FFB800;font-weight:600">Sign in</a></p>`);
  wireToggle(); $('#si').onclick = (e) => { e.preventDefault(); loginView(); };
  $('#rl').onchange = () => { const on = ['anchor', 'zone', 'admin'].includes($('#rl').value); $('#cd').hidden = !on; $('#code').required = on; };
  $('#rf').onsubmit = async (e) => { e.preventDefault(); try { enter(await api('/register', 'POST', { role: $('#rl').value, name: $('#nm').value, email: $('#em').value, password: $('#pw').value, code: $('#code').value })); } catch (x) { $('#le').textContent = x.message; } };
}
function enter(d) { sessionStorage.token = S.token = d.token; sessionStorage.user = JSON.stringify(d.user); S.user = d.user; S.view = 'dashboard'; S.f = {}; render(); }

/* ---------- shell ---------- */
const NAV = {
  student: [['dashboard', '▦ Dashboard'], ['queries', '☰ My queries'], ['new', '＋ Raise a query'], ['profile', '👤 My profile'], ['notifications', '🔔 Notifications']],
  alumni: [['dashboard', '▦ Dashboard'], ['queries', '☰ Queries'], ['new', '＋ Raise a query'], ['profile', '👤 My profile'], ['notifications', '🔔 Notifications']],
  anchor: [['dashboard', '▦ Dashboard'], ['queries', '☰ Queries'], ['people', '👥 My students'], ['profile', '👤 My profile'], ['notifications', '🔔 Notifications']],
  zone: [['dashboard', '▦ Dashboard'], ['queries', '☰ Queries'], ['people', '👥 My zone'], ['profile', '👤 My profile'], ['notifications', '🔔 Notifications']],
  admin: [['dashboard', '▦ Dashboard'], ['queries', '☰ All queries'], ['people', '👥 People'], ['notifications', '🔔 Notifications'], ['profile', '👤 My profile']] };
async function render() {
  if (!S.token) return loginView();
  try { [S.user, S.meta] = await Promise.all([api('/me'), api('/meta')]); } catch (x) { return; }
  sessionStorage.user = JSON.stringify(S.user);
  const r = S.user.role, gated = r !== 'admin' && !S.user.profileDone; if (gated) S.view = 'profile';
  const nav = gated ? [['profile', '👤 Complete profile']] : [...NAV[r]];
  if (!gated) { const at = nav.findIndex((n) => n[0] === 'notifications'), extra = [['events', '📅 Events']]; if (r === 'student' || r === 'admin' || S.meta.instructs) extra.push(['aptitude', r === 'student' || r === 'admin' ? '🎓 Aptitude classes' : '🎓 My aptitude classes']); nav.splice(at, 0, ...extra); }
  app.innerHTML = `<div class="shell"><aside><img src="${LOGO}" alt="Maatram">${nav.map((n) => `<button class="nav ${S.view === n[0] ? 'on' : ''}" data-v="${n[0]}">${n[1]}</button>`).join('')}
  <div class="me"><div class="me-row">${avatar(S.user, 'sm')}<div><b>${esc(S.user.name)}</b><br><span>${ROLE[r]}</span></div></div><a href="#" id="cp" class="muted">Change password</a> · <a href="#" id="lo" class="muted">Sign out</a></div></aside><main id="main"></main></div>`;
  document.querySelectorAll('.nav').forEach((b) => (b.onclick = () => { S.view = b.dataset.v; S.f = {}; render(); }));
  $('#lo').onclick = (e) => { e.preventDefault(); logout(); }; $('#cp').onclick = (e) => { e.preventDefault(); passwordModal(); };
  try { await ({ dashboard, queries, new: newQuery, notifications, people, profile, events, aptitude })[S.view](); } catch (e) { console.error(e); $('#main').innerHTML = `<div class="card"><b>Something went wrong loading this page.</b><p class="muted">${esc(e.message)}</p><button class="btn sm" onclick="render()">Try again</button></div>`; }
}

/* ---------- dashboard ---------- */
const cards = (a) => `<div class="cards">${a.map((c, i) => `<div class="card stat ${i === 0 ? 'hot' : ''} ${c[2] || ''}"><b>${c[0]}</b><span>${c[1]}</span></div>`).join('')}</div>`;
const bars = (o) => { const m = Math.max(1, ...Object.values(o)); return Object.entries(o).map(([k, v]) => `<div class="bar"><span>${esc(k)}</span><i style="width:${(v / m) * 100}%"></i><b>${v}</b></div>`).join('') || '<p class="muted">Nothing yet</p>'; };
const qitem = (q, who) => `<div class="qi" data-q="${q.id}"><div><b>#${q.id} ${esc(q.category)}</b>${who ? ' · ' + esc(q.raiserName) : ''} ${stTag(q)}<br><small class="muted">With ${esc(q.toName)} · updated ${ago(q.updatedAt)}</small></div><span class="muted">›</span></div>`;
async function dashboard() {
  const s = await api('/stats'), r = S.user.role, first = esc(S.user.name.split(' ')[0]), mine = r === 'student' || r === 'alumni', p = S.user.profile || {};
  const wire = () => document.querySelectorAll('[data-q]').forEach((b) => (b.onclick = () => detail(b.dataset.q)));
  if (mine) {
    const reps = s.recent.filter((q) => q.lastReply), team = r === 'student' ? (reps.length ? reps.map((q) => `<div class="qi" data-q="${q.id}"><div><b>#${q.id} ${esc(q.category)}</b><br><small><b>${esc(q.lastReply.by)}:</b> ${esc(q.lastReply.note.slice(0, 110))}</small><br><small class="muted">${ago(q.lastReply.at)}</small></div><span class="muted">›</span></div>`).join('') : '<p class="muted">No replies yet. When someone answers your query, you will see it here.</p>')
      : `<p>${p.mentor ? 'You are listed as a mentor. Students can send mentoring and career queries directly to you.' : 'Turn on “I can mentor Maatram students” in your profile so students can reach you for guidance.'}</p><button class="btn ghost sm" data-go="profile">Update profile</button>`;
    $('#main').innerHTML = `<div class="banner"><div class="bn">${avatar(S.user, 'lg')}<div><h1>Hello, ${first}</h1><p>${s.waitingForMe ? `${s.waitingForMe} ${s.waitingForMe > 1 ? 'queries need' : 'query needs'} your reply.` : 'Ask anything — Maatram will route it to the right person.'}</p></div></div><button class="btn" data-go="new">Raise a query</button></div>
    ${cards(r === 'alumni' ? [[s.myOpen, 'My open queries'], [s.withMe, 'Mentoring requests for you'], [s.waitingForMe, 'Waiting for your reply', s.waitingForMe ? 'red' : ''], [s.myResolved, 'Solved']] : [[s.myOpen, 'Open queries'], [s.waitingForMe, 'Waiting for your reply', s.waitingForMe ? 'red' : ''], [s.myResolved, 'Solved'], [s.myTotal, 'Total raised']])}
    <div class="two"><div class="card"><h3>${s.attention.length ? 'Needs your reply' : 'Recent queries'}</h3>${(s.attention.length ? s.attention : s.recent).map((q) => qitem(q)).join('') || '<p class="muted">You have not raised a query yet.</p>'}</div>
    <div class="card"><h3>${r === 'student' ? 'Latest replies' : 'Your mentoring'}</h3>${team}</div></div>`;
  } else {
    const adm = r === 'admin', top = adm ? [[s.open, 'Open queries'], [s.overdue, 'Overdue', 'red'], [s.resolved, 'Solved'], [s.avgHours + 'h', 'Average time to solve']] : [[s.withMe, 'With you now'], [s.overdue, 'Overdue', 'red'], [s.forwardedByMe, 'Forwarded by you'], [s.resolved, 'Solved']];
    $('#main').innerHTML = `<div class="banner"><div class="bn">${avatar(S.user, 'lg')}<div><h1>Hello, ${first}</h1><p>${adm ? `${s.open} open across Maatram · ${s.overdue} overdue.` : `${s.withMe} ${s.withMe === 1 ? 'query is' : 'queries are'} with you · ${s.overdue} overdue.`}</p></div></div><button class="btn" data-go="queries">Open queries</button></div>${cards(top)}
    <div class="two"><div class="card"><h3>Needs your action</h3>${s.attention.map((q) => qitem(q, 1)).join('') || '<p class="muted">Nothing is waiting for you. Great work.</p>'}</div>
    <div class="card"><h3>${adm ? 'People on Maatram' : r === 'zone' ? 'In your zone' : 'Your students'}</h3>${Object.entries(s.people).map(([k, v]) => `<div class="bar" style="grid-template-columns:1fr auto"><span>${k}</span><b>${v}</b></div>`).join('') || '<p class="muted">No one is linked to you yet.</p>'}</div>
    <div class="card"><h3>Open queries by handler</h3>${bars(s.perHandler)}</div><div class="card"><h3>Most common categories</h3>${bars(s.perCategory)}</div></div>`;
  }
  $('#main').innerHTML += await dashExtras();
  document.querySelectorAll('[data-go]').forEach((b) => (b.onclick = () => { S.view = b.dataset.go; S.f = b.dataset.open ? { open: b.dataset.open } : {}; render(); })); wire();
}

/* ---------- queries ---------- */
async function queries() {
  const M = S.meta, r = S.user.role, f = S.f, rep = r === 'student', opt = (arr, v) => arr.map((a) => `<option ${a === v ? 'selected' : ''}>${a}</option>`).join('');
  const tabs = r === 'alumni' ? [['raised', 'Raised by me'], ['with', 'Sent to me']] : rep ? [] : r === 'admin' ? [['all', 'All queries'], ['with', 'With me']] : [['with', 'With me'], ['all', 'All I can see']];
  f.scope = f.scope || (rep || r === 'alumni' ? 'raised' : r === 'admin' ? 'all' : 'with');
  const mineView = rep || (r === 'alumni' && f.scope === 'raised'), stOpts = M.STATUSES.map((a) => `<option value="${a}" ${a === f.status ? 'selected' : ''}>${a === 'Waiting for student' && mineView ? 'Waiting for your reply' : a}</option>`).join('');
  $('#main').innerHTML = `<div class="top"><div><h1>${rep ? 'My queries' : 'Queries'}</h1><p id="cnt"></p></div>${rep || r === 'alumni' ? '<button class="btn" id="nq">Raise a query</button>' : ''}</div>
  ${tabs.length ? `<div class="tabs">${tabs.map((t) => `<button class="tab ${t[0] === f.scope ? 'on' : ''}" data-s="${t[0]}">${t[1]}</button>`).join('')}</div>` : ''}
  <div class="filters" ${rep ? 'style="grid-template-columns:1fr 1fr auto"' : ''}>${rep ? '' : `<input id="fq" type="search" placeholder="Search name, college, text or #id" value="${esc(f.q || '')}" aria-label="Search">`}
  <select id="fs" aria-label="Status"><option value="">All statuses</option>${stOpts}</select><select id="fc" aria-label="Category"><option value="">All categories</option>${opt(M.CATS, f.category)}</select>
  ${rep ? '' : `<select id="fo" aria-label="Handler"><option value="">All handlers</option>${M.handlers.map((u) => `<option value="${u.id}" ${f.handler == u.id ? 'selected' : ''}>${esc(u.name)} (${ROLE[u.role]})</option>`).join('')}</select>
  <input id="fd" type="date" value="${f.from || ''}" title="Raised on or after" aria-label="Raised from">`}<button class="btn ghost sm" id="fx">Show all</button></div><div class="card" id="res" style="padding:0;overflow:hidden"></div>`;
  const val = (i) => ($('#' + i) ? $('#' + i).value : '');
  const reply = (q) => q.status === 'Waiting for student' ? `<span class="tag st-New">Reply needed</span><br>` : '';
  const load = async () => {
    Object.assign(f, { q: val('fq'), status: val('fs'), category: val('fc'), handler: val('fo'), from: val('fd') });
    const list = await api('/queries?' + new URLSearchParams(Object.entries(f).filter(([, v]) => v))), filtered = ['q', 'status', 'category', 'handler', 'from'].some((k) => f[k]);
    $('#cnt').textContent = `${list.length} ${list.length === 1 ? 'query' : 'queries'}`;
    $('#res').innerHTML = list.length ? (rep ? `<table><tr><th>#</th><th>Category</th><th>Status</th><th>With</th><th>Latest reply</th><th>Sent</th></tr>
    ${list.map((q) => `<tr class="row" data-q="${q.id}"><td>${q.id}</td><td>${catOf(q)}<br><span class="muted p-${q.priority}">${q.priority}</span></td><td>${stTag(q)}</td><td>${esc(q.toName)}<br><span class="muted">${ROLE[q.toRole] || ''}</span></td>
    <td style="max-width:300px">${reply(q)}${q.lastReply ? `<b>${esc(q.lastReply.by)}:</b> ${esc(q.lastReply.note.slice(0, 110))}<br><small class="muted">${ago(q.lastReply.at)}</small>` : '<span class="muted">No reply yet</span>'}</td><td class="muted">${when(q.createdAt)}</td></tr>`).join('')}</table>`
      : `<table><tr><th>#</th><th>From</th><th>Category</th><th>Status</th><th>Priority</th><th>With</th><th>Updated</th></tr>
    ${list.map((q) => `<tr class="row" data-q="${q.id}"><td>${q.id}</td><td><b>${esc(q.raiserName)}</b><br><span class="muted">${ROLE[q.raiserRole]}${q.raiser && q.raiser.profile.college ? ' · ' + esc(q.raiser.profile.college) : ''}</span></td><td>${catOf(q)}</td><td>${stTag(q)}</td><td class="p-${q.priority}">${q.priority}</td>
    <td>${esc(q.toName)}<br><span class="muted">${ROLE[q.toRole] || ''}</span></td><td class="muted">${when(q.updatedAt)}</td></tr>`).join('')}</table>`)
      : filtered ? '<div class="empty">No queries match these filters.<br><br><button class="btn sm" id="sa">Show all queries</button></div>' : `<div class="empty"><b>${rep || r === 'alumni' ? 'You have not raised a query yet.' : 'No queries here yet.'}</b>${rep || r === 'alumni' ? '<br><br><button class="btn sm" id="sn">Raise your first query</button>' : ''}</div>`;
    document.querySelectorAll('tr.row').forEach((x) => (x.onclick = () => detail(x.dataset.q)));
    if ($('#sa')) $('#sa').onclick = clear; if ($('#sn')) $('#sn').onclick = () => { S.view = 'new'; render(); };
  };
  const clear = () => { ['fq', 'fs', 'fc', 'fo', 'fd'].forEach((i) => $('#' + i) && ($('#' + i).value = '')); load(); };
  let t; if ($('#fq')) $('#fq').addEventListener('input', () => { clearTimeout(t); t = setTimeout(load, 250); });
  ['fs', 'fc', 'fo', 'fd'].forEach((i) => $('#' + i) && $('#' + i).addEventListener('change', load));
  document.querySelectorAll('.tab').forEach((b) => (b.onclick = () => { S.f = { scope: b.dataset.s }; queries(); }));
  $('#fx').onclick = clear; if ($('#nq')) $('#nq').onclick = () => { S.view = 'new'; render(); }; load();
}
const RECTXT = { zone: 'the Zone Incharge', anchor: 'an Anchor', admin: 'the Maatram office', alumni: 'an Alumni mentor' };
function newQuery() {
  const M = S.meta, r = S.user.role, col = (S.user.profile || {}).college, o = (a) => a.map((x) => `<option>${x}</option>`).join('');
  const roles = [...(r === 'student' ? [['anchor', 'Anchor'], ['zone', 'Zone Incharge']] : []), ['admin', 'Maatram office (Admin)'], ['alumni', 'Alumni mentor']];
  const first = (a) => [...a].sort((x, y) => (y[2] === col) - (x[2] === col));
  const LIST = { anchor: first(M.anchors.map((a) => [a.id, `${a.name} — ${a.college || 'college not set'}${a.years ? ' (' + a.years + ')' : ''}`, a.college])), zone: first(M.zones.map((z) => [z.id, `${z.name} — ${z.college || 'college not set'}`, z.college])),
    admin: M.admins.map((a) => [a.id, a.name]), alumni: M.mentors.map((m) => [m.id, `${m.name} — ${m.company || 'Alumni'}`]) };
  const LBL = { anchor: 'Choose the anchor *', zone: 'Choose the zone incharge *', admin: 'Choose the admin *', alumni: 'Choose the alumni mentor *' };
  $('#main').innerHTML = `<div class="top"><div><h1>Raise a query</h1><p>Choose who should solve it. If they cannot, they will forward it and you will see every step.</p></div></div>
  <form class="card form" id="nf"><div class="grid2"><div><label for="f3">Category *</label><select id="f3" name="category" required><option value="">Choose a category</option>${o(M.CATS)}</select></div>
  <div><label for="f5">Priority *</label><select id="f5" name="priority" required><option value="">Choose a priority</option>${o(['Low', 'Medium', 'High', 'Urgent']).replace('<option>Medium', '<option selected>Medium')}</select></div>
  <div id="oth" hidden style="grid-column:1/-1"><label for="f7">What is this “Other” query about? *</label><input id="f7" name="categoryOther" placeholder="e.g. Hostel accommodation"></div>
  <div><label for="sr">Who should solve this? *</label><select id="sr" name="sendRole" required><option value="">Choose who should solve it</option>${roles.map((x) => `<option value="${x[0]}" data-t="${x[1]}">${x[1]}</option>`).join('')}</select></div>
  <div id="pp"><label for="sp" id="spl">Choose the person *</label><select id="sp" name="toId" required disabled><option value="">First choose who should solve it</option></select></div></div>
  <p class="muted" id="hint" style="font-size:13px;margin-top:8px"></p>
  <label for="f6">Your query *</label><textarea id="f6" name="description" rows="4" required placeholder="Explain what you need. Include names, dates or amounts if they matter."></textarea>
  <div class="imp"><b>Anything important we should know?</b><div class="grid2"><div><label for="dl">Deadline (if any)</label><input id="dl" type="date" name="deadline"></div><div><label for="cv">Best way to reach you</label><select id="cv" name="contactVia"><option value="">No preference</option>${o(['Phone call', 'WhatsApp', 'Email'])}</select></div></div>
  <label for="ii">Extra details</label><textarea id="ii" name="importantInfo" rows="2" placeholder="e.g. Documents close tomorrow, I can only talk after 5 pm"></textarea></div>
  <label for="fl">Attachments (up to 3)</label><input type="file" id="fl" multiple accept="image/*,.pdf"><br><br><button class="btn">Send query</button></form>`;
  const cat = () => { const c = $('#f3').value, on = c === 'Other', rec = M.REC[c] === 'mentor' ? 'alumni' : M.REC[c]; $('#oth').hidden = !on; $('#f7').required = on;
    [...$('#sr').options].forEach((x) => { if (x.value) x.textContent = x.dataset.t + (c && x.value === rec ? ' — recommended' : ''); });
    $('#hint').textContent = c ? `${c} queries are usually solved by ${RECTXT[rec] || RECTXT.admin}. You are free to choose anyone — if they cannot solve it, they will forward it for you.` : ''; };
  const who = () => { const k = $('#sr').value, l = LIST[k] || [], sp = $('#sp'); $('#spl').textContent = LBL[k] || 'Choose the person *'; sp.disabled = !k;
    sp.innerHTML = !k ? '<option value="">First choose who should solve it</option>' : l.length ? `<option value="">Choose a person</option>${l.map((x) => `<option value="${x[0]}">${esc(x[1])}</option>`).join('')}` : '<option value="">No one is available yet</option>'; };
  $('#f3').onchange = cat; $('#sr').onchange = who;
  $('#nf').onsubmit = async (e) => { e.preventDefault(); const b = Object.fromEntries(new FormData(e.target));
    b.files = await Promise.all([...$('#fl').files].slice(0, 3).map((f) => new Promise((res) => { const x = new FileReader(); x.onload = () => res({ name: f.name, data: x.result }); x.readAsDataURL(f); })));
    try { const q = await api('/queries', 'POST', b); toast(`Query #${q.id} sent to ${q.toName}`); S.f = {}; S.view = 'queries'; render(); } catch (x) { toast(x.message, 1); } };
}
function profileRows(u) {
  const p = u.profile || {}, rows = [['Email', u.email]];
  (S.meta.PROFILE[u.role] || []).forEach((f) => { let v = p[f.k]; if (v === undefined || v === '' || v === false) return; if (f.type === 'anchorSel' || f.type === 'zoneSel') v = p[f.k.replace('Id', 'Name')] || ''; if (v === true) v = 'Yes'; rows.push([f.label, v, f.type === 'url']); });
  return `<div class="pgrid">${rows.map((x) => `<div><small>${esc(x[0])}</small><b>${x[2] && /^https?:/i.test(x[1]) ? `<a href="${esc(x[1])}" target="_blank" rel="noopener">${esc(x[1])}</a>` : esc(x[1])}</b></div>`).join('')}</div>`;
}
const profileCard = (u) => `<div class="phead mini">${avatar(u, 'lg')}<div><h2>${esc(u.name)}</h2><p><span class="tag">${ROLE[u.role]}</span> ${u.role === 'admin' ? '' : `<span class="tag ${u.profileDone ? 'st-Resolved' : 'st-New'}">${u.profileDone ? 'Profile complete' : 'Profile incomplete'}</span>`}${(u.profile || {}).mentor ? ' <span class="tag st-Resolved">Mentor</span>' : ''}</p></div></div>${profileRows(u)}`;
async function detail(id) {
  let d; try { d = await api('/queries/' + id); } catch (x) { return toast(x.message, 1); }
  const { q, options, suggest } = d, me = S.user, M = S.meta, handles = q.toId === me.id || me.role === 'admin', raiser = q.raiserId === me.id;
  const who = (i) => i === 0 ? 'System' : i === q.raiserId ? q.raiserName : (q.route.find((r) => r.id === i) || M.handlers.find((h) => h.id === i) || { name: 'Maatram team' }).name;
  const groups = [...new Set(options.map((o) => o.group))], sl = (t) => raiser && t === 'Waiting for student' ? 'Waiting for your reply' : t;
  const talk = q.history.filter((h) => h.note && /^(Status|Message|Reply|Reopened|Confirmed)/.test(h.action)),
    talkHtml = talk.length ? `<h3 style="margin-top:18px">Conversation</h3><div class="talk">${talk.map((h) => { const st = /^Status/.test(h.action) ? h.action.replace('Status → ', '') : ''; return `<div class="msg ${h.by === me.id ? 'me' : ''}"><b>${esc(h.by === me.id ? 'You' : who(h.by))}</b>${st ? ` <span class="tag st-${st.split(' ')[0]}">${esc(sl(st))}</span>` : ''}<br>${esc(h.note)}<small>${when(h.at)}</small></div>`; }).join('')}</div>` : '';
  const m = modal(`<div class="top"><div><h1>#${q.id} · ${catOf(q)}</h1><p>${stTag(q)} · <span class="p-${q.priority}">${q.priority}</span> priority · due ${when(q.due)}</p></div><button class="btn ghost sm" data-close>Close</button></div>
  ${crumbOf(q, raiser)}
  ${q.raiser ? `<div class="card" style="background:var(--s2);margin-bottom:12px"><div class="pcell" style="margin-bottom:6px">${avatar(q.raiser, 'lg')}<div><b>${esc(q.raiser.name)}</b> <span class="tag">${ROLE[q.raiser.role]}</span></div></div>${profileRows(q.raiser)}</div>` : ''}
  <p style="white-space:pre-wrap">${esc(q.description)}</p>
  ${q.importantInfo || q.deadline || q.contactVia ? `<div class="imp" style="margin-top:12px"><b>Important information</b><p>${q.deadline ? 'Deadline: <b>' + esc(q.deadline) + '</b><br>' : ''}${q.contactVia ? 'Prefers: <b>' + esc(q.contactVia) + '</b><br>' : ''}${esc(q.importantInfo)}</p></div>` : ''}
  ${q.attachments.map((a) => `<a class="tag" href="${a.url}" target="_blank">📎 ${esc(a.name)}</a> `).join('')}
  ${talkHtml}
  ${handles ? `${suggest ? `<div class="notice">This looks outside your usual scope. <b>${esc(suggest.name)}</b> (${ROLE[suggest.role]}) can solve it. <button class="btn sm" id="sg">Forward to ${esc(suggest.name)}</button></div>` : ''}
  <h3 style="margin-top:18px">Reply to ${esc(q.raiserName)}</h3><div class="grid2"><div><label for="ds">Status</label><select id="ds">${['In progress', 'Waiting for student', 'Resolved', 'Closed'].map((s) => `<option ${s === q.status ? 'selected' : ''}>${s}</option>`).join('')}</select></div></div>
  <label for="dn">Message (they will see this)</label><textarea id="dn" rows="2" placeholder="What happened, or what do you need from them?"></textarea><br><button class="btn" id="sv">Save update</button>
  ${options.length ? `<h3 style="margin-top:18px">Can’t solve it? Forward it</h3><label for="fw">Forward to</label><select id="fw"><option value="">Choose a person</option>${groups.map((g) => `<optgroup label="${esc(g)}">${options.filter((o) => o.group === g).map((o) => `<option value="${o.id}">${esc(o.label)}</option>`).join('')}</optgroup>`).join('')}</select>
  <label for="fn">Why are you forwarding it? *</label><textarea id="fn" rows="2" placeholder="e.g. Scholarship approvals are handled by the zone incharge"></textarea><br><button class="btn ghost" id="fb">Forward query</button>` : ''}` : ''}
  ${raiser && q.status !== 'Closed' ? `<h3 style="margin-top:18px">${q.status === 'Resolved' ? 'Was your query solved?' : 'Reply'}</h3><textarea id="rt" rows="2" placeholder="${q.status === 'Resolved' ? 'Tell us what is still pending (needed to reopen)' : 'Write your reply'}"></textarea><br>
  ${q.status === 'Resolved' ? '<button class="btn" id="rc">Yes, close it</button> <button class="btn ghost" id="ro">No, reopen</button>' : '<button class="btn" id="rs">Send reply</button>'}` : ''}
  <h3 style="margin-top:22px">History</h3><div class="tl">${[...q.history].reverse().map((h) => `<div><b>${esc(h.action)}</b>${h.note ? ' — ' + esc(h.note) : ''}<small>${esc(who(h.by))} · ${when(h.at)}</small></div>`).join('')}</div>`, 760);
  const go = async (body) => { try { await api('/queries/' + q.id, 'PATCH', body); m.remove(); toast('Done'); render(); } catch (x) { toast(x.message, 1); } };
  if ($('#sv')) $('#sv').onclick = () => go({ action: 'update', status: $('#ds').value, note: $('#dn').value });
  if ($('#fb')) $('#fb').onclick = () => go({ action: 'forward', to: $('#fw').value, note: $('#fn').value });
  if ($('#sg')) $('#sg').onclick = () => { const s = $('#fw'); if (!s) return; if (![...s.options].some((o) => o.value == suggest.id)) s.add(new Option(`${suggest.name} — ${ROLE[suggest.role]}`, suggest.id)); s.value = suggest.id; $('#fn').focus(); toast('Add a short reason, then click Forward query'); };
  if ($('#rs')) $('#rs').onclick = () => go({ action: 'reply', text: $('#rt').value }); if ($('#rc')) $('#rc').onclick = () => go({ action: 'close', text: $('#rt').value }); if ($('#ro')) $('#ro').onclick = () => go({ action: 'reopen', text: $('#rt').value });
}

/* ---------- notifications ---------- */
async function notifications(tab = 'All') {
  const all = await api('/notifications'), adm = S.user.role === 'admin';
  const TABS = { All: () => 1, 'For you': (n) => ['Assignment', 'Forwarded'].includes(n.type), Reminders: (n) => n.type === 'Reminder', Escalations: (n) => n.type === 'Escalation', Updates: (n) => n.type === 'Update' };
  const ICO = { Assignment: '📌', Forwarded: '↪️', Reminder: '⏰', Escalation: '🚨', Update: '✅' }, LBL = { Assignment: 'New query for you', Forwarded: 'Query forwarded', Reminder: 'Reminder', Escalation: 'Escalation', Update: 'Update' };
  const list = all.filter(TABS[tab]);
  $('#main').innerHTML = `<div class="top"><div><h1>Notifications</h1><p>Newest first.</p></div>${adm ? '<button class="btn" id="rr">Run reminder check now</button>' : ''}</div>
  <div class="tabs">${Object.keys(TABS).map((t) => `<button class="tab ${t === tab ? 'on' : ''}" data-t="${t}">${t} (${all.filter(TABS[t]).length})</button>`).join('')}</div>
  <div class="card">${list.length ? list.map((n) => `<div class="nrow ${n.type === 'Escalation' ? 'esc' : ''}"><div class="ico">${ICO[n.type] || '🔔'}</div><div style="flex:1"><b>${LBL[n.type] || 'Notification'}</b> <span class="tag">${esc(n.channel)}</span><br>${esc(n.text)}<br><small class="muted">${ago(n.at)}</small></div>${n.qid ? `<button class="btn ghost sm" data-q="${n.qid}">Open #${n.qid}</button>` : n.link ? `<button class="btn ghost sm" data-l="${n.link.id}">Open class</button>` : ''}</div>`).join('') : '<div class="empty">Nothing here yet.</div>'}</div>`;
  document.querySelectorAll('.tab').forEach((b) => (b.onclick = () => notifications(b.dataset.t))); document.querySelectorAll('[data-q]').forEach((b) => (b.onclick = () => detail(b.dataset.q)));
  document.querySelectorAll('[data-l]').forEach((b) => (b.onclick = () => { S.view = 'aptitude'; S.f = { open: b.dataset.l }; render(); }));
  if (adm) $('#rr').onclick = async () => { const r = await api('/reminders/run', 'POST'); toast(r.sent ? r.sent + ' new notification(s) sent' : 'Nothing needs a reminder right now'); notifications(tab); };
}

/* ---------- people ---------- */
async function people() {
  const r = S.user.role, adm = r === 'admin', f = S.f, ttl = adm ? 'People' : r === 'zone' ? 'My zone' : 'My students';
  $('#main').innerHTML = `<div class="top"><div><h1>${ttl}</h1><p id="cnt">Loading…</p></div>${adm ? '<button class="btn" id="au">Add user</button>' : ''}</div>
  <div class="filters" style="grid-template-columns:2fr 1fr"><input id="pq" type="search" placeholder="Search by name, college, department, phone, company…" value="${esc(f.q || '')}" aria-label="Search">
  ${r === 'anchor' ? '' : `<select id="pr" aria-label="Role"><option value="">All roles</option>${Object.entries(ROLE).filter(([k]) => adm || ['student', 'anchor'].includes(k)).map(([k, v]) => `<option value="${k}" ${f.role === k ? 'selected' : ''}>${v}</option>`).join('')}</select>`}</div>
  <div class="card" id="res" style="padding:0;overflow:hidden"></div>`;
  const load = async () => {
    f.q = $('#pq').value; f.role = $('#pr') ? $('#pr').value : '';
    const list = await api('/people?' + new URLSearchParams(Object.entries(f).filter(([, v]) => v))); $('#cnt').textContent = `${list.length} ${list.length === 1 ? 'person' : 'people'}`;
    $('#res').innerHTML = list.length ? `<table><tr><th>Name</th><th>Role</th><th>College · Department</th><th>Profile</th>${adm ? '<th></th>' : ''}</tr>${list.map((u) => `<tr class="row" data-u="${u.id}"><td><div class="pcell">${avatar(u, 'sm')}<div><b>${esc(u.name)}</b><br><span class="muted">${esc(u.email)}</span></div></div></td><td>${ROLE[u.role]}</td>
    <td>${esc(u.profile.college || '—')}<br><span class="muted">${esc([u.profile.degree, u.profile.department].filter(Boolean).join(' · '))}</span></td><td><span class="tag ${u.profileDone ? 'st-Resolved' : 'st-New'}">${u.profileDone ? 'Complete' : 'Incomplete'}</span></td>${adm ? `<td><button class="btn danger sm" data-rm="${u.id}">Remove</button></td>` : ''}</tr>`).join('')}</table>` : '<div class="empty">No one found.</div>';
    document.querySelectorAll('tr.row').forEach((x) => (x.onclick = (e) => { if (e.target.dataset.rm) return; const u = list.find((y) => y.id == x.dataset.u); modal(`<div class="top" style="margin-bottom:8px"><div></div><button class="btn ghost sm" data-close>Close</button></div>${profileCard(u)}`, 640); }));
    document.querySelectorAll('[data-rm]').forEach((b) => (b.onclick = () => { const x = list.find((y) => y.id == b.dataset.rm);
      const m = modal(`<h2>Remove ${esc(x.name)}?</h2><p class="muted" style="margin:8px 0">They lose access immediately.${['anchor', 'zone', 'admin', 'alumni'].includes(x.role) ? ' Their open queries will be forwarded to the admin team.' : ''} This cannot be undone.</p><label>Type <b>REMOVE</b> to confirm</label><input id="cf" autocomplete="off"><br><br><button class="btn danger" id="go" disabled>Remove user</button> <button class="btn ghost" data-close>Cancel</button>`);
      $('#cf').oninput = () => ($('#go').disabled = $('#cf').value.trim() !== 'REMOVE'); $('#go').onclick = async () => { try { await api('/users/' + x.id, 'DELETE'); m.remove(); toast('User removed'); load(); } catch (e) { toast(e.message, 1); } }; }));
  };
  let t; $('#pq').addEventListener('input', () => { clearTimeout(t); t = setTimeout(load, 250); }); if ($('#pr')) $('#pr').addEventListener('change', load);
  if (adm) $('#au').onclick = () => { const m = modal(`<h2>Add a user</h2><form id="uf"><label for="u1">Name</label><input id="u1" name="name" required><label for="u2">Email</label><input id="u2" name="email" type="email" required><label for="u3">Role</label><select id="u3" name="role" required><option value="">Choose a role</option>${Object.entries(ROLE).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select>
    <label for="u4">Password <span class="muted">(optional)</span></label><input id="u4" name="password" placeholder="Leave blank to create one automatically"><p class="muted" style="font-size:13px;margin-top:6px">Everyone signs in with email and password. A blank password is generated and shown once.</p><br><button class="btn">Add user</button> <button type="button" class="btn ghost" data-close>Cancel</button></form>`);
    $('#uf').onsubmit = async (e) => { e.preventDefault(); try { const d = await api('/users', 'POST', Object.fromEntries(new FormData(e.target))); m.remove(); modal(`<h2>User added</h2><p class="muted" style="margin:8px 0">Share these details with ${esc(d.name)}. The password is shown only now.</p><div class="card" style="background:var(--s2)"><b>Role:</b> ${ROLE[d.role]}<br><b>Email:</b> ${esc(d.email)}<br><b>Password:</b> <code>${esc(d.password)}</code></div><br><button class="btn" data-close>Done</button>`); load(); } catch (x) { toast(x.message, 1); } }; };
  load();
}

/* ---------- profile ---------- */
function profileView() {
  const u = S.user, p = u.profile || {};
  $('#main').innerHTML = `<div class="top"><div><h1>My profile</h1><p>This is how the Maatram team sees you.</p></div><button class="btn" id="ep">✎ Edit profile</button></div>
  <div class="pcard"><div class="pcover"></div><div class="phead">${avatar(u, 'xl')}<div><h2>${esc(u.name)}</h2><p><span class="tag">${ROLE[u.role]}</span>${p.mentor ? ' <span class="tag st-Resolved">Mentor</span>' : ''}</p><p class="muted">${esc([p.college, [p.degree, p.department].filter(Boolean).join(' · ')].filter(Boolean).join(' — ') || u.email)}</p></div></div>
  <div class="pbody">${profileRows(u)}</div></div>`;
  const go = () => { S.f.edit = true; profile(); }; $('#ep').onclick = go;
}
function profile() {
  const u = S.user, M = S.meta, p = u.profile || {}, fields = M.PROFILE[u.role], gated = u.role !== 'admin' && !u.profileDone;
  if (!gated && !S.f.edit) return profileView();
  const years = Array.from({ length: 41 }, (_, i) => 2035 - i), LISTF = { college: M.LISTS.colleges, degree: M.LISTS.degrees, dept: M.LISTS.departments };
  const sel = (id, arr, v, ph, req) => `<select id="${id}" name="${id}" ${req ? 'required' : ''}><option value="">${ph}</option>${arr.map((a) => `<option value="${a[0]}" ${String(a[0]) === String(v) ? 'selected' : ''}>${esc(a[1])}</option>`).join('')}</select>`;
  const field = (f) => { const v = p[f.k] ?? '', rq = f.req ? 'required' : '', lab = `<label for="${f.k}">${f.label}${f.req ? ' *' : ''}</label>`; let h;
    if (f.type === 'checkbox') h = `<label class="chk"><input type="checkbox" id="${f.k}" name="${f.k}" ${v ? 'checked' : ''}> ${f.label}</label>`;
    else if (f.type === 'year') h = lab + sel(f.k, years.map((y) => [y, y]), v, 'Choose year', f.req);
    else if (f.type === 'jobStatus') h = lab + sel(f.k, M.LISTS.jobStatus.map((y) => [y, y]), v, 'Choose one', f.req);
    else if (LISTF[f.type]) { const l = LISTF[f.type], other = v && !l.includes(v); h = lab + `<select id="${f.k}" name="${f.k}" data-other ${rq}><option value="">Choose from the list</option>${l.map((x) => `<option ${x === v ? 'selected' : ''}>${esc(x)}</option>`).join('')}<option value="__other" ${other ? 'selected' : ''}>Other</option></select><input id="${f.k}_o" class="oth-in" placeholder="Type it here" value="${other ? esc(v) : ''}" ${other ? '' : 'hidden'}>`; }
    else if (f.type === 'anchorSel' || f.type === 'zoneSel') { const list = f.type === 'anchorSel' ? M.anchors : M.zones, nk = f.k.replace('Id', 'Name'), typed = v === 'none', sorted = [...list].sort((a, b) => (b.college === p.college) - (a.college === p.college));
      h = lab + `<select id="${f.k}" name="${f.k}" data-other data-nk="${nk}" ${rq}><option value="">Choose from the list</option>${sorted.map((x) => `<option value="${x.id}" ${String(x.id) === String(v) ? 'selected' : ''}>${esc(x.name)} — ${esc(x.college || 'college not set')}${x.years ? ' (' + x.years + ')' : ''}</option>`).join('')}<option value="__other" ${typed ? 'selected' : ''}>Not listed — type the name</option></select><input id="${f.k}_o" name="${nk}" class="oth-in" placeholder="Type the name" value="${typed ? esc(p[nk] || '') : ''}" ${typed ? '' : 'hidden'}>`; }
    else if (f.type === 'tel') h = `${lab}<input id="${f.k}" name="${f.k}" type="tel" inputmode="numeric" maxlength="10" placeholder="10-digit mobile number" value="${esc(v)}" ${rq} autocomplete="tel"><small class="hint" id="${f.k}_h"></small>`;
    else h = `${lab}<input id="${f.k}" name="${f.k}" type="${f.type === 'url' ? 'url' : 'text'}" value="${esc(v)}" ${rq} autocomplete="off">`;
    return `<div class="fld" ${f.showIf ? `data-k="${f.showIf[0]}" data-v='${JSON.stringify(f.showIf[1])}'` : ''}>${h}</div>`; };
  $('#main').innerHTML = `<div class="top"><div><h1>My profile</h1><p>${gated ? 'Complete the fields marked * to continue.' : 'Keep your details up to date so the right people can help you.'}</p></div></div>
  <form class="card form" id="pf" novalidate><div class="grid2"><div><label for="nm">Full name *</label><input id="nm" name="name" value="${esc(u.name)}" required></div><div><label>Email</label><input value="${esc(u.email)}" disabled></div>${fields.map(field).join('')}</div>
  <br><button class="btn">Save profile</button>${gated ? '' : ' <button type="button" class="btn ghost" id="pc">Cancel</button>'}</form>`;
  if ($('#pc')) $('#pc').onclick = () => { S.f = {}; profile(); };
  const other = () => document.querySelectorAll('select[data-other]').forEach((s) => { const t = $('#' + s.id + '_o'), on = s.value === '__other'; t.hidden = !on; t.required = on && s.required; });
  document.querySelectorAll('select[data-other]').forEach((s) => s.addEventListener('change', other)); other();
  const ph = $('#phone'); if (ph) { const chk = () => { ph.value = ph.value.replace(/\D/g, '').slice(0, 10); const n = ph.value.length, h = $('#phone_h'); h.textContent = n === 0 ? '' : n === 10 ? '✓ 10 digits' : `${n} of 10 digits — a mobile number must be exactly 10 digits`; h.className = 'hint ' + (n === 10 ? 'good' : 'bad'); ph.setCustomValidity(n === 10 || (n === 0 && !ph.required) ? '' : 'Enter exactly 10 digits'); }; ph.addEventListener('input', chk); chk(); }
  const vis = () => document.querySelectorAll('.fld[data-k]').forEach((d) => { const el = $('#' + d.dataset.k), v = el.type === 'checkbox' ? el.checked : el.value; d.hidden = !JSON.parse(d.dataset.v).includes(v); }); vis();
  document.querySelectorAll('#pf select,#pf input[type=checkbox]').forEach((e) => e.addEventListener('change', vis));
  $('#pf').onsubmit = async (e) => { e.preventDefault(); const form = e.target; if (!form.checkValidity()) { form.reportValidity(); return; }
    const b = {}; new FormData(form).forEach((v, k) => (b[k] = v)); document.querySelectorAll('select[data-other]').forEach((s) => { if (s.value === '__other') { if (s.dataset.nk) b[s.dataset.nk] = $('#' + s.id + '_o').value.trim(); else b[s.id] = $('#' + s.id + '_o').value.trim(); } });
    fields.filter((f) => f.type === 'checkbox').forEach((f) => (b[f.k] = $('#' + f.k).checked));
    try { const d = await api('/profile', 'PUT', b); toast(d.profileDone ? 'Profile saved' : 'Saved — some required fields are still empty'); S.f = {}; S.view = 'profile'; render(); } catch (x) { toast(x.message, 1); } };
}
function passwordModal() {
  const m = modal(`<h2>Change password</h2><label>Current password</label><input id="p1" type="password"><label>New password (6+ characters)</label><input id="p2" type="password"><br><br><button class="btn" id="ps">Save</button> <button class="btn ghost" data-close>Cancel</button>`);
  $('#ps').onclick = async () => { try { await api('/password', 'POST', { old: $('#p1').value, new: $('#p2').value }); m.remove(); toast('Password changed'); } catch (x) { toast(x.message, 1); } };
}

/* ---------- date + file helpers ---------- */
const pad = (n) => String(n).padStart(2, '0'), ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, today = () => ymd(new Date());
const fDate = (d) => new Date(d + 'T00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const fTime = (t) => { if (!t) return ''; const [h, m] = t.split(':').map(Number); return `${((h + 11) % 12) + 1}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`; };
const fRange = (a, b) => (a ? fTime(a) + (b ? ' – ' + fTime(b) : '') : '');
const fDue = (dt) => new Date(dt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
const left = (dt) => { const ms = Date.parse(dt) - Date.now(), d = Math.floor(Math.abs(ms) / 864e5), h = Math.floor((Math.abs(ms) % 864e5) / 36e5), s = d ? `${d} day${d > 1 ? 's' : ''}` : `${h} h`; return ms < 0 ? `Overdue by ${s}` : `Due in ${s}`; };
const dblock = (d) => { const x = new Date(d + 'T00:00'); return `<div class="dblock"><b>${x.getDate()}</b><span>${x.toLocaleString('en-IN', { month: 'short' })}</span></div>`; };
const isUrl = (u) => /^https?:\/\//i.test(u || '');
const fsize = (n) => (n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB');
const FILEOK = '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv,.png,.jpg,.jpeg,.zip';
const pickFile = (input) => new Promise((res, rej) => { const f = input && input.files && input.files[0]; if (!f) return res(null); if (f.size > 10 * 1024 * 1024) return rej(new Error('Each file must be under 10 MB')); const r = new FileReader(); r.onload = () => res({ name: f.name, data: r.result }); r.onerror = () => rej(new Error('Could not read that file')); r.readAsDataURL(f); });
async function getFile(f) {
  try { const r = await fetch('/api/files/' + f.id, { headers: { Authorization: 'Bearer ' + S.token } }); if (!r.ok) throw new Error((await r.json()).error || 'Could not open the file');
    const url = URL.createObjectURL(await r.blob()); if (['pdf', 'png', 'jpg', 'jpeg'].includes(f.ext)) window.open(url, '_blank'); else { const a = document.createElement('a'); a.href = url; a.download = f.name; a.click(); } setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (x) { toast(x.message, 1); }
}
const fchip = (f) => (f ? `<button type="button" class="fchip" data-f="${f.id}" data-ext="${f.ext}" data-n="${esc(f.name)}">📎 ${esc(f.name)} <small>${fsize(f.size)}</small></button>` : '');
const wireFiles = () => document.querySelectorAll('.fchip').forEach((b) => (b.onclick = () => getFile({ id: b.dataset.f, ext: b.dataset.ext, name: b.dataset.n })));
function confirmBox(title, text, label, fn) { const m = modal(`<h2>${title}</h2><p class="muted" style="margin:8px 0 16px">${text}</p><button class="btn danger" id="cy">${label}</button> <button class="btn ghost" data-close>Cancel</button>`); $('#cy').onclick = async () => { try { await fn(); m.remove(); } catch (x) { toast(x.message, 1); } }; }

/* ---------- dashboard extras: events + aptitude ---------- */
async function dashExtras() {
  const [ev, cl] = await Promise.all([api('/events'), api('/classes')]), t = today(), r = S.user.role;
  const upE = ev.filter((e) => (e.endDate || e.date) >= t).slice(0, 3), upC = cl.filter((c) => c.date >= t).slice(0, 3), todo = cl.filter((c) => c.pending).slice(0, 3);
  const evCard = `<div class="card"><h3>Upcoming events</h3>${upE.map((e) => `<div class="evi" data-go="events" data-open="${e.id}">${dblock(e.date)}<div style="flex:1"><b>${esc(e.title)}</b><br><small class="muted">${esc([fRange(e.time, e.endTime), e.mode === 'Online' ? 'Online' : e.venue].filter(Boolean).join(' · '))}</small></div><span class="muted">›</span></div>`).join('') || '<p class="muted">No upcoming events right now.</p>'}<br><button class="btn ghost sm" data-go="events">Open event calendar</button></div>`;
  const show = r === 'student' || r === 'admin' || S.meta.instructs;
  const apt = show ? `<div class="card"><h3>${r === 'student' ? 'Your aptitude classes' : r === 'admin' ? 'Aptitude classes' : 'Classes you teach'}</h3>${upC.map((c) => `<div class="evi" data-go="aptitude" data-open="${c.id}">${dblock(c.date)}<div style="flex:1"><b>${esc(c.title)}</b><br><small class="muted">${esc(c.instructorName)} · ${esc(fRange(c.time, c.endTime))}</small></div><span class="muted">›</span></div>`).join('') || '<p class="muted">No upcoming classes.</p>'}
    ${r === 'student' && todo.length ? `<p style="margin:12px 0 4px"><b>Assignments to submit</b></p>${todo.map((c) => `<div class="qi" data-go="aptitude" data-open="${c.id}"><div>${esc(c.title)}<br><small class="${c.overdue ? 'hint bad' : 'muted'}">${c.pending} to submit${c.overdue ? ' · ' + c.overdue + ' overdue' : ''}</small></div><span class="muted">›</span></div>`).join('')}` : ''}<br><button class="btn ghost sm" data-go="aptitude">Open aptitude classes</button></div>` : '';
  return `<div class="two" style="margin-top:14px">${apt}${evCard}</div>`;
}

/* ---------- event calendar ---------- */
let evState = { mode: 'list', month: today().slice(0, 7), past: false };
const EVCATS = ['Session', 'Workshop', 'Competition', 'Meeting', 'Celebration', 'Other'];
async function events() {
  const list = await api('/events'), adm = S.user.role === 'admin', st = evState, t = today();
  const row = (e) => `<div class="evi" data-e="${e.id}">${dblock(e.date)}<div style="flex:1"><b>${esc(e.title)}</b> <span class="tag">${esc(e.category)}</span><br><small class="muted">${esc([e.endDate ? fDate(e.date) + ' → ' + fDate(e.endDate) : '', fRange(e.time, e.endTime), e.mode === 'Online' ? 'Online' : e.venue].filter(Boolean).join(' · '))}</small></div><span class="muted">›</span></div>`;
  const agenda = () => { const up = list.filter((e) => (e.endDate || e.date) >= t), past = list.filter((e) => (e.endDate || e.date) < t).reverse(), groups = {};
    up.forEach((e) => { const k = new Date(e.date + 'T00:00').toLocaleString('en-IN', { month: 'long', year: 'numeric' }); (groups[k] = groups[k] || []).push(e); });
    return `<div class="card">${up.length ? Object.entries(groups).map(([k, a]) => `<h3 class="mh">${k}</h3>${a.map(row).join('')}`).join('') : '<div class="empty">No upcoming events.</div>'}</div>
    ${past.length ? `<p style="margin-top:14px"><button class="btn ghost sm" id="tp">${st.past ? 'Hide' : 'Show'} past events (${past.length})</button></p>${st.past ? `<div class="card">${past.map(row).join('')}</div>` : ''}` : ''}`; };
  const calendar = () => { const [y, mo] = st.month.split('-').map(Number), first = new Date(y, mo - 1, 1), start = new Date(y, mo - 1, 1 - first.getDay()), cells = [];
    for (let i = 0; i < 42; i++) { const d = new Date(start); d.setDate(start.getDate() + i); const ds = ymd(d), es = list.filter((e) => e.date <= ds && ds <= (e.endDate || e.date));
      cells.push(`<div class="cell ${d.getMonth() !== mo - 1 ? 'dim' : ''} ${ds === t ? 'tdy' : ''}" data-d="${ds}"><b>${d.getDate()}</b>${es.slice(0, 2).map((e) => `<button class="chip" data-e="${e.id}">${esc(e.title)}</button>`).join('')}${es.length > 2 ? `<small class="muted">+${es.length - 2} more</small>` : ''}</div>`); }
    return `<div class="card"><div class="calhead"><button class="btn ghost sm" id="pm">‹</button><b>${first.toLocaleString('en-IN', { month: 'long', year: 'numeric' })}</b><button class="btn ghost sm" id="nm2">›</button><button class="btn ghost sm" id="tm">Today</button></div>
    <div class="calgrid">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => `<div class="dow">${d}</div>`).join('')}${cells.join('')}</div></div>`; };
  $('#main').innerHTML = `<div class="top"><div><h1>Event calendar</h1><p>${adm ? 'Add, edit or remove events. Everyone can see them.' : 'Upcoming Maatram events and sessions.'}</p></div>${adm ? '<button class="btn" id="ae">＋ Add event</button>' : ''}</div>
  <div class="tabs"><button class="tab ${st.mode === 'list' ? 'on' : ''}" data-m="list">List</button><button class="tab ${st.mode === 'cal' ? 'on' : ''}" data-m="cal">Calendar</button></div>${st.mode === 'cal' ? calendar() : agenda()}`;
  document.querySelectorAll('.tab[data-m]').forEach((b) => (b.onclick = () => { st.mode = b.dataset.m; events(); }));
  document.querySelectorAll('[data-e]').forEach((b) => (b.onclick = (x) => { x.stopPropagation(); showEvent(list.find((e) => e.id == b.dataset.e), events); }));
  const mv = (n) => { const [y, mo] = st.month.split('-').map(Number), d = new Date(y, mo - 1 + n, 1); st.month = ymd(d).slice(0, 7); events(); };
  if ($('#pm')) { $('#pm').onclick = () => mv(-1); $('#nm2').onclick = () => mv(1); $('#tm').onclick = () => { st.month = t.slice(0, 7); events(); }; }
  if ($('#tp')) $('#tp').onclick = () => { st.past = !st.past; events(); };
  if (adm) { $('#ae').onclick = () => eventForm(null, '', events); document.querySelectorAll('.cell[data-d]').forEach((c) => (c.ondblclick = () => eventForm(null, c.dataset.d, events))); }
  if (S.f.open) { const e = list.find((x) => x.id == S.f.open); S.f.open = null; if (e) showEvent(e, events); }
}
function showEvent(e, done) {
  const adm = S.user.role === 'admin', when = e.endDate ? `${fDate(e.date)} → ${fDate(e.endDate)}` : fDate(e.date);
  const m = modal(`<div class="top"><div><h1>${esc(e.title)}</h1><p><span class="tag">${esc(e.category)}</span> <span class="tag">${esc(e.mode)}</span></p></div><button class="btn ghost sm" data-close>Close</button></div>
  <div class="pgrid"><div><small>Date</small><b>${when}</b></div>${e.time ? `<div><small>Time</small><b>${fRange(e.time, e.endTime)}</b></div>` : ''}${e.venue ? `<div><small>Venue</small><b>${esc(e.venue)}</b></div>` : ''}${e.contact ? `<div><small>Contact</small><b>${esc(e.contact)}</b></div>` : ''}</div>
  ${isUrl(e.link) ? `<p style="margin-top:12px"><a class="btn sm" href="${esc(e.link)}" target="_blank" rel="noopener">Join / open link</a></p>` : ''}${e.description ? `<p style="white-space:pre-wrap;margin-top:12px">${esc(e.description)}</p>` : ''}
  <p class="muted" style="margin-top:12px;font-size:13px">Added by ${esc(e.createdByName)}</p>${adm ? '<br><button class="btn" id="ee">Edit</button> <button class="btn danger" id="ed">Delete</button>' : ''}`, 640);
  if (adm) { $('#ee').onclick = () => { m.remove(); eventForm(e, '', done); }; $('#ed').onclick = () => { m.remove(); confirmBox('Delete this event?', `“${esc(e.title)}” will disappear for everyone.`, 'Delete event', async () => { await api('/events/' + e.id, 'DELETE'); toast('Event deleted'); done(); }); }; }
}
function eventForm(e, date, done) {
  const o = (a, v) => a.map((x) => `<option ${x === v ? 'selected' : ''}>${x}</option>`).join(''), v = (k) => esc(e ? e[k] : '');
  const m = modal(`<h2>${e ? 'Edit event' : 'Add an event'}</h2><form id="ef"><label for="e1">Title *</label><input id="e1" name="title" required value="${v('title')}">
  <div class="grid2"><div><label for="e2">Date *</label><input id="e2" name="date" type="date" required value="${e ? e.date : date}"></div><div><label for="e3">End date (if more than a day)</label><input id="e3" name="endDate" type="date" value="${v('endDate')}"></div>
  <div><label for="e4">Start time</label><input id="e4" name="time" type="time" value="${v('time')}"></div><div><label for="e5">End time</label><input id="e5" name="endTime" type="time" value="${v('endTime')}"></div>
  <div><label for="e6">Category</label><select id="e6" name="category">${o(EVCATS, e && e.category)}</select></div><div><label for="e7">Mode</label><select id="e7" name="mode">${o(['In person', 'Online', 'Hybrid'], e && e.mode)}</select></div></div>
  <label for="e8">Venue</label><input id="e8" name="venue" value="${v('venue')}" placeholder="e.g. Maatram Office, Chennai"><label for="e9">Meeting / registration link</label><input id="e9" name="link" type="url" value="${v('link')}" placeholder="https://">
  <label for="e10">Description</label><textarea id="e10" name="description" rows="3">${v('description')}</textarea><label for="e11">Contact for questions</label><input id="e11" name="contact" value="${v('contact')}" placeholder="name, phone or email">
  <br><button class="btn">${e ? 'Save changes' : 'Add event'}</button> <button type="button" class="btn ghost" data-close>Cancel</button></form>`, 640);
  $('#ef').onsubmit = async (x) => { x.preventDefault(); try { await api(e ? '/events/' + e.id : '/events', e ? 'PUT' : 'POST', Object.fromEntries(new FormData(x.target))); m.remove(); toast(e ? 'Event updated' : 'Event added'); done(); } catch (er) { toast(er.message, 1); } };
}

/* ---------- aptitude classes ---------- */
async function aptitude() {
  const r = S.user.role, adm = r === 'admin', list = await api('/classes'), t = today(), up = list.filter((c) => c.date >= t), past = list.filter((c) => c.date < t).reverse();
  const card = (c) => `<div class="ccard" data-c="${c.id}">${dblock(c.date)}<div class="cbody"><b>${esc(c.title)}</b><small class="muted">🕒 ${fDate(c.date)}${c.time ? ' · ' + fRange(c.time, c.endTime) : ''}</small><small class="muted">👤 ${esc(c.instructorName)} · ${c.mode === 'Online' ? 'Online' : esc(c.venue || 'In person')}</small>
    <div class="ctags"><span class="tag">${c.materialCount} notes</span><span class="tag">${c.assignmentCount} assignments</span>${c.canManage ? `<span class="tag">${c.studentCount} students</span>${c.toReview ? `<span class="tag st-New">${c.toReview} to review</span>` : ''}` : c.pending ? `<span class="tag ${c.overdue ? 'od' : 'st-New'}">${c.pending} to submit</span>` : c.assignmentCount ? '<span class="tag st-Resolved">All submitted</span>' : ''}</div></div></div>`;
  const stat = r === 'student' ? [[up.length, 'Upcoming classes'], [list.reduce((n, c) => n + (c.pending || 0), 0), 'Assignments to submit'], [list.reduce((n, c) => n + (c.overdue || 0), 0), 'Overdue', 'red'], [list.reduce((n, c) => n + c.materialCount, 0), 'Notes available']]
    : [[up.length, 'Upcoming classes'], [list.length, 'Total classes'], [list.reduce((n, c) => n + (c.toReview || 0), 0), 'Submissions to review'], [list.reduce((n, c) => n + c.studentCount, 0), 'Student seats']];
  $('#main').innerHTML = `<div class="top"><div><h1>${r === 'student' || adm ? 'Aptitude classes' : 'My aptitude classes'}</h1><p>${r === 'student' ? 'Your classes, notes and assignments.' : adm ? 'Schedule classes, assign instructors and students.' : 'Classes assigned to you to teach.'}</p></div>${adm ? '<button class="btn" id="sc">＋ Schedule a class</button>' : ''}</div>
  ${cards(stat)}<h3 class="mh">Upcoming</h3>${up.length ? `<div class="cgrid">${up.map(card).join('')}</div>` : `<div class="card"><div class="empty">${r === 'student' ? 'No classes are assigned to you yet.' : 'No upcoming classes.'}</div></div>`}
  ${past.length ? `<h3 class="mh">Past classes</h3><div class="cgrid">${past.map(card).join('')}</div>` : ''}`;
  document.querySelectorAll('[data-c]').forEach((b) => (b.onclick = () => openClass(b.dataset.c)));
  if (adm) $('#sc').onclick = () => classForm(null, aptitude);
  if (S.f.open) { const id = S.f.open; S.f.open = null; openClass(id); }
}
async function openClass(id) {
  const m = modal('', 920), panel = m.querySelector('.panel'), st = { tab: '' };
  const draw = async () => { let c; try { c = await api('/classes/' + id); } catch (x) { m.remove(); return toast(x.message, 1); } panel.innerHTML = classHtml(c, st); wireClass(c, st, m, draw); };
  await draw();
}
function classHtml(c, st) {
  const adm = S.user.role === 'admin', mgr = c.canManage, tabs = mgr ? [['students', 'Students'], ['materials', 'Notes & materials'], ['assignments', 'Assignments']] : [['materials', 'Notes & materials'], ['assignments', 'Assignments']];
  if (!st.tab) st.tab = mgr ? 'assignments' : (c.assignments.some((a) => !a.my) ? 'assignments' : 'materials');
  const mats = `${c.materials.map((x) => `<div class="mrow"><div style="flex:1"><b>${esc(x.title)}</b>${x.description ? `<br><small class="muted">${esc(x.description)}</small>` : ''}<br><small class="muted">${esc(x.byName)} · ${ago(x.at)}</small></div>${fchip(x.file)}${mgr ? `<button class="btn danger sm mdel" data-id="${x.id}">Delete</button>` : ''}</div>`).join('') || '<div class="empty">No notes uploaded yet.</div>'}
    ${mgr ? `<div class="imp"><b>Upload notes or study material</b><label for="mt">Title *</label><input id="mt" placeholder="e.g. Percentages — quick notes"><label for="md">Short description</label><input id="md"><label for="mf">File * (PDF, Word, PowerPoint, Excel, image, zip — up to 10 MB)</label><input id="mf" type="file" accept="${FILEOK}"><br><br><button class="btn sm" id="mup">Upload</button></div>` : ''}`;
  const myBlock = (a) => { const m = a.my; return `${m ? `<div class="mysub"><b>Your submission</b> · ${ago(m.at)} ${m.late ? '<span class="tag od">Late</span>' : ''}${m.text ? `<p style="white-space:pre-wrap">${esc(m.text)}</p>` : ''}${fchip(m.file)}${m.reviewed ? `<div class="grade"><b>${m.marks !== undefined && m.marks !== null ? m.marks + (a.maxMarks ? ' / ' + a.maxMarks : '') : 'Reviewed'}</b>${m.feedback ? ` — ${esc(m.feedback)}` : ''}</div>` : ''}</div>` : ''}
    ${m && m.reviewed ? '' : `<form class="sub" data-a="${a.id}"><label>${m ? 'Update your answer' : 'Your answer'}</label><textarea rows="3" placeholder="Type your answer or explanation (optional if you attach a file)"></textarea><input type="file" accept="${FILEOK}"><button class="btn sm">${m ? 'Resubmit' : 'Submit assignment'}</button>${a.pastDue ? '<small class="hint bad">The deadline has passed — your submission will be marked late.</small>' : ''}</form>`}`; };
  const stAsg = (a) => !a.my ? (a.pastDue ? '<span class="tag od">Overdue</span>' : '<span class="tag st-New">Not submitted</span>') : a.my.reviewed ? '<span class="tag st-Resolved">Reviewed</span>' : a.my.late ? '<span class="tag od">Submitted late</span>' : '<span class="tag st-Waiting">Submitted</span>';
  const mgrAsg = (a) => { const by = Object.fromEntries(a.submissions.map((s) => [s.studentId, s]));
    return `<div class="acard"><div class="ahead"><div><b>${esc(a.title)}</b><br><small class="muted">Due ${fDue(a.due)}${a.maxMarks ? ' · ' + a.maxMarks + ' marks' : ''} · ${a.submissions.length} of ${c.students.length} submitted</small></div><button class="btn danger sm adel" data-a="${a.id}">Delete</button></div>${a.description ? `<p style="white-space:pre-wrap">${esc(a.description)}</p>` : ''}${fchip(a.file)}
    <div class="tscroll"><table><tr><th>Student</th><th>Status</th><th>Answer</th><th>Marks</th><th>Feedback</th><th></th></tr>${c.students.map((s) => { const x = by[s.id]; return `<tr data-s="${s.id}" data-a="${a.id}"><td><b>${esc(s.name)}</b><br><small class="muted">${esc(s.college)}</small></td>
      <td>${x ? (x.reviewed ? '<span class="tag st-Resolved">Reviewed</span>' : x.late ? '<span class="tag od">Late</span>' : '<span class="tag st-Waiting">Submitted</span>') : '<span class="muted">Not submitted</span>'}${x ? `<br><small class="muted">${ago(x.at)}</small>` : ''}</td>
      <td>${x ? `${x.text ? `<details><summary>View answer</summary><p style="white-space:pre-wrap">${esc(x.text)}</p></details>` : ''}${fchip(x.file)}` : ''}</td>${x ? `<td><input class="mk" type="number" min="0" ${a.maxMarks ? `max="${a.maxMarks}"` : ''} value="${x.marks ?? ''}" style="width:80px"></td><td><input class="fb" value="${esc(x.feedback)}" placeholder="Feedback"></td><td><button class="btn sm rev">Save</button></td>` : '<td></td><td></td><td></td>'}</tr>`; }).join('')}</table></div></div>`; };
  const asg = `${c.assignments.map((a) => (mgr ? mgrAsg(a) : `<div class="acard"><div class="ahead"><div><b>${esc(a.title)}</b><br><small class="${!a.my && a.pastDue ? 'hint bad' : 'muted'}">Due ${fDue(a.due)}${a.maxMarks ? ' · ' + a.maxMarks + ' marks' : ''}${!a.my ? ' · ' + left(a.due) : ''}</small></div>${stAsg(a)}</div>${a.description ? `<p style="white-space:pre-wrap">${esc(a.description)}</p>` : ''}${fchip(a.file)}${myBlock(a)}</div>`)).join('') || '<div class="empty">No assignments yet.</div>'}
    ${mgr ? `<div class="imp"><b>Create an assignment</b><label for="at">Title *</label><input id="at"><label for="ad">Instructions</label><textarea id="ad" rows="2"></textarea><div class="grid2"><div><label for="adue">Deadline *</label><input id="adue" type="datetime-local"></div><div><label for="am">Maximum marks</label><input id="am" type="number" min="0" placeholder="optional"></div></div><label for="af">Attach a file (optional)</label><input id="af" type="file" accept="${FILEOK}"><br><br><button class="btn sm" id="aadd">Create assignment</button></div>` : ''}`;
  const stu = mgr ? `<div class="tscroll"><table><tr><th>Student</th><th>College</th><th>Department</th><th>Batch</th><th>Submitted</th></tr>${c.students.map((s) => `<tr><td><b>${esc(s.name)}</b></td><td>${esc(s.college)}</td><td>${esc(s.department)}</td><td>${esc(s.yearTo)}</td><td>${c.assignments.filter((a) => a.submissions.some((x) => x.studentId === s.id)).length} of ${c.assignments.length}</td></tr>`).join('') || '<tr><td colspan="5" class="muted">No students assigned yet.</td></tr>'}</table></div>` : '';
  return `<div class="top"><div><h1>${esc(c.title)}</h1><p>${fDate(c.date)}${c.time ? ' · ' + fRange(c.time, c.endTime) : ''} · ${esc(c.instructorName)}</p></div><button class="btn ghost sm" data-close>Close</button></div>
  <div class="pgrid"><div><small>Mode</small><b>${c.mode === 'Online' ? 'Online' : esc(c.venue || 'In person')}</b></div>${isUrl(c.link) ? `<div><small>Class link</small><b><a href="${esc(c.link)}" target="_blank" rel="noopener">Join class</a></b></div>` : ''}<div><small>Instructor</small><b>${esc(c.instructorName)}</b></div>${mgr ? `<div><small>Students</small><b>${c.studentCount}</b></div>` : ''}</div>
  ${c.description ? `<p style="margin-top:10px;white-space:pre-wrap">${esc(c.description)}</p>` : ''}${adm ? '<p style="margin-top:10px"><button class="btn sm" id="ce">Edit class</button> <button class="btn danger sm" id="cd">Delete class</button></p>' : ''}
  <div class="tabs" style="margin-top:14px">${tabs.map((t) => `<button class="tab ${t[0] === st.tab ? 'on' : ''}" data-t="${t[0]}">${t[1]}${t[0] === 'materials' ? ' (' + c.materials.length + ')' : t[0] === 'assignments' ? ' (' + c.assignments.length + ')' : ''}</button>`).join('')}</div>
  ${st.tab === 'materials' ? mats : st.tab === 'assignments' ? asg : stu}`;
}
function wireClass(c, st, m, draw) {
  const adm = S.user.role === 'admin'; wireFiles();
  document.querySelectorAll('.tab[data-t]').forEach((b) => (b.onclick = () => { st.tab = b.dataset.t; draw(); }));
  const run = async (fn, ok) => { try { await fn(); if (ok) toast(ok); draw(); } catch (x) { toast(x.message, 1); } };
  if ($('#mup')) $('#mup').onclick = () => run(async () => { const f = await pickFile($('#mf')); await api(`/classes/${c.id}/materials`, 'POST', { title: $('#mt').value, description: $('#md').value, file: f }); }, 'Uploaded');
  document.querySelectorAll('.mdel').forEach((b) => (b.onclick = () => confirmBox('Delete this file?', 'Students will no longer be able to open it.', 'Delete', async () => { await api(`/classes/${c.id}/materials/${b.dataset.id}`, 'DELETE'); draw(); })));
  if ($('#aadd')) $('#aadd').onclick = () => run(async () => { const f = await pickFile($('#af')); await api(`/classes/${c.id}/assignments`, 'POST', { title: $('#at').value, description: $('#ad').value, due: $('#adue').value, maxMarks: $('#am').value, file: f }); }, 'Assignment created');
  document.querySelectorAll('.adel').forEach((b) => (b.onclick = () => confirmBox('Delete this assignment?', 'All submissions for it will also be deleted.', 'Delete', async () => { await api(`/classes/${c.id}/assignments/${b.dataset.a}`, 'DELETE'); draw(); })));
  document.querySelectorAll('form.sub').forEach((f) => (f.onsubmit = (e) => { e.preventDefault(); run(async () => { const file = await pickFile(f.querySelector('input[type=file]')); await api(`/classes/${c.id}/assignments/${f.dataset.a}/submit`, 'POST', { text: f.querySelector('textarea').value, file }); }, 'Submitted'); }));
  document.querySelectorAll('.rev').forEach((b) => (b.onclick = () => { const tr = b.closest('tr'); run(() => api(`/classes/${c.id}/assignments/${tr.dataset.a}/review`, 'POST', { studentId: tr.dataset.s, marks: tr.querySelector('.mk').value, feedback: tr.querySelector('.fb').value }), 'Review saved'); }));
  if (adm && $('#ce')) { $('#ce').onclick = () => classForm(c, draw); $('#cd').onclick = () => confirmBox('Delete this class?', 'Its notes, assignments and submissions will be deleted for everyone.', 'Delete class', async () => { await api('/classes/' + c.id, 'DELETE'); m.remove(); toast('Class deleted'); if (S.view === 'aptitude') aptitude(); }); }
}
function classForm(c, done) {
  const M = S.meta, sel = new Set(c ? c.studentIds : []), o = (a, v) => a.map((x) => `<option ${x === v ? 'selected' : ''}>${x}</option>`).join(''), v = (k) => esc(c ? c[k] : '');
  const people = M.handlers.filter((h) => h.role !== 'student');
  const m = modal(`<h2>${c ? 'Edit class' : 'Schedule an aptitude class'}</h2><form id="cf"><label for="c1">Topic *</label><input id="c1" name="title" required value="${v('title')}" placeholder="e.g. Quantitative Aptitude — Percentages">
  <div class="grid2"><div><label for="c2">Date *</label><input id="c2" name="date" type="date" required value="${v('date')}"></div><div><label for="c3">Mode</label><select id="c3" name="mode">${o(['In person', 'Online'], c && c.mode)}</select></div>
  <div><label for="c4">Start time</label><input id="c4" name="time" type="time" value="${v('time')}"></div><div><label for="c5">End time</label><input id="c5" name="endTime" type="time" value="${v('endTime')}"></div></div>
  <label for="c6">Venue (for in-person classes)</label><input id="c6" name="venue" value="${v('venue')}"><label for="c7">Class link (for online classes)</label><input id="c7" name="link" type="url" value="${v('link')}" placeholder="https://">
  <label for="c8">Description</label><textarea id="c8" name="description" rows="3">${v('description')}</textarea>
  <label for="c9">Instructor *</label><select id="c9" name="instructorId" required><option value="">Choose the instructor</option>${people.map((h) => `<option value="${h.id}" ${c && c.instructorId === h.id ? 'selected' : ''}>${esc(h.name)} — ${ROLE[h.role]}${h.org ? ' · ' + esc(h.org) : ''}</option>`).join('')}</select>
  <label>Students for this class</label><div class="selbox"><b id="sc2"></b> <button type="button" class="btn ghost sm" id="pk">Choose students</button></div>
  <label for="cp">Or add everyone from another class</label><select id="cp"><option value="">Choose a class to copy students from</option></select>
  <br><button class="btn">${c ? 'Save changes' : 'Schedule class'}</button> <button type="button" class="btn ghost" data-close>Cancel</button></form>`, 680);
  const cnt = () => ($('#sc2').textContent = `${sel.size} student${sel.size === 1 ? '' : 's'} selected`); cnt();
  api('/classes').then((l) => { $('#cp').innerHTML += l.filter((x) => !c || x.id !== c.id).map((x) => `<option value="${x.id}">${esc(x.title)} (${x.studentCount})</option>`).join(''); });
  $('#cp').onchange = async () => { if (!$('#cp').value) return; try { (await api('/classes/' + $('#cp').value)).studentIds.forEach((i) => sel.add(i)); cnt(); toast('Students added'); } catch (x) { toast(x.message, 1); } $('#cp').value = ''; };
  $('#pk').onclick = () => pickStudents(sel, cnt);
  $('#cf').onsubmit = async (e) => { e.preventDefault(); const b = Object.fromEntries(new FormData(e.target)); b.studentIds = [...sel]; try { await api(c ? '/classes/' + c.id : '/classes', c ? 'PUT' : 'POST', b); m.remove(); toast(c ? 'Class updated' : 'Class scheduled'); done(); } catch (x) { toast(x.message, 1); } };
}
function pickStudents(sel, onDone) {
  const M = S.meta, m = modal(`<h2>Choose students</h2><div class="grid2"><input id="ps" type="search" placeholder="Search name, college or department"><select id="pcol"><option value="">All colleges</option>${M.LISTS.colleges.map((x) => `<option>${esc(x)}</option>`).join('')}</select></div>
  <p class="muted" id="pinfo" style="margin:8px 0"></p><div class="plist" id="pl"></div><br><button type="button" class="btn ghost sm" id="pall">Select all shown</button> <button type="button" class="btn ghost sm" id="pnone">Clear all</button> <button type="button" class="btn" id="pdone">Done</button>`, 640);
  let list = []; const upd = () => { $('#pdone').textContent = `Done (${sel.size} selected)`; };
  const draw = () => { $('#pl').innerHTML = list.map((s) => `<label class="prow"><input type="checkbox" value="${s.id}" ${sel.has(s.id) ? 'checked' : ''}><span><b>${esc(s.name)}</b><small>${esc([s.college, s.department, s.yearTo].filter(Boolean).join(' · '))}</small></span></label>`).join('') || '<div class="empty">No students found.</div>';
    document.querySelectorAll('#pl input').forEach((i) => (i.onchange = () => { i.checked ? sel.add(+i.value) : sel.delete(+i.value); upd(); })); upd(); };
  let t; const load = async () => { try { const d = await api('/students?' + new URLSearchParams({ q: $('#ps').value, college: $('#pcol').value })); list = d.students; $('#pinfo').textContent = d.total > list.length ? `Showing the first ${list.length} of ${d.total} — search or pick a college to narrow down.` : `${d.total} student${d.total === 1 ? '' : 's'}`; draw(); } catch (x) { toast(x.message, 1); } };
  $('#ps').addEventListener('input', () => { clearTimeout(t); t = setTimeout(load, 250); }); $('#pcol').addEventListener('change', load);
  $('#pall').onclick = () => { list.forEach((s) => sel.add(s.id)); draw(); }; $('#pnone').onclick = () => { sel.clear(); draw(); };
  $('#pdone').onclick = () => { m.remove(); onDone(); }; load();
}

render();
