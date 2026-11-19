const express = require('express'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const app = express(); app.use(express.json({ limit: '25mb' }));
// serves the searchable-dropdown script and adds it to the app page automatically
app.get('/searchable-select.js', (req, res) => res.sendFile(path.join(__dirname, 'searchable-select.js')));
app.get(['/', '/index.html'], (req, res, next) => {
  const f = path.join(__dirname, 'public', 'index.html'); if (!fs.existsSync(f)) return next();
  let html = fs.readFileSync(f, 'utf8'); const tag = '<script src="/searchable-select.js"></script>';
  if (!html.includes('searchable-select.js')) html = html.includes('</body>') ? html.replace('</body>', tag + '</body>') : html + tag;
  res.type('html').send(html);
});
app.use(express.static(path.join(__dirname, 'public')));
const DB = path.join(__dirname, 'data.json'), UP = path.join(__dirname, 'uploads');
fs.mkdirSync(UP, { recursive: true }); app.use('/uploads', express.static(UP));

// ================= configuration (edit these lists to match Maatram) =================
const H = 3600e3, SLA = { Urgent: 4 * H, High: 24 * H, Medium: 48 * H, Low: 72 * H };
const CATS = ['Admission', 'Scholarship', 'Fees', 'Events', 'Mentoring', 'Career guidance', 'Technical', 'Other'];
const STATUSES = ['New', 'In progress', 'Waiting for student', 'Resolved', 'Closed'];
const ROLES = { student: 'Student', anchor: 'Anchor', zone: 'Zone Incharge', admin: 'Admin', alumni: 'Alumni' };
// Which roles can solve which categories, and who a student should ask first
const CODES = { anchor: process.env.ANCHOR_CODE || 'ANCHOR-2026', zone: process.env.ZONE_CODE || 'ZONE-2026', admin: process.env.ADMIN_CODE || 'ADMIN-2026' }; // staff sign-up codes: change these
const CAP = { anchor: ['Events', 'Mentoring', 'Technical', 'Other'], zone: ['Admission', 'Scholarship', 'Events', 'Mentoring', 'Technical', 'Other'], admin: CATS, alumni: ['Mentoring', 'Career guidance'] };
const REC = { Admission: 'zone', Scholarship: 'zone', Fees: 'admin', Events: 'anchor', Mentoring: 'anchor', 'Career guidance': 'mentor', Technical: 'anchor', Other: 'anchor' };
const LISTS = {
  degrees: ["B.E.", "B.Tech.", "M.Tech", "B.Com", "B.SC", "BBA", "B.A", "BCA", "M.Com", "MA.HR(OD)"],
  departments: ["Accounting Finance", "Actuarial Management", "Aeronautical", "Aerospace", "Agricultural", "AI & DS", "AI & ML", "Automobile", "Bank Management", "BBA", "BCA", "Bio Chemistry", "Bio technology", "Biomedical", "Biomedical Engineering", "Business Process Services", "Capital Markets", "CCE", "Chemical", "Chemistry", "Civil", "Clinical Nutrition & Dietetics", "Commerce", "Commerce Computer Application", "Computer Application", "Computer Applications", "Computer Science", "Computer Science and Application", "Computer Technology", "Corporate Secretaryship", "CSBS", "CSD", "CSE", "CSE (IOT)", "CSE Integrated", "CSE(cyber security)", "CSE. AI & DS", "CSE. AI & ML", "Cyber Security", "Data Science", "E & I", "E-Commerce", "ECE", "Economics", "EEE", "EICE", "EIE", "Electronics &VLSI", "Electronics. VLSI design & Technology", "English Literature", "Fashion technology", "Financial Accounting", "Financial Analytics", "Financial Marketing Analytics", "Food Technology", "Forensic Science", "General", "Honours", "HR & OD", "HRM", "ICE", "Information System Management", "Information Technology", "International Business", "Management", "Mathematics", "Mechanical", "Mechanical & Automation", "Mechatronics", "Medical Laboratory Technology", "Microbiology", "Nursing", "Nutrition and Dietetics", "Pharmaceutical", "Physics", "Political science", "Professional Accounting", "Psychology", "Retail Management", "Robotics & Automation", "Sports Science", "Tamil Creative Writing", "Tamil Literature", "Textile technology", "Visual Communication", "Zoology"],
  colleges: ["AVS Engineering College", "Chennai Institute of Technology", "Dr. MGR Janaki College of Arts and Science for Women", "Dr.G. R. Damodaran College of Science", "Hindusthan Institute of Technology", "J.J.College of Engineering and Technology", "J.N.N Institute of Engineering", "Jeppiaar Arts and Science College", "Jeppiaar Engineering college", "Jeppiaar Institute of Technology", "Jeppiaar University", "K.S.R. College of Arts and Science for women", "K.S.Rangasamy College of Technology", "Kalasalingam Academy of Research and Education", "Karpagam Arts and Science College", "Karpagam College of Engineering", "Karpagam Institute of Technology", "KCG College of Technology", "Knowledge Institute of Technology", "Kumaraguru College of Liberal Arts and Science", "Kumaraguru College of Technology", "M.A.M College of Engineering and Technology", "Madras School of Social Work", "Muthayammal College of Arts & Science", "Nandha College of Arts and Science", "Nandha Engineering College", "Omandurar Government Medical College", "Peri Institute of Technology", "Prince Shri Venkateshwara Padmavathy Engineering College", "PSNA College Of Engineering and Technology", "Rajalakshmi Engineering College", "Rajalakshmi Institute of Technology", "Rathinam College of Arts and Science", "Rathinam Engineering College", "Sathyabama Institute of Science and Technology", "Sona College of Technology", "Sri Krishna Arts and Science College", "Sri Krishna College of Engineering and Technology", "Sri Krishna College of Technology", "Sri Sairam Engineering College", "Sri Sairam Institute of Technology", "Sri Venkateswaraa College of Technology", "SRM Arts and Science", "SRM Easwari Engineering College", "SRM TRP Engineering College", "SRM Valliammai Engineering College", "St Joseph's College of Engineering", "St Joseph's Institute of Technology", "Stanley Medical College", "Thanjavur Medical College", "Velammal Engineering College", "Velammal institute of technology", "Vels University"],
  jobStatus: ['Working', 'Higher studies', 'Looking for opportunities', 'Self-employed'] };
const F = (k, label, type, req, x = {}) => ({ k, label, type, req: !!req, ...x });
const common = [F('phone', 'Mobile number', 'tel', 1), F('college', 'College', 'college', 1), F('degree', 'Degree', 'degree', 1), F('department', 'Department', 'dept', 1)];
const PROFILE = {
  student: [...common, F('specialisation', 'Specialisation', 'text', 0), F('yearFrom', 'Year of joining', 'year', 1), F('yearTo', 'Year of passing out', 'year', 1), F('anchorId', 'Your anchor', 'anchorSel', 1), F('zoneId', 'Your zone incharge', 'zoneSel', 1)],
  alumni: [...common, F('specialisation', 'Specialisation', 'text', 0), F('yearTo', 'Year passed out', 'year', 1), F('jobStatus', 'What are you doing now?', 'jobStatus', 1), F('company', 'Company / organisation', 'text', 0, { showIf: ['jobStatus', ['Working', 'Self-employed']] }),
    F('jobRole', 'Your role', 'text', 0, { showIf: ['jobStatus', ['Working', 'Self-employed']] }), F('city', 'City', 'text', 0), F('linkedin', 'LinkedIn link', 'url', 0), F('mentor', 'I can mentor Maatram students', 'checkbox', 0), F('expertise', 'Areas I can guide in', 'text', 0, { showIf: ['mentor', [true]] })],
  anchor: [...common, F('yearFrom', 'Year of joining', 'year', 1), F('yearTo', 'Year of passing out', 'year', 1), F('zoneId', 'Zone incharge you report to', 'zoneSel', 0)],
  zone: [F('phone', 'Mobile number', 'tel', 1), F('college', 'College you are in charge of', 'college', 1), F('city', 'City', 'text', 0), F('designation', 'Designation', 'text', 0)],
  admin: [F('phone', 'Mobile number', 'tel', 0), F('designation', 'Designation', 'text', 0)] };

// ================= database (simple JSON file) =================
const hash = (p) => crypto.createHash('sha256').update('maatram' + p).digest('hex');
let db; const save = () => fs.writeFileSync(DB, JSON.stringify(db, null, 1));
const U = (id) => db.users.find((u) => u.id === id), name = (id) => (U(id) || {}).name || '—';
const open = (q) => !['Resolved', 'Closed'].includes(q.status), entry = (u) => ({ id: u.id, name: u.name, role: u.role });
const pub = (u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, profile: u.profile || {}, profileDone: profileDone(u) });
function profileDone(u) {
  const p = u.profile || {}, f = PROFILE[u.role] || [];
  const ok = f.filter((x) => x.req).every((x) => p[x.k] !== undefined && p[x.k] !== '' && p[x.k] !== null);
  return ok && (u.role !== 'alumni' || !['Working', 'Self-employed'].includes(p.jobStatus) || !!(p.company && p.jobRole));
}
const norm = (x) => String(x || '').toLowerCase().replace(/[^a-z]/g, '');
const nameMatch = (a, b) => { a = norm(a); b = norm(b); return a.length > 2 && b.length > 2 && (a.includes(b) || b.includes(a)); };
const zoneFor = (college) => db.users.find((u) => u.role === 'zone' && college && (u.profile || {}).college === college);
function myPeople(me) { // who is linked to this anchor / zone incharge
  const mp = me.profile || {};
  return db.users.filter((u) => u.id !== me.id && (me.role === 'admin' || (me.role === 'zone' ? mp.college && u.profile && u.profile.college === mp.college && ['student', 'anchor'].includes(u.role) : me.role === 'anchor' && u.role === 'student' && ((u.profile || {}).anchorId === me.id || nameMatch((u.profile || {}).anchorName, me.name)))));
}
function leastLoaded(role) {
  const c = db.users.filter((u) => u.role === role).map((u) => [u, db.queries.filter((q) => q.toId === u.id && open(q)).length]).sort((a, b) => a[1] - b[1]);
  return c.length ? c[0][0] : null;
}
function notify(to, channel, text, qid, type = 'Update', link) { db.notifications.unshift({ id: db.seq++, to, channel, text, qid, type, link, at: Date.now() }); console.log(`[${channel} -> ${name(to)}] ${text}`); }
function mk(raiser, b, to, t = Date.now()) {
  const target = U(to), q = { id: db.seq++, raiserId: raiser.id, raiserName: raiser.name, raiserRole: raiser.role, category: b.category, categoryOther: b.categoryOther || '', priority: b.priority || 'Medium', description: b.description,
    deadline: b.deadline || '', contactVia: b.contactVia || '', importantInfo: b.importantInfo || '', attachments: b.attachments || [], status: 'New', toId: to, route: [entry(target)], createdAt: t, updatedAt: t, due: t + (SLA[b.priority] || SLA.Medium), reminded: 0, escLevel: 0,
    history: [{ at: t, by: raiser.id, action: `Query raised and sent to ${target.name} (${ROLES[target.role]})`, note: '' }] };
  db.queries.push(q); notify(to, 'Email', `New query #${q.id} from ${raiser.name}: ${q.description.slice(0, 60)}`, q.id, 'Assignment'); return q;
}
function forward(q, to, by, note, t = Date.now(), auto = false) {
  const from = U(q.toId) || { name: '—' }, target = U(to);
  q.toId = to; q.route.push(entry(target)); q.status = 'New'; q.updatedAt = t;
  q.history.push({ at: t, by, action: `${auto ? 'Auto-escalated' : 'Forwarded'}: ${from.name} → ${target.name} (${ROLES[target.role]})`, note });
  notify(to, 'Email', `Query #${q.id} from ${q.raiserName} was ${auto ? 'escalated' : 'forwarded'} to you.`, q.id, 'Forwarded');
  if (U(q.raiserId)) notify(q.raiserId, 'In-app', `Your query #${q.id} was forwarded to ${target.name} (${ROLES[target.role]}) who can help further.`, q.id, 'Update');
}
function seed() {
  const now = Date.now(), pw = (r) => hash(r + '123'); let id = 1;
  const add = (role, n, email, profile) => { db.users.push({ id: id++, name: n, email, role, password: pw(role), profile }); };
  db = { seq: 100, users: [], queries: [], notifications: [] };
  add('admin', 'Anitha Rao', 'admin@maatram.org', { phone: '9000000001', designation: 'Office Head' });
  add('admin', 'Suresh Babu', 'suresh@maatram.org', { phone: '9000000002', designation: 'Office Coordinator' });
  add('zone', 'Divya Narayanan', 'zone@maatram.org', { phone: '9000000003', college: 'Rajalakshmi Engineering College', city: 'Chennai', designation: 'Zone Incharge' });
  add('zone', 'Karthik Raj', 'karthik@maatram.org', { phone: '9000000004', college: 'SRM Easwari Engineering College', city: 'Chennai', designation: 'Zone Incharge' });
  add('anchor', 'Meena Iyer', 'anchor@maatram.org', { phone: '9000000005', college: 'Rajalakshmi Engineering College', degree: 'B.E.', department: 'CSE', yearFrom: '2023', yearTo: '2027', zoneName: 'Divya Narayanan' });
  add('anchor', 'Arjun Das', 'arjun@maatram.org', { phone: '9000000006', college: 'SRM Easwari Engineering College', degree: 'B.Tech.', department: 'Information Technology', yearFrom: '2023', yearTo: '2027', zoneName: 'Karthik Raj' });
  add('student', 'Priya Sundar', 'student@maatram.org', { phone: '9000000007', college: 'Rajalakshmi Engineering College', degree: 'B.E.', department: 'CSE', specialisation: 'Data Science', yearFrom: '2024', yearTo: '2028', anchorName: 'Meena Iyer', zoneName: 'Divya Narayanan' });
  add('student', 'Rahul Kumar', 'rahul@maatram.org', { phone: '9000000008', college: 'SRM Easwari Engineering College', degree: 'B.Tech.', department: 'Information Technology', specialisation: 'Cyber Security', yearFrom: '2023', yearTo: '2027', anchorName: 'Arjun Das', zoneName: 'Karthik Raj' });
  add('student', 'Nisha Thomas', 'nisha@maatram.org', {});
  add('alumni', 'Vikram Selvam', 'alumni@maatram.org', { phone: '9000000010', college: 'Rajalakshmi Engineering College', degree: 'B.E.', department: 'CSE', yearTo: '2021', jobStatus: 'Working', company: 'Zoho', jobRole: 'Software Engineer', city: 'Chennai', mentor: true, expertise: 'Web development, interview preparation' });
  add('alumni', 'Sneha Raman', 'sneha@maatram.org', { phone: '9000000011', college: 'SRM Easwari Engineering College', degree: 'B.Tech.', department: 'Information Technology', yearTo: '2020', jobStatus: 'Higher studies', city: 'Bengaluru', mentor: true, expertise: 'Higher studies abroad, GRE' });
  const priya = U(7), rahul = U(8), vik = U(10), t = (h) => now - h * H;
  let q = mk(priya, { category: 'Scholarship', priority: 'High', description: 'My scholarship status has not been updated for three weeks.', importantInfo: 'Last date to submit documents is next Friday.', contactVia: 'WhatsApp' }, 5, t(30));
  forward(q, 3, 5, 'Scholarship approvals are handled by the zone incharge of your college.', t(29)); q.status = 'In progress'; q.updatedAt = t(28); q.history.push({ at: t(28), by: 3, action: 'Status → In progress', note: 'Checking the approval list with the scholarship team.' });
  q = mk(priya, { category: 'Events', priority: 'Low', description: 'What time does Saturday’s mentoring session start and what is the link?' }, 5, t(50));
  q.status = 'Resolved'; q.updatedAt = t(46); q.history.push({ at: t(46), by: 5, action: 'Status → Resolved', note: 'It starts at 10 am. Link sent on the batch WhatsApp group.' });
  q = mk(priya, { category: 'Mentoring', priority: 'Medium', description: 'I would like a mentor for data science and internships.' }, 10, t(8)); q.status = 'Waiting for student'; q.updatedAt = t(5); q.history.push({ at: t(5), by: 10, action: 'Status → Waiting for student', note: 'Could you share your resume and the topics you have already covered?' });
  q = mk(rahul, { category: 'Fees', priority: 'Urgent', description: 'Fee receipt not received even after the online payment went through.', deadline: '', contactVia: 'Phone call' }, 1, t(80)); q.status = 'In progress'; q.updatedAt = t(70);
  mk(rahul, { category: 'Admission', priority: 'Urgent', description: 'Admission documents fail to upload on the portal.', importantInfo: 'The portal closes tomorrow.' }, 4, t(6));
  mk(vik, { category: 'Events', priority: 'Medium', description: 'I would like to conduct a session on interview preparation for juniors.' }, 2, t(3));
  save();
}
if (fs.existsSync(DB)) db = JSON.parse(fs.readFileSync(DB)); else seed();
// clean up data saved by the older version of the app (old roles, queries without a route) so pages do not crash
(function migrate() {
  db.users = db.users.filter((u) => ROLES[u.role]); db.users.forEach((u) => { if (!u.profile) u.profile = {}; });
  db.queries = db.queries.filter((q) => Array.isArray(q.route) && q.raiserId && U(q.raiserId));
  db.notifications = db.notifications.filter((n) => typeof n.to === 'number' && U(n.to)); save();
})();

