const columns = [
  "LOBBY","DESIG","SS","MOR","VAC","ON / LINE","REST","AVL FOR NEXT DAY","GOC",
  "TOTAL EFFECTIVE","SPL DUTY","INST BSL","L/R","MISC (TA/ENQ/SUS)","TRG BSL",
  "LEAVE","SPL CL","SICK","ABSENT","DTC AJNI","PME","S/N POST","NON RUN TOTAL","% OF NON-RUN"
];

const originalRows = [
  ["NGP + GNQ","LPM","182","129","53","","0","129","","129","","","","","","","","","","","","","0","0.00%"],
  ["NGP + GNQ","LPP","6","33","-27","","","33","","33","","","","","","","","","","","","","0","0.00%"],
  ["NGP + GNQ","LPG","575","324","251","","","324","","324","","","","","","","","","","","","","0","0.00%"],
  ["NGP + GNQ","LPS","87","83","4","","","83","","83","","","","","","","","","","","","","0","0.00%"],
  ["NGP + GNQ","ALP","775","543","232","","","543","","543","","","","","","","","","","","","","0","0.00%"],
  ["AMLA+JNO","LPM","18","9","9","","","9","","9","","","","","","","","","","","","","0","0.00%"],
  ["AMLA+JNO","LPP","15","22","-7","","","22","","22","","","","","","","","","","","","","0","0.00%"],
  ["AMLA+JNO","LPG","194","114","80","","","114","","114","","","","","","","","","","","","","0","0.00%"],
  ["AMLA+JNO","LPS","5","8","-3","","","8","","8","","","","","","","","","","","","","0","0.00%"],
  ["AMLA+JNO","ALP","218","147","71","","","147","","147","","","","","","","","","","","","","0","0.00%"],
  ["DHQ","LPG","12","11","1","","","11","","11","","","","","","","","","","","","","0","0.00%"],
  ["DHQ","ALP","12","11","1","","","11","","11","","","","","","","","","","","","","0","0.00%"],
  ["TEO","LPG","12","11","1","","","11","","11","","","","","","","","","","","","","0","0.00%"],
  ["TEO","ALP","12","12","0","","","12","","12","","","","","","","","","","","","","0","0.00%"],
  ["BPQ","LPM","4","3","1","","","3","","3","","","","","","","","","","","","","0","0.00%"],
  ["BPQ","LPP","4","3","1","","","3","","3","","","","","","","","","","","","","0","0.00%"],
  ["BPQ","LPG","308","207","101","","","207","","207","","","","","","","","","","","","","0","0.00%"],
  ["BPQ","LPS","16","22","-6","","","22","","22","","","","","","","","","","","","","0","0.00%"],
  ["BPQ","ALP","321","214","107","","","214","","214","","","","","","","","","","","","","0","0.00%"],
  ["GGS","LPS","7","11","-4","","","11","","11","","","","","","","","","","","","","0","0.00%"],
  ["TAE","LPG","42","35","7","","","35","","35","","","","","","","","","","","","","0","0.00%"],
  ["TAE","ALP","42","32","10","","","32","","32","","","","","","","","","","","","","0","0.00%"],
  ["MURI","LPG","43","35","8","","","35","","35","","","","","","","","","","","","","0","0.00%"],
  ["MURI","ALP","43","34","9","","","34","","34","","","","","","","","","","","","","0","0.00%"],
  ["MURI","LPS","3","3","0","","","3","","3","","","","","","","","","","","","","0","0.00%"],
  ["WR","LPP","9","7","2","","","7","","7","","","","","","","","","","","","","0","0.00%"],
  ["WR","LPG","44","20","24","","","20","","20","","","","","","","","","","","","","0","0.00%"],
  ["WR","ALP","48","26","22","","","26","","26","","","","","","","","","","","","","0","0.00%"],
  ["BTBR","LPG","18","13","5","","","13","","13","","","","","","","","","","","","","0","0.00%"],
  ["BTBR","ALP","18","11","7","","","11","","11","","","","","","","","","","","","","0","0.00%"],
  ["BTBR","LPS","4","1","3","","","1","","1","","","","","","","","","","","","","0","0.00%"],
  ["T/W","LP/TW","18","23","-5","","","21","","21","","","","","1","","","1","","","","","2","8.70%"]
];

