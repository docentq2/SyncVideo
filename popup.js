/**
 * Created by П on 20.03.2016.
 */

$('#stream_on').click(() => {
    chrome.runtime.sendMessage({type: 'stream'}, function(response) {});
});



$('#sync').click(() => {
    chrome.runtime.sendMessage({type: 'sync'}, function(response) {});
});
