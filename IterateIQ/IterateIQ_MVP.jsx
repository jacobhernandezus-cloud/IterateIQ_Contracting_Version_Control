import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar,
} from "recharts";
import {
  LayoutDashboard, BarChart2, Bell, Search, ChevronRight, Plus, X,
  Clock, CheckCircle2, AlertCircle, Circle, Star, DollarSign, Calendar,
  Tag, ArrowLeft, SlidersHorizontal, TrendingUp, Users, Briefcase,
  MessageSquare, Settings, LogOut, Globe, Trash2, ChevronDown, ChevronUp,
  FileText, Target, Sparkles, ArrowRight, FilePlus,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════
const C = {
  green:       "#14A800",
  greenDark:   "#0E7A00",
  greenLight:  "#E8F5E9",
  greenMid:    "#D4EDDA",
  teal:        "#0d9488",
  tealLight:   "#CCFBF1",
  navy:        "#1d2b3a",
  navyLight:   "#243447",
  blue:        "#0a66c2",
  blueLight:   "#E8F2FF",
  amber:       "#d97706",
  amberLight:  "#FFFBEB",
  red:         "#dc2626",
  redLight:    "#FEF2F2",
  purple:      "#7c3aed",
  purpleLight: "#F5F3FF",
  bg:          "#F2F3F4",
  white:       "#FFFFFF",
  border:      "#E0E0E0",
  borderDark:  "#C5C5C5",
  textDark:    "#1E1E1E",
  textMid:     "#4B5563",
  textLight:   "#9CA3AF",
  textXLight:  "#D1D5DB",
};

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════
const ITER_STATUS = {
  "in-progress": { label:"In Progress",  icon:Circle,           color:C.blue,   bg:C.blueLight,   text:"#1d4ed8" },
  "review":      { label:"Under Review", icon:MessageSquare,    color:C.purple, bg:C.purpleLight, text:"#5b21b6" },
  "testing":     { label:"QA / Testing", icon:SlidersHorizontal,color:C.amber,  bg:"#FFFBEB",     text:"#92400e" },
  "complete":    { label:"Delivered",    icon:CheckCircle2,     color:C.green,  bg:C.greenLight,  text:C.greenDark },
  "blocked":     { label:"Blocked",      icon:AlertCircle,      color:C.red,    bg:C.redLight,    text:"#991b1b" },
};
const PROJ_STATUS = {
  "active":   { label:"Active",   color:C.green,  bg:C.greenLight, text:C.greenDark },
  "paused":   { label:"On Hold",  color:C.amber,  bg:"#FFFBEB",    text:"#92400e" },
  "complete": { label:"Closed",   color:C.blue,   bg:C.blueLight,  text:"#1d4ed8" },
};
const PIE_COLORS = [C.green, C.blue, C.purple, C.amber, C.red];

const MILESTONE_COLORS = [
  { bg:"#DBEAFE", border:"#93C5FD", text:"#1d4ed8", dot:"#3B82F6" },
  { bg:"#F5F3FF", border:"#C4B5FD", text:"#5b21b6", dot:"#7c3aed" },
  { bg:C.greenLight, border:"#86EFAC", text:C.greenDark, dot:C.green },
  { bg:"#FFF7ED", border:"#FED7AA", text:"#9a3412", dot:"#f97316" },
  { bg:"#FDF4FF", border:"#E9D5FF", text:"#6b21a8", dot:"#a855f7" },
  { bg:"#ECFEFF", border:"#99F6E4", text:"#0f766e", dot:C.teal },
];
const PROJ_COLORS = ["#0a66c2","#7c3aed","#14A800","#d97706","#dc2626","#ec4899","#0d9488"];
const CATEGORIES  = ["UX Design","Engineering","Product","Data / BI","Marketing","Consulting","Branding","Content","QA","Other"];
const RATE_TYPES  = ["Fixed Price","Hourly Rate","Phase-Based","Retainer"];

// ═══════════════════════════════════════════════════════════════════════════
// SEED DATA
// ═══════════════════════════════════════════════════════════════════════════
const SEED_PROJECTS = [
  { id:1, name:"Mobile App Redesign",  client:"Apex Digital",  description:"Full UX overhaul of the iOS flagship app across all core user flows.",   status:"active",   budget:"$12,400", rate:"$155/hr", color:"#0a66c2", category:"UX Design",   tags:["mobile","ux","ios"],        rating:4.9, createdAt:"2026-01-15" },
  { id:2, name:"API v2 Migration",     client:"Novex Systems", description:"Migrate 47 legacy endpoints to RESTful v2 schema with OAuth 2.0 auth.",  status:"active",   budget:"$8,200",  rate:"$120/hr", color:"#7c3aed", category:"Engineering", tags:["backend","api","auth"],     rating:4.7, createdAt:"2026-02-01" },
  { id:3, name:"Analytics Dashboard", client:"H9 Partners",   description:"Internal reporting dashboard for product metrics and KPI tracking.",      status:"complete", budget:"$5,500",  rate:"$110/hr", color:"#14A800", category:"Data / BI",   tags:["data","internal","bi"],    rating:5.0, createdAt:"2025-11-10" },
  { id:4, name:"Onboarding Flow",      client:"GrowthLab Co.", description:"Redesign new-user onboarding for higher D7 activation and retention.",    status:"paused",   budget:"$6,800",  rate:"$140/hr", color:"#d97706", category:"UX Design",   tags:["ux","growth","retention"], rating:4.6, createdAt:"2026-01-28" },
];
const SEED_ITERATIONS = [
  { id:1,  projectId:1, version:"v0.1", title:"Initial Wireframes",       status:"complete",    date:"2026-01-20", hours:14, notes:"Created 12 low-fidelity wireframes for the main navigation flow.", changes:["12 wireframe screens","Established nav structure","Component inventory"] },
  { id:2,  projectId:1, version:"v0.2", title:"User Flow Mapping",         status:"complete",    date:"2026-01-27", hours:9,  notes:"Mapped all 6 critical user journeys. Identified 3 key drop-off points.", changes:["6 user flows documented","3 friction points","Solutions proposed"] },
  { id:3,  projectId:1, version:"v0.3", title:"High-Fidelity Mockups",     status:"complete",    date:"2026-02-08", hours:28, notes:"Full-color mockups complete for all 40 screens. Dark mode variants added.", changes:["40 HiFi screens","Design system tokens","Dark mode variants"] },
  { id:4,  projectId:1, version:"v1.0", title:"Developer Handoff",          status:"review",      date:"2026-02-20", hours:12, notes:"Packaging all assets and specs for engineering. Four edge cases still flagged.", changes:["All assets exported","Component specs written","4 open questions"] },
  { id:5,  projectId:1, version:"v1.1", title:"Engineering Feedback Pass",  status:"in-progress", date:"2026-03-05", hours:6,  notes:"Incorporating dev team feedback. Revising 3 complex interaction patterns.", changes:["3 animations simplified","Gesture nav revised"] },
  { id:6,  projectId:2, version:"v0.1", title:"Legacy API Audit",           status:"complete",    date:"2026-02-05", hours:10, notes:"Audited all existing endpoints. 47 total, 12 marked for deprecation.", changes:["47 endpoints documented","12 flagged for deprecation","Dependency map"] },
  { id:7,  projectId:2, version:"v0.2", title:"Schema Design",              status:"complete",    date:"2026-02-14", hours:16, notes:"New REST v2 schema finalized. All breaking changes documented.", changes:["v2 schema defined","Breaking changes documented","Migration guide"] },
  { id:8,  projectId:2, version:"v0.3", title:"Auth Refactor",              status:"in-progress", date:"2026-03-01", hours:20, notes:"Moving to OAuth 2.0 with JWT. Currently 60% complete.", changes:["OAuth flow implemented","JWT generation working","Refresh token: pending"] },
  { id:9,  projectId:3, version:"v1.0", title:"MVP Launch",                 status:"complete",    date:"2026-01-05", hours:18, notes:"Dashboard launched to internal team. Eight core reports live.", changes:["8 reports deployed","Auth configured","Data pipelines connected"] },
  { id:10, projectId:3, version:"v1.1", title:"Performance Optimization",   status:"complete",    date:"2026-01-20", hours:11, notes:"Reduced avg load time by 68% via query caching. Load: 4.2s → 1.3s.", changes:["Query cache added","Load: 4.2s → 1.3s","Lazy loading enabled"] },
  { id:11, projectId:4, version:"v0.1", title:"Discovery & Research",       status:"complete",    date:"2026-02-01", hours:8,  notes:"Conducted 8 user interviews. Users want visible progress indicators.", changes:["8 user interviews","Affinity map built","Key insights documented"] },
  { id:12, projectId:4, version:"v0.2", title:"Prototype A",                status:"blocked",     date:"2026-02-18", hours:5,  notes:"Prototype 60% complete — blocked waiting on 3rd-party auth decision.", changes:["Prototype 60% built","Blocked: auth provider TBD"] },
];

// ═══════════════════════════════════════════════════════════════════════════
// SHARED HELPERS
// ═══════════════════════════════════════════════════════════════════════════
const fmt         = n => !n && n!==0 ? "" : "$"+Number(n).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0});
const parseDollars= s => { const n=parseFloat(String(s).replace(/[$,]/g,"")); return isNaN(n)?0:n; };
const getIters    = (iters, pid) => iters.filter(i => i.projectId === pid);
const fmtDate     = d => new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
const daysAgo     = d => { const diff=Math.floor((Date.now()-new Date(d))/86400000); return diff===0?"Today":diff===1?"Yesterday":`${diff}d ago`; };
const totalHours  = iters => iters.reduce((s,i)=>s+(i.hours||0),0);
const newMilestone= i => ({ id:Date.now()+Math.random(), name:"", description:"", price:"", dueDate:"", deliverables:[""], expanded:true, color:MILESTONE_COLORS[i%MILESTONE_COLORS.length] });

