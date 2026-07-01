// ClientPro Hub v1.9.5 Business Core Upgrade
// Backward compatible with V1.9 LocalStorage structure

function safe(v,d){return v===undefined||v===null||v===''?d:v;}

function customerHealth(customerId){
 const projects=DB.get('projects').filter(x=>x.customerId===customerId);
 const invoices=DB.get('invoices').filter(x=>x.customerId===customerId);
 const receipts=DB.get('receipts').filter(x=>x.customerId===customerId);
 const revenue=invoices.reduce((s,x)=>s+(+x.grandTotal||0),0);
 const paid=receipts.reduce((s,x)=>s+(+x.amount||0),0);
 return {projects:projects.length,invoices:invoices.length,revenue,outstanding:revenue-paid};
}

function enhanceCustomer(c){
 return {...c,code:safe(c.code,'CUS-'+String((DB.get('customers').findIndex(r=>r.id===c.id)+1)||1).padStart(4,'0')),companyName:safe(c.companyName,c.name),industry:safe(c.industry,'''),tier:safe(c.tier,'Bronze')};
}

function projectMetrics(project){
 const budget=+project.budget||0;
 const cost=+project.cost||0;
 const profit=budget-cost;
 const margin=budget?((profit/budget)*100):0;
 return {profit,margin};
}

function enhanceQuotation(q){
 return {...q,version:safe(q.version,'V1'),status:safe(q.status,'Draft')};
}

function enhanceInvoice(i){
 const paid=+i.paid||0;
 const total=+i.grandTotal||0;
 return {...i,balance:total-paid,status:(paid>=total&&total>0)?'Paid':safe(i.status,'Issued')};
}

function enhancePayment(p){
 return {...p,verified:safe(p.verified,false),method:safe(p.method,'Bank Transfer')};
}

console.log('ClientPro Hub v1.9.5 Core Upgrade Loaded');