const summaryRows = [
  ["TOTAL","","3115","2157","958","0","0","2155","0","2155","0","0","0","0","1","0","0","1","0","0","0","0","2","0.09%"],
  ["","LPM","204","141","63","0","0","141","0","141","0","0","0","0","0","0","0","0","0","0","0","0","0","0.00%"],
  ["","LPP","34","65","-31","0","0","65","0","65","0","0","0","0","0","0","0","0","0","0","0","0","0","0.00%"],
  ["","LPG","1248","770","478","0","0","770","0","770","0","0","0","0","0","0","0","0","0","0","0","0","0","0.00%"],
  ["","LPS","122","128","-6","0","0","128","0","128","0","0","0","0","0","0","0%","0","0","0","0","0","0","0.00%"],
  ["","ALP","1489","1030","459","0","0","1030","0","1030","0","0","0","0","0","0","0","0","0","0","0","0","0","0.00%"],
  ["","LP/TW","18","23","-5","","","21","","21","","","","","1","","","1","","","","","2","8.70%"],
  ["TOTAL","","3115","2157","958","0","0","2155","0","2155","0","0","0","0","1","0","0","1","0","0","0","0","2","0.09%"]
];

/* ---------------- ONLINE-LINK ---------------- */
const DESIG_COL       = 1;
const ONLINE_COL      = 5;
const CREW_DESIG_COL  = 3;
const CREW_DATA_KEY   = 'ngpCrewData';
const TARGET_DESIGS   = ['LPM','LPP','LPG','LPS','ALP'];
const DESIG_TITLES = {
  LPM: 'Loco Pilot Mail/Express',
  LPP: 'Loco Pilot Passenger',
  LPG: 'Loco Pilot Goods',
  LPS: 'Loco Pilot Shunter',
  ALP: 'Asst Loco Pilot'
};
const CREW_HEADERS = [
  'SNO.','CREW ID','CREW NAME','CREW DESIGNATION','FORTNIGHT Hrs',
  'AVAIL TIME','SIGN ON','TRAIN NO','FROM STTN','TO STTN','SIGNON SINCE'
];

let rows = structuredClone(originalRows);
let summaries = structuredClone(summaryRows);
let editing = false;
let snapshot = null;
const mainBody    = document.getElementById("mainBody");
const summaryBody = document.getElementById("summaryBody");
const modeStatus  = document.getElementById("modeStatus");

