console.log("hello main");

const cardContainer = document.getElementById('cards-container');
const issueCount = document.querySelector("#issues-section h2");

const allBtn = document.querySelector("#tabs-section button:nth-child(1)");
const openBtn = document.querySelector("#tabs-section button:nth-child(2)");
const closedBtn = document.querySelector("#tabs-section button:nth-child(3)");

let allIssues = [];

//to load all issues
async function loadCards(){

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    console.log(data);
    // console.log(cardContainer);
    displayCards(allIssues);
}

loadCards();

//for displaying cards
function displayCards(cards){
    cardContainer.innerHTML = "";

    issueCount.innerText = cards.length + " Issues";

    cards.forEach(issue => {
        const createCard = document.createElement('div');

        const borderColor = issue.status === 'open' ? 'border-t-4 border-green-500' : 'border-t-4 border-purple-500';
        
        createCard.innerHTML = `
        <div class="bg-white shadow-sm ${borderColor} rounded-md">

            <div class="p-5">

                <div class="flex justify-between items-center">
                    <p class="font-semibold text-sm">${issue.status.toUpperCase()}</p>
                    <div class="badge badge-outline">${issue.priority}</div>
                </div>

                <h2 class="text-lg font-semibold mt-2">${issue.title}</h2>

                <p class="text-gray-500 text-sm line-clamp-2 mt-1">
                    ${issue.description}
                </p>

                <div class="flex gap-2 mt-3">
                    <div class="badge badge-soft badge-secondary">${issue.label}</div>
                </div>

            </div>

            <div class="border-t p-4 text-sm text-gray-500 flex justify-between">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>

        </div>
        `;

        cardContainer.appendChild(createCard);
    });
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