// Dummy anchors, zone incharges, admins and alumni, added once (skipped if the email already exists), so every "Who should solve this?" dropdown has people in it.
(function demoPeople() {
  let added = 0, ph = 9000000100;
  const put = (role, name, profile) => {
    const email = name.toLowerCase().replace(/[^a-z]+/g, '.') + '@maatram.org'; if (db.users.some((u) => u.email === email)) return;
    const old = db.users.find((u) => u.role === role && u.name === name); // an older demo account with the same name: give it the documented email instead of creating a duplicate
    if (old) { old.email = email; added++; return; }
    db.users.push({ id: db.seq++, name, email, role, password: hash(role + '123'), profile: { phone: String(ph++), ...profile } }); added++;
  };
  const SATH = 'Sathyabama Institute of Science and Technology', RAJ = 'Rajalakshmi Engineering College', SRM = 'SRM Easwari Engineering College', SAI = 'Sri Sairam Engineering College', VEL = 'Velammal Engineering College';
  [['Vaitheeswari R', SATH, 'Chennai'], ['Divya Narayanan', RAJ, 'Chennai'], ['Karthik Raj', SRM, 'Chennai'], ['Lakshmi Priya', SAI, 'Chennai'], ['Rohit Menon', VEL, 'Chennai']]
    .forEach(([n, college, city]) => put('zone', n, { college, city, designation: 'Zone Incharge' }));
  [['Shalini S', SATH, 'B.E.', 'ECE', 2024, 2028, 'Vaitheeswari R'], ['Imran Basha', SATH, 'B.Tech.', 'Information Technology', 2023, 2027, 'Vaitheeswari R'], ['Meena Iyer', RAJ, 'B.E.', 'CSE', 2023, 2027, 'Divya Narayanan'],
    ['Pooja Lakshmi', RAJ, 'B.E.', 'AI & DS', 2024, 2028, 'Divya Narayanan'], ['Arjun Das', SRM, 'B.Tech.', 'Information Technology', 2023, 2027, 'Karthik Raj'], ['Harini K', SAI, 'B.E.', 'ECE', 2024, 2028, 'Lakshmi Priya'], ['Naveen Kumar', VEL, 'B.E.', 'Mechanical', 2022, 2026, 'Rohit Menon']]
    .forEach(([n, college, degree, department, a, b, zoneName]) => put('anchor', n, { college, degree, department, yearFrom: String(a), yearTo: String(b), zoneName }));
  [['Suresh Babu', 'Office Coordinator'], ['Revathi N', 'Student Support Lead']].forEach(([n, designation]) => put('admin', n, { designation }));
  [['Vikram Selvam', RAJ, 'B.E.', 'CSE', 2021, 'Zoho', 'Software Engineer', 'Chennai', 'Web development, interview preparation'], ['Sneha Raman', SRM, 'B.Tech.', 'Information Technology', 2020, 'Infosys', 'Systems Engineer', 'Bengaluru', 'Career planning, higher studies'],
    ['Karan Mehta', SATH, 'B.E.', 'ECE', 2019, 'TCS', 'Data Analyst', 'Hyderabad', 'Data analytics, resume reviews'], ['Divya Bharathi', SAI, 'B.E.', 'CSE', 2022, 'Accenture', 'Business Analyst', 'Chennai', 'Consulting, communication skills'],
    ['Aravind S', VEL, 'B.E.', 'Mechanical', 2018, 'Freshworks', 'Product Designer', 'Chennai', 'Design careers, portfolios']]
    .forEach(([n, college, degree, department, yearTo, company, jobRole, city, expertise]) => put('alumni', n, { college, degree, department, yearTo: String(yearTo), jobStatus: 'Working', company, jobRole, city, mentor: true, expertise }));
  if (added) { save(); console.log(`Set up ${added} dummy people (email = full name with dots @maatram.org, password = role + 123, e.g. anchor123).`); }
})();

