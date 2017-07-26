(function () {
  'use strict';

  angular
    .module('core')
    .controller('UserController', UserController)
    .controller('IndexController', IndexController)
    .controller('LoginController', LoginController)
    .controller('DashboardController', DashboardController)
    .controller('FeedController', FeedController)
    .controller('ProfileController', ProfileController)
    .controller('ProfileEditController', ProfileEditController)
    .controller('FavoritesController', FavoritesController)
    .controller('RecentActivitiesController', RecentActivitiesController)
    .controller('SocialAuthController', SocialAuthController)
    .controller('ChatsController', ChatsController)
  ;

  function UserController ($scope, AuthService) {
    var self = this;

    self.AuthService = AuthService;
  };

  function RecentActivitiesController ($scope, AuthService) {
    var self = this;
  };

  function IndexController ($scope) {
    var self = this;
  };

  function LoginController ($scope, AuthService) {
    var self = this;

    /* LOGIN FORM
     */
    self.signin = function (data) {
      AuthService.login(data).then(
        function (resp) {
          // successfully logged in
          window.location.href="/";
        },
        function (resp) {
          // error
          console.log(resp);
        }
      );
    };

  }; // END OF LOGIN CONTROLLER

  ///////////////////////////////
  /* SOCIAL ACCOUNT CONTROLLER */
  ///////////////////////////////

  function SocialAuthController () {
    window.location.reload();
  }

  function DashboardController ($scope, $uibModal, AuthService, TEMPLATE_URL, BookService) {
    var self = this;

    $scope.featuredBooks = [];

    // Fetch featured books from the API
    BookService.featuredBooks().then(function (response) {
      $scope.featuredBooks = response.data;
    }, function (response) {
      $scope.featuredBooks = [];
    });

    $scope.onBookDetailClick = function () {
      var bookDetailModal = {
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: TEMPLATE_URL + 'users/modals/book-detail-modal.html',
        controllerAs: 'ctrl',
        size: 'lg',
        backdrop: false,
        controller: function($scope, $uibModalInstance) {
          var ctrl = this;

          ctrl.book = {
            title: 'The Shining',
            author: 'Stephen King',
            description: 'A book.'
          }

          // Favorite book
          // Read book

          ctrl.cancel = function () {
            $uibModalInstance.close();
          };
        }
      }

      $uibModal.open(bookDetailModal);
    }
  };

  function FeedController ($scope, $rootScope, FeedService, AuthService,  $uibModal) {
    var self = this;

    self.AuthService = AuthService;
    self.feeds = [];

    self.actionText = {
      add      : "Published a new book",
      update   : "Updated the book",
      follow   : "Followed",
      favorite : "Favorited the book"
    };

    FeedService.feed().then(function (resp) {
      self.feeds = resp.data;
    });
    

    FeedService.comment().then(function(resp){
      self.comments = resp.data;
    });

    // $scope.limit = -3;

    // $scope.showMoreItems = function() {
    //   _.each(self.comments, function(comment){
    //     $scope.limit = comment.children.length;
    //   });


    // };
  
    $scope.addcomment = undefined;
    $scope.addChildComment = undefined;

    $scope.addComment = function(feedId, form) {
        FeedService.addComment(feedId, form).then(function(resp){
          form.comment = '';  // reset comment

          var data = resp.data;
          data.children = [];
          self.comments.push(data);
      });
    };

    $scope.addChildComment = function(parent, feedId, form) {
        form.parent = parent
        FeedService.addComment(feedId, form).then(function(resp){
          form.comment = '';  // reset comment

          var data = resp.data;
          _.each(self.comments, function(comment){
            if (comment.id == parent) {
              comment.children.push(data);
            }
          });
      });
    };

    $scope.editComment = function(feedId, commentId, form){
      FeedService.updateComment(feedId, commentId, form).then(function(resp){
        $scope.form = {}
        self.edited = false;
        self.editedChild = false;
        self.childCommentId = undefined;
        self.commentId = undefined;
      });
    }

    self.reply = false;
    self.comId = undefined;
    $scope.replyComment = function(commentId){
      self.comId = commentId;
      self.reply = true;
    }

    self.edited = false;
    self.commentId = undefined;
    $scope.updateComment = function(commentId){
      self.commentId = commentId;
      self.edited = true;
    }

    self.editedChild = false;
    self.childCommentId = undefined
    $scope.updateChildComment = function(commentId){
      self.childCommentId = commentId;
      self.editedChild = true;
    }

    self.confirmDelete = function (feedId, commentId) {
      $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'deleteFeedComment.html',
        controllerAs: 'ctrl',
        size: 'md',
        backdrop: false,
        controller: function($scope, $uibModalInstance) {
          var ctrl = this;


          ctrl.deleteComment = function() {
            $uibModalInstance.close();
            FeedService.deleteComment(feedId, commentId).then(function(resp){
              var x = self.comments.find(function(comment){
                  return comment.id == commentId;
              });

              var index = self.comments.indexOf(x);
              if (index === -1) return;
              self.comments.splice(index, 1);
             
            });
          };

          ctrl.cancel = function () {
            $uibModalInstance.close();
          };
        }   
      });
    };


    self.confirmDeleteChild = function (feedId, commentId) {
      $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'deleteChildComment.html',
        controllerAs: 'ctrl',
        size: 'md',
        backdrop: false,
        controller: function($scope, $uibModalInstance) {
          var ctrl = this;

          ctrl.deleteChildComment = function() {
            $uibModalInstance.close();
            FeedService.deleteComment(feedId, commentId).then(function(resp){             
              _.each(self.comments, function(comment){
                var x = comment.children.find(function(child){
                    return child.id == commentId;
                });
                
                var index = comment.children.indexOf(x);
                if (index === -1) return;
                comment.children.splice(index, 1);

              });
            });
          };

          ctrl.cancel = function () {
            $uibModalInstance.close();
          };
        }   
      });
    };
           
  }; // END OF FEED CONTROLLER


  function SearchController ($scope) {
    var self = this;

    
  };

  function ProfileController ($scope, $stateParams,  AuthService, BookService) {
    var self = this;

    self._ = _;
    self.AuthService = AuthService;

    self.user = undefined;
    self.relatedBooks = [];


    /* GET RELATED BOOKS LIST
     */
    BookService.related().then(function(resp){
      self.relatedBooks = _.shuffle(resp.data);
    });


    // owl carousel config
    var owlAPi;
    $scope.properties = {
        animateIn: 'fadeIn',
        lazyLoad: true,
        items: 5,
        dots: false
    };

    $scope.ready = function ($api) {
        owlAPi = $api;
    };


    /* GET USER DETAILS
     */
    AuthService.detail($stateParams.handle).then(
      function (resp) {
        // successfully retrieved the data
        self.user = resp.data;

        /* GET BOOKS LIST
         */
        BookService.list({author:self.user.id}).then(function (resp) {
          self.books = resp.data;
        });
      },
      function (resp) {
        console.log(resp);
        // error.
        // TODO: redirect to 404 page
      }
    );

    /* follow/unfollow user
     */
    self.follow = function (id) {
      if (_.contains(self.user.fans, self.AuthService.auth.id)) {
        self.user.fans = _.without(self.user.fans, self.AuthService.auth.id);
      } else {
        self.user.fans.push(self.AuthService.auth.id);
      }
      
      AuthService.follow(id);
    };

    self.favorite = function (book) {
      if (_.contains(book.interested, self.AuthService.auth.id)) {
        book.interested = _.without(book.interested, self.AuthService.auth.id);
      } else {
        book.interested.push(self.AuthService.auth.id);
      };

      BookService.favorite(book.id);
    };

  }; // END OF PROFILE CONTROLLER

  function ProfileEditController ($scope, AuthService, Notification) {
    var self = this;

    $scope.profile = true;
    $scope.personal = true;

    self.AuthService = AuthService;
    self.user = AuthService.auth;
    self.user.birthday = moment(self.user.birthday).toDate();

    self.updateProfile = function (form) {
      var data = angular.copy(form);
      if (form.birthday!=null) {
        data.birthday = moment(data.birthday).format('YYYY-MM-DD');
      }

      if (data.birthday=="Invalid date") {
        data.birthday = null;
      }

      AuthService.update(data).then(function (resp) {
        //succesfully updated
        Notification.success('Profile succesfully updated.');
      });
    };

    self.resetPassword = function (form) {
      AuthService.resetPassword(form)
        .then(function (resp) {
          //succesfully password reset
          Notification.success('Password has been succesfully changed.');
          $scope.password_incorrect = false;
          $scope.changepw = false;
          $scope.account = true;
          $scope.form = '';
      })
        .catch(function (err) {
          //password incorrect
          if (err.data='incorrect') {
            $scope.password_incorrect = true;
          }
          Notification.error({message: 'Change password failed.', delay: 1000});
      });
    };

    self.updatePhoto = function (data) {
      AuthService.updatePhoto(data).then(function (resp) {
        //succesfully uploaded
        self.user.image = resp.data.image;
      });
    };

    self.updateCover = function (data) {
      AuthService.updatePhoto(data).then(function (resp) {
        //succesfully uploaded
        self.user.cover = resp.data.cover;
      });
    };

    self.cancel = function () {
      //cancel profile update
      AuthService.reloadUser().then (function () {
        self.user = AuthService.auth;
      });
    };

  };

  function FavoritesController ($scope, $stateParams, AuthService, BookService) {
    var self = this;

    self.AuthService = AuthService;

    self.books = [];

    /* GET USER DETAILS
     */
    AuthService.detail($stateParams.handle).then(
      function (resp) {
        // successfully retrieved the data
        self.user = resp.data;

        /* GET BOOKS LIST
         */
        BookService.list({interested__in:self.user.id}).then(function (resp) {
          self.books = resp.data;
        });
      },
      function (resp) {
        console.log(resp);
        // error.
        // TODO: redirect to 404 page
      }
    );

  };

  function ChatsController ($scope, AuthService, MessageService) {
    var self = this;

    self.AuthService = AuthService;
    self.MessageService = MessageService;

    self.user = AuthService.auth;

    // TODO: Make the messages in this list dynamic
    self.messages = [];

    self.message = {
      user_from: self.user.id,
    }

    self.onMessageResolve = function (response) {
      // Append the message to the UI here
      console.log('Request accepted:', response)
      var message = response.data;

      // Format date to human-readable format
      message.date_created = moment(message.date_created).format('YYYY-MM-DD');

      // Add the response to the message list
      self.messages.push(response.data);
    }

    self.onMessageReject = function (xhr) {
      // Show an error message here
      console.log('Request rejected:', xhr)
    }

    self.onSubmitMessage = function (form) {
      self.MessageService.sendMessage(self.message).then(function (response) {
        self.onMessageResolve(response)
      }, function (xhr) {
        self.onMessageReject(xhr);
      })
    }
  };

})();