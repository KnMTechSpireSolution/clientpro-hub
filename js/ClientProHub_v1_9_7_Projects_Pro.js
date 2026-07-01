// ClientPro Hub v1.9.7 Projects Pro Pack
function projectProgress(project){const progress=project.progress||0;return progress;}
function projectProfit(project){const budget=+project.budget||0;const cost=+project.cost||0;return budget-cost;}
console.log("Projects Pro Pack v1.9.7 Loaded");