// ================= auth =================
const sessions = {};
function auth(...roles) {
  return (req, res, next) => {
    const u = sessions[(req.headers.authorization || '').replace('Bearer ', '')];
    if (!u) return res.status(401).json({ error: 'Please sign in' });
    if (roles.length && !roles.includes(u.role)) return res.status(403).json({ error: 'Not allowed for your role' });
    req.user = u; next();
  };
}
const session = (u, res) => { const t = crypto.randomBytes(24).toString('hex'); sessions[t] = u; res.json({ token: t, user: pub(u) }); };
app.post('/api/login', (req, res) => {
  const u = db.users.find((x) => x.email === (req.body.email || '').toLowerCase().trim() && x.password === hash(req.body.password || ''));
  if (!u) return res.status(401).json({ error: 'Wrong email or password' });
  if (u.role !== req.body.role) return res.status(403).json({ error: 'This account is not registered as ' + (ROLES[req.body.role] || 'that role') });
  session(u, res);
});
app.post('/api/register', (req, res) => {
  const { role, name: n, email, password, code } = req.body;
  if (!ROLES[role] || !n || !email || (password || '').length < 6) return res.status(400).json({ error: 'Choose your role and enter name, email and a password of 6+ characters' });
  if (CODES[role] && code !== CODES[role]) return res.status(403).json({ error: `Enter the registration code for ${ROLES[role]}s. Ask the Maatram office for it.` });
  if (db.users.some((u) => u.email === email.toLowerCase().trim())) return res.status(400).json({ error: 'An account with this email already exists' });
  const u = { id: db.seq++, name: n.trim(), email: email.toLowerCase().trim(), role, password: hash(password), profile: {} };
  db.users.push(u); save(); session(u, res);
});
app.get('/api/me', auth(), (req, res) => res.json(pub(req.user)));
app.get('/api/meta', auth(), (req, res) => res.json({ CATS, STATUSES, ROLES, REC, CAP, LISTS, PROFILE,
  anchors: db.users.filter((u) => u.role === 'anchor').map((u) => ({ id: u.id, name: u.name, college: (u.profile || {}).college || '', years: (u.profile || {}).yearFrom ? `${u.profile.yearFrom}–${u.profile.yearTo}` : '' })),
  zones: db.users.filter((u) => u.role === 'zone').map((u) => ({ id: u.id, name: u.name, college: (u.profile || {}).college || '' })),
  admins: db.users.filter((u) => u.role === 'admin').map((u) => ({ id: u.id, name: u.name })),
  mentors: db.users.filter((u) => u.role === 'alumni' && (u.profile || {}).mentor && u.id !== req.user.id).map((u) => ({ id: u.id, name: u.name, expertise: (u.profile || {}).expertise || '', company: (u.profile || {}).company || (u.profile || {}).jobStatus || '' })),
  instructs: (db.classes || []).some((c) => c.instructorId === req.user.id),
  handlers: db.users.filter((u) => u.role !== 'student').map((u) => ({ id: u.id, name: u.name, role: u.role, org: (u.profile || {}).company || (u.profile || {}).college || '' })),
  }));
