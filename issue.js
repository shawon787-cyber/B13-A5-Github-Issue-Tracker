const issueTitle = document.getElementById("issue-title");
const issueModal = document.getElementById("issue_modal");
const issueStatus = document.getElementById("issue-status");
const authorName = document.getElementById("author-name");
const createdDate = document.getElementById("created-date");
const issueDescription = document.getElementById("issue-description");
const writerName = document.getElementById("name");
const priorityValue = document.getElementById("priority-value");
const modalIssueLabels = document.getElementById("modal-issue-labels");

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
let allIssuesData = [];

const loadingSpinner = document.getElementById("loading-spinner");


const createElements = (arr) => {
  const issueElements = arr.map((el, index) => {

    if(index === 0){
      return `
      <span class="flex items-center gap-1 bg-red-200 text-red-600 px-2 py-1 rounded text-xs">
        <img src="./assets/Vector (2).png" alt="">
        ${el.toUpperCase()}
      </span>`;
    }

    if(index === 1){
      return `
      <span class="flex items-center gap-1 bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs">
        <img src="./assets/Vector (3).png" alt="">
        ${el.toUpperCase()}
      </span>`;
    }

    return "";
  });

  return issueElements.join(" ");
};

const allIssues = document.getElementById("all-issues");

async function loadIssues() {
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex")
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  allIssuesData = data.data;
  loadingSpinner.classList.add("hidden")
  displayIssues(allIssuesData);
}
loadIssues();
function displayIssues(issues){
    console.log(issues)
    allIssues.innerHTML = "";
    document.getElementById("tracker-length").innerText = issues.length;
    issues.forEach(issue =>{
        

        let border = "";
        if(issue.status == "open"){
            border = "border-green-500 border-t-4"
        };
        if(issue.status == "closed"){
          border = "border-purple-500 border-t-4"
        }
        let textColor = "";
        let bgColor = "";
        if(issue.priority == "high"){
            textColor = "text-red-600";
            bgColor = "bg-red-200";
        };
        if(issue.priority == "medium"){
            textColor = "text-yellow-600";
            bgColor = "bg-yellow-200";
        };
        if(issue.priority == "low"){
            textColor = "text-black";
            bgColor = "bg-slate-200";
        };
        const card = document.createElement("div");
        card.className = `py-4 ${border} rounded-lg shadow-sm `;
        card.innerHTML= `
        <div onclick="openIssueModal(${issue.id})" class="hover:cursor-pointer">
                <div class="flex justify-between items-center px-4">
                    <img src="./assets/Open-Status.png" alt="">
                    <p onclick="openIssueModal(${issue.id})" class="${bgColor} py-1 px-3 font-medium text-xs rounded-md uppercase ${textColor} cursor-pointer">${issue.priority}</p>
                </div>
                <h2 class="font-semibold text-xl mt-4 px-4">${issue.title}</h2>
                <p class="text-gray-500 text-sm mt-1 px-4">${issue.description}</p>
                <div class="flex items-center gap-3 mt-4 pb-4 border-b border-b-gray-300">
                   <div  class="px-4 flex gap-2 ">
                   ${createElements(issue.labels)}
                   </div>
                </div>
                <p class="text-sm text-gray-500 mt-3 px-4">${issue.author}</p>
                <p class="text-sm text-gray-500 mt-1 px-4">${new Date(issue.createdAt).toLocaleDateString("en-us")}</p>
            </div>
        `;
       
        allIssues.appendChild(card);
    });
}

async function openIssueModal(issueId){
  console.log(issueId);
  const res =await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
  const data =await res.json();
  const issueDetails = data.data;
  let textColor = "";
  let bgColor = "";
  if(issueDetails.status == "open"){
    textColor = "text-white";
    bgColor = "bg-green-600"
  };
  if(issueDetails.status == "closed"){
    textColor = "text-white";
    bgColor = "bg-red-600"
  };
  let priorityText = "";
  let priorityBg = "";
  if(issueDetails.priority == "high"){
    priorityText = "text-white";
    priorityBg = "bg-red-600"
  };
  if(issueDetails.priority == "medium"){
    priorityText = "text-white";
    priorityBg = "bg-yellow-600"
  };
  if(issueDetails.priority == "low"){
    priorityText = "text-gray-800";
    priorityBg = "bg-slate-200"
  };
  console.log(issueDetails);
  issueModal.showModal();
  issueTitle.textContent = issueDetails.title;
  issueStatus.textContent = issueDetails.status.toUpperCase();
  issueStatus.className = `py-1 px-3 rounded-sm ${bgColor} ${textColor}`;
  authorName.textContent = issueDetails.author;
  createdDate.textContent = new Date(issueDetails.createdAt).toLocaleDateString("en-US");
  issueDescription.textContent = issueDetails.description;
  writerName.textContent = issueDetails.assignee;
  priorityValue.textContent = issueDetails.priority.toUpperCase();
  priorityValue.className = `text-sm text-gray-800 font-medium py-1 px-2 w-18 mt-1 text-center rounded-sm ${priorityBg} ${priorityText}`;
  modalIssueLabels.innerHTML = createElements(issueDetails.labels);
  
};

document.getElementById("btn-search").addEventListener("click", ()=>{
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
  .then(res => res.json())
  .then(data => {
    const allWords = data.data;
    console.log(allWords);
    const filterWords = allWords.filter(word =>word.title.toLowerCase().includes(searchValue));
    displayIssues(filterWords);
    selectStatus(allBtn);
  })
});

function selectStatus(activeBtn){
  [allBtn,openBtn,closeBtn].forEach( btn =>{
    btn.classList.remove('bg-[#422ad5]', 'text-white');
    btn.classList.add('bg-gray-100', 'text-black')
    
  });
    activeBtn.classList.remove('bg-gray-100', 'text-black')
    activeBtn.classList.add('bg-[#422ad5]', 'text-white');  
}


openBtn.addEventListener("click", async () => {
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");

  await new Promise(resolve => setTimeout(resolve, 200));

  const openIssues = allIssuesData.filter(issue => issue.status === "open");
  displayIssues(openIssues);

  loadingSpinner.classList.add("hidden");
  loadingSpinner.classList.remove("flex");
});

closeBtn.addEventListener("click", async () => {
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");
  await new Promise(resolve => setTimeout(resolve, 200));

  const closedIssues = allIssuesData.filter(issue => issue.status === "closed");
  displayIssues(closedIssues);

  loadingSpinner.classList.add("hidden");
  loadingSpinner.classList.remove("flex");
});

allBtn.addEventListener("click", async () => {
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");
  await new Promise(resolve => setTimeout(resolve, 200));
  
  displayIssues(allIssuesData);

  loadingSpinner.classList.add("hidden");
  loadingSpinner.classList.remove("flex");
});




