// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  //console.log('Turning ' + tab.url + ' red!');
  
  console.log("hello from background");
  
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});