app.put('/api/profile', auth(), (req, res) => {
  const u = req.user, p = {};
  PROFILE[u.role].forEach((f) => {
    if (f.type === 'anchorSel' || f.type === 'zoneSel') { // dropdown of real people, or a typed name if they are not listed
      const nk = f.k.replace('Id', 'Name'), usr = U(+req.body[f.k]), typed = String(req.body[nk] || '').trim().slice(0, 100);
      if (usr && usr.role === (f.type === 'anchorSel' ? 'anchor' : 'zone')) { p[f.k] = usr.id; p[nk] = usr.name; } else if (typed) { p[f.k] = 'none'; p[nk] = typed; } else { p[f.k] = ''; p[nk] = ''; } return;
    }
    let v = req.body[f.k]; if (f.type === 'checkbox') v = !!v; else if (f.type.startsWith('user')) v = v === 'none' ? 'none' : +v || ''; else v = String(v || '').trim().slice(0, 200); p[f.k] = v; });
  if (p.phone && !/^\d{10}$/.test(p.phone)) return res.status(400).json({ error: 'Mobile number must be exactly 10 digits' });
  if (req.body.name && req.body.name.trim()) u.name = req.body.name.trim();
  u.profile = p; save(); res.json(pub(u));
});
app.post('/api/password', auth(), (req, res) => {
  const u = U(req.user.id);
  if (u.password !== hash(req.body.old || '')) return res.status(400).json({ error: 'Your current password is wrong' });
  if ((req.body.new || '').length < 6) return res.status(400).json({ error: 'New password must be at least 6 characters' });
  u.password = hash(req.body.new); save(); res.json({ ok: true });
});

// ================= queries =================
const isHandler = (u) => u.role !== 'student' && u.role !== 'alumni' || false;
function canSee(u, q) {
  if (u.role === 'admin' || q.raiserId === u.id || q.toId === u.id || q.route.some((r) => r.id === u.id)) return true;
  const p = (U(q.raiserId) || {}).profile || {};
  return (u.role === 'zone' && !!p.college && p.college === (u.profile || {}).college) || (u.role === 'anchor' && (p.anchorId === u.id || nameMatch(p.anchorName, u.name)));
}
function view(q, u, full) {
  const to = U(q.toId) || { name: '—', role: '' }, r = U(q.raiserId), rp = (r && r.profile) || {};
  const o = { ...q, toName: to.name, toRole: to.role, overdue: open(q) && Date.now() > q.due };
  const lr = [...q.history].reverse().find((h) => h.note && h.by && h.by !== q.raiserId && /Status|Message/.test(h.action)); o.lastReply = lr ? { by: name(lr.by), note: lr.note, at: lr.at } : null;
  if (u.id !== q.raiserId && r) o.raiser = { id: r.id, name: r.name, role: r.role, email: r.email, profile: rp };
  return o;
}
app.get('/api/queries', auth(), (req, res) => {
  const { q = '', status, category, handler, from, scope } = req.query, s = q.toLowerCase(), me = req.user;
  const list = db.queries.filter((x) => canSee(me, x) && (scope === 'with' ? x.toId === me.id : scope === 'raised' ? x.raiserId === me.id : true)
    && (!s || [x.raiserName, x.description, x.category, x.categoryOther, '#' + x.id, (U(x.raiserId) || { profile: {} }).profile.college].join(' ').toLowerCase().includes(s))
    && (!status || x.status === status) && (!category || x.category === category) && (!handler || String(x.toId) === handler) && (!from || x.createdAt >= Date.parse(from)));
  res.json(list.sort((a, b) => b.updatedAt - a.updatedAt).map((x) => view(x, me)));
});
app.post('/api/queries', auth('student', 'alumni'), (req, res) => {
  const b = req.body, me = req.user, p = me.profile || {};
  if (!profileDone(me)) return res.status(403).json({ error: 'Please complete your profile first' });
  if (!b.category || !b.description) return res.status(400).json({ error: 'Category and description are required' });
  if (b.category === 'Other' && !(b.categoryOther || '').trim()) return res.status(400).json({ error: 'Please say what the "Other" category is' });
  const to = U(+b.toId), want = { anchor: 'anchor', zone: 'zone', admin: 'admin', alumni: 'alumni' }[b.sendRole];
  if (!to || !want || to.role !== want || to.id === me.id || (to.role === 'alumni' && !(to.profile || {}).mentor)) return res.status(400).json({ error: 'Please choose who should solve this, and then the person' });
  const files = (b.files || []).slice(0, 3).map((f) => { const n = Date.now() + '-' + f.name.replace(/[^\w.-]/g, '_'); fs.writeFileSync(path.join(UP, n), Buffer.from(f.data.split(',')[1], 'base64')); return { name: f.name, url: '/uploads/' + n }; });
  const q = mk(me, { ...b, categoryOther: b.category === 'Other' ? b.categoryOther.trim() : '', attachments: files }, to.id);
  save(); res.json(view(q, me));
});
function options(q, me) { // who this query can be forwarded to
  const cap = (u) => (CAP[u.role] || []).includes(q.category), col = ((U(q.raiserId) || {}).profile || {}).college, out = [];
  const tag = (u) => { const p = u.profile || {}; return u.role === 'anchor' ? `${u.name} — ${p.college || ''}${p.yearFrom ? ' (' + p.yearFrom + '–' + p.yearTo + ')' : ''}` : u.role === 'zone' ? `${u.name} — ${p.college || ''}` : u.role === 'alumni' ? `${u.name} — ${p.company || p.jobStatus || ''}` : u.name; };
  [['anchor', 'Anchors'], ['zone', 'Zone incharges'], ['admin', 'Maatram office'], ['alumni', 'Alumni mentors']].forEach(([role, group]) => {
    if (!CAP[role].includes(q.category)) return;
    db.users.filter((u) => u.role === role && u.id !== me.id && u.id !== q.toId && u.id !== q.raiserId && (role !== 'alumni' || (u.profile || {}).mentor))
      .sort((a, b) => ((b.profile || {}).college === col) - ((a.profile || {}).college === col)).forEach((u) => out.push({ id: u.id, group, label: tag(u) }));
  });
  return out;
}
function suggest(q, me) {
  if ((CAP[me.role] || []).includes(q.category)) return null;
  const t = (me.role !== 'zone' && CAP.zone.includes(q.category) && zoneFor(((U(q.raiserId) || {}).profile || {}).college)) || leastLoaded('admin');
  return t && t.id !== me.id ? { id: t.id, name: t.name, role: t.role } : null;
}
app.get('/api/queries/:id', auth(), (req, res) => {
  const q = db.queries.find((x) => x.id == req.params.id); if (!q || !canSee(req.user, q)) return res.status(404).json({ error: 'Query not found' });
  const mine = q.toId === req.user.id || req.user.role === 'admin';
  res.json({ q: view(q, req.user), options: mine ? options(q, req.user) : [], suggest: mine ? suggest(q, req.user) : null });
});
app.patch('/api/queries/:id', auth(), (req, res) => {
  const q = db.queries.find((x) => x.id == req.params.id), me = req.user; if (!q || !canSee(me, q)) return res.status(404).json({ error: 'Query not found' });
  const { action, status, note, to, text } = req.body, t = Date.now(), handles = q.toId === me.id || me.role === 'admin', mineRaised = q.raiserId === me.id;
  if (action === 'update' && handles) {
    if (!['In progress', 'Waiting for student', 'Resolved', 'Closed'].includes(status)) return res.status(400).json({ error: 'Choose a status' });
    if (status === q.status && !note) return res.status(400).json({ error: 'Change the status or write a message' });
    if (status !== q.status) q.history.push({ at: t, by: me.id, action: 'Status → ' + status, note: note || '' }); else q.history.push({ at: t, by: me.id, action: 'Message to student', note });
    q.status = status; q.updatedAt = t;
    if (U(q.raiserId)) notify(q.raiserId, 'In-app', status === 'Resolved' ? `Your query #${q.id} was resolved by ${me.name}.` : status === 'Waiting for student' ? `${me.name} needs your reply on query #${q.id}.` : `${me.name} updated your query #${q.id}.`, q.id, 'Update');
  } else if (action === 'forward' && handles) {
    const target = U(+to); if (!target || !options(q, me).some((o) => o.id === target.id)) return res.status(400).json({ error: 'Choose who to forward to' });
    if (!(note || '').trim()) return res.status(400).json({ error: 'Please say why you are forwarding it' });
    forward(q, target.id, me.id, note.trim(), t);
  } else if (action === 'reply' && mineRaised && text) {
    q.history.push({ at: t, by: me.id, action: 'Reply from ' + (me.role === 'alumni' ? 'alumni' : 'student'), note: text }); q.updatedAt = t; if (q.status === 'Waiting for student') q.status = 'In progress';
    if (open(q) && U(q.toId)) notify(q.toId, 'In-app', `${me.name} replied on query #${q.id}.`, q.id, 'Update');
  } else if (action === 'close' && mineRaised) { q.status = 'Closed'; q.updatedAt = t; q.history.push({ at: t, by: me.id, action: 'Confirmed solved and closed', note: text || '' }); }
  else if (action === 'reopen' && mineRaised && (text || '').trim()) {
    if (!U(q.toId)) { const a = leastLoaded('admin'); q.toId = a.id; q.route.push(entry(a)); }
    q.status = 'New'; q.updatedAt = t; q.history.push({ at: t, by: me.id, action: 'Reopened — not solved', note: text }); notify(q.toId, 'In-app', `${me.name} reopened query #${q.id}.`, q.id, 'Update');
  } else return res.status(403).json({ error: 'That action is not available to you' });
  save(); res.json(view(q, me));
});

