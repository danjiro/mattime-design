(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          UserController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav, $mdBottomSheet, $log, $mdConstant) {
    var self = this;

    self.members = [
      {
        name: "user1",
        rank: "blue",
        date: "March 3, 2015"
      },
      {
        name: "user3",
        rank: "white",
        date: "March 6, 2016"
      },
      {
        name: "user7",
        rank: "purple",
        date: "November 30, 2014"
      },
    ];
    self.order = "index"
    self.schools = [
      {
        name: "Dominance MMA",
        members: 5,
        address: "555 Victoria St, Abbotsford VIC 3067, Australia"
      },
      {
        name: "Marcelo Garcia Academy / NYC Jiu-Jitsu",
        members: 1,
        address: "  250 West 26th Street, New York, NY 10001, United States"
      },
      {
        name: "Art of Jiu Jitsu Academy",
        members: 3,
        address: "411 East 17th Street, Costa Mesa, CA 92627, United States"
      },
      {
        name: "Dominance MMA",
        members: 5,
        address: "555 Victoria St, Abbotsford VIC 3067, Australia"
      },
      {
        name: "Marcelo Garcia Academy / NYC Jiu-Jitsu",
        members: 1,
        address: "  250 West 26th Street, New York, NY 10001, United States"
      },
      {
        name: "Art of Jiu Jitsu Academy",
        members: 3,
        address: "411 East 17th Street, Costa Mesa, CA 92627, United States"
      },
      {
        name: "Dominance MMA",
        members: 5,
        address: "555 Victoria St, Abbotsford VIC 3067, Australia"
      },
      {
        name: "Marcelo Garcia Academy / NYC Jiu-Jitsu",
        members: 1,
        address: "  250 West 26th Street, New York, NY 10001, United States"
      },
      {
        name: "Art of Jiu Jitsu Academy",
        members: 3,
        address: "411 East 17th Street, Costa Mesa, CA 92627, United States"
      }
    ];
    self.session = {
      gi: false,
      matTimeHours: 1,
      matTimeMinutes: 0.75,
      notes: "Lorem ipsum dolor sit amet, ne quod novum mei. Sea omnium invenire mediocrem at, in lobortis conclusionemque nam. Ne deleniti appetere reprimique pro, inani labitur disputationi te sed. At vix sale omnesque, id pro labitur reformidans accommodare, cum labores honestatis eu. Nec quem lucilius in, eam praesent reformidans no. Sed laudem aliquam ne.\n\n Lorem ipsum dolor sit amet, ne quod novum mei. Sea omnium invenire mediocrem at, in lobortis conclusionemque nam. Ne deleniti appetere reprimique pro, inani labitur disputationi te sed. At vix sale omnesque, id pro labitur reformidans accommodare, cum labores honestatis eu. Nec quem lucilius in, eam praesent reformidans no. Sed laudem aliquam ne."
    };
    self.keys = [186, 188, 13];
    self.tags = ['Deep half', 'Reverse De la riva'];
    self.notes = "";
    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.toggleList   = toggleUsersList;
    self.makeContact  = makeContact;

    // Load all registered users

    userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);
            self.selected = users[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(selectedUser) {

        $mdBottomSheet.show({
          controllerAs  : "cp",
          templateUrl   : './src/users/view/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          parent        : angular.element(document.getElementById('content'))
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.user = selectedUser;
          this.actions = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.contactUser = function(action) {
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
