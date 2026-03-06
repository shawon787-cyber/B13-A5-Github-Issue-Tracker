const allIssues = document.getElementById("all-issues");

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then(res => res.json())
.then(data => displayIssues(data.data))

function displayIssues(issues){
    console.log(issues)
    allIssues.innerHTML = "";
    issues.forEach(issue =>{
        const card = document.createElement("div");
        card.className = "py-4 border border-gray-200 rounded-lg shadow-sm";
        card.innerHTML= `
        <div class="">
                <div class="flex justify-between items-center px-4">
                    <img src="./assets/Open-Status.png" alt="">
                    <p class="bg-red-200 py-1 px-3 font-medium text-xs text-red-600 rounded-md uppercase">${issue.priority}</p>
                </div>
                <h2 class="font-semibold text-xl mt-4 px-4">${issue.title}</h2>
                <p class="text-gray-500 text-sm mt-1 px-4">${issue.description}</p>
                <div class="flex items-center gap-3 mt-4 pb-4 border-b border-b-gray-300">
                    <div class="flex items-center justify-center gap-1 bg-red-200 py-1 px-3 rounded-md ml-4">
                        <img src="./assets/Vector (2).png" alt="">
                        <p class="text-xs text-red-500 font-medium uppercase">${issue.labels[0]}</p>
                    </div>
                    <div class="flex items-center justify-center gap-1 bg-yellow-100 py-1 px-3 rounded-md mr-4">
                        <img src="./assets/Vector (3).png" alt="">
                        <p class="text-xs text-yellow-600 font-medium uppercase">${issue.labels[1]}</p>
                    </div>
                </div>
                <p class="text-sm text-gray-500 mt-3 px-4">${issue.author}</p>
                <p class="text-sm text-gray-500 mt-1 px-4">${issue.createdAt}</p>
            </div>
        `;
        allIssues.appendChild(card);
    })
}