// ================= dashboard, people, users =================
app.get('/api/stats', auth(), (req, res) => {
  const me = req.user, vis = db.queries.filter((q) => canSee(me, q)), o = vis.filter(open), done = vis.filter((q) => !open(q));
  const count = (arr, f) => arr.reduce((m, x) => ((m[f(x)] = (m[f(x)] || 0) + 1), m), {});
  const times = done.map((q) => ((q.history.find((h) => /Resolved|Closed/.test(h.action)) || { at: q.updatedAt }).at - q.createdAt));
  const mine = vis.filter((q) => q.toId === me.id && open(q)), light = (q) => ({ lastReply: view(q, me).lastReply, id: q.id, raiserId: q.raiserId, category: q.category, raiserName: q.raiserName, status: q.status, priority: q.priority, toName: name(q.toId), overdue: open(q) && Date.now() > q.due, route: q.route, updatedAt: q.updatedAt });
  const raised = db.queries.filter((q) => q.raiserId === me.id), people = myPeople(me);
  res.json({ total: vis.length, open: o.length, overdue: o.filter((q) => Date.now() > q.due).length, resolved: done.length, avgHours: times.length ? +(times.reduce((a, b) => a + b, 0) / times.length / H).toFixed(1) : 0,
    withMe: mine.length, forwardedByMe: vis.filter((q) => q.history.some((h) => h.by === me.id && /^Forwarded/.test(h.action))).length,
    myOpen: raised.filter(open).length, waitingForMe: raised.filter((q) => q.status === 'Waiting for student').length, myResolved: raised.filter((q) => !open(q)).length, myTotal: raised.length,
    perHandler: count(o, (q) => `${name(q.toId)} (${ROLES[(U(q.toId) || {}).role] || ''})`), perCategory: count(vis, (q) => q.category),
    people: count(people, (u) => ROLES[u.role]),
    attention: (me.role === 'student' || me.role === 'alumni' ? raised.filter((q) => q.status === 'Waiting for student') : mine.filter((q) => q.status === 'New' || Date.now() > q.due)).slice(0, 5).map(light),
    recent: raised.sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 4).map(light) });
});
app.get('/api/people', auth('admin', 'zone', 'anchor'), (req, res) => {
  const s = (req.query.q || '').toLowerCase();
  res.json(myPeople(req.user).filter((u) => (!req.query.role || u.role === req.query.role) && (!s || [u.name, u.email, ROLES[u.role], ...['college', 'department', 'degree', 'phone', 'city', 'company', 'specialisation', 'yearFrom', 'yearTo'].map((k) => (u.profile || {})[k])].join(' ').toLowerCase().includes(s))).map(pub));
});
app.post('/api/users', auth('admin'), (req, res) => {
  const { name: n, email, role } = req.body; let password = (req.body.password || '').trim();
  if (!n || !email || !ROLES[role]) return res.status(400).json({ error: 'Name, email and role are required' });
  if (db.users.some((u) => u.email === email.toLowerCase().trim())) return res.status(400).json({ error: 'That email already exists' });
  if (password && password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
  if (!password) password = crypto.randomBytes(4).toString('hex');
  const u = { id: db.seq++, name: n.trim(), email: email.toLowerCase().trim(), role, password: hash(password), profile: {} }; db.users.push(u); save(); res.json({ ...pub(u), password });
});
app.delete('/api/users/:id', auth('admin'), (req, res) => {
  const id = +req.params.id, u = U(id);
  if (!u) return res.status(404).json({ error: 'User not found' }); if (id === req.user.id) return res.status(400).json({ error: 'You cannot remove your own account' });
  if (u.role === 'admin' && db.users.filter((x) => x.role === 'admin').length < 2) return res.status(400).json({ error: 'At least one admin must remain' });
  const fallback = leastLoaded('admin') && db.users.filter((x) => x.role === 'admin' && x.id !== id)[0];
  db.queries.filter((q) => q.toId === id && open(q)).forEach((q) => forward(q, fallback.id, req.user.id, u.name + ' was removed from the team', Date.now()));
  db.classes = db.classes || []; db.classes.forEach((c) => { if (c.instructorId === id) c.instructorId = req.user.id; c.studentIds = c.studentIds.filter((x) => x !== id); });
  db.users = db.users.filter((x) => x.id !== id); Object.keys(sessions).forEach((t) => sessions[t].id === id && delete sessions[t]); save(); res.json({ ok: true });
});
app.get('/api/notifications', auth(), (req, res) => res.json(db.notifications.filter((n) => n.to === req.user.id).slice(0, 100)));

// ================= reminders + automatic escalation =================
function runReminders() {
  const now = Date.now(); let n = 0, changed = false;
  db.queries.filter(open).forEach((q) => {
    const h = U(q.toId); if (!h) return;
    if (now - q.updatedAt > 24 * H && now - q.reminded > 24 * H && q.status !== 'Waiting for student') { q.reminded = now; notify(h.id, 'Email', `Reminder: query #${q.id} from ${q.raiserName} has had no update for 24 hours.`, q.id, 'Reminder'); n++; changed = true; }
    if (q.status === 'Waiting for student' && now - q.updatedAt > 48 * H && now - q.reminded > 48 * H && U(q.raiserId)) { q.reminded = now; notify(q.raiserId, 'In-app', `Reminder: ${h.name} is waiting for your reply on query #${q.id}.`, q.id, 'Reminder'); n++; changed = true; }
    if (q.escLevel < 2 && q.status !== 'Waiting for student' && now > q.due + (q.escLevel + 1) * 24 * H) {
      q.escLevel++; changed = true; const rp = (U(q.raiserId) || {}).profile || {};
      const sup = h.role === 'anchor' ? zoneFor(rp.college) || leastLoaded('admin') : h.role === 'admin' ? null : leastLoaded('admin');
      db.users.filter((u) => u.role === 'admin' && u.id !== (sup || {}).id).forEach((a) => { notify(a.id, 'WhatsApp', `Escalation: query #${q.id} from ${q.raiserName} is overdue with ${h.name} (${ROLES[h.role]}).`, q.id, 'Escalation'); n++; });
      if (sup && sup.id !== h.id) { forward(q, sup.id, 0, 'Overdue — escalated automatically', now, true); n++; }
    }
  });
  if (changed) save(); return n;
}
setInterval(runReminders, 60e3);
app.post('/api/reminders/run', auth('admin'), (req, res) => res.json({ sent: runReminders() }));
(function linkNames() {
  let ch = 0;
  db.users.filter((u) => ['student', 'anchor'].includes(u.role)).forEach((u) => { const p = u.profile || {};
    [['anchor', 'anchorId', 'anchorName'], ['zone', 'zoneId', 'zoneName']].forEach(([role, ik, nk]) => { if (p[nk] && (p[ik] === undefined || p[ik] === '')) { const m = db.users.find((x) => x.role === role && nameMatch(x.name, p[nk])); p[ik] = m ? m.id : 'none'; if (m) p[nk] = m.name; ch++; } }); });
  if (ch) save();
})();

// ================= event calendar + aptitude classes =================
db.events = db.events || []; db.classes = db.classes || [];
const PRIV = path.join(__dirname, 'private'); fs.mkdirSync(PRIV, { recursive: true }); // class files live here and are NOT public
const OKEXT = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', 'csv', 'png', 'jpg', 'jpeg', 'zip'];
const safe = (fn) => (req, res) => { try { fn(req, res); } catch (e) { res.status(400).json({ error: e.message }); } };
const isDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d || '');
function storeFile(f, by) {
  if (!f || !f.name || !f.data) return null;
  const ext = (String(f.name).split('.').pop() || '').toLowerCase(); if (!OKEXT.includes(ext)) throw new Error('Allowed file types: ' + OKEXT.join(', '));
  const buf = Buffer.from(String(f.data).split(',')[1] || '', 'base64'); if (!buf.length) throw new Error('That file is empty'); if (buf.length > 10 * 1024 * 1024) throw new Error('Each file must be under 10 MB');
  const id = crypto.randomBytes(12).toString('hex'); fs.writeFileSync(path.join(PRIV, id + '.' + ext), buf);
  return { id, ext, name: String(f.name).replace(/[^\w.\- ()]/g, '_').slice(0, 120), size: buf.length, by, at: Date.now() };
}
const dropFile = (f) => f && fs.unlink(path.join(PRIV, f.id + '.' + f.ext), () => {});

