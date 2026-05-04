import { useState, useRef } from "react";
import {
  Plus, Trash2, ChevronDown, ChevronUp, CheckCircle2,
  DollarSign, Calendar, Briefcase, Users, Tag, FileText,
  AlertCircle, GripVertical, Sparkles, ArrowRight,
  Clock, Target, Award, X, Check
} from "lucide-react";

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────
const C = {
  green:      "#14A800",
  greenDark:  "#0E7A00",
  greenLight: "#E8F5E9",
  greenMid:   "#D4EDDA",
  navy:       "#1d2b3a",
  navyLight:  "#243447",
  blue:       "#0a66c2",
  blueLight:  "#E8F2FF",
  teal:       "#0d9488",
  tealLight:  "#CCFBF1",
  amber:      "#d97706",
  amberLight: "#FFFBEB",
  red:        "#dc2626",
  redLight:   "#FEF2F2",
  purple:     "#7c3aed",
  purpleLight:"#F5F3FF",
  bg:         "#F2F3F4",
  white:      "#FFFFFF",
  border:     "#E0E0E0",
  borderDark: "#C5C5C5",
  textDark:   "#1E1E1E",
  textMid:    "#4B5563",
  textLight:  "#9CA3AF",
  textXLight: "#D1D5DB",
};

const MILESTONE_COLORS = [
  { bg:"#DBEAFE", border:"#93C5FD", text:"#1d4ed8", dot:"#3B82F6", label:"Phase 1" },
  { bg:"#F5F3FF", border:"#C4B5FD", text:"#5b21b6", dot:"#7c3aed", label:"Phase 2" },
  { bg:C.greenLight, border:"#86EFAC", text:C.greenDark, dot:C.green, label:"Phase 3" },
  { bg:"#FFF7ED", border:"#FED7AA", text:"#9a3412", dot:"#f97316", label:"Phase 4" },
  { bg:"#FDF4FF", border:"#E9D5FF", text:"#6b21a8", dot:"#a855f7", label:"Phase 5" },
  { bg:"#ECFEFF", border:"#99F6E4", text:"#0f766e", dot:C.teal, label:"Phase 6" },
];

const CATEGORIES = ["UX Design","Engineering","Product","Data / BI","Marketing","Consulting","Branding","Content","QA","Other"];
const RATE_TYPES = ["Fixed Price","Hourly Rate","Phase-Based","Retainer"];

// ─── HELPERS ───────────────────────────────────────────────────────────────
const fmt = (n) => {
  if (!n && n !== 0) return "";
  return "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits:0, maximumFractionDigits:0 });
};
const parseDollars = (s) => {
  const n = parseFloat(String(s).replace(/[$,]/g, ""));
  return isNaN(n) ? 0 : n;
};
const newMilestone = (index) => ({
  id: Date.now() + Math.random(),
  name: "",
  description: "",
  price: "",
  dueDate: "",
  deliverables: [""],
  expanded: true,
  color: MILESTONE_COLORS[index % MILESTONE_COLORS.length],
});

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────
const Label = ({ children, required }) => (
  <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.textMid,
    textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5 }}>
    {children}{required && <span style={{ color:C.red, marginLeft:2 }}>*</span>}
  </label>
);

const Input = ({ style, ...props }) => (
  <input style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8,
    padding:"9px 12px", fontSize:13, color:C.textDark, fontFamily:"inherit",
    background:C.white, outline:"none", boxSizing:"border-box", ...style }} {...props}/>
);

const Select = ({ children, style, ...props }) => (
  <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8,
    padding:"9px 12px", fontSize:13, color:C.textDark, fontFamily:"inherit",
    background:C.white, outline:"none", cursor:"pointer", ...style }} {...props}>
    {children}
  </select>
);

const Textarea = ({ style, ...props }) => (
  <textarea style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8,
    padding:"9px 12px", fontSize:13, color:C.textDark, fontFamily:"inherit",
    background:C.white, outline:"none", resize:"none", boxSizing:"border-box", ...style }} {...props}/>
);

