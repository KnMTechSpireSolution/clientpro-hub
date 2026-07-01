const DB = {
  init(){
    const defaults = {
      customers: [], quotations: [], deliveryOrders: [], invoices: [], payments: [], receipts: [], projects: [], tickets: [], expenses: []
    };
    Object.keys(defaults).forEach(key=>{
      if(!localStorage.getItem('cph_'+key)) localStorage.setItem('cph_'+key, JSON.stringify(defaults[key]));
    });
  },
  get(key){ return JSON.parse(localStorage.getItem('cph_'+key) || '[]'); },
  set(key,value){ localStorage.setItem('cph_'+key, JSON.stringify(value)); },
  add(key,item){ const rows=this.get(key); rows.push({...item,id:crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),createdAt:new Date().toISOString()}); this.set(key,rows); return rows; }
};
DB.init();
