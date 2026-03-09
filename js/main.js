console.log("hello main");

const cardContainer = document.getElementById('cards-container');
const issueCount = document.querySelector("#issues-section h2");

const allBtn = document.querySelector("#tabs-section button:nth-child(1)");
const openBtn = document.querySelector("#tabs-section button:nth-child(2)");
const closedBtn = document.querySelector("#tabs-section button:nth-child(3)");

const modal = document.getElementById('issue-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalAuthor = document.getElementById('modal-author');
const modalDate = document.getElementById('modal-date');
const closeModal = document.getElementById('close-modal-btn');
const modalStatus = document.getElementById('modal-status');
const modalPriority = document.getElementById('modal-priority');
const modalAssignee = document.getElementById('modal-assignee');
const modalLabels = document.getElementById("modal-labels");

const spinner = document.getElementById("loading-bar");

let allIssues = [];

//modal
function showModal(issue){
    modalTitle.innerText = issue.title;
    modalDescription.innerText = issue.description;
    modalAuthor.innerText = `Opened by ${issue.author}`;
    modalDate.innerText = new Date(issue.createdAt).toLocaleDateString();
    modalLabels.innerHTML = generateLabels(issue.labels);

    modalStatus.innerHTML = issue.status === "open" 
    ? `<span class="badge badge-success badge-outline bg-green-500 text-white">Opened</span>` 
    : `<span class="badge badge-secondary badge-outline bg-red-500 text-white">Closed</span>`;

    modalPriority.innerHTML = `<span class="badge badge-error">${issue.priority.toUpperCase()}</span>`;

    modalAssignee.innerHTML = issue.assignee 
    ? `<span class="font-semibold">${issue.assignee}</span>` 
    : `<span class="text-gray-400">Unassigned</span>`;

    modal.classList.add('modal-open');
}

closeModal.addEventListener('click', ()=>{
    modal.classList.remove('modal-open');
})

//to load all issues
async function loadCards(){

    spinner.classList.remove('hidden');
    cardContainer.innerHTML = '';

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    console.log(data);
    // console.log(cardContainer);

    allIssues = data.data;

    spinner.classList.add('hidden');
    displayCards(allIssues);
}

loadCards();

//display card
function displayCards(cards){

    cardContainer.innerHTML = "";
    issueCount.innerText = cards.length + " Issues";

    cards.forEach(issue => {
        const card = createCard(issue);
        cardContainer.appendChild(card);
    });
}

function createCard(issue){

    const card = document.createElement("div");

    const borderColor = getBorderColor(issue.status);
    const icon = getStatusIcon(issue.status);
    const priority = getPriorityBadge(issue.priority);
    const labels = generateLabels(issue.labels);

    card.innerHTML = `
    <div class="bg-white shadow-sm ${borderColor} rounded-lg h-full flex flex-col">

        <div class="p-5 flex-grow">

            <div class="flex justify-between items-center">
                <img class="w-6 h-6" src="${icon}">
                ${priority}
            </div>

            <h2 class="text-[14px] font-semibold mt-3 line-clamp-2">
                ${issue.title}
            </h2>

            <p class="text-gray-500 text-[12px] mt-2 line-clamp-2">
                ${issue.description}
            </p>

            <div class="flex text-[12px] gap-2 mt-3">
                ${labels}
            </div>

        </div>

        <div class="border-t px-5 py-4 text-[12px] text-gray-500 mt-auto">
            <p>#${issue.id} by ${issue.author}</p>
            <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>

    </div>
    `;

    card.classList.add("cursor-pointer");

    card.addEventListener("click", () => {
        showModal(issue);
    });
    return card;
}

function getBorderColor(status){

    if(status === "open"){
        return "border-t-4 border-green-500";
    }
    return "border-t-4 border-purple-500";
}

function getStatusIcon(status){

    if(status === "open"){
        return "assets/Open-Status.png";
    }
    return "assets/Closed- Status .png";
}

function getPriorityBadge(priority){

    if(priority === "high"){
        return `<div class="badge badge-soft badge-secondary">High</div>`;
    }
    if(priority === "medium"){
        return `<div class="badge badge-soft badge-warning">Medium</div>`;
    }
    return `<div class="badge badge-soft badge-primary">Low</div>`;
}

//labels 
function generateLabels(labels){

    return labels.map(label => {

        if(label === "bug"){
            return `<div class="badge badge-outline bg-red-100 badge-error text-[12px]">BUG</div>`;
        }
        if(label === "help wanted"){
            return `<div class="badge badge-outline bg-yellow-100 badge-warning text-[12px]">HELP WANTED</div>`;
        }
        if(label === "enhancement"){
            return `<div class="badge badge-outline bg-green-100 badge-success text-[12px]">ENHANCEMENT</div>`;
        }
        if(label === "good first issue"){
            return `<div class="badge badge-outline bg-blue-100 badge-info text-[12px]">Good First Issue</div>`;
        }
        if(label === "documentation"){
            return `<div class="badge badge-outline bg-teal-100 badge-accent text-[12px]">Documentation</div>`;
        }
        return `<div class="badge badge-outline">${label}</div>`;

    }).join("");
}


//all button
allBtn.addEventListener('click', () =>{
    displayCards(allIssues);
    setActive(allBtn);
});

//open button
openBtn.addEventListener('click', () =>{
    const openIssues = allIssues.filter(issue => issue.status ==='open');

    displayCards(openIssues);
    setActive(openBtn);
});

//closed button
closedBtn.addEventListener('click', () =>{
    const closedIssues = allIssues.filter(issue => issue.status === 'closed');

    displayCards(closedIssues);
    setActive(closedBtn);
})

//to set a button active
function setActive(button){
    document.querySelectorAll('#tabs-section button').forEach(btn =>{
        btn.classList.remove('btn-primary', 'text-white');
        btn.classList.add('btn-outline');
    });

    button.classList.remove('btn-outline');
    button.classList.add("btn-primary", 'text-white');
}