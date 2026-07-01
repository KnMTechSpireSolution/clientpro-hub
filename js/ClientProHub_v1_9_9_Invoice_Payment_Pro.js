// ClientPro Hub v1.9.9 Invoice Payment Pro Pack
function invoiceOutstanding(inv){return (+inv.grandTotal||0)-(+inv.paid||0);}
function invoiceAging(inv){return inv.status==='Paid'?'Paid':'Outstanding';}
function collectionRate(total,payment){return total?((payment/total)*100).toFixed(2):'0.00';}
console.log('Invoice & Payment Pro Pack v1.9.9 Loaded');