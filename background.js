/**
 * Created by П on 14.03.2016.
 */

 chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
     console.log(sender.tab ?
                 "from a content script:" + sender.tab.url :
                 "from the extension");
     if (request.greeting == "hello")
       sendResponse({farewell: "goodbye"});
   });