// ---- events (everyone reads, only admin writes) ----
function evBody(b) {
  const title = String(b.title || '').trim(); if (!title) throw new Error('Event title is required'); if (!isDate(b.date)) throw new Error('Choose the event date');
  return { title: title.slice(0, 150), date: b.date, endDate: isDate(b.endDate) && b.endDate >= b.date ? b.endDate : '', time: /^\d{2}:\d{2}$/.test(b.time || '') ? b.time : '', endTime: /^\d{2}:\d{2}$/.test(b.endTime || '') ? b.endTime : '',
    venue: String(b.venue || '').slice(0, 200), mode: ['In person', 'Online', 'Hybrid'].includes(b.mode) ? b.mode : 'In person', link: String(b.link || '').slice(0, 300),
    category: ['Session', 'Workshop', 'Competition', 'Meeting', 'Celebration', 'Other'].includes(b.category) ? b.category : 'Other', description: String(b.description || '').slice(0, 2000), contact: String(b.contact || '').slice(0, 200) };
}
app.get('/api/events', auth(), (req, res) => res.json(db.events.map((e) => ({ ...e, createdByName: name(e.createdBy) })).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))));
app.post('/api/events', auth('admin'), safe((req, res) => { const e = { id: db.seq++, ...evBody(req.body), createdBy: req.user.id, createdAt: Date.now() }; db.events.push(e); save(); res.json(e); }));
app.put('/api/events/:id', auth('admin'), safe((req, res) => { const e = db.events.find((x) => x.id == req.params.id); if (!e) return res.status(404).json({ error: 'Event not found' }); Object.assign(e, evBody(req.body)); save(); res.json(e); }));
app.delete('/api/events/:id', auth('admin'), (req, res) => { db.events = db.events.filter((x) => x.id != req.params.id); save(); res.json({ ok: true }); });

