(function() {
  app.controller('ThreadsController', function($rootScope,$scope, $http, Thread, selectAllMessages, $location, $route) {
    $scope.threads = [];
    $scope.$route = $route;
  Thread.query(function(threads) {
      $scope.threads = threads;
      $scope.page = {
          from: 1,
          to: threads.length,
          count: threads.length
      }
   var selected = false;
   $scope.selectAll = function() {
       if($location.path() == '/sent') {
           selectAllMessages($rootScope.allSentThreads)
       } else {
           selectAllMessages($scope.threads)
       }
       
   };
   $scope.selectNone = function() {
       for(var i = 0; i < $scope.threads.length; i++) {
           var thread = $scope.threads[i];
           thread.selected = false;
           selected = false;
       }
   }
   $scope.selectUnread = function() {
      for(var i = 0; i < $scope.threads.length; i++) {
          var thread = $scope.threads[i];
           thread.selected = thread.unread;
       }
   }
   $scope.selectRead = function() {
       for(var i = 0; i < $scope.threads.length; i++) {
           var thread = $scope.threads[i];
           thread.selected = !thread.unread;
       }
   }
   $scope.someSelected = function() {
       if($location.path() == '/inbox') {
       for(var i = 0; i < $scope.threads.length; i++) {
           var thread = $scope.threads[i];
           selected = false;

           if(thread.selected && thread.unread == false) {
              $scope.unreadOrRead = "Mark as unread"
              return selected = true;
           }
           if(thread.selected && thread.unread == true) {
               $scope.unreadOrRead = "Mark as read"
               return selected = true;
           }
       }
     } else {
         if($rootScope.allSentThreads) {
         for(var i = 0; i < $rootScope.allSentThreads.length; i++) {
             var sntThrd = $rootScope.allSentThreads[i];
             selected = false;
             if(sntThrd.selected && sntThrd.unread == false) {
              $scope.unreadOrRead = "Mark as unread"
              return selected = true;
           }
           if(sntThrd.selected && sntThrd.unread == true) {
               $scope.unreadOrRead = "Mark as read"
               return selected = true;
           }
         }
         }
     }
       
   }
   $scope.noneSelected = function() {
       return !$scope.someSelected();
   }
   $scope.allSelected = function() {
       if($scope.threads.length == 0) {
           return false;
       } else {
           selected = true;
           for(var thread in $scope.threads) {
               if(!thread.selected) {
                  return selected = false;
               }
           }
       }
   }
   $scope.selectToggle = function() {
       if($scope.someSelected()) {
           $scope.selectNone();
       } else {
           $scope.selectAll();
       }
   }
      
  })
  $scope.selectedThread = function(thingy) {
      if(thingy.unread) {
                thingy.unread = !thingy.unread;
      }

  }

  $scope.composeMessage = function() {
      $rootScope.$broadcast('composeMessage')
  }
  $scope.changeActive = function(thisclass) {
      angular.element(thisclass).toggleClass('hello')
  }
  $scope.markAllRead = function() {
      if($location.path() == '/sent') {
          for(var i = 0; i<$rootScope.allSentThreads.length; i++) {
              sntThrd = $rootScope.allSentThreads[i];
              if(sntThrd.unread == true) {
                  sntThrd.unread = !sntThrd.unread;
              }
          }
      } else {
          for(var i = 0; i<$scope.threads.length; i++) {
              var thrd = $scope.threads[i];
              if(thrd.unread = true) {
                  thrd.unread = !thrd.unread;
              }
          }
      }
  }
  $scope.markReadOrUnread = function() {
      if($location.path() == '/sent') {
          for(var i = 0; i<$rootScope.allSentThreads.length; i++) {
              sntThrd = $rootScope.allSentThreads[i];
              if(sntThrd.selected == true) {
                  sntThrd.unread = !sntThrd.unread;
              }
          }
      } else {
          for(var i = 0; i<$scope.threads.length; i++) {
              var thrd = $scope.threads[i];
              if(thrd.selected == true) {
                  thrd.unread = !thrd.unread;
              }
          }
      }
  }
  });
  app.controller('ThreadController', function($scope, $http, $routeParams, Thread) {
      $scope.thread = {}
      $scope.lastMessage = '';
      $scope.toggleActive;
  Thread.get({ id: $routeParams.id}, function(thread) {
      $scope.thread = thread;
      $scope.lastMessage = thread.messages[thread.messages.length-1];
      $scope.lastMessage.active = true;
      
           $scope.toggleActive = function(message) {
       if(message != $scope.lastMessage) {
           message.active = !message.active;
       }
   }
               $scope.toggleActive($scope.thread.messages);
    
  })
  })
  app.controller('ComposeController', function($rootScope, $scope, Flash, $timeout,sentMessagesService) {
      $scope.visible = false;
      $scope.messageId = 0;
      $scope.sentMessages = [];
      $rootScope.$on('composeMessage', function() {
          $scope.visible = true;
          $scope.active_section = 'to';
      });
      $scope.close = function() {
          $scope.reset();
      };
      $scope.send = function() {
          var x = $scope.message;
          x.created_at = new Date().getTime();
          x.unread = false;
          x.selected = false;
          x.starred = false;
          sentMessagesService.addSentMessage(x);
          $scope.reset();
          Flash.message = 'Sending...';
          function removeFlash() {Flash.message = '';}
          $timeout(removeFlash, 1000);
      }
      $scope.reset = function() {
          $scope.visible = false;
          $scope.cc_active = false;
          $scope.bcc_active = false;
          $scope.active_section = null;
          $scope.message = {
              from: currentUser.accounts[0]
          }
      
      }
      $scope.message = {
        from: currentUser.accounts[0],
        to: '',
        cc: '',
        bcc: '',
        message: '',
        body: '',
        id: ++$scope.messageId,
    }
  });
 app.controller('FlashController', function($scope, Flash) {
     $scope.flash = Flash;
 })
 app.controller('SentController', function($rootScope, $scope, sentMessagesService) {
     $scope.sentMsgsArr = sentMessagesService.getMessages();
     if($scope.sentMsgsArr.length > 0 && $scope.sentMsgsArr[0].created_at == null) {
         $scope.sentMsgsArr[0].created_at = new Date().getTime().toString()
     }
     $rootScope.allSentThreads = $scope.sentMsgsArr;
     $scope.selectAll = function() {selectAllMessages($scope.sentMsgsArr)};
     
 })
}).call(this);
