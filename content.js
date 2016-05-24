/**
 * Created by П on 14.03.2016.
 */

// $('video').on('progress', function() {
//     this.currentTime
// });
//
function watchingVideo() {
    $('video').on('progress', function() {
        // this.currentTime
        chrome.runtime.sendMessage({currentTime: this.currentTime}, function(response) {});
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.startWatch) {
            watchingVideo();
        }
        if (request.currentTime) {
            console.log(request.currentTime);
            $('video')[0].currentTime = request.currentTime;
        }
        // console.log(request, sender, sendResponse);
    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    //   sendResponse({farewell: $('video').currentTime});
    });

// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//     console.log(response);
// });
