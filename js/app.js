const contentArea = document.getElementById('contentArea');
const pageTitle = document.getElementById('pageTitle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');

const pages = {
  dashboard: { title:'Dashboard', render: renderDashboard },
  crm: { title:'Customer CRM', render: renderCRM },
  commerce: { title:'Commerce Core', render: renderCommerce },
  projects: { title:'Project Management', render: () => renderModule('Project Management','Manage projects, tasks, milestones, expenses, team assignment, and project profitability.', ['Project List','Tasks','Milestones','Project Profitability','Project Files']) },
  website: { title:'Website Builder', render: renderWebsiteBuilder },
  support: { title:'Support Center', render: () => renderModule('Support Center','Manage customer tickets, SLA tracking, knowledge base, and support reports.', ['Open Tickets','Assigned Tickets','SLA Monitoring','Knowledge Base']) },
  assets: { title:'Asset Management', render: () => renderModule('Asset Management','Track internal and customer assets, assignments, warranty, and maintenance.', ['Assets','Assignments','Maintenance','Asset Reports']) },
  vendors: { title:'Vendor Management', render: () => renderModule('Vendor Management','Manage vendor profiles, contacts, purchases, contracts, and expenses.', ['Vendors','Purchases','Contracts','Vendor Reports']) },
  employees: { title:'Employee Management', render: () => renderModule('Employee Management','Manage employee records, attendance, leave, claims, and performance.', ['Employees','Attendance','Leave','Claims','Performance']) },
  documents: { title:'Document Repository', render: () => renderModule('Document Repository','Central storage for customer, project, financial, HR, and vendor files.', ['Customer Files','Project Files','Finance Documents','HR Files','Contracts']) },
  reports: { title:'Reports & Analytics', render: () => renderModule('Reports & Analytics','View CRM, finance, project, support, and business performance reports.', ['CRM Reports','Financial Reports','Project Reports','Support Reports']) },
  settings: { title:'Settings', render: () => renderModule('Settings','Configure company profile, numbering prefixes, tax, currency, users, and roles.', ['Company Profile','Commerce Settings','User Roles','Permissions']) }
};

function setActive(page){
  document.querySelectorAll('.nav-link').forEach(btn=>btn.classList.toggle('active', btn.dataset.page===page));
}

function loadPage(page){
  const target = pages[page] || pages.dashboard;
  pageTitle.textContent = target.title;
  setActive(page);
  target.render();
  sidebar.classList.remove('open');
}

function renderDashboard(){
  const customers = DB.get('customers');
  const quotations = DB.get('quotations');
  const invoices = DB.get('invoices');
  const expenses = DB.get('expenses');
  const revenue = invoices.reduce((sum,i)=>sum+(Number(i.total)||0),0);
  const totalExpenses = expenses.reduce((sum,e)=>sum+(Number(e.amount)||0),0);
  contentArea.innerHTML = `
    <div class="page-header"><div><h2>Welcome Mohan</h2><p>ClientPro Hub command center for K&M TechSpire Solution.</p></div><button class="primary-btn" onclick="loadPage('crm')">+ Add Customer</button></div>
    <div class="grid">
      <div class="card"><span class="muted">Customers</span><div class="metric">${customers.length}</div></div>
      <div class="card"><span class="muted">Quotations</span><div class="metric">${quotations.length}</div></div>
      <div class="card"><span class="muted">Invoices</span><div class="metric">${invoices.length}</div></div>
      <div class="card"><span class="muted">Net Profit</span><div class="metric">RM ${(revenue-totalExpenses).toFixed(2)}</div></div>
    </div>
    <div class="grid-2" style="margin-top:16px">
      <div class="card"><h3>Revenue Snapshot</h3><p class="muted">Revenue and expense charts will be connected in the next MVP version.</p><div class="pdf-preview">Chart Placeholder</div></div>
      <div class="card"><h3>Quick Actions</h3><div class="action-row"><button class="secondary-btn" onclick="loadPage('crm')">Customer CRM</button><button class="secondary-btn" onclick="loadPage('commerce')">Commerce Core</button><button class="secondary-btn" onclick="loadPage('website')">Website Builder</button></div></div>
    </div>`;
}

