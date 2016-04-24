/**
 * Created by П on 14.03.2016.
 */

$('video').on('progress', function() {
    this.currentTime
});

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
