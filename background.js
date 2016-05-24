/**
 * Created by П on 14.03.2016.
 */

var messagesRef = new Firebase('https://sizzling-torch-7507.firebaseio.com');

function listenServer() {
    messagesRef.child("alanisawesome").limitToLast(1).on('child_added', function (snapshot) {
        //GET DATA
        var data = snapshot.val();
        var currentTime = data.currentTime;


        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log('tabs', tabs);
            if (!tabs.length) return;

            chrome.tabs.sendMessage(tabs[0].id, {currentTime: currentTime}, function(response) {});
        });
    });
}

// Слушает что пришло из popup.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log('request', request);
        // console.log('sendResponse', sendResponse);
        // sendResponse({g:'bb'});
        // console.log('sender', sender);

        // messagesRef.child("alanisawesome").push({text:'привет'});
        // console.log('request', request);
        //
        if (request.type == 'stream') {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (!tabs.length) return;

                chrome.tabs.sendMessage(tabs[0].id, {startWatch: true}, function(response) {});
            });
        } else if (request.type == 'sync') {
            listenServer();
        } else if (request.currentTime) {
            messagesRef.child("alanisawesome").push({currentTime:request.currentTime});
        }
    });