function renderCRM(){
  const customers = DB.get('customers');
  contentArea.innerHTML = `
    <div class="page-header"><div><h2>Customer CRM</h2><p>Manage leads, customers, contacts, follow-ups, timelines, and financial summaries.</p></div></div>
    <div class="card">
      <h3>Add Customer</h3>
      <div class="form-row"><input class="input" id="customerName" placeholder="Customer / Company Name"><input class="input" id="customerPhone" placeholder="Phone / WhatsApp"></div>
      <div class="form-row"><input class="input" id="customerEmail" placeholder="Email"><input class="input" id="customerStatus" placeholder="Status e.g. Lead, Active, VIP"></div>
      <div class="action-row"><button class="primary-btn" onclick="addCustomer()">Save Customer</button></div>
    </div>
    <div class="card"><h3>Customer List</h3><table class="table"><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Status</th></tr></thead><tbody>${customers.map(c=>`<tr><td>${c.name||'-'}</td><td>${c.phone||'-'}</td><td>${c.email||'-'}</td><td><span class="status green">${c.status||'Lead'}</span></td></tr>`).join('') || '<tr><td colspan="4">No customers added yet.</td></tr>'}</tbody></table></div>
    <div class="module-list"><div class="module-card"><h3>Lead Pipeline</h3><p class="muted">New → Contacted → Proposal Sent → Won/Lost</p></div><div class="module-card"><h3>Follow-Ups</h3><p class="muted">Call, WhatsApp, email, meeting and site visit reminders.</p></div><div class="module-card"><h3>Customer Timeline</h3><p class="muted">Full history of customer activities.</p></div></div>`;
}

function addCustomer(){
  const name = document.getElementById('customerName').value.trim();
  if(!name){ alert('Please enter customer name.'); return; }
  DB.add('customers', { name, phone:document.getElementById('customerPhone').value, email:document.getElementById('customerEmail').value, status:document.getElementById('customerStatus').value || 'Lead' });
  renderCRM();
}

function renderCommerce(){
  contentArea.innerHTML = `
    <div class="page-header"><div><h2>Commerce Core</h2><p>Quotation → Delivery Order → Invoice → Payment → Official Receipt → P&L.</p></div></div>
    <div class="module-list">
      ${['Quotations','Delivery Orders','Invoices','Payments','Official Receipts','Customer Statements','Expenses','Profit & Loss','PDF Preview Center'].map((x,i)=>`<div class="module-card"><h3>${x}</h3><span class="status ${i<5?'green':'orange'}">Framework Ready</span><p class="muted">${x} screen ready for v1.4 functional build.</p></div>`).join('')}
    </div>
    <div class="card" style="margin-top:16px"><h3>PDF Preview Center</h3><div class="pdf-preview">Quotation / DO / Invoice / Receipt PDF preview area</div><div class="action-row"><button class="secondary-btn">Preview</button><button class="secondary-btn">Print</button><button class="secondary-btn">Download</button><button class="secondary-btn">WhatsApp</button></div></div>`;
}

function renderWebsiteBuilder(){
  renderModule('Website Builder','Manage website projects from requirements to deployment and maintenance.', ['Requirements','Sitemap','Pages','Design','Content','Domain','Hosting','Deployment','SEO','Maintenance']);
}

function renderModule(title, description, items){
  contentArea.innerHTML = `<div class="page-header"><div><h2>${title}</h2><p>${description}</p></div></div><div class="module-list">${items.map(item=>`<div class="module-card"><h3>${item}</h3><span class="status orange">Planned</span><p class="muted">Module screen placeholder prepared.</p></div>`).join('')}</div>`;
}

document.querySelectorAll('.nav-link').forEach(btn=>btn.addEventListener('click',()=>loadPage(btn.dataset.page)));
mobileMenuBtn.addEventListener('click',()=>sidebar.classList.toggle('open'));
document.getElementById('quickCreateBtn').addEventListener('click',()=>loadPage('crm'));
loadPage('dashboard');