function healthScore(iters) {
  if (!iters.length) return 0;
  const w={complete:1,review:0.7,testing:0.6,"in-progress":0.4,blocked:0};
  return Math.round(iters.reduce((s,i)=>s+(w[i.status]??0),0)/iters.length*100);
}
function healthColor(score) { return score>=70?C.green:score>=40?C.amber:C.red; }
function buildVelocity(iters) {
  const map={};
  iters.forEach(i=>{const k=i.date.slice(0,7);map[k]=(map[k]||0)+1;});
  return Object.entries(map).sort().map(([k,v])=>({month:k.slice(5),count:v}));
}
function buildStatusData(iters) {
  const map={};
  iters.forEach(i=>{map[i.status]=(map[i.status]||0)+1;});
  return Object.entries(map).map(([k,v])=>({name:ITER_STATUS[k]?.label||k,value:v}));
}

// ═══════════════════════════════════════════════════════════════════════════
// SHARED SMALL COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════
function Pill({ status, type="iter", size="sm" }) {
  const cfg = type==="iter" ? ITER_STATUS[status] : PROJ_STATUS[status];
  if (!cfg) return null;
  const Icon = type==="iter" ? cfg.icon : null;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 8px",
      borderRadius:20, fontSize:size==="xs"?"11px":"12px", fontWeight:600,
      background:cfg.bg, color:cfg.text, whiteSpace:"nowrap" }}>
      {Icon && <Icon size={10}/>}{cfg.label}
    </span>
  );
}
function Stars({ rating }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:2 }}>
      <Star size={12} fill={C.amber} color={C.amber}/>
      <span style={{ fontSize:12, fontWeight:600, color:C.textDark }}>{rating}</span>
    </span>
  );
}

// ─── Form primitives (used by contract builder) ───────────────────────────
const FLabel = ({ children, required }) => (
  <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.textMid,
    textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5 }}>
    {children}{required && <span style={{ color:C.red, marginLeft:2 }}>*</span>}
  </label>
);
const FInput = ({ style, ...props }) => (
  <input style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8,
    padding:"9px 12px", fontSize:13, color:C.textDark, fontFamily:"inherit",
    background:C.white, outline:"none", boxSizing:"border-box", ...style }} {...props}/>
);
const FSelect = ({ children, style, ...props }) => (
  <select style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8,
    padding:"9px 12px", fontSize:13, color:C.textDark, fontFamily:"inherit",
    background:C.white, outline:"none", cursor:"pointer", ...style }} {...props}>
    {children}
  </select>
);
const FTextarea = ({ style, ...props }) => (
  <textarea style={{ width:"100%", border:`1px solid ${C.border}`, borderRadius:8,
    padding:"9px 12px", fontSize:13, color:C.textDark, fontFamily:"inherit",
    background:C.white, outline:"none", resize:"none", boxSizing:"border-box", ...style }} {...props}/>
);

// ─── Generic modal wrapper (used by MVP modals) ───────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()}
      style={{ position:"fixed",inset:0,zIndex:100,display:"flex",alignItems:"center",
        justifyContent:"center",padding:16,background:"rgba(0,0,0,0.55)" }}>
      <div style={{ background:C.white,borderRadius:12,width:"100%",maxWidth:480,
        boxShadow:"0 24px 64px rgba(0,0,0,0.2)" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"16px 20px",borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontWeight:700,fontSize:15,color:C.textDark }}>{title}</span>
          <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",
            color:C.textLight,display:"flex" }}><X size={18}/></button>
        </div>
        <div style={{ padding:"20px" }}>{children}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTRACT BUILDER — MILESTONE CARD
