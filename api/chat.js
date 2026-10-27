import { systemPrompt } from '../server/store-knowledge.js';
const buckets = new Map();
export function resetLimits() { buckets.clear(); }
function consume(ip, now=Date.now()) {
  for (const [key,value] of buckets) if(value.until<=now) buckets.delete(key);
  const b=buckets.get(ip) || {count:0,until:now+60000};
  if(b.count>=12 || (!buckets.has(ip)&&buckets.size>=5000)) return false;
  b.count++; buckets.set(ip,b); return true;
}
export default async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  const fail=(status,error)=>res.status(status).json({error});
  if(req.method!=='POST'){res.setHeader('Allow','POST');return fail(405,'Use POST to send a message.');}
  const configured=(process.env.ALLOWED_ORIGINS||'https://zwantradingltd.co.uk,https://www.zwantradingltd.co.uk').split(',').map(x=>x.trim());
  if(process.env.VERCEL_URL) configured.push(`https://${process.env.VERCEL_URL}`);
  if(process.env.NODE_ENV!=='production') configured.push('http://localhost:3000','http://localhost:4173');
  if(!configured.includes(req.headers.origin)) return fail(403,'This chat is only available from the store website.');
  if(!String(req.headers['content-type']||'').startsWith('application/json')) return fail(415,'Send JSON data.');
  const raw=req.body;
  let data;
  try {const serialized=typeof raw==='string'?raw:JSON.stringify(raw);if(!serialized||Buffer.byteLength(serialized)>16000)return fail(413,'Your conversation is too long. Start a new chat.');data=typeof raw==='string'?JSON.parse(raw):raw;}catch{return fail(400,'Invalid request.');}
  const messages=data?.messages;
  if(!Array.isArray(messages)||messages.length<1||messages.length>13) return fail(400,'Send up to 13 messages.');
  if(messages.some((m,i)=>!m||m.role!==(i%2===0?'user':'model')||typeof m.text!=='string'||!m.text.trim()||m.text.length>2000)||messages.at(-1).role!=='user')return fail(400,'Invalid conversation. Each message must contain 1–2000 characters.');
  // Vercel supplies the source address. This is a best-effort per-instance limit,
  // not a distributed quota; configure Vercel Firewall rate limiting before launch.
  const ip=String(req.headers['x-vercel-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
  if(!consume(ip)){res.setHeader('Retry-After','60');return fail(429,'Please wait a minute before sending another message. You can also call 0113 318 3217.');}
  const key=process.env.GEMINI_API_KEY, model=process.env.GEMINI_MODEL;
  if(!key||!model||!/^gemini-[a-zA-Z0-9.-]+$/.test(model))return fail(503,'Our AI assistant is not connected yet. Please call 0113 318 3217 or email supports@zwantradingltd.co.uk.');
  try {
    const upstream=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,{
      method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},
      body:JSON.stringify({systemInstruction:{parts:[{text:systemPrompt()}]},contents:messages.map(m=>({role:m.role,parts:[{text:m.text.trim()}]})),generationConfig:{maxOutputTokens:1024}}),signal:AbortSignal.timeout(22000)
    });
    if(!upstream.ok)return fail(upstream.status===429?429:502,'The assistant is temporarily unavailable. Please try again later or call 0113 318 3217.');
    const result=await upstream.json();
    const candidate=result.candidates?.[0];
    const reply=candidate?.content?.parts?.filter(p=>typeof p.text==='string'&&!p.thought).map(p=>p.text).join('\n').trim();
    if(!reply||!['STOP',undefined].includes(candidate.finishReason))return fail(502,'I could not complete that answer. Please try a shorter question or contact the store.');
    return res.status(200).json({reply:reply.length>2000?reply.slice(0,1900)+'\nPlease contact the store for further details.':reply});
  }catch{return fail(502,'The assistant could not connect. Please try again or call 0113 318 3217.');}
}
