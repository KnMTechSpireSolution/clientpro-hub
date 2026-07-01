// ClientPro Hub v1.9.6 CRM Enterprise Pack
function getLeadPipeline(){const leads=DB.get("customers").filter(x=>x.status==="Lead");return {new:leads.length};}
function addFollowUp(customerId,note,date){const rows=DB.get("followups")||[];rows.push({id:Date.now()+"",customerId,note,date,createdAt:new Date().toISOString()});DB.set("followups",rows);}
console.log("CRM Enterprise Pack v1.9.6 Loaded");