const HEADERS = [
  "SNO.", "CREW ID", "CREW NAME", "CREW DESIGNATION", "FORTNIGHT Hrs",
  "AVAIL TIME", "SIGN ON", "TRAIN NO", "FROM STTN", "TO STTN", "SIGNON SINCE"
];
const STORAGE_KEY = "ngpGnqOnlineCrewRows";
let data = [];
let editing = false;
let beforeEdit = null;

const $ = id => document.getElementById(id);
const body = $("crewBody");

function showMessage(text, type = "ok") {
  const el = $("message");
  el.textContent = text;
  el.className = `message show ${type}`;
}
function hideMessage() { $("message").className = "message"; }

function parseTSV(text) {
  const lines = text.replace(/\r/g, "").split("\n").filter(line => line.trim() !== "");
  if (!lines.length) return { rows: [], error: "Paste some Excel data first." };
  let parsed = lines.map(line => line.split("\t").map(cell => cell.trim()));
  // Also accept a pasted CSV-style block when it has no tab characters.
  if (parsed.length && parsed[0].length === 1 && text.includes(",")) {
    parsed = lines.map(line => line.split(",").map(cell => cell.trim()));
  }
  const normalize = s => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const first = parsed[0].map(normalize);
  const headerLooksPresent = first.some((v, i) => v === normalize(HEADERS[i]));
  if (headerLooksPresent) parsed.shift();
  const valid = [];
  parsed.forEach((row, index) => {
    if (row.every(cell => cell === "")) return;
    if (row.length > HEADERS.length) row = row.slice(0, HEADERS.length);
    while (row.length < HEADERS.length) row.push("");
    valid.push(row);
  });
  if (!valid.length) return { rows: [], error: "No crew data rows were found. Check the pasted range." };
  return { rows: valid };
}

function renumber() {
  data.forEach((row, i) => row[0] = String(i + 1));
}
function render() {
  body.innerHTML = "";
  $("emptyState").hidden = data.length > 0;
  $("rowCount").textContent = `${data.length} crew ${data.length === 1 ? "record" : "records"}`;
  data.forEach((row, ri) => {
    const tr = document.createElement("tr");
    HEADERS.forEach((header, ci) => {
      const td = document.createElement("td");
      td.textContent = row[ci] ?? "";
      if (editing) {
        td.contentEditable = "true";
        td.spellcheck = false;
        td.dataset.row = ri;
        td.dataset.col = ci;
      }
      tr.appendChild(td);
    });
    const action = document.createElement("td");
    action.className = "delete-cell";
    if (editing) {
      const del = document.createElement("button");
      del.className = "delete-row";
      del.textContent = "Remove";
      del.type = "button";
      del.addEventListener("click", () => {
        readEdits();
        data.splice(ri, 1);
        renumber();
        render();
      });
      action.appendChild(del);
    } else {
      action.textContent = "—";
      action.style.textAlign = "center";
      action.style.color = "#a0aaa3";
    }
    tr.appendChild(action);
    body.appendChild(tr);
  });
  $("modeLabel").textContent = editing ? "EDIT MODE" : "VIEW MODE";
  $("editBtn").hidden = editing;
  $("saveBtn").hidden = !editing;
  $("cancelBtn").hidden = !editing;
  $("addRowBtn").disabled = !editing;
}

function readEdits() {
  body.querySelectorAll("td[contenteditable='true']").forEach(td => {
    const r = Number(td.dataset.row), c = Number(td.dataset.col);
    if (data[r]) data[r][c] = td.innerText.trim();
  });
}
function saveLocal() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function startEdit() {
  beforeEdit = structuredClone(data);
  editing = true;
  render();
}
function finishEdit(save) {
  if (save) {
    readEdits();
    renumber();
    saveLocal();
    showMessage("Table changes saved in this browser.");
  } else {
    data = beforeEdit || data;
    showMessage("Unsaved table changes were cancelled.");
  }
  beforeEdit = null;
  editing = false;
  render();
}
$("loadBtn").addEventListener("click", () => {
  hideMessage();
  const result = parseTSV($("pasteArea").value);
  if (result.error) return showMessage(result.error, "error");
  if (data.length && !confirm("Replace the current ON/LINE table with the pasted Excel data?")) return;
  data = result.rows;
  renumber();
  saveLocal();
  $("pasteArea").value = "";
  render();
  showMessage(`${data.length} crew rows loaded successfully.`);
});
$("clearPasteBtn").addEventListener("click", () => {
  $("pasteArea").value = "";
  hideMessage();
  $("pasteArea").focus();
});
$("editBtn").addEventListener("click", startEdit);
$("saveBtn").addEventListener("click", () => finishEdit(true));
$("cancelBtn").addEventListener("click", () => finishEdit(false));
$("addRowBtn").addEventListener("click", () => {
  if (!editing) return;
  readEdits();
  data.push(["", "", "", "", "", "", "", "", "", "", ""]);
  renumber();
  render();
});
$("csvBtn").addEventListener("click", () => {
  const rows = [HEADERS, ...data];
  const csv = rows.map(row => row.map(v => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "NGP_GNQ_ONLINE_Crew.csv"; a.click();
  URL.revokeObjectURL(url);
});
$("printBtn").addEventListener("click", () => window.print());
$("reportDate").value = new Date().toISOString().slice(0, 10);
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) data = JSON.parse(saved);
} catch (e) { data = []; }
renumber();
render();
