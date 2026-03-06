

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

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then(res => res.json())
.then(data => displayIssues(data.data))

function displayIssues(issues){
    console.log(issues)
    allIssues.innerHTML = "";
    issues.forEach(issue =>{
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
        card.className = "py-4 border border-gray-200 rounded-lg shadow-sm";
        card.innerHTML= `
        <div class="">
                <div class="flex justify-between items-center px-4">
                    <img src="./assets/Open-Status.png" alt="">
                    <p class="${bgColor} py-1 px-3 font-medium text-xs rounded-md uppercase ${textColor}">${issue.priority}</p>
                </div>
                <h2 class="font-semibold text-xl mt-4 px-4">${issue.title}</h2>
                <p class="text-gray-500 text-sm mt-1 px-4">${issue.description}</p>
                <div class="flex items-center gap-3 mt-4 pb-4 border-b border-b-gray-300">
                   <div class="px-4 flex gap-2">
                   ${createElements(issue.labels)}
                   </div>
                </div>
                <p class="text-sm text-gray-500 mt-3 px-4">${issue.author}</p>
                <p class="text-sm text-gray-500 mt-1 px-4">${issue.createdAt}</p>
            </div>
        `;
       
        allIssues.appendChild(card);
    });
}

