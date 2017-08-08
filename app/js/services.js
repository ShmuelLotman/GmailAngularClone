(function() {
app.factory('Thread', function($resource) {
  return  $resource('partials/threads/:id.json', {id: 'index'});
})
app.factory('Flash', function() {
    return {message: ''}
});
app.service('sentMessagesService', function() {
    var sentMessages = [];
    this.addSentMessage = function(message) {
        sentMessages.unshift(message);
    };
    this.getMessages = function() {
        return sentMessages;
    };
});
app.service('selectAllMessages', function() {
    return function(inputThread) {
        for(var i=0; i<inputThread.length; i++) {
            var thrd = inputThread[i];
            thrd.selected = true;
        }
    }
})
}).call(this);


