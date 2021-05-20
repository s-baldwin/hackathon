// // Initialize button with users's prefered color
let muteTabs = document.getElementById("muteTabs");
let muteSingleTab = document.querySelectorAll("#single-button");

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
  let count = 0;
  allTabs.forEach((tab) => {
    // init var ul = select ul
    let tabID = tab.id;
    let ul = document.querySelector("ul");
    // init listItem = documentCreaEl("li")
    let listItem = document.createElement("li");
    // listItem = innerHTML(tab.title)
    let singleButton = document.createElement("button");
    // listItem.innerHTML("tab.title");
    singleButton.setAttribute("id", tabID);
    singleButton.setAttribute(
      "onclick",
      toggleSingleTab(Number(singleButton.id))
    );
    let textnode = document.createTextNode(tab.title);
    // listItem.setArrtribute("class='tab-item'")
    listItem.appendChild(textnode);
    listItem.appendChild(singleButton);
    // listItem.setArrtribute
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