function addHeaders(target) {
  target.innerHTML = columns.map(c => `<th>${escapeHtml(c)}</th>`).join("");
}
function escapeHtml(v) {
  return String(v ?? "").replace(/[&<>"']/g, c =>
    ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

/* ---------- Crew data helpers ---------- */
function getCrewData() {
  try {
    const raw = localStorage.getItem(CREW_DATA_KEY);
    if (raw === null) return null;                 // never saved
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch (e) { return null; }
}

function categorizeCrewDesignation(designation) {
  if (designation == null) return null;
  const d = String(designation).toUpperCase().replace(/[.\s]+/g, ' ').trim();
  if (TARGET_DESIGS.includes(d)) return d;
  if (d.includes('LOCO PILOT')) {
    if (d.includes('MAIL')) return 'LPM';
    if (d.includes('PASSENGER') || d.includes('PASS')) return 'LPP';
    if (d.includes('GOODS') || d.includes('GDS')) return 'LPG';
    if (d.includes('SHUNTER')) return 'LPS';
  }
  if (d.includes('ASST LOCO PILOT') || d.includes('SR ASST LOCO PILOT')) return 'ALP';
  return null;
}

function computeOnlineCrew(crewArr) {
  const result = { LPM: [], LPP: [], LPG: [], LPS: [], ALP: [] };
  (crewArr || []).forEach(row => {
    const cat = categorizeCrewDesignation(row[CREW_DESIG_COL]);
    if (cat) result[cat].push(row);
  });
  return result;
}

function applyOnlineCounts() {
  const crew = getCrewData();
  if (crew === null) return;                        // nothing saved yet — keep original
  const online = computeOnlineCrew(crew);
  const applyTo = data => {
    data.forEach(row => {
      const desig = String(row[DESIG_COL] || '').toUpperCase().trim();
      if (online[desig]) row[ONLINE_COL] = String(online[desig].length);
    });
  };
  applyTo(rows);
  applyTo(summaries);
}

/* ---------- Popup ---------- */
let popupEl = null;
function ensurePopup() {
  if (popupEl) return popupEl;
  popupEl = document.createElement('div');
  popupEl.id = 'crewPopup';
  popupEl.className = 'crew-popup-overlay';
  popupEl.innerHTML = `
    <div class="crew-popup-box" role="dialog" aria-modal="true">
      <div class="crew-popup-head">
        <div>
          <h3 id="crewPopupTitle">Crew Details</h3>
          <p id="crewPopupSubtitle"></p>
        </div>
        <button type="button" class="crew-popup-close" id="crewPopupClose" aria-label="Close">&times;</button>
      </div>
      <div class="crew-popup-body" id="crewPopupBody"></div>
    </div>`;
  document.body.appendChild(popupEl);
  popupEl.addEventListener('click', e => { if (e.target === popupEl) hidePopup(); });
  document.getElementById('crewPopupClose').addEventListener('click', hidePopup);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hidePopup(); });
  return popupEl;
}
function hidePopup() { if (popupEl) popupEl.classList.remove('show'); }

function showCrewPopup(designation) {
  ensurePopup();
  const crew = computeOnlineCrew(getCrewData())[designation] || [];
  document.getElementById('crewPopupTitle').textContent =
    `${designation} — ${DESIG_TITLES[designation] || ''}`;
  document.getElementById('crewPopupSubtitle').textContent =
    `${crew.length} crew on line`;

  const body = document.getElementById('crewPopupBody');
  if (!crew.length) {
    body.innerHTML = '<p class="crew-popup-empty">No crew on line for this designation.</p>';
  } else {
    let html = '<div class="crew-popup-table-wrap"><table class="crew-popup-table"><thead><tr>';
    CREW_HEADERS.forEach(h => { html += `<th>${h}</th>`; });
    html += '</tr></thead><tbody>';
    crew.forEach(r => {
      html += '<tr>';
      for (let i = 0; i < CREW_HEADERS.length; i++) html += `<td>${escapeHtml(r[i] ?? '')}</td>`;
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    body.innerHTML = html;
  }
  popupEl.classList.add('show');
}

/* ---------- Render ---------- */
function renderTable(body, data, summary=false) {
  body.innerHTML = "";
  let previousLobby = null;
  data.forEach((row, ri) => {
    const tr = document.createElement("tr");
    if (row[0] === "TOTAL") tr.classList.add("total-row");
    if (summary && row[0] !== "TOTAL") tr.classList.add("summary-row");
    if (!summary && row[0] !== previousLobby) tr.classList.add("lobby-start");

    const desig = String(row[DESIG_COL] || '').toUpperCase().trim();
    const isTarget = TARGET_DESIGS.includes(desig);

    row.forEach((value, ci) => {
      const td = document.createElement("td");
      td.textContent = value;
      if (ci === 0 && value) td.classList.add("lobby-cell");
      if (ci === 1) td.classList.add("designation");
      if (ci === 4) td.classList.add("vacancy");
      if (ci === 23) td.classList.add("percent");

      const clickableOnline = isTarget && ci === ONLINE_COL;
      if (clickableOnline) {
        td.classList.add("online-count");
        td.title = "Click to view crew details";
        td.addEventListener("click", () => showCrewPopup(desig));
      }
      if (editing && !(row[0] === "TOTAL" && ci === 0) && !clickableOnline) {
        td.contentEditable = "true";
        td.spellcheck = false;
        td.dataset.row = ri;
        td.dataset.col = ci;
      }
      tr.appendChild(td);
    });
    body.appendChild(tr);
    if (!summary) previousLobby = row[0];
  });
}

function renderAll() {
  applyOnlineCounts();
  addHeaders(document.getElementById("mainHead"));
  addHeaders(document.getElementById("summaryHead"));
  renderTable(mainBody, rows);
  renderTable(summaryBody, summaries, true);

  const crew = getCrewData();
  const crewCount = crew ? crew.length : 0;
  const status = crew === null ? " · no crew data linked" :
                 ` · ${crewCount} crew linked from ON/LINE`;
  document.getElementById("recordCount").textContent =
    `${rows.length} lobby entries${status}`;
}

function setEditing(value) {
  editing = value;
  document.getElementById("editBtn").hidden     = value;
  document.getElementById("saveBtn").hidden     = !value;
  document.getElementById("cancelBtn").hidden   = !value;
  document.getElementById("resetBtn").disabled  = value;
  document.getElementById("csvBtn").disabled    = value;
  document.getElementById("reportDate").disabled = value;
  modeStatus.classList.toggle("editing", value);
  modeStatus.innerHTML = `<span class="status-dot"></span> ${
    value ? "Edit mode — changes not yet saved" : "View only"}`;
  renderAll();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function readEditedValues() {
  document.querySelectorAll("#mainBody td[contenteditable='true']").forEach(td => {
    rows[Number(td.dataset.row)][Number(td.dataset.col)] = td.innerText.trim();
  });
  document.querySelectorAll("#summaryBody td[contenteditable='true']").forEach(td => {
    summaries[Number(td.dataset.row)][Number(td.dataset.col)] = td.innerText.trim();
  });
}

document.getElementById("editBtn").addEventListener("click", () => {
  snapshot = { rows: structuredClone(rows), summaries: structuredClone(summaries) };
  setEditing(true);
});
document.getElementById("saveBtn").addEventListener("click", () => {
  readEditedValues();
  localStorage.setItem("ngpStaffPositionRows", JSON.stringify(rows));
  localStorage.setItem("ngpStaffPositionSummary", JSON.stringify(summaries));
  setEditing(false);
  snapshot = null;
  showToast("Changes saved in this browser.");
});
document.getElementById("cancelBtn").addEventListener("click", () => {
  if (snapshot) { rows = snapshot.rows; summaries = snapshot.summaries; }
  snapshot = null;
  setEditing(false);
  showToast("Unsaved changes discarded.");
});
document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Restore the original figures from the screenshots? This will replace saved browser changes.")) return;
  rows = structuredClone(originalRows);
  summaries = structuredClone(summaryRows);
  localStorage.removeItem("ngpStaffPositionRows");
  localStorage.removeItem("ngpStaffPositionSummary");
  renderAll();
  showToast("Original figures restored.");
});
document.getElementById("printBtn").addEventListener("click", () => window.print());
document.getElementById("csvBtn").addEventListener("click", () => {
  const all = [columns, ...rows, ...summaries];
  const csv = all.map(r => r.map(v =>
    `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const blob = new Blob(["\uFEFF" + csv], {type:"text/csv;charset=utf-8;"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "NGP_Division_Staff_Position.csv";
  link.click();
  URL.revokeObjectURL(link.href);
});

/* ---------- Auto-refresh when online page updates ---------- */
window.addEventListener('storage', e => {
  if (e.key === CREW_DATA_KEY || e.key === null) {
    renderAll();
    const c = getCrewData();
    if (c) showToast(`Crew counts refreshed — ${c.length} rows from ON/LINE`);
  }
});

/* ---------- Init ---------- */
function loadSaved() {
  try {
    const r = localStorage.getItem("ngpStaffPositionRows");
    const s = localStorage.getItem("ngpStaffPositionSummary");
    if (r) rows = JSON.parse(r);
    if (s) summaries = JSON.parse(s);
  } catch (e) {}
}
loadSaved();
renderAll();

const dateInput = document.getElementById("reportDate");
function updateDateLabel() {
  const d = dateInput.value ? new Date(dateInput.value + "T00:00:00") : null;
  document.getElementById("footerDate").textContent = d
    ? d.toLocaleDateString("en-IN", {day:"2-digit", month:"short", year:"numeric"})
    : "";
}
dateInput.addEventListener("change", updateDateLabel);
updateDateLabel();