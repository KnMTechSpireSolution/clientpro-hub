// ClientPro Hub v1.9.8 Quotation Pro Pack
function quotationVersion(q){return q.version||'V1';}
function quotationStatus(q){return q.status||'Draft';}
function quotationItemsTotal(items){return (items||[]).reduce((s,i)=>s+((+i.qty||0)*(+i.price||0)),0);}
console.log('Quotation Pro Pack v1.9.8 Loaded');