// ---- aptitude classes ----
const manages = (c, u) => u.role === 'admin' || c.instructorId === u.id, sees = (c, u) => manages(c, u) || c.studentIds.includes(u.id);
const stuInfo = (id) => { const u = U(id); if (!u) return null; const p = u.profile || {}; return { id: u.id, name: u.name, college: p.college || '', department: p.department || '', yearTo: p.yearTo || '' }; };
const fileOut = (f) => f && { id: f.id, name: f.name, ext: f.ext, size: f.size };
const subOut = (s, a) => s && { studentId: s.studentId, text: s.text, file: fileOut(s.file), at: s.at, late: s.at > Date.parse(a.due), reviewed: !!s.reviewed, marks: s.marks, feedback: s.feedback || '' };
function asgOut(a, u, mgr) {
  const o = { id: a.id, title: a.title, description: a.description, due: a.due, maxMarks: a.maxMarks, file: fileOut(a.file), createdAt: a.createdAt, pastDue: Date.now() > Date.parse(a.due) };
  if (mgr) { o.submissions = a.submissions.map((s) => ({ ...subOut(s, a), name: name(s.studentId) })); } else o.my = subOut(a.submissions.find((s) => s.studentId === u.id), a);
  return o;
}
function classOut(c, u, full) {
  const mgr = manages(c, u), o = { id: c.id, title: c.title, date: c.date, time: c.time, endTime: c.endTime, mode: c.mode, venue: c.venue, link: c.link, description: c.description, instructorId: c.instructorId, instructorName: name(c.instructorId),
    instructorRole: (U(c.instructorId) || {}).role || '', studentCount: c.studentIds.length, materialCount: c.materials.length, assignmentCount: c.assignments.length, canManage: mgr };
  if (mgr) o.toReview = c.assignments.reduce((n, a) => n + a.submissions.filter((s) => !s.reviewed).length, 0);
  else { const mine = c.assignments.map((a) => a.submissions.find((s) => s.studentId === u.id)); o.pending = mine.filter((s) => !s).length; o.overdue = c.assignments.filter((a, i) => !mine[i] && Date.now() > Date.parse(a.due)).length; }
  if (full) {
    o.materials = c.materials.map((m) => ({ id: m.id, title: m.title, description: m.description, file: fileOut(m.file), at: m.at, byName: name(m.by) }));
    o.assignments = c.assignments.map((a) => asgOut(a, u, mgr));
    if (mgr) { o.students = c.studentIds.map(stuInfo).filter(Boolean); o.studentIds = c.studentIds; }
  }
  return o;
}
function classBody(b, old) {
  const title = String(b.title || '').trim(); if (!title) throw new Error('Topic is required'); if (!isDate(b.date)) throw new Error('Choose the class date');
  const ins = U(+b.instructorId); if (!ins || ins.role === 'student') throw new Error('Choose the instructor');
  const ids = Array.isArray(b.studentIds) ? [...new Set(b.studentIds.map(Number))].filter((i) => (U(i) || {}).role === 'student') : old ? old.studentIds : [];
  return { title: title.slice(0, 150), date: b.date, time: /^\d{2}:\d{2}$/.test(b.time || '') ? b.time : '', endTime: /^\d{2}:\d{2}$/.test(b.endTime || '') ? b.endTime : '', mode: ['In person', 'Online'].includes(b.mode) ? b.mode : 'In person',
    venue: String(b.venue || '').slice(0, 200), link: String(b.link || '').slice(0, 300), description: String(b.description || '').slice(0, 2000), instructorId: ins.id, studentIds: ids };
}
const lk = (c) => ({ view: 'aptitude', id: c.id });
app.get('/api/students', auth('admin'), (req, res) => {
  const s = String(req.query.q || '').toLowerCase(), col = req.query.college || '';
  const all = db.users.filter((u) => u.role === 'student' && (!col || (u.profile || {}).college === col) && (!s || [u.name, u.email, (u.profile || {}).college, (u.profile || {}).department].join(' ').toLowerCase().includes(s)));
  res.json({ total: all.length, students: all.slice(0, 300).map((u) => stuInfo(u.id)) });
});
app.get('/api/classes', auth(), (req, res) => res.json(db.classes.filter((c) => sees(c, req.user)).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).map((c) => classOut(c, req.user))));
app.get('/api/classes/:id', auth(), (req, res) => { const c = db.classes.find((x) => x.id == req.params.id); if (!c || !sees(c, req.user)) return res.status(404).json({ error: 'Class not found' }); res.json(classOut(c, req.user, true)); });
app.post('/api/classes', auth('admin'), safe((req, res) => {
  const c = { id: db.seq++, ...classBody(req.body), materials: [], assignments: [], createdBy: req.user.id, createdAt: Date.now() }; db.classes.push(c);
  notify(c.instructorId, 'In-app', `You have been assigned to teach “${c.title}” on ${c.date}.`, null, 'Update', lk(c));
  c.studentIds.forEach((i) => notify(i, 'In-app', `You have been added to the aptitude class “${c.title}” on ${c.date}.`, null, 'Update', lk(c))); save(); res.json(classOut(c, req.user, true));
}));
app.put('/api/classes/:id', auth('admin'), safe((req, res) => {
  const c = db.classes.find((x) => x.id == req.params.id); if (!c) return res.status(404).json({ error: 'Class not found' });
  const nb = classBody(req.body, c), added = nb.studentIds.filter((i) => !c.studentIds.includes(i)), newIns = nb.instructorId !== c.instructorId; Object.assign(c, nb);
  if (newIns) notify(c.instructorId, 'In-app', `You have been assigned to teach “${c.title}” on ${c.date}.`, null, 'Update', lk(c));
  added.forEach((i) => notify(i, 'In-app', `You have been added to the aptitude class “${c.title}” on ${c.date}.`, null, 'Update', lk(c))); save(); res.json(classOut(c, req.user, true));
}));
app.delete('/api/classes/:id', auth('admin'), (req, res) => {
  const c = db.classes.find((x) => x.id == req.params.id); if (c) { c.materials.forEach((m) => dropFile(m.file)); c.assignments.forEach((a) => { dropFile(a.file); a.submissions.forEach((s) => dropFile(s.file)); }); db.classes = db.classes.filter((x) => x !== c); save(); } res.json({ ok: true });
});
const mine = (req, res) => { const c = db.classes.find((x) => x.id == req.params.id); if (!c || !manages(c, req.user)) { res.status(403).json({ error: 'Only the instructor or admin can do that' }); return null; } return c; };
app.post('/api/classes/:id/materials', auth(), safe((req, res) => {
  const c = mine(req, res); if (!c) return; const title = String(req.body.title || '').trim(); if (!title) throw new Error('Give the material a title'); const file = storeFile(req.body.file, req.user.id); if (!file) throw new Error('Choose a file to upload');
  c.materials.push({ id: db.seq++, title: title.slice(0, 150), description: String(req.body.description || '').slice(0, 500), file, by: req.user.id, at: Date.now() });
  c.studentIds.forEach((i) => notify(i, 'In-app', `New notes “${title}” in ${c.title}.`, null, 'Update', lk(c))); save(); res.json(classOut(c, req.user, true));
}));
app.delete('/api/classes/:id/materials/:mid', auth(), (req, res) => { const c = mine(req, res); if (!c) return; const m = c.materials.find((x) => x.id == req.params.mid); if (m) { dropFile(m.file); c.materials = c.materials.filter((x) => x !== m); save(); } res.json(classOut(c, req.user, true)); });
function asgBody(b) {
  const title = String(b.title || '').trim(); if (!title) throw new Error('Give the assignment a title'); if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(b.due || '')) throw new Error('Set the submission deadline');
  return { title: title.slice(0, 150), description: String(b.description || '').slice(0, 2000), due: b.due, maxMarks: Math.max(0, Math.min(1000, +b.maxMarks || 0)) };
}
app.post('/api/classes/:id/assignments', auth(), safe((req, res) => {
  const c = mine(req, res); if (!c) return; const a = { id: db.seq++, ...asgBody(req.body), file: storeFile(req.body.file, req.user.id), submissions: [], createdBy: req.user.id, createdAt: Date.now() }; c.assignments.push(a);
  c.studentIds.forEach((i) => notify(i, 'In-app', `New assignment “${a.title}” in ${c.title}. Due ${a.due.replace('T', ' ')}.`, null, 'Update', lk(c))); save(); res.json(classOut(c, req.user, true));
}));
app.put('/api/classes/:id/assignments/:aid', auth(), safe((req, res) => { const c = mine(req, res); if (!c) return; const a = c.assignments.find((x) => x.id == req.params.aid); if (!a) throw new Error('Assignment not found'); Object.assign(a, asgBody(req.body)); save(); res.json(classOut(c, req.user, true)); }));
app.delete('/api/classes/:id/assignments/:aid', auth(), (req, res) => { const c = mine(req, res); if (!c) return; const a = c.assignments.find((x) => x.id == req.params.aid); if (a) { dropFile(a.file); a.submissions.forEach((s) => dropFile(s.file)); c.assignments = c.assignments.filter((x) => x !== a); save(); } res.json(classOut(c, req.user, true)); });
app.post('/api/classes/:id/assignments/:aid/submit', auth('student'), safe((req, res) => {
  const c = db.classes.find((x) => x.id == req.params.id); if (!c || !c.studentIds.includes(req.user.id)) return res.status(403).json({ error: 'This class is not assigned to you' });
  const a = c.assignments.find((x) => x.id == req.params.aid); if (!a) return res.status(404).json({ error: 'Assignment not found' });
  const old = a.submissions.find((s) => s.studentId === req.user.id); if (old && old.reviewed) throw new Error('This submission has already been reviewed, so it can no longer be changed');
  const text = String(req.body.text || '').trim().slice(0, 5000), file = storeFile(req.body.file, req.user.id); if (!text && !file) throw new Error('Write your answer or attach a file');
  if (old) { if (file) dropFile(old.file); old.text = text; old.file = file || old.file; old.at = Date.now(); } else a.submissions.push({ studentId: req.user.id, text, file, at: Date.now() });
  notify(c.instructorId, 'In-app', `${req.user.name} submitted “${a.title}” (${c.title}).`, null, 'Update', lk(c)); save(); res.json(classOut(c, req.user, true));
}));
app.post('/api/classes/:id/assignments/:aid/review', auth(), safe((req, res) => {
  const c = mine(req, res); if (!c) return; const a = c.assignments.find((x) => x.id == req.params.aid), s = a && a.submissions.find((x) => x.studentId === +req.body.studentId); if (!s) throw new Error('Submission not found');
  const m = req.body.marks === '' || req.body.marks === undefined ? undefined : +req.body.marks; if (m !== undefined && (isNaN(m) || m < 0 || (a.maxMarks && m > a.maxMarks))) throw new Error('Marks must be between 0 and ' + (a.maxMarks || 'the maximum'));
  s.marks = m; s.feedback = String(req.body.feedback || '').slice(0, 1000); s.reviewed = true; notify(s.studentId, 'In-app', `Your assignment “${a.title}” was reviewed${m !== undefined ? ': ' + m + (a.maxMarks ? '/' + a.maxMarks : '') : ''}.`, null, 'Update', lk(c)); save(); res.json(classOut(c, req.user, true));
}));
app.get('/api/files/:fid', auth(), (req, res) => { // class files are only handed out to people allowed to see them
  for (const c of db.classes) {
    const hit = [...c.materials.map((m) => [m.file, 'open']), ...c.assignments.map((a) => [a.file, 'open']), ...c.assignments.flatMap((a) => a.submissions.map((s) => [s.file, s.studentId]))].find((x) => x[0] && x[0].id === req.params.fid);
    if (!hit) continue; const f = hit[0], ok = hit[1] === 'open' ? sees(c, req.user) : manages(c, req.user) || hit[1] === req.user.id;
    if (!ok) return res.status(403).json({ error: 'You do not have access to this file' }); return res.download(path.join(PRIV, f.id + '.' + f.ext), f.name);
  }
  res.status(404).json({ error: 'File not found' });
});