// ═══════════════════════════════════════════════════════════════════════════
function MilestoneCard({ milestone, index, onUpdate, onDelete, totalBudget }) {
  const col   = milestone.color;
  const price = parseDollars(milestone.price);
  const pct   = totalBudget > 0 ? Math.round((price / totalBudget) * 100) : 0;

  const updDel = (i, val) => { const d=[...milestone.deliverables]; d[i]=val; onUpdate({deliverables:d}); };
  const addDel = ()        => onUpdate({deliverables:[...milestone.deliverables,""]});
  const remDel = i         => { const d=milestone.deliverables.filter((_,idx)=>idx!==i); onUpdate({deliverables:d.length?d:[""]}); };

  return (
    <div style={{ borderRadius:12, border:`1.5px solid ${col.border}`,
      background:C.white, overflow:"hidden", marginBottom:10,
      boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>

      {/* Header */}
      <div style={{ background:col.bg, padding:"12px 14px", display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:28,height:28,borderRadius:8,background:col.dot,
          display:"flex",alignItems:"center",justifyContent:"center",
          color:"#fff",fontSize:12,fontWeight:800,flexShrink:0 }}>{index+1}</div>
        <div style={{ flex:1, minWidth:0 }}>
          {milestone.expanded ? (
            <input value={milestone.name} onChange={e=>onUpdate({name:e.target.value})}
              placeholder={`Milestone ${index+1} — e.g. "MVP & Product Spec"`}
              style={{ background:"transparent",border:"none",outline:"none",
                fontWeight:700,fontSize:14,color:col.text,width:"100%",fontFamily:"inherit" }}/>
          ) : (
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontWeight:700, fontSize:13, color:col.text }}>
                {milestone.name || `Milestone ${index+1}`}
              </span>
              {price > 0 && <span style={{ fontSize:12, fontWeight:700, color:col.dot }}>{fmt(price)}</span>}
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
          <button onClick={onDelete} style={{ background:"none",border:"none",cursor:"pointer",
            color:col.text,opacity:0.5,padding:4,display:"flex" }}><Trash2 size={13}/></button>
          <button onClick={()=>onUpdate({expanded:!milestone.expanded})}
            style={{ background:"none",border:"none",cursor:"pointer",color:col.text,padding:4,display:"flex" }}>
            {milestone.expanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          </button>
        </div>
      </div>

      {/* Body */}
      {milestone.expanded && (
        <div style={{ padding:"14px 16px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:12 }}>
            <div>
              <FLabel required>Milestone Price</FLabel>
              <div style={{ position:"relative" }}>
                <DollarSign size={13} style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.textLight }}/>
                <FInput value={milestone.price} onChange={e=>onUpdate({price:e.target.value})}
                  placeholder="1,000"
                  style={{ paddingLeft:28, borderColor:price>0?col.border:C.border, background:price>0?col.bg:C.white }}/>
              </div>
              {totalBudget > 0 && price > 0 && (
                <p style={{ fontSize:10, color:col.dot, marginTop:3 }}>{pct}% of total budget</p>
              )}
            </div>
            <div>
              <FLabel>Due Date</FLabel>
              <div style={{ position:"relative" }}>
                <Calendar size={13} style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.textLight }}/>
                <FInput type="date" value={milestone.dueDate} onChange={e=>onUpdate({dueDate:e.target.value})} style={{ paddingLeft:28 }}/>
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
              <div style={{ background:col.bg, border:`1px solid ${col.border}`,
                borderRadius:8, padding:"8px 12px", textAlign:"center" }}>
                <p style={{ fontSize:20, fontWeight:800, color:col.dot, margin:0 }}>
                  {milestone.deliverables.filter(d=>d.trim()).length}
                </p>
                <p style={{ fontSize:10, color:col.text, margin:0 }}>line items</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom:12 }}>
            <FLabel>Description</FLabel>
            <FTextarea rows={2} value={milestone.description}
              onChange={e=>onUpdate({description:e.target.value})}
              placeholder="What will be delivered in this milestone?"/>
          </div>

          <div>
            <FLabel>Deliverable Line Items</FLabel>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {milestone.deliverables.map((d,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:20,height:20,borderRadius:6,background:col.bg,
                    border:`1px solid ${col.border}`,display:"flex",alignItems:"center",
                    justifyContent:"center",flexShrink:0 }}>
                    <span style={{ fontSize:9, fontWeight:700, color:col.dot }}>{i+1}</span>
                  </div>
                  <FInput value={d} onChange={e=>updDel(i,e.target.value)}
                    placeholder={`Item ${i+1} — e.g. "Wireframe screens (12 screens)"`} style={{ flex:1 }}/>
                  {milestone.deliverables.length > 1 && (
                    <button onClick={()=>remDel(i)}
                      style={{ background:"none",border:"none",cursor:"pointer",color:C.textLight,display:"flex",padding:4 }}>
                      <X size={13}/>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addDel}
              style={{ marginTop:8,display:"flex",alignItems:"center",gap:5,background:"none",
                border:`1px dashed ${col.border}`,borderRadius:8,padding:"6px 12px",
                fontSize:12,color:col.text,cursor:"pointer",width:"100%",justifyContent:"center",fontFamily:"inherit" }}>
              <Plus size={12}/> Add Line Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTRACT BUILDER — SUMMARY SIDEBAR
// ═══════════════════════════════════════════════════════════════════════════
function ContractSummary({ contract, milestones, onSubmit }) {
  const total     = parseDollars(contract.totalBudget);
  const allocated = milestones.reduce((s,m)=>s+parseDollars(m.price),0);
  const remaining = total - allocated;
  const pct       = total > 0 ? Math.min(100, Math.round((allocated/total)*100)) : 0;
  const totalDels = milestones.reduce((s,m)=>s+m.deliverables.filter(d=>d.trim()).length,0);
  const isValid   = contract.name && contract.client && total > 0 && milestones.length > 0
                    && milestones.every(m=>m.name && parseDollars(m.price)>0)
                    && Math.abs(remaining) < 1;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12, position:"sticky", top:20 }}>
      {/* Value card */}
      <div style={{ background:C.navy, borderRadius:12, padding:"18px 16px" }}>
        <p style={{ fontSize:10, color:"rgba(255,255,255,0.5)", textTransform:"uppercase",
          letterSpacing:"0.1em", marginBottom:6 }}>Total Contract Value</p>
        <p style={{ fontSize:32, fontWeight:800, margin:0, color:total>0?C.green:"rgba(255,255,255,0.3)" }}>
          {total>0?fmt(total):"$0"}
        </p>
        {contract.rateType && <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:4 }}>{contract.rateType}</p>}
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
        <div style={{ marginBottom:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <span style={{ fontSize:11, color:C.textLight }}>Allocated</span>
            <span style={{ fontSize:11, fontWeight:700,
              color:pct===100?C.green:pct>100?C.red:C.amber }}>{pct}%</span>
          </div>
          <div style={{ height:8, background:C.bg, borderRadius:20, overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:20, transition:"width 0.4s ease",
              width:`${Math.min(pct,100)}%`,
              background:pct===100?C.green:pct>100?C.red:C.amber }}/>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
            <span style={{ fontSize:10, color:C.textLight }}>{fmt(allocated)} allocated</span>
            <span style={{ fontSize:10, fontWeight:600,
              color:remaining>0?C.amber:remaining===0?C.green:C.red }}>
              {remaining===0 ? "✓ Fully allocated" : remaining>0 ? `${fmt(remaining)} remaining` : `${fmt(Math.abs(remaining))} over`}
            </span>
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {milestones.map((m,i) => {
            const mp=parseDollars(m.price); const col=m.color;
            return (
              <div key={m.id} style={{ display:"flex", alignItems:"center", gap:8,
                padding:"8px 10px", background:col.bg, borderRadius:8, border:`1px solid ${col.border}` }}>
                <div style={{ width:18,height:18,borderRadius:5,background:col.dot,display:"flex",
                  alignItems:"center",justifyContent:"center",color:"#fff",fontSize:9,fontWeight:800,flexShrink:0 }}>
                  {i+1}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:11, fontWeight:700, color:col.text, margin:0,
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {m.name||`Milestone ${i+1}`}
                  </p>
                  <p style={{ fontSize:10, color:col.text, opacity:0.7, margin:0 }}>
                    {m.deliverables.filter(d=>d.trim()).length} items
                    {m.dueDate?` · Due ${new Date(m.dueDate).toLocaleDateString("en-US",{month:"short",day:"numeric"})}`:""}
                  </p>
                </div>
                <span style={{ fontSize:13, fontWeight:800, color:col.dot, flexShrink:0 }}>
                  {mp>0?fmt(mp):"—"}
                </span>
              </div>
            );
          })}
          {milestones.length===0 && (
            <p style={{ fontSize:12, color:C.textLight, textAlign:"center", padding:"12px 0" }}>
              No milestones added yet
            </p>
          )}
        </div>

        {milestones.length > 0 && (
          <div style={{ marginTop:12, paddingTop:10, borderTop:`1px solid ${C.border}` }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:12, fontWeight:700, color:C.textDark }}>Total Milestones</span>
              <span style={{ fontSize:14, fontWeight:800, color:C.textDark }}>{fmt(allocated)}</span>
            </div>
            {total > 0 && (
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                <span style={{ fontSize:12, color:C.textLight }}>Contract Value</span>
                <span style={{ fontSize:13, fontWeight:700,
                  color:pct===100?C.green:pct>100?C.red:C.amber }}>{fmt(total)}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
        {[
          { icon:<Target size={14} color={C.blue}/>, label:"Milestones", value:milestones.length, bg:C.blueLight },
          { icon:<FileText size={14} color={C.teal}/>, label:"Line Items", value:totalDels, bg:C.tealLight },
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

      {/* Validation */}
      {!isValid && (
        <div style={{ background:C.amberLight, border:`1px solid #FCD34D`, borderRadius:10, padding:"10px 12px" }}>
          <p style={{ fontSize:11, fontWeight:700, color:C.amber, marginBottom:4 }}>To create this contract:</p>
          <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
            {!contract.name  && <p style={{ fontSize:11, color:"#92400e", margin:0 }}>· Contract name</p>}
            {!contract.client && <p style={{ fontSize:11, color:"#92400e", margin:0 }}>· Client name</p>}
            {!total && <p style={{ fontSize:11, color:"#92400e", margin:0 }}>· Total budget</p>}
            {milestones.length===0 && <p style={{ fontSize:11, color:"#92400e", margin:0 }}>· At least 1 milestone</p>}
            {milestones.some(m=>!m.name) && <p style={{ fontSize:11, color:"#92400e", margin:0 }}>· Name all milestones</p>}
            {milestones.some(m=>!parseDollars(m.price)) && <p style={{ fontSize:11, color:"#92400e", margin:0 }}>· Price all milestones</p>}
            {total>0 && Math.abs(remaining)>=1 && (
              <p style={{ fontSize:11, color:"#92400e", margin:0 }}>
                · {remaining>0?`Allocate ${fmt(remaining)} more`:`Reduce milestones by ${fmt(Math.abs(remaining))}`}
              </p>
            )}
          </div>
        </div>
      )}

      <button onClick={()=>isValid&&onSubmit()} disabled={!isValid}
        style={{ width:"100%", padding:"13px", borderRadius:10, border:"none",
          background:isValid?C.green:C.textXLight, color:isValid?"#fff":C.textLight,
          fontSize:14, fontWeight:800, cursor:isValid?"pointer":"not-allowed",
          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
          transition:"all 0.2s", fontFamily:"inherit" }}>
        <Sparkles size={15}/> Create Contract
      </button>
      {isValid && (
        <p style={{ fontSize:10, color:C.textLight, textAlign:"center", marginTop:-4 }}>
          Contract and milestones will appear in your dashboard
        </p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTRACT BUILDER — MAIN VIEW (embedded in MVP)
// ═══════════════════════════════════════════════════════════════════════════
function ContractBuilderView({ onContractCreated, onBack }) {
  const [contract, setContract] = useState({
    name:"", client:"", category:"UX Design", description:"",
    rateType:"Phase-Based", totalBudget:"2000",
  });
  const [milestones, setMilestones] = useState([
    { ...newMilestone(0), name:"MVP & Product Spec",
      description:"Initial deliverables covering product requirements and MVP build.",
      price:"1000", deliverables:["Product requirements document","MVP wireframes","Technical spec"] },
    { ...newMilestone(1), expanded:false, name:"Final Prototype",
      description:"High-fidelity prototype with all features implemented and tested.",
      price:"1000", deliverables:["High-fidelity prototype","QA sign-off","Handoff assets"] },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const setC = k => e => setContract(p=>({...p,[k]:e.target.value}));
  const updateM  = (id, patch) => setMilestones(ms=>ms.map(m=>m.id===id?{...m,...patch}:m));
  const deleteM  = id => setMilestones(ms=>ms.filter(m=>m.id!==id));
  const addM     = () => setMilestones(ms=>[...ms, newMilestone(ms.length)]);

  const total     = parseDollars(contract.totalBudget);
  const allocated = milestones.reduce((s,m)=>s+parseDollars(m.price),0);

  const handleSubmit = () => {
    setSubmitted(true);
    onContractCreated(contract, milestones);
  };

  // ── Success state (shown briefly inside the view) ───────────────────────
  if (submitted) {
    return (
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", padding:"60px 24px", textAlign:"center" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:C.greenLight,
          display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
          <CheckCircle2 size={36} color={C.green}/>
        </div>
        <p style={{ fontSize:22, fontWeight:800, color:C.textDark, marginBottom:6 }}>Contract Created!</p>
        <p style={{ fontSize:14, color:C.textMid, marginBottom:24 }}>
          <strong>{contract.name}</strong> has been added to your dashboard with{" "}
          <strong>{milestones.length} milestones</strong>.
        </p>
        <div style={{ width:"100%", maxWidth:480, background:C.white, borderRadius:16,
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
            {milestones.map((m,i) => {
              const col=m.color;
              return (
                <div key={m.id} style={{ display:"flex", alignItems:"center", gap:10,
                  padding:"10px 12px", background:col.bg, borderRadius:8,
                  border:`1px solid ${col.border}`, marginBottom:6 }}>
                  <div style={{ width:24, height:24, borderRadius:6, background:col.dot,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"#fff", fontSize:10, fontWeight:800, flexShrink:0 }}>{i+1}</div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:12, fontWeight:700, color:col.text, margin:0 }}>{m.name}</p>
                    <p style={{ fontSize:10, color:col.text, opacity:0.7, margin:0 }}>
                      {m.deliverables.filter(d=>d.trim()).join(" · ") || "—"}
                    </p>
                  </div>
                  <p style={{ fontSize:14, fontWeight:800, color:col.dot, margin:0 }}>
                    {fmt(parseDollars(m.price))}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <button onClick={onBack}
          style={{ padding:"11px 28px", borderRadius:8, border:"none",
            background:C.green, color:"#fff", fontSize:13, fontWeight:700,
            cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:6 }}>
          View in Dashboard <ArrowRight size={14}/>
        </button>
      </div>
    );
  }

  // ── Builder form ────────────────────────────────────────────────────────
  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      {/* Page hero */}
      <div style={{ background:`linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
        padding:"20px 24px" }}>
        <p style={{ color:"rgba(255,255,255,0.5)", fontSize:10, textTransform:"uppercase",
          letterSpacing:"0.1em", marginBottom:3 }}>Contract Builder</p>
        <p style={{ color:"#fff", fontSize:18, fontWeight:800, marginBottom:3 }}>Create New Contract</p>
        <p style={{ color:"rgba(255,255,255,0.45)", fontSize:12, margin:0 }}>
          Set a total budget, define milestone checkpoints, and add deliverable line items for each phase.
        </p>
      </div>

      {/* Body */}
      <div style={{ padding:"20px 24px", display:"grid",
        gridTemplateColumns:"1fr 280px", gap:20, alignItems:"start" }}>

        {/* LEFT */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

          {/* Contract Details */}
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden" }}>
            <div style={{ padding:"14px 16px", borderBottom:`1px solid ${C.border}`,
              display:"flex", alignItems:"center", gap:8,
              background:"linear-gradient(to right, #f9fafb, #fff)" }}>
              <Briefcase size={15} color={C.green}/>
              <span style={{ fontSize:14, fontWeight:700, color:C.textDark }}>Contract Details</span>
            </div>
            <div style={{ padding:"16px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                <div>
                  <FLabel required>Contract / Project Name</FLabel>
                  <FInput value={contract.name} onChange={setC("name")} placeholder="e.g. Mobile App Redesign"/>
                </div>
                <div>
                  <FLabel required>Client / Company</FLabel>
                  <div style={{ position:"relative" }}>
                    <Users size={13} style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.textLight }}/>
                    <FInput value={contract.client} onChange={setC("client")}
                      placeholder="e.g. Apex Digital" style={{ paddingLeft:28 }}/>
                  </div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:12 }}>
                <div>
                  <FLabel>Category</FLabel>
                  <FSelect value={contract.category} onChange={setC("category")}>
                    {CATEGORIES.map(c=><option key={c}>{c}</option>)}
                  </FSelect>
                </div>
                <div>
                  <FLabel>Contract Type</FLabel>
                  <FSelect value={contract.rateType} onChange={setC("rateType")}>
                    {RATE_TYPES.map(r=><option key={r}>{r}</option>)}
                  </FSelect>
                </div>
                <div>
                  <FLabel required>Total Budget</FLabel>
                  <div style={{ position:"relative" }}>
                    <DollarSign size={13} style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.textLight }}/>
                    <FInput value={contract.totalBudget} onChange={setC("totalBudget")}
                      placeholder="2,000"
                      style={{ paddingLeft:28, fontSize:16, fontWeight:700,
                        borderColor:total>0?C.green:C.border,
                        background:total>0?C.greenLight:C.white }}/>
                  </div>
                </div>
              </div>
              <div>
                <FLabel>Project Description</FLabel>
                <FTextarea rows={2} value={contract.description} onChange={setC("description")}
                  placeholder="Brief overview of the project scope and goals..."/>
              </div>
            </div>
          </div>

          {/* Budget bar */}
          {total > 0 && (
            <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, padding:"12px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontSize:12, fontWeight:700, color:C.textDark }}>Budget Allocation</span>
                <span style={{ fontSize:12, fontWeight:700,
                  color:allocated===total?C.green:allocated>total?C.red:C.amber }}>
                  {fmt(allocated)} / {fmt(total)}{allocated===total && " ✓"}
                </span>
              </div>
              <div style={{ position:"relative", height:14, background:C.bg, borderRadius:20, overflow:"hidden" }}>
                {milestones.map((m,i) => {
                  const mp=parseDollars(m.price);
                  const w=total>0?(mp/total)*100:0;
                  const offset=milestones.slice(0,i).reduce((s,prev)=>s+(total>0?(parseDollars(prev.price)/total)*100:0),0);
                  return (
                    <div key={m.id} title={`${m.name||`M${i+1}`}: ${fmt(mp)}`}
                      style={{ position:"absolute",left:`${offset}%`,top:0,bottom:0,
                        width:`${Math.min(w,100-offset)}%`,background:m.color.dot,
                        borderRight:"2px solid #fff",transition:"all 0.3s" }}/>
                  );
                })}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:8 }}>
                {milestones.map((m,i) => (
                  <div key={m.id} style={{ display:"flex", alignItems:"center", gap:4 }}>
                    <span style={{ width:8,height:8,borderRadius:2,background:m.color.dot,flexShrink:0 }}/>
                    <span style={{ fontSize:10, color:C.textLight }}>
                      {m.name||`M${i+1}`}: {parseDollars(m.price)>0?fmt(parseDollars(m.price)):"—"}
                    </span>
                  </div>
                ))}
                {allocated < total && (
                  <span style={{ fontSize:10, color:C.amber, fontWeight:600 }}>
                    + {fmt(total-allocated)} unallocated
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Milestones */}
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden" }}>
            <div style={{ padding:"14px 16px", borderBottom:`1px solid ${C.border}`,
              display:"flex", alignItems:"center", justifyContent:"space-between",
              background:"linear-gradient(to right, #f9fafb, #fff)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <Target size={15} color={C.teal}/>
                <span style={{ fontSize:14, fontWeight:700, color:C.textDark }}>Milestones & Deliverables</span>
                <span style={{ fontSize:11, color:C.textLight, background:C.bg,
                  padding:"2px 8px", borderRadius:10 }}>{milestones.length}</span>
              </div>
              <button onClick={addM}
                style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 12px",
                  borderRadius:8, background:C.tealLight, border:`1px solid #99F6E4`,
                  fontSize:12, fontWeight:700, color:C.teal, cursor:"pointer", fontFamily:"inherit" }}>
                <Plus size={12}/> Add Milestone
              </button>
            </div>
            <div style={{ padding:"14px 16px" }}>
              {milestones.length===0 ? (
                <div style={{ textAlign:"center", padding:"30px 20px", color:C.textLight }}>
                  <Target size={28} style={{ opacity:0.3, marginBottom:8 }}/>
                  <p style={{ fontWeight:600 }}>No milestones yet</p>
                  <p style={{ fontSize:12 }}>Add milestones to define payment checkpoints</p>
                  <button onClick={addM}
                    style={{ marginTop:10, padding:"8px 18px", borderRadius:8,
                      background:C.green, color:"#fff", border:"none",
                      fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                    + Add First Milestone
                  </button>
                </div>
              ) : (
                milestones.map((m,i) => (
                  <MilestoneCard key={m.id} milestone={m} index={i} totalBudget={total}
                    milestonePrices={milestones.map(x=>parseDollars(x.price))}
                    onUpdate={patch=>updateM(m.id,patch)} onDelete={()=>deleteM(m.id)}/>
                ))
              )}
              {milestones.length > 0 && (
                <button onClick={addM}
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

        {/* RIGHT */}
        <ContractSummary contract={contract} milestones={milestones} onSubmit={handleSubmit}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MVP — ADD ITERATION MODAL
// ═══════════════════════════════════════════════════════════════════════════
function AddIterationModal({ project, onAdd, onClose }) {
  const [f, setF] = useState({version:"",title:"",status:"in-progress",hours:"",notes:""});
  const s = k => e => setF(p=>({...p,[k]:e.target.value}));
  return (
    <Modal title={`New Deliverable — ${project.name}`} onClose={onClose}>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ display:"grid", gridTemplateColumns:"100px 1fr", gap:12 }}>
          <div>
            <FLabel>Version *</FLabel>
            <FInput value={f.version} onChange={s("version")} placeholder="v1.2"/>
          </div>
          <div>
            <FLabel>Deliverable Title *</FLabel>
            <FInput value={f.title} onChange={s("title")} placeholder="e.g. Navigation Refactor"/>
          </div>
        </div>
        <div>
          <FLabel>Status</FLabel>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:4 }}>
            {Object.entries(ITER_STATUS).map(([k,v]) => (
              <button key={k} onClick={()=>setF(p=>({...p,status:k}))}
                style={{ padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:600, cursor:"pointer",
                  background:f.status===k?v.bg:"transparent", color:f.status===k?v.text:C.textLight,
                  border:f.status===k?`1.5px solid ${v.color}`:`1px solid ${C.border}` }}>
                {v.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <FLabel>Hours Logged</FLabel>
          <FInput type="number" value={f.hours} onChange={s("hours")} placeholder="0" style={{ maxWidth:120 }}/>
        </div>
        <div>
          <FLabel>Notes</FLabel>
          <FTextarea rows={3} value={f.notes} onChange={s("notes")} placeholder="What was completed?"/>
        </div>
        <div style={{ display:"flex", justifyContent:"flex-end", gap:8, paddingTop:4 }}>
          <button onClick={onClose}
            style={{ padding:"9px 20px", borderRadius:8, border:`1px solid ${C.border}`,
              background:"none", color:C.textMid, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
            Cancel
          </button>
          <button onClick={()=>f.version&&f.title&&onAdd(f)} disabled={!f.version||!f.title}
            style={{ padding:"9px 20px", borderRadius:8, border:"none",
              background:f.version&&f.title?C.green:C.textXLight,
              color:f.version&&f.title?"#fff":C.textLight,
              fontSize:13, fontWeight:700, cursor:f.version&&f.title?"pointer":"not-allowed",
              fontFamily:"inherit" }}>
            Submit Deliverable
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MVP — DELIVERABLE DETAIL PANEL
// ═══════════════════════════════════════════════════════════════════════════
function DeliverablePanel({ iter, onClose }) {
  if (!iter) return null;
  return (
    <div style={{ position:"fixed",top:0,right:0,bottom:0,width:380,background:C.white,
      boxShadow:"-4px 0 24px rgba(0,0,0,0.12)",zIndex:50,display:"flex",flexDirection:"column",
      borderLeft:`1px solid ${C.border}` }}>
      <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`,
        display:"flex", alignItems:"start", justifyContent:"space-between" }}>
        <div>
          <span style={{ fontSize:11, fontFamily:"monospace", color:C.textLight,
            background:C.bg, padding:"2px 6px", borderRadius:4 }}>{iter.version}</span>
          <p style={{ fontWeight:700, fontSize:15, color:C.textDark, margin:"6px 0 0" }}>{iter.title}</p>
        </div>
        <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:C.textLight,marginTop:2 }}>
          <X size={18}/>
        </button>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16,
          padding:"10px 12px", background:C.bg, borderRadius:8 }}>
          <Pill status={iter.status} type="iter"/>
          <span style={{ fontSize:12, color:C.textLight, display:"flex", alignItems:"center", gap:4 }}>
            <Calendar size={11}/>{fmtDate(iter.date)}
          </span>
          {iter.hours > 0 && (
            <span style={{ fontSize:12, color:C.textLight, display:"flex", alignItems:"center", gap:4 }}>
              <Clock size={11}/>{iter.hours}h
            </span>
          )}
        </div>
        {iter.notes && (
          <div style={{ marginBottom:16 }}>
            <p style={{ fontSize:11, fontWeight:700, color:C.textLight, textTransform:"uppercase",
              letterSpacing:"0.08em", marginBottom:8 }}>Work Notes</p>
            <p style={{ fontSize:13, color:C.textMid, lineHeight:1.6 }}>{iter.notes}</p>
          </div>
        )}
        {iter.changes?.length > 0 && (
          <div>
            <p style={{ fontSize:11, fontWeight:700, color:C.textLight, textTransform:"uppercase",
              letterSpacing:"0.08em", marginBottom:8 }}>Changes</p>
            {iter.changes.map((c,i) => (
              <div key={i} style={{ display:"flex", alignItems:"start", gap:8,
                fontSize:13, color:C.textMid, marginBottom:6 }}>
                <CheckCircle2 size={14} color={C.green} style={{ marginTop:1, flexShrink:0 }}/>
                {c}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding:"12px 20px", borderTop:`1px solid ${C.border}` }}>
        <button onClick={onClose}
          style={{ width:"100%", padding:"9px", borderRadius:8, border:`1px solid ${C.border}`,
            background:"none", color:C.textMid, fontSize:13, fontWeight:600,
            cursor:"pointer", fontFamily:"inherit", textAlign:"center" }}>
          Close
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MVP — INSIGHTS PANEL
// ═══════════════════════════════════════════════════════════════════════════
function InsightsPanel({ iters }) {
  const velocity   = buildVelocity(iters);
  const statusData = buildStatusData(iters);
  const total      = iters.length;
  const completed  = iters.filter(i=>i.status==="complete").length;
  const blocked    = iters.filter(i=>i.status==="blocked").length;
  const score      = healthScore(iters);
  const hours      = totalHours(iters);

  const statCard = (icon, label, value, sub, warn) => (
    <div style={{ background:C.white, borderRadius:10, border:`1px solid ${C.border}`,
      padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
      <div style={{ width:40, height:40, borderRadius:10,
        background:warn?C.redLight:C.greenLight,
        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize:18, fontWeight:800, color:warn?C.red:C.textDark }}>{value}</p>
        <p style={{ fontSize:11, color:C.textLight }}>{label}</p>
        {sub && <p style={{ fontSize:10, color:warn?C.red:C.teal, marginTop:1 }}>{sub}</p>}
      </div>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
        {statCard(<Briefcase size={18} color={C.green}/>,   "Total Deliverables", total,  "across all versions")}
        {statCard(<TrendingUp size={18} color={C.teal}/>,   "Completion Rate",    `${total?Math.round(completed/total*100):0}%`, `${completed} of ${total} delivered`)}
        {statCard(<Clock size={18} color={C.blue}/>,        "Hours Logged",       `${hours}h`, "total billable time")}
        {statCard(<AlertCircle size={18} color={blocked>0?C.red:C.green}/>, "Blocked", blocked, blocked>0?"requires attention":"all clear", blocked>0)}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:12 }}>
        <div style={{ background:C.white, borderRadius:10, border:`1px solid ${C.border}`, padding:"16px" }}>
          <p style={{ fontSize:13, fontWeight:700, color:C.textDark, marginBottom:12 }}>Delivery Velocity</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={velocity} margin={{ top:4, right:8, bottom:0, left:-20 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.green} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={C.green} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
              <XAxis dataKey="month" tick={{ fontSize:10, fill:C.textLight }}/>
              <YAxis tick={{ fontSize:10, fill:C.textLight }} allowDecimals={false}/>
              <Tooltip contentStyle={{ borderRadius:8, border:`1px solid ${C.border}`, fontSize:11 }}/>
              <Area type="monotone" dataKey="count" stroke={C.green} fill="url(#g1)" strokeWidth={2} name="Deliverables"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background:C.white, borderRadius:10, border:`1px solid ${C.border}`, padding:"16px" }}>
          <p style={{ fontSize:13, fontWeight:700, color:C.textDark, marginBottom:8 }}>Status Breakdown</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={40} outerRadius={62}
                dataKey="value" paddingAngle={3}>
                {statusData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]}/>)}
              </Pie>
              <Legend iconSize={8} wrapperStyle={{ fontSize:10 }}/>
              <Tooltip contentStyle={{ borderRadius:8, border:`1px solid ${C.border}`, fontSize:11 }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ background:C.white, borderRadius:10, border:`1px solid ${C.border}`, padding:"16px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
          <p style={{ fontSize:13, fontWeight:700, color:C.textDark }}>Contract Progress Score</p>
          <span style={{ fontSize:24, fontWeight:800, color:healthColor(score) }}>{score}%</span>
        </div>
        <div style={{ width:"100%", background:C.bg, borderRadius:20, height:8 }}>
          <div style={{ height:8, borderRadius:20, transition:"width 0.5s",
            width:`${score}%`, background:healthColor(score) }}/>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MVP — PROJECT DETAIL VIEW
// ═══════════════════════════════════════════════════════════════════════════
function ProjectDetailView({ project, iterations, onBack, onAddIteration }) {
  const [tab, setTab]             = useState("deliverables");
  const [selected, setSelected]   = useState(null);
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState("all");

  const allIters  = getIters(iterations, project.id);
  const filtered  = allIters
    .filter(i => {
      const ms = i.title.toLowerCase().includes(search.toLowerCase()) || i.version.toLowerCase().includes(search.toLowerCase());
      const mf = filterStatus==="all" || i.status===filterStatus;
      return ms && mf;
    })
    .sort((a,b)=>new Date(b.date)-new Date(a.date));

  const score = healthScore(allIters);
  const hours = totalHours(allIters);

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0 }}>
      <div style={{ padding:"16px 24px", background:C.white, borderBottom:`1px solid ${C.border}` }}>
        <button onClick={onBack}
          style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:C.textLight,
            background:"none", border:"none", cursor:"pointer", marginBottom:12, padding:0 }}>
          <ArrowLeft size={14}/> Back to My Contracts
        </button>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:48, height:48, borderRadius:10, background:project.color,
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"#fff", fontSize:20, fontWeight:800, flexShrink:0 }}>
              {project.name.charAt(0)}
            </div>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                <span style={{ fontSize:18, fontWeight:800, color:C.textDark }}>{project.name}</span>
                <Pill status={project.status} type="proj"/>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:12, color:C.textMid, display:"flex", alignItems:"center", gap:4 }}>
                  <Users size={11}/>{project.client}
                </span>
                <span style={{ fontSize:12, color:C.textMid, display:"flex", alignItems:"center", gap:4 }}>
                  <Tag size={11}/>{project.category}
                </span>
                <span style={{ fontSize:12, color:C.green, fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>
                  <DollarSign size={11}/>{project.budget}
                </span>
                <span style={{ fontSize:12, color:C.textLight }}>{project.rate}</span>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ textAlign:"right" }}>
              <p style={{ fontSize:10, color:C.textLight }}>Contract Score</p>
              <p style={{ fontSize:22, fontWeight:800, color:healthColor(score) }}>{score}%</p>
            </div>
            <div style={{ textAlign:"right" }}>
              <p style={{ fontSize:10, color:C.textLight }}>Hours Logged</p>
              <p style={{ fontSize:22, fontWeight:800, color:C.textDark }}>{hours}h</p>
            </div>
            <button onClick={onAddIteration}
              style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 16px",
                background:C.green, color:"#fff", border:"none", borderRadius:8,
                fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
              <Plus size={14}/> Add Deliverable
            </button>
          </div>
        </div>
        <div style={{ display:"flex", gap:0, marginTop:14, borderBottom:`1px solid ${C.border}`, marginBottom:-17 }}>
          {[["deliverables","Deliverables"],["insights","Insights"]].map(([k,l]) => (
            <button key={k} onClick={()=>setTab(k)}
              style={{ padding:"8px 16px", fontSize:13, fontWeight:600, background:"none", border:"none",
                cursor:"pointer", color:tab===k?C.green:C.textMid,
                borderBottom:tab===k?`2.5px solid ${C.green}`:"2.5px solid transparent" }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>
        {tab==="deliverables" ? (
          <>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ position:"relative", flex:1, maxWidth:300 }}>
                <Search size={14} style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.textLight }}/>
                <FInput value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Search deliverables…" style={{ paddingLeft:30 }}/>
              </div>
              <FSelect value={filterStatus} onChange={e=>setFilter(e.target.value)} style={{ width:"auto" }}>
                <option value="all">All Status</option>
                {Object.entries(ITER_STATUS).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
              </FSelect>
            </div>
            {filtered.length===0 ? (
              <div style={{ textAlign:"center", padding:"60px 20px", color:C.textLight }}>
                <div style={{ fontSize:40, marginBottom:10 }}>📭</div>
                <p style={{ fontWeight:600, fontSize:14 }}>No deliverables yet</p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {filtered.map(iter => {
                  const isSel = selected?.id===iter.id;
                  return (
                    <div key={iter.id} onClick={()=>setSelected(isSel?null:iter)}
                      style={{ background:C.white, borderRadius:10,
                        border:`1px solid ${isSel?project.color:C.border}`,
                        padding:"14px 16px", cursor:"pointer", transition:"all 0.15s",
                        boxShadow:isSel?`0 0 0 3px ${project.color}22`:"none",
                        display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:3, height:36, borderRadius:2,
                        background:ITER_STATUS[iter.status]?.color||C.border, flexShrink:0 }}/>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                          <span style={{ fontSize:10, fontFamily:"monospace", color:C.textLight,
                            background:C.bg, padding:"1px 5px", borderRadius:3 }}>{iter.version}</span>
                          <span style={{ fontWeight:700, fontSize:13, color:C.textDark }}>{iter.title}</span>
                        </div>
                        <p style={{ fontSize:12, color:C.textLight, margin:0,
                          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:500 }}>
                          {iter.notes}
                        </p>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
                        {iter.hours>0 && (
                          <span style={{ fontSize:11, color:C.textLight, display:"flex", alignItems:"center", gap:3 }}>
                            <Clock size={10}/>{iter.hours}h
                          </span>
                        )}
                        <Pill status={iter.status} type="iter"/>
                        <span style={{ fontSize:11, color:C.textLight }}>{daysAgo(iter.date)}</span>
                        <ChevronRight size={14} color={C.textLight}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <InsightsPanel iters={allIters}/>
        )}
      </div>
      {selected && <DeliverablePanel iter={selected} onClose={()=>setSelected(null)}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MVP — DASHBOARD VIEW
// ═══════════════════════════════════════════════════════════════════════════
function DashboardView({ projects, iterations, onSelectProject, onNewContract }) {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");

  const filtered = projects.filter(p => {
    const ms = p.name.toLowerCase().includes(search.toLowerCase()) ||
               (p.client||"").toLowerCase().includes(search.toLowerCase());
    const mf = filter==="all" || p.status===filter;
    return ms && mf;
  });

  const activeProj = projects.filter(p=>p.status==="active").length;
  const totalIters = iterations.length;
  const blocked    = iterations.filter(i=>i.status==="blocked").length;
  const totalHrs   = totalHours(iterations);

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      {/* Welcome banner */}
      <div style={{ background:`linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
        padding:"24px 24px 20px" }}>
        <p style={{ color:"rgba(255,255,255,0.6)", fontSize:12, marginBottom:4 }}>Good morning,</p>
        <p style={{ color:"#fff", fontSize:20, fontWeight:800, marginBottom:14 }}>Jacob Hernandez</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {[
            { label:"Active Contracts", value:activeProj, icon:<Briefcase size={16} color={C.green}/> },
            { label:"Total Deliverables", value:totalIters, icon:<CheckCircle2 size={16} color="#60a5fa"/> },
            { label:"Hours Logged", value:`${totalHrs}h`, icon:<Clock size={16} color="#a78bfa"/> },
            { label:"Blocked", value:blocked, icon:<AlertCircle size={16} color={blocked>0?"#f87171":C.green}/>, warn:blocked>0 },
          ].map(s => (
            <div key={s.label} style={{ background:"rgba(255,255,255,0.08)", borderRadius:10,
              padding:"12px 14px", display:"flex", alignItems:"center", gap:10,
              border:"1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ width:34, height:34, borderRadius:8, background:"rgba(255,255,255,0.1)",
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {s.icon}
              </div>
              <div>
                <p style={{ color:"#fff", fontSize:18, fontWeight:800, margin:0 }}>{s.value}</p>
                <p style={{ color:"rgba(255,255,255,0.5)", fontSize:10, margin:0 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"20px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
          <div style={{ position:"relative", flex:1, maxWidth:320 }}>
            <Search size={14} style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.textLight }}/>
            <FInput value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search contracts or clients…" style={{ paddingLeft:30, background:C.white }}/>
          </div>
          <div style={{ display:"flex", background:C.white, border:`1px solid ${C.border}`,
            borderRadius:8, overflow:"hidden" }}>
            {[["all","All"],["active","Active"],["paused","On Hold"],["complete","Closed"]].map(([k,l]) => (
              <button key={k} onClick={()=>setFilter(k)}
                style={{ padding:"8px 12px", fontSize:12, fontWeight:600, border:"none", cursor:"pointer",
                  background:filter===k?C.green:"transparent",
                  color:filter===k?"#fff":C.textMid,
                  borderRight:`1px solid ${C.border}` }}>
                {l}
              </button>
            ))}
          </div>
          <button onClick={onNewContract}
            style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:6,
              padding:"9px 16px", background:C.green, color:"#fff", border:"none",
              borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
            <FilePlus size={14}/> New Contract
          </button>
        </div>

        {filtered.length===0 ? (
          <div style={{ textAlign:"center", padding:"60px 20px", color:C.textLight }}>
            <div style={{ fontSize:40, marginBottom:10 }}>🔍</div>
            <p style={{ fontWeight:600, fontSize:14 }}>No contracts found</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {filtered.map(p => {
              const iters      = getIters(iterations, p.id);
              const score      = healthScore(iters);
              const lastIter   = [...iters].sort((a,b)=>new Date(b.date)-new Date(a.date))[0];
              const blockedCt  = iters.filter(i=>i.status==="blocked").length;
              return (
                <div key={p.id} onClick={()=>onSelectProject(p)}
                  style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`,
                    cursor:"pointer", overflow:"hidden", transition:"all 0.15s", display:"flex" }}>
                  <div style={{ width:4, background:p.color, flexShrink:0 }}/>
                  <div style={{ flex:1, padding:"16px 18px" }}>
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                          <div style={{ width:36, height:36, borderRadius:8, background:p.color,
                            display:"flex", alignItems:"center", justifyContent:"center",
                            color:"#fff", fontSize:15, fontWeight:800, flexShrink:0 }}>
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                              <span style={{ fontWeight:700, fontSize:14, color:C.textDark }}>{p.name}</span>
                              <Pill status={p.status} type="proj" size="xs"/>
                              {blockedCt > 0 && (
                                <span style={{ fontSize:10, fontWeight:700, color:C.red,
                                  background:C.redLight, padding:"2px 6px", borderRadius:10 }}>
                                  {blockedCt} blocked
                                </span>
                              )}
                            </div>
                            <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:2 }}>
                              <span style={{ fontSize:11, color:C.textMid, display:"flex", alignItems:"center", gap:3 }}>
                                <Users size={10}/>{p.client}
                              </span>
                              <span style={{ fontSize:11, color:C.textMid, display:"flex", alignItems:"center", gap:3 }}>
                                <Tag size={10}/>{p.category}
                              </span>
                              {p.rating && <Stars rating={p.rating}/>}
                            </div>
                          </div>
                        </div>
                        <p style={{ fontSize:12, color:C.textLight, margin:"4px 0 8px 44px",
                          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:480 }}>
                          {p.description}
                        </p>
                        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginLeft:44 }}>
                          {(p.tags||[]).map(t => (
                            <span key={t} style={{ fontSize:11, color:C.textMid,
                              background:C.bg, padding:"2px 8px", borderRadius:20,
                              border:`1px solid ${C.border}` }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:16, flexShrink:0, textAlign:"right" }}>
                        <div>
                          <p style={{ fontSize:10, color:C.textLight, marginBottom:2 }}>Budget</p>
                          <p style={{ fontSize:15, fontWeight:800, color:C.green }}>{p.budget||"—"}</p>
                          <p style={{ fontSize:10, color:C.textLight }}>{p.rate||"—"}</p>
                        </div>
                        <div>
                          <p style={{ fontSize:10, color:C.textLight, marginBottom:2 }}>Deliverables</p>
                          <p style={{ fontSize:15, fontWeight:800, color:C.textDark }}>{iters.length}</p>
                          <p style={{ fontSize:10, color:C.textLight }}>{lastIter?daysAgo(lastIter.date):"—"}</p>
                        </div>
                        <div>
                          <p style={{ fontSize:10, color:C.textLight, marginBottom:2 }}>Progress</p>
                          <p style={{ fontSize:15, fontWeight:800, color:healthColor(score) }}>{score}%</p>
                          <div style={{ width:56, height:4, background:C.bg, borderRadius:2, marginTop:4 }}>
                            <div style={{ height:4, borderRadius:2, width:`${score}%`,
                              background:healthColor(score) }}/>
                          </div>
                        </div>
                        <div style={{ display:"flex", alignItems:"center" }}>
                          <ChevronRight size={18} color={C.textLight}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MVP — GLOBAL INSIGHTS VIEW
// ═══════════════════════════════════════════════════════════════════════════
function GlobalInsightsView({ projects, iterations }) {
  const perProject = projects.map(p => ({
    name:  p.name.split(" ").slice(0,2).join(" "),
    count: getIters(iterations, p.id).length,
    hours: totalHours(getIters(iterations, p.id)),
    color: p.color,
  }));
  const avgScore = projects.length
    ? Math.round(projects.reduce((s,p)=>s+healthScore(getIters(iterations,p.id)),0)/projects.length)
    : 0;

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>
      <p style={{ fontSize:16, fontWeight:800, color:C.textDark, marginBottom:16 }}>Portfolio Overview</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
        {[
          { label:"Total Contracts", value:projects.length, icon:<Briefcase size={18} color={C.green}/> },
          { label:"Total Deliverables", value:iterations.length, icon:<CheckCircle2 size={18} color={C.blue}/> },
          { label:"Portfolio Score", value:`${avgScore}%`, icon:<TrendingUp size={18} color={C.teal}/> },
        ].map(s => (
          <div key={s.label} style={{ background:C.white, borderRadius:10, border:`1px solid ${C.border}`,
            padding:"16px", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:40,height:40,borderRadius:10,background:C.bg,
              display:"flex",alignItems:"center",justifyContent:"center" }}>{s.icon}</div>
            <div>
              <p style={{ fontSize:22, fontWeight:800, color:C.textDark }}>{s.value}</p>
              <p style={{ fontSize:11, color:C.textLight }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        <div style={{ background:C.white, borderRadius:10, border:`1px solid ${C.border}`, padding:"16px" }}>
          <p style={{ fontSize:13, fontWeight:700, color:C.textDark, marginBottom:12 }}>Deliverables per Contract</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={perProject} margin={{ top:4, right:8, bottom:0, left:-20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
              <XAxis dataKey="name" tick={{ fontSize:9, fill:C.textLight }}/>
              <YAxis tick={{ fontSize:10, fill:C.textLight }} allowDecimals={false}/>
              <Tooltip contentStyle={{ borderRadius:8, border:`1px solid ${C.border}`, fontSize:11 }}/>
              <Bar dataKey="count" name="Deliverables" radius={[4,4,0,0]} barSize={28}>
                {perProject.map((p,i)=><Cell key={i} fill={p.color}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background:C.white, borderRadius:10, border:`1px solid ${C.border}`, padding:"16px" }}>
          <p style={{ fontSize:13, fontWeight:700, color:C.textDark, marginBottom:12 }}>Hours Logged per Contract</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={perProject} margin={{ top:4, right:8, bottom:0, left:-20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
              <XAxis dataKey="name" tick={{ fontSize:9, fill:C.textLight }}/>
              <YAxis tick={{ fontSize:10, fill:C.textLight }} allowDecimals={false}/>
              <Tooltip contentStyle={{ borderRadius:8, border:`1px solid ${C.border}`, fontSize:11 }}/>
              <Bar dataKey="hours" name="Hours" radius={[4,4,0,0]} barSize={28} fill={C.teal}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <InsightsPanel iters={iterations}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [projects, setProjects]     = useState(SEED_PROJECTS);
  const [iterations, setIterations] = useState(SEED_ITERATIONS);
  // views: "dashboard" | "project" | "insights" | "new-contract"
  const [view, setView]             = useState("dashboard");
  const [selectedProject, setSelectedProject] = useState(null);
  const [modal, setModal]           = useState(null); // "addIteration"
  const [nextId, setNextId]         = useState(200);

  const openProject  = p  => { setSelectedProject(p); setView("project"); };
  const goBack       = () => { setView("dashboard"); setSelectedProject(null); };
  const goNewContract= () => { setView("new-contract"); setSelectedProject(null); };

  const addIteration = form => {
    const id = nextId; setNextId(n=>n+1);
    setIterations(is=>[...is, {
      ...form, id, projectId:selectedProject.id,
      hours:parseInt(form.hours)||0,
      date:new Date().toISOString().slice(0,10), changes:[],
    }]);
    setModal(null);
  };

  // Called when ContractBuilderView successfully submits
  const handleContractCreated = (contractData, milestones) => {
    const projId = nextId;
    let idCursor = nextId + 1;

    const newProject = {
      id:          projId,
      name:        contractData.name,
      client:      contractData.client || "—",
      description: contractData.description || "",
      status:      "active",
      budget:      parseDollars(contractData.totalBudget) > 0
                     ? fmt(parseDollars(contractData.totalBudget))
                     : "—",
      rate:        contractData.rateType || "—",
      color:       PROJ_COLORS[projects.length % PROJ_COLORS.length],
      category:    contractData.category || "Other",
      tags:        [],
      rating:      5.0,
      createdAt:   new Date().toISOString().slice(0,10),
    };

    // Each milestone becomes an iteration on the new project
    const newIterations = milestones.map((m, i) => ({
      id:        idCursor++,
      projectId: projId,
      version:   `M${i+1}`,
      title:     m.name,
      status:    "in-progress",
      date:      m.dueDate || new Date().toISOString().slice(0,10),
      hours:     0,
      notes:     m.description || "",
      changes:   m.deliverables.filter(d=>d.trim()),
    }));

    setNextId(idCursor);
    setProjects(ps  => [...ps, newProject]);
    setIterations(is => [...is, ...newIterations]);
    // Navigate to the new project after a short delay (success screen handles timing)
    setTimeout(() => {
      setSelectedProject(newProject);
      setView("project");
    }, 2200);
  };

  const navItems = [
    { id:"dashboard",    label:"My Contracts", Icon:Briefcase },
    { id:"insights",     label:"Insights",     Icon:BarChart2 },
  ];

  // breadcrumb text for top bar
  const breadcrumb = () => {
    if (view==="new-contract") return [["My Contracts","dashboard"], ["New Contract", null]];
    if (view==="project" && selectedProject) return [["My Contracts","dashboard"], [selectedProject.name, null]];
    if (view==="insights") return [["Insights", null]];
    return [["My Contracts", null]];
  };

  return (
    <div style={{ display:"flex", height:"100vh",
      background:C.bg, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      color:C.textDark, overflow:"hidden" }}>

      {/* ── Sidebar ────────────────────────────────────────────────────── */}
      <aside style={{ width:220, background:C.navy, display:"flex", flexDirection:"column", flexShrink:0 }}>
        {/* Logo */}
        <div style={{ padding:"18px 16px 14px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:32,height:32,borderRadius:8,background:C.green,
              display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ color:"#fff", fontSize:13, fontWeight:800 }}>IQ</span>
            </div>
            <div>
              <p style={{ color:"#fff", fontSize:14, fontWeight:800, margin:0 }}>IterateIQ</p>
              <p style={{ color:"rgba(255,255,255,0.4)", fontSize:10, margin:0 }}>Contract Tracker</p>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div style={{ padding:"12px 14px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:32,height:32,borderRadius:"50%",background:C.green,
              display:"flex",alignItems:"center",justifyContent:"center",
              color:"#fff",fontWeight:800,fontSize:13,flexShrink:0 }}>J</div>
            <div style={{ minWidth:0 }}>
              <p style={{ color:"#fff", fontSize:12, fontWeight:700, margin:0 }}>Jacob Hernandez</p>
              <p style={{ color:"rgba(255,255,255,0.4)", fontSize:10, margin:0 }}>H9 Partners</p>
            </div>
          </div>
        </div>

        {/* New Contract CTA */}
        <div style={{ padding:"10px 10px 4px" }}>
          <button onClick={goNewContract}
            style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center",
              gap:6, padding:"9px", borderRadius:8, border:"none",
              background: view==="new-contract" ? C.green : "rgba(20,168,0,0.18)",
              color: view==="new-contract" ? "#fff" : C.green,
              fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
              transition:"all 0.2s" }}>
            <FilePlus size={13}/> New Contract
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding:"6px 8px", flex:1 }}>
          <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.3)",
            textTransform:"uppercase", letterSpacing:"0.1em", padding:"4px 8px 6px" }}>Menu</p>
          {navItems.map(({id,label,Icon}) => {
            const active = view===id && !selectedProject;
            return (
              <button key={id} onClick={()=>{setView(id);setSelectedProject(null);}}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:10,
                  padding:"9px 10px", borderRadius:8, marginBottom:2, border:"none",
                  cursor:"pointer", textAlign:"left",
                  background:active?"rgba(20,168,0,0.2)":"transparent",
                  color:active?C.green:"rgba(255,255,255,0.65)",
                  fontWeight:active?700:500, fontSize:13 }}>
                <Icon size={15}/>{label}
              </button>
            );
          })}

          <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.3)",
            textTransform:"uppercase", letterSpacing:"0.1em", padding:"12px 8px 6px" }}>Contracts</p>
          {projects.map(p => {
            const active = selectedProject?.id===p.id;
            return (
              <button key={p.id} onClick={()=>openProject(p)}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:8,
                  padding:"7px 10px", borderRadius:8, marginBottom:1, border:"none",
                  cursor:"pointer", textAlign:"left",
                  background:active?"rgba(255,255,255,0.12)":"transparent",
                  color:active?"#fff":"rgba(255,255,255,0.55)",
                  fontSize:12, fontWeight:active?600:400 }}>
                <span style={{ width:8,height:8,borderRadius:"50%",background:p.color,flexShrink:0 }}/>
                <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding:"10px 8px", borderTop:"1px solid rgba(255,255,255,0.08)" }}>
          {[{Icon:Settings,label:"Settings"},{Icon:LogOut,label:"Sign Out"}].map(({Icon,label}) => (
            <button key={label}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:10,
                padding:"8px 10px", borderRadius:8, border:"none", cursor:"pointer",
                background:"transparent", color:"rgba(255,255,255,0.4)",
                fontSize:12, textAlign:"left" }}>
              <Icon size={14}/>{label}
            </button>
          ))}
        </div>
      </aside>

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, minHeight:0 }}>

        {/* Top bar */}
        <header style={{ background:C.white, borderBottom:`1px solid ${C.border}`,
          padding:"10px 20px", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", gap:6 }}>
            {breadcrumb().map(([label, dest], i, arr) => (
              <span key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
                {i > 0 && <ChevronRight size={12} color={C.textLight}/>}
                <span onClick={dest ? ()=>{ setView(dest); setSelectedProject(null); } : undefined}
                  style={{ fontSize:12, fontWeight: i===arr.length-1 ? 600 : 400,
                    color: i===arr.length-1 ? C.textDark : C.textLight,
                    cursor: dest ? "pointer" : "default" }}>
                  {label}
                </span>
              </span>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <button style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:8,
              padding:"6px 10px", cursor:"pointer", display:"flex", alignItems:"center",
              gap:5, fontSize:12, color:C.textMid }}>
              <Globe size={13}/> H9 Partners
            </button>
            <button style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:8,
              padding:"6px", cursor:"pointer", display:"flex", color:C.textMid, position:"relative" }}>
              <Bell size={16}/>
              <span style={{ position:"absolute", top:4, right:4, width:7, height:7,
                background:C.red, borderRadius:"50%", border:"1.5px solid white" }}/>
            </button>
          </div>
        </header>

        {/* View content */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}>
          {view==="dashboard" && (
            <DashboardView
              projects={projects} iterations={iterations}
              onSelectProject={openProject} onNewContract={goNewContract}
            />
          )}
          {view==="project" && selectedProject && (
            <ProjectDetailView
              project={selectedProject} iterations={iterations}
              onBack={goBack} onAddIteration={()=>setModal("addIteration")}
            />
          )}
          {view==="insights" && (
            <>
              <div style={{ padding:"14px 24px", background:C.white, borderBottom:`1px solid ${C.border}` }}>
                <p style={{ fontSize:16, fontWeight:700, color:C.textDark, margin:0 }}>Insights</p>
                <p style={{ fontSize:12, color:C.textLight, margin:0 }}>Portfolio-wide analytics</p>
              </div>
              <GlobalInsightsView projects={projects} iterations={iterations}/>
            </>
          )}
          {view==="new-contract" && (
            <ContractBuilderView
              onContractCreated={handleContractCreated}
              onBack={goBack}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      {modal==="addIteration" && selectedProject && (
        <AddIterationModal project={selectedProject} onAdd={addIteration} onClose={()=>setModal(null)}/>
      )}
    </div>
  );
}
