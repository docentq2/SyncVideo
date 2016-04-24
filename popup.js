/**
 * Created by П on 20.03.2016.
 */

chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        if (sender.id == blacklistedExtension)
            return;  // don't allow this extension access
        else if (request.getTargetData)
            sendResponse({targetData: targetData});
        else if (request.activateLasers) {
            var success = activateLasers();
            sendResponse({activateLasers: success});
        }
    });

// For long-lived connections:
chrome.runtime.onConnectExternal.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
       console.log(msg);
    });
});
$('#activate-sync').click(() => {
    //chrome.storage.sync.set({'value': $('#test').val()});
    //chrome.storage.sync.get("value", function (obj) {
    //    console.log(obj);
    //});
    var laserExtensionId = "abcdefghijklmnoabcdefhijklmnoabc";
    chrome.runtime.sendMessage(laserExtensionId, {getTargetData: true},
    function(response) {
        if (targetInRange(response.targetData))
            chrome.runtime.sendMessage(laserExtensionId, {activateLasers: true});
    });

});