// ---- sample events and classes (created once, only if there are none) ----
(function demoAptitude() {
  if (db.events.length || db.classes.length) return;
  const day = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }, at = (n, t) => day(n) + 'T' + t, adm = db.users.find((u) => u.role === 'admin'); if (!adm) return;
  [['Orientation & Welcome Session', 3, '10:00', '12:00', 'Session', 'Maatram Office, Chennai', 'In person', 'Meet the team, your anchors and zone incharges. Bring your college ID.'],
    ['Aptitude Mock Test', 7, '10:00', '13:00', 'Competition', 'Online (link shared on the day)', 'Online', 'A timed practice test covering quantitative, logical and verbal sections.'],
    ['Zone Meet-up: Sathyabama', 10, '15:00', '17:00', 'Meeting', 'Sathyabama Institute of Science and Technology', 'In person', 'Monthly catch-up for students, anchors and the zone incharge.'],
    ['Resume & Interview Workshop with Alumni', 14, '14:00', '16:30', 'Workshop', 'Seminar Hall 1', 'Hybrid', 'Alumni from Zoho, TCS and Infosys share interview tips and review resumes.'],
    ['Maatram Annual Day', 30, '17:00', '20:00', 'Celebration', 'Chennai Trade Centre', 'In person', 'Celebrating the year with students, alumni and partners.'],
    ['Alumni Talk: Careers in Data', -5, '16:00', '17:00', 'Session', 'Online', 'Online', 'A recap session with Q&A (completed).']]
    .forEach(([title, n, time, endTime, category, venue, mode, description]) => db.events.push({ id: db.seq++, title, date: day(n), endDate: '', time, endTime, venue, mode, link: mode === 'In person' ? '' : 'https://meet.example.com/maatram', category, description, contact: 'support@maatram.org', createdBy: adm.id, createdAt: Date.now() }));
  const ins = (email) => (db.users.find((u) => u.email === email) || {}).id || adm.id, studs = db.users.filter((u) => u.role === 'student').map((u) => u.id).slice(0, 60);
  const note = (text) => { const id = crypto.randomBytes(12).toString('hex'); fs.writeFileSync(path.join(PRIV, id + '.txt'), text); return { id, ext: 'txt', name: 'notes.txt', size: Buffer.byteLength(text), by: adm.id, at: Date.now() }; };
  const mkClass = (title, n, time, endTime, mode, venue, link, description, email) => { const c = { id: db.seq++, title, date: day(n), time, endTime, mode, venue, link, description, instructorId: ins(email), studentIds: studs, materials: [], assignments: [], createdBy: adm.id, createdAt: Date.now() }; db.classes.push(c); return c; };
  const q = mkClass('Quantitative Aptitude — Percentages & Ratios', 2, '17:00', '18:30', 'Online', '', 'https://meet.example.com/maatram-quant', 'Shortcuts for percentage, profit and loss, and ratio problems asked in campus tests.', 'karan.mehta@maatram.org');
  const f = note('PERCENTAGES — QUICK NOTES\n1. x% of y = y% of x\n2. Increase by a% then decrease by a% = net decrease of a^2/100 %\n3. Successive change a% and b% = a + b + ab/100 %\n'); f.name = 'Percentages-quick-notes.txt'; q.materials.push({ id: db.seq++, title: 'Percentages — quick notes', description: 'Formulas and worked examples.', file: f, by: q.instructorId, at: Date.now() });
  q.assignments.push({ id: db.seq++, title: 'Percentages practice set (10 questions)', description: 'Solve all 10 questions. Show your working in the text box or attach a photo/PDF.', due: at(5, '23:59'), maxMarks: 20, file: null, submissions: [], createdBy: q.instructorId, createdAt: Date.now() });
  q.assignments.push({ id: db.seq++, title: 'Ratios worksheet', description: 'Complete the ratio and proportion worksheet discussed in class.', due: at(-1, '18:00'), maxMarks: 10, file: null, submissions: [], createdBy: q.instructorId, createdAt: Date.now() });
  mkClass('Logical Reasoning — Seating Arrangements', 4, '16:00', '17:30', 'In person', 'Seminar Hall 2, Maatram Office', '', 'Linear and circular seating puzzles with a step-by-step method.', 'shalini.s@maatram.org');
  mkClass('Verbal Ability — Reading Comprehension', -3, '16:00', '17:00', 'Online', '', 'https://meet.example.com/maatram-verbal', 'Strategies for passages, inference and vocabulary in context. (Completed.)', 'vikram.selvam@maatram.org');
  save();
})();

app.listen(process.env.PORT || 3000, () => console.log('Maatram Support running on http://localhost:3000'));