// ─── MILESTONE CARD ────────────────────────────────────────────────────────
function MilestoneCard({ milestone, index, onUpdate, onDelete, totalBudget, milestonePrices }) {
  const col = milestone.color;
  const price = parseDollars(milestone.price);

  const updateDeliverable = (i, val) => {
    const d = [...milestone.deliverables];
    d[i] = val;
    onUpdate({ deliverables: d });
  };
  const addDeliverable = () => onUpdate({ deliverables: [...milestone.deliverables, ""] });
  const removeDeliverable = (i) => {
    const d = milestone.deliverables.filter((_, idx) => idx !== i);
    onUpdate({ deliverables: d.length ? d : [""] });
  };

  const pct = totalBudget > 0 ? Math.round((price / totalBudget) * 100) : 0;

  return (
    <div style={{ borderRadius:12, border:`1.5px solid ${col.border}`,
      background:C.white, overflow:"hidden", marginBottom:10,
      boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>

      {/* Card Header */}
      <div style={{ background:col.bg, padding:"12px 14px",
        display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:28, height:28, borderRadius:8, background:col.dot,
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"#fff", fontSize:12, fontWeight:800, flexShrink:0 }}>
          {index + 1}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          {milestone.expanded ? (
            <input value={milestone.name}
              onChange={e => onUpdate({ name: e.target.value })}
              placeholder={`Milestone ${index + 1} name — e.g. "MVP & Product Spec"`}
              style={{ background:"transparent", border:"none", outline:"none",
                fontWeight:700, fontSize:14, color:col.text, width:"100%",
                fontFamily:"inherit" }}/>
          ) : (
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontWeight:700, fontSize:13, color:col.text }}>
                {milestone.name || `Milestone ${index + 1}`}
              </span>
              {price > 0 && (
                <span style={{ fontSize:12, fontWeight:700, color:col.dot }}>
                  {fmt(price)}
                </span>
              )}
              {pct > 0 && (
                <span style={{ fontSize:10, color:col.text, background:col.bg,
                  border:`1px solid ${col.border}`, padding:"1px 6px", borderRadius:10 }}>
                  {pct}% of budget
                </span>
              )}
            </div>
          )}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <button onClick={() => onDelete()}
            style={{ background:"none", border:"none", cursor:"pointer",
              color:col.text, opacity:0.5, padding:4, display:"flex" }}>
            <Trash2 size={13}/>
          </button>
          <button onClick={() => onUpdate({ expanded: !milestone.expanded })}
            style={{ background:"none", border:"none", cursor:"pointer",
              color:col.text, padding:4, display:"flex" }}>
            {milestone.expanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          </button>
        </div>
      </div>

      {/* Card Body */}
      {milestone.expanded && (
        <div style={{ padding:"14px 16px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:12 }}>
            {/* Price */}
            <div>
              <Label required>Milestone Price</Label>
              <div style={{ position:"relative" }}>
                <DollarSign size={13} style={{ position:"absolute", left:10, top:"50%",
                  transform:"translateY(-50%)", color:C.textLight }}/>
                <Input value={milestone.price}
                  onChange={e => onUpdate({ price: e.target.value })}
                  placeholder="1,000"
                  style={{ paddingLeft:28,
                    borderColor: price > 0 ? col.border : C.border,
                    background: price > 0 ? col.bg : C.white }}/>
              </div>
              {totalBudget > 0 && price > 0 && (
                <p style={{ fontSize:10, color:col.dot, marginTop:3 }}>{pct}% of total budget</p>
              )}
            </div>
            {/* Due date */}
            <div>
              <Label>Due Date</Label>
              <div style={{ position:"relative" }}>
                <Calendar size={13} style={{ position:"absolute", left:10, top:"50%",
                  transform:"translateY(-50%)", color:C.textLight }}/>
                <Input type="date" value={milestone.dueDate}
                  onChange={e => onUpdate({ dueDate: e.target.value })}
                  style={{ paddingLeft:28 }}/>
              </div>
            </div>
            {/* Deliverable count summary */}
            <div style={{ display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
              <div style={{ background:col.bg, border:`1px solid ${col.border}`,
                borderRadius:8, padding:"8px 12px", textAlign:"center" }}>
                <p style={{ fontSize:20, fontWeight:800, color:col.dot, margin:0 }}>
                  {milestone.deliverables.filter(d=>d.trim()).length}
                </p>
                <p style={{ fontSize:10, color:col.text, margin:0 }}>deliverable items</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom:12 }}>
            <Label>Description</Label>
            <Textarea rows={2} value={milestone.description}
              onChange={e => onUpdate({ description: e.target.value })}
              placeholder="What will be delivered in this milestone?"/>
          </div>

          {/* Deliverables */}
          <div>
            <Label>Deliverable Line Items</Label>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {milestone.deliverables.map((d, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:20, height:20, borderRadius:6, background:col.bg,
                    border:`1px solid ${col.border}`, display:"flex", alignItems:"center",
                    justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:9, fontWeight:700, color:col.dot }}>{i+1}</span>
                  </div>
                  <Input value={d}
                    onChange={e => updateDeliverable(i, e.target.value)}
                    placeholder={`Deliverable ${i+1} — e.g. "Wireframe screens (12 screens)"`}
                    style={{ flex:1 }}/>
                  {milestone.deliverables.length > 1 && (
                    <button onClick={() => removeDeliverable(i)}
                      style={{ background:"none", border:"none", cursor:"pointer",
                        color:C.textLight, display:"flex", padding:4 }}>
                      <X size={13}/>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addDeliverable}
              style={{ marginTop:8, display:"flex", alignItems:"center", gap:5,
                background:"none", border:`1px dashed ${col.border}`, borderRadius:8,
                padding:"6px 12px", fontSize:12, color:col.text, cursor:"pointer",
                width:"100%", justifyContent:"center", fontFamily:"inherit" }}>
              <Plus size={12}/> Add Line Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SUMMARY PANEL ─────────────────────────────────────────────────────────
function SummaryPanel({ contract, milestones, onSubmit }) {
  const total = parseDollars(contract.totalBudget);
  const allocated = milestones.reduce((s, m) => s + parseDollars(m.price), 0);
  const remaining = total - allocated;
  const pct = total > 0 ? Math.min(100, Math.round((allocated / total) * 100)) : 0;
  const isValid = contract.name && contract.client && total > 0 && milestones.length > 0 &&
                  milestones.every(m => m.name && parseDollars(m.price) > 0) &&
                  Math.abs(remaining) < 1;

  const totalDeliverables = milestones.reduce((s, m) => s + m.deliverables.filter(d=>d.trim()).length, 0);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12, position:"sticky", top:20 }}>
      {/* Contract value card */}
      <div style={{ background:C.navy, borderRadius:12, padding:"18px 16px", color:"#fff" }}>
        <p style={{ fontSize:10, color:"rgba(255,255,255,0.5)", textTransform:"uppercase",
          letterSpacing:"0.1em", marginBottom:6 }}>Total Contract Value</p>
        <p style={{ fontSize:32, fontWeight:800, margin:0, color: total > 0 ? C.green : "rgba(255,255,255,0.3)" }}>
          {total > 0 ? fmt(total) : "$0"}
        </p>
        {contract.rateType && (
          <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:4 }}>{contract.rateType}</p>
        )}
        {contract.name && (
          <div style={{ marginTop:12, padding:"8px 10px", background:"rgba(255,255,255,0.08)",
            borderRadius:8, fontSize:12, color:"rgba(255,255,255,0.7)" }}>
            {contract.name}
            {contract.client && <span style={{ color:"rgba(255,255,255,0.4)" }}> — {contract.client}</span>}
          </div>
        )}
      </div>

      {/* Budget allocation */}
      <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, padding:"16px" }}>
        <p style={{ fontSize:11, fontWeight:700, color:C.textMid, textTransform:"uppercase",
          letterSpacing:"0.08em", marginBottom:12 }}>Budget Allocation</p>

        {/* Progress bar */}
        <div style={{ marginBottom:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <span style={{ fontSize:11, color:C.textLight }}>Allocated</span>
            <span style={{ fontSize:11, fontWeight:700,
              color: pct === 100 ? C.green : pct > 100 ? C.red : C.amber }}>
              {pct}%
            </span>
          </div>
          <div style={{ height:8, background:C.bg, borderRadius:20, overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:20, transition:"width 0.4s ease",
              width:`${Math.min(pct, 100)}%`,
              background: pct === 100 ? C.green : pct > 100 ? C.red : C.amber }}/>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
            <span style={{ fontSize:10, color:C.textLight }}>
              {fmt(allocated)} allocated
            </span>
            <span style={{ fontSize:10, color: remaining > 0 ? C.amber : remaining === 0 ? C.green : C.red, fontWeight:600 }}>
              {remaining === 0 ? "✓ Fully allocated" : remaining > 0 ? `${fmt(remaining)} remaining` : `${fmt(Math.abs(remaining))} over budget`}
            </span>
          </div>
        </div>

        {/* Milestone breakdown */}
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {milestones.map((m, i) => {
            const mp = parseDollars(m.price);
            const col = m.color;
            return (
              <div key={m.id} style={{ display:"flex", alignItems:"center", gap:8,
                padding:"8px 10px", background:col.bg, borderRadius:8,
                border:`1px solid ${col.border}` }}>
                <div style={{ width:18, height:18, borderRadius:5, background:col.dot,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#fff", fontSize:9, fontWeight:800, flexShrink:0 }}>
                  {i+1}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:11, fontWeight:700, color:col.text, margin:0,
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {m.name || `Milestone ${i+1}`}
                  </p>
                  <p style={{ fontSize:10, color:col.text, opacity:0.7, margin:0 }}>
                    {m.deliverables.filter(d=>d.trim()).length} items
                    {m.dueDate ? ` · Due ${new Date(m.dueDate).toLocaleDateString("en-US",{month:"short",day:"numeric"})}` : ""}
                  </p>
                </div>
                <span style={{ fontSize:13, fontWeight:800, color:col.dot, flexShrink:0 }}>
                  {mp > 0 ? fmt(mp) : "—"}
                </span>
              </div>
            );
          })}
          {milestones.length === 0 && (
            <p style={{ fontSize:12, color:C.textLight, textAlign:"center", padding:"12px 0" }}>
              No milestones added yet
            </p>
          )}
        </div>

        {/* Totals */}
        {milestones.length > 0 && (
          <div style={{ marginTop:12, padding:"10px 10px", borderTop:`1px solid ${C.border}` }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:12, fontWeight:700, color:C.textDark }}>Total Milestones</span>
              <span style={{ fontSize:14, fontWeight:800, color:C.textDark }}>{fmt(allocated)}</span>
            </div>
            {total > 0 && (
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                <span style={{ fontSize:12, color:C.textLight }}>Contract Value</span>
                <span style={{ fontSize:13, fontWeight:700,
                  color: pct===100 ? C.green : pct>100 ? C.red : C.amber }}>
                  {fmt(total)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
        {[
          { icon:<Target size={14} color={C.blue}/>, label:"Milestones", value:milestones.length, bg:C.blueLight },
          { icon:<FileText size={14} color={C.teal}/>, label:"Line Items", value:totalDeliverables, bg:C.tealLight },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, borderRadius:10, padding:"10px 12px",
            display:"flex", alignItems:"center", gap:8 }}>
            {s.icon}
            <div>
              <p style={{ fontSize:16, fontWeight:800, color:C.textDark, margin:0 }}>{s.value}</p>
              <p style={{ fontSize:10, color:C.textLight, margin:0 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Validation messages */}
      {!isValid && (
        <div style={{ background:C.amberLight, border:`1px solid #FCD34D`, borderRadius:10,
          padding:"10px 12px" }}>
          <p style={{ fontSize:11, fontWeight:700, color:C.amber, marginBottom:4 }}>Required to create:</p>
          <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
            {!contract.name && <p style={{ fontSize:11, color:"#92400e", margin:0 }}>· Contract name</p>}
            {!contract.client && <p style={{ fontSize:11, color:"#92400e", margin:0 }}>· Client name</p>}
            {!total && <p style={{ fontSize:11, color:"#92400e", margin:0 }}>· Total budget</p>}
            {milestones.length === 0 && <p style={{ fontSize:11, color:"#92400e", margin:0 }}>· At least 1 milestone</p>}
            {milestones.some(m=>!m.name) && <p style={{ fontSize:11, color:"#92400e", margin:0 }}>· Name all milestones</p>}
            {milestones.some(m=>!parseDollars(m.price)) && <p style={{ fontSize:11, color:"#92400e", margin:0 }}>· Price all milestones</p>}
            {total > 0 && Math.abs(remaining) >= 1 && (
              <p style={{ fontSize:11, color:"#92400e", margin:0 }}>
                · {remaining > 0 ? `Allocate ${fmt(remaining)} more` : `Reduce milestones by ${fmt(Math.abs(remaining))}`}
              </p>
            )}
          </div>
        </div>
      )}

      {/* CTA */}
      <button onClick={() => isValid && onSubmit()}
        disabled={!isValid}
        style={{ width:"100%", padding:"13px", borderRadius:10, border:"none",
          background: isValid ? C.green : C.textXLight,
          color: isValid ? "#fff" : C.textLight,
          fontSize:14, fontWeight:800, cursor: isValid ? "pointer" : "not-allowed",
          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
          transition:"all 0.2s", fontFamily:"inherit" }}>
        <Sparkles size={15}/> Create Contract
      </button>
      {isValid && (
        <p style={{ fontSize:10, color:C.textLight, textAlign:"center", marginTop:-6 }}>
          Contract will be added to your IterateIQ dashboard
        </p>
      )}
    </div>
  );
}

// ─── SUCCESS STATE ─────────────────────────────────────────────────────────
function SuccessState({ contract, milestones, onReset }) {
  const total = parseDollars(contract.totalBudget);
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", padding:"60px 24px", textAlign:"center" }}>
      <div style={{ width:72, height:72, borderRadius:"50%", background:C.greenLight,
        display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
        <CheckCircle2 size={36} color={C.green}/>
      </div>
      <p style={{ fontSize:22, fontWeight:800, color:C.textDark, marginBottom:6 }}>
        Contract Created!
      </p>
      <p style={{ fontSize:14, color:C.textMid, marginBottom:24 }}>
        <strong>{contract.name}</strong> with <strong>{contract.client}</strong> has been created successfully.
      </p>

      {/* Contract summary card */}
      <div style={{ width:"100%", maxWidth:500, background:C.white, borderRadius:16,
        border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:24,
        boxShadow:"0 4px 20px rgba(0,0,0,0.06)" }}>
        <div style={{ background:C.navy, padding:"16px 20px" }}>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:11, margin:0 }}>CONTRACT VALUE</p>
          <p style={{ color:C.green, fontSize:28, fontWeight:800, margin:"4px 0 0" }}>{fmt(total)}</p>
          <p style={{ color:"rgba(255,255,255,0.6)", fontSize:12, margin:"4px 0 0" }}>
            {contract.name} · {contract.client}
          </p>
        </div>
        <div style={{ padding:"16px 20px" }}>
          <p style={{ fontSize:11, fontWeight:700, color:C.textLight, textTransform:"uppercase",
            letterSpacing:"0.08em", marginBottom:10 }}>Payment Milestones</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {milestones.map((m, i) => {
              const col = m.color;
              return (
                <div key={m.id} style={{ display:"flex", alignItems:"center", gap:10,
                  padding:"10px 12px", background:col.bg, borderRadius:8,
                  border:`1px solid ${col.border}` }}>
                  <div style={{ width:24, height:24, borderRadius:6, background:col.dot,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"#fff", fontSize:10, fontWeight:800, flexShrink:0 }}>
                    {i+1}
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:12, fontWeight:700, color:col.text, margin:0 }}>{m.name}</p>
                    <p style={{ fontSize:10, color:col.text, opacity:0.7, margin:0 }}>
                      {m.deliverables.filter(d=>d.trim()).join(" · ") || "No items"}
                    </p>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <p style={{ fontSize:14, fontWeight:800, color:col.dot, margin:0 }}>
                      {fmt(parseDollars(m.price))}
                    </p>
                    {m.dueDate && (
                      <p style={{ fontSize:10, color:col.text, opacity:0.6, margin:0 }}>
                        {new Date(m.dueDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display:"flex", gap:10 }}>
        <button onClick={onReset}
          style={{ padding:"10px 24px", borderRadius:8, border:`1px solid ${C.border}`,
            background:C.white, color:C.textMid, fontSize:13, fontWeight:600,
            cursor:"pointer", fontFamily:"inherit" }}>
          Create Another
        </button>
        <button style={{ padding:"10px 24px", borderRadius:8, border:"none",
          background:C.green, color:"#fff", fontSize:13, fontWeight:700,
          cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
          View in Dashboard <ArrowRight size={14}/>
        </button>
      </div>
    </div>
  );
}

// ─── MAIN WIDGET ───────────────────────────────────────────────────────────
export default function ContractWidget() {
  const [contract, setContract] = useState({
    name: "", client: "", category: "UX Design", description: "",
    rateType: "Phase-Based", totalBudget: "",
  });
  const [milestones, setMilestones] = useState([
    {
      ...newMilestone(0),
      name: "MVP & Product Spec",
      description: "Initial deliverables covering product requirements and MVP build.",
      price: "1000",
      deliverables: ["Product requirements document", "MVP wireframes", "Technical spec"],
    },
    {
      ...newMilestone(1),
      expanded: false,
      name: "Final Prototype",
      description: "High-fidelity prototype with all features implemented and tested.",
      price: "1000",
      deliverables: ["High-fidelity prototype", "QA sign-off", "Handoff assets"],
    },
  ]);
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill total to $2000 to match example
  const [initialized, setInitialized] = useState(false);
  if (!initialized) {
    setContract(c => ({ ...c, name: "", totalBudget: "2000" }));
    setInitialized(true);
  }

  const setC = (k) => (e) => setContract(c => ({ ...c, [k]: e.target.value }));

  const updateMilestone = (id, patch) =>
    setMilestones(ms => ms.map(m => m.id === id ? { ...m, ...patch } : m));
  const deleteMilestone = (id) =>
    setMilestones(ms => ms.filter(m => m.id !== id));
  const addMilestone = () =>
    setMilestones(ms => [...ms, newMilestone(ms.length)]);

  const total = parseDollars(contract.totalBudget);
  const allocated = milestones.reduce((s, m) => s + parseDollars(m.price), 0);

  if (submitted) {
    return (
      <div style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        background:C.bg, minHeight:"100vh" }}>
        {/* Header */}
        <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`,
          padding:"12px 24px", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:30, height:30, borderRadius:8, background:C.green,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#fff", fontSize:12, fontWeight:800 }}>IQ</span>
          </div>
          <span style={{ fontSize:14, fontWeight:800, color:C.textDark }}>IterateIQ</span>
          <span style={{ fontSize:12, color:C.textLight, marginLeft:4 }}>/ Contract Created</span>
        </div>
        <SuccessState contract={contract} milestones={milestones}
          onReset={() => { setSubmitted(false); setContract({ name:"", client:"", category:"UX Design", description:"", rateType:"Phase-Based", totalBudget:"" }); setMilestones([newMilestone(0)]); }}/>
      </div>
    );
  }

  return (
    <div style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      background:C.bg, minHeight:"100vh" }}>

      {/* ── Top Bar ──────────────────────────────────────────── */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"0 24px",
        display:"flex", alignItems:"center", height:52 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:30, height:30, borderRadius:8, background:C.green,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#fff", fontSize:12, fontWeight:800 }}>IQ</span>
          </div>
          <span style={{ fontSize:14, fontWeight:800, color:C.textDark }}>IterateIQ</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginLeft:16 }}>
          <span style={{ fontSize:12, color:C.textLight }}>My Contracts</span>
          <span style={{ color:C.textXLight }}>/</span>
          <span style={{ fontSize:12, color:C.textDark, fontWeight:600 }}>New Contract</span>
        </div>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
          {total > 0 && (
            <div style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px",
              background:C.navy, borderRadius:20 }}>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>Total:</span>
              <span style={{ fontSize:13, fontWeight:800, color:C.green }}>{fmt(total)}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Page Header ──────────────────────────────────────── */}
      <div style={{ background:`linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
        padding:"24px 24px 20px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:11, textTransform:"uppercase",
            letterSpacing:"0.1em", marginBottom:4 }}>Contract Builder</p>
          <p style={{ color:"#fff", fontSize:20, fontWeight:800, marginBottom:4 }}>
            Create New Contract
          </p>
          <p style={{ color:"rgba(255,255,255,0.45)", fontSize:12 }}>
            Define your contract scope, set a total budget, and break it into milestone payments.
          </p>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"20px 24px",
        display:"grid", gridTemplateColumns:"1fr 280px", gap:20, alignItems:"start" }}>

        {/* LEFT: Form */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

          {/* Contract Details Card */}
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`,
            overflow:"hidden" }}>
            <div style={{ padding:"14px 16px", borderBottom:`1px solid ${C.border}`,
              display:"flex", alignItems:"center", gap:8,
              background:"linear-gradient(to right, #f9fafb, #fff)" }}>
              <Briefcase size={15} color={C.green}/>
              <span style={{ fontSize:14, fontWeight:700, color:C.textDark }}>Contract Details</span>
            </div>
            <div style={{ padding:"16px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                <div>
                  <Label required>Contract / Project Name</Label>
                  <Input value={contract.name} onChange={setC("name")}
                    placeholder="e.g. Mobile App Redesign"/>
                </div>
                <div>
                  <Label required>Client / Company</Label>
                  <div style={{ position:"relative" }}>
                    <Users size={13} style={{ position:"absolute", left:10, top:"50%",
                      transform:"translateY(-50%)", color:C.textLight }}/>
                    <Input value={contract.client} onChange={setC("client")}
                      placeholder="e.g. Apex Digital" style={{ paddingLeft:28 }}/>
                  </div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:12 }}>
                <div>
                  <Label>Category</Label>
                  <Select value={contract.category} onChange={setC("category")}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </Select>
                </div>
                <div>
                  <Label>Contract Type</Label>
                  <Select value={contract.rateType} onChange={setC("rateType")}>
                    {RATE_TYPES.map(r => <option key={r}>{r}</option>)}
                  </Select>
                </div>
                <div>
                  <Label required>Total Budget</Label>
                  <div style={{ position:"relative" }}>
                    <DollarSign size={13} style={{ position:"absolute", left:10, top:"50%",
                      transform:"translateY(-50%)", color:C.textLight }}/>
                    <Input value={contract.totalBudget} onChange={setC("totalBudget")}
                      placeholder="2,000"
                      style={{ paddingLeft:28, fontSize:16, fontWeight:700,
                        borderColor: total > 0 ? C.green : C.border,
                        background: total > 0 ? C.greenLight : C.white }}/>
                  </div>
                </div>
              </div>
              <div>
                <Label>Project Description</Label>
                <Textarea rows={2} value={contract.description} onChange={setC("description")}
                  placeholder="Brief overview of the project scope and goals..."/>
              </div>
            </div>
          </div>

          {/* Budget bar */}
          {total > 0 && (
            <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`,
              padding:"12px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontSize:12, fontWeight:700, color:C.textDark }}>
                  Budget Allocation
                </span>
                <span style={{ fontSize:12, fontWeight:700,
                  color: allocated===total ? C.green : allocated > total ? C.red : C.amber }}>
                  {fmt(allocated)} / {fmt(total)}
                  {allocated === total && <span style={{ marginLeft:6 }}>✓</span>}
                </span>
              </div>
              <div style={{ position:"relative", height:14, background:C.bg, borderRadius:20, overflow:"hidden" }}>
                {milestones.map((m, i) => {
                  const mp = parseDollars(m.price);
                  const w = total > 0 ? (mp / total) * 100 : 0;
                  const offset = milestones.slice(0, i).reduce((s, prev) =>
                    s + (total > 0 ? (parseDollars(prev.price) / total) * 100 : 0), 0);
                  return (
                    <div key={m.id} title={`${m.name || `Milestone ${i+1}`}: ${fmt(mp)}`}
                      style={{ position:"absolute", left:`${offset}%`, top:0, bottom:0,
                        width:`${Math.min(w, 100-offset)}%`, background:m.color.dot,
                        borderRight:"2px solid #fff", transition:"all 0.3s" }}/>
                  );
                })}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:8 }}>
                {milestones.map((m, i) => (
                  <div key={m.id} style={{ display:"flex", alignItems:"center", gap:4 }}>
                    <span style={{ width:8, height:8, borderRadius:2, background:m.color.dot, flexShrink:0 }}/>
                    <span style={{ fontSize:10, color:C.textLight }}>
                      {m.name||`M${i+1}`}: {parseDollars(m.price)>0 ? fmt(parseDollars(m.price)) : "—"}
                    </span>
                  </div>
                ))}
                {allocated < total && (
                  <span style={{ fontSize:10, color:C.amber, fontWeight:600 }}>
                    + {fmt(total - allocated)} unallocated
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Milestones */}
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`,
            overflow:"hidden" }}>
            <div style={{ padding:"14px 16px", borderBottom:`1px solid ${C.border}`,
              display:"flex", alignItems:"center", justifyContent:"space-between",
              background:"linear-gradient(to right, #f9fafb, #fff)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <Target size={15} color={C.teal}/>
                <span style={{ fontSize:14, fontWeight:700, color:C.textDark }}>
                  Milestones & Deliverables
                </span>
                <span style={{ fontSize:11, color:C.textLight,
                  background:C.bg, padding:"2px 8px", borderRadius:10 }}>
                  {milestones.length}
                </span>
              </div>
              <button onClick={addMilestone}
                style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 12px",
                  borderRadius:8, background:C.tealLight, border:`1px solid #99F6E4`,
                  fontSize:12, fontWeight:700, color:C.teal, cursor:"pointer",
                  fontFamily:"inherit" }}>
                <Plus size={12}/> Add Milestone
              </button>
            </div>
            <div style={{ padding:"14px 16px" }}>
              {milestones.length === 0 ? (
                <div style={{ textAlign:"center", padding:"30px 20px", color:C.textLight }}>
                  <Target size={28} style={{ opacity:0.3, marginBottom:8 }}/>
                  <p style={{ fontWeight:600 }}>No milestones yet</p>
                  <p style={{ fontSize:12 }}>Add milestones to define payment checkpoints</p>
                  <button onClick={addMilestone}
                    style={{ marginTop:10, padding:"8px 18px", borderRadius:8,
                      background:C.green, color:"#fff", border:"none",
                      fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                    + Add First Milestone
                  </button>
                </div>
              ) : (
                milestones.map((m, i) => (
                  <MilestoneCard key={m.id} milestone={m} index={i}
                    totalBudget={total}
                    milestonePrices={milestones.map(x => parseDollars(x.price))}
                    onUpdate={patch => updateMilestone(m.id, patch)}
                    onDelete={() => deleteMilestone(m.id)}/>
                ))
              )}
              {milestones.length > 0 && (
                <button onClick={addMilestone}
                  style={{ width:"100%", padding:"10px", borderRadius:8,
                    border:`2px dashed ${C.border}`, background:"transparent",
                    fontSize:13, color:C.textLight, cursor:"pointer",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    gap:6, fontFamily:"inherit", marginTop:4 }}>
                  <Plus size={14}/> Add Another Milestone
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Summary */}
        <SummaryPanel contract={contract} milestones={milestones}
          onSubmit={() => setSubmitted(true)}/>
      </div>
    </div>
  );
}
