// // Initialize button with users's prefered color
let muteTabs = document.getElementById("muteTabs");
let muteSingleTab = document.querySelectorAll("#single-button");
let wow = new Audio("images/wow.mp3");
wow.volume = 0.2;
// muteSingleTab.addEventListener("click", async () => {
//   // console.log(allTabs[i]);
//   toggleSingleTab(parseInt(Number(muteSingleTab.id)));
// });

// //new function - toggleSingleTab

function toggleSingleTab(tabId) {
  chrome.tabs.get(tabId, async (tab) => {
    let muted = !tab.mutedInfo.muted;
    await chrome.tabs.update(tabId, { muted });
    console.log(`Tab ${tab.id} is ${muted ? "muted" : "unmuted"}`);
  });
}

document.body.appendChild(muteTabs);

let allTabs = [];

chrome.tabs.query({}, (tabs) => {
  allTabs = tabs;
  displayTabs();
});

muteTabs.addEventListener("click", async () => {
  for (let i = 0; i < allTabs.length; i++) {
    // console.log(allTabs[i]);
    toggleMuteState(parseInt(allTabs[i].id));
    //toggleIndivState(parseInt(tabId))
  }
  wow.play();
});

//
function toggleMuteState(tabId) {
  chrome.tabs.get(tabId, async (tab) => {
    // if (it muted)
    // let muted = !tab.mutedInfo.muted;
    await chrome.tabs.update(tabId, { muted: true });
  });
}

//for creating a list of tabs
// let allTabs = [];

// chrome.tabs.query({}, tabs => {
//     allTabs = tabs;
//     displayTabs();
// });
function displayTabs() {
  allTabs.forEach((tab) => {
    let tabID = tab.id;
    let ul = document.querySelector("ul");
    let listItem = document.createElement("li");

    let horizontal = document.createElement("hr");
    // horizontal.style.color = "white";
    let singleButton = document.createElement("button");
    singleButton.id = "tab-buttons";
    singleButton.addEventListener("click", async () => {
      toggleSingleTab(tabID);
    });
    let textnode = document.createTextNode(tab.title);
    // textnode.style.color = "white";
    listItem.appendChild(textnode);
    listItem.appendChild(singleButton);
    listItem.appendChild(horizontal);
    ul.appendChild(listItem);

    // .document
    //   .querySelector("ul")
    //   .append("<li class='tab-item'>" + tab.id + " - " + tab.title + "</li>");
  });
}
//<button onclick=`myFunction(${tab.id})`>Click me</button>
//* <a href='#' class='close-tab' id="+ tab.id +"></a>Close tab</a> */
// <button id=`${tab.id}` class='single-button'>

// chrome.tabs.getSelected(null, function(tab{
//   //DO WHATEVER YOU WANT BETWEEN HERE,
//   let id=tab.id
//   alert(tab.id)
//   //AND HERE.
//   }))
