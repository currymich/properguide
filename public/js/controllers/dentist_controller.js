function DentistController($http, $state, $scope, $rootScope) {
  var self    = this;
  self.flash = ""
  var server  = 'https://properguide-api.herokuapp.com';

  function get_dentists() {
    $http.get(`${server}/dentists`)
      .then(function(response) {
        $rootScope.all_dentists = response.data.dentists;
      });
  }

  get_dentists();

  function update(dentist_id) {
    $http.patch(`${server}/dentists/${dentist_id}`, {dentist: {
        name: $rootScope.all_dentists.name,
        email: $rootScope.all_dentists.email,
        phone: $rootScope.all_dentists.phone,
        office_name: $rootScope.all_dentists.office_name,
        address: $rootScope.all_dentists.address,
        address_city: $rootScope.all_dentists.address_city,
        address_state: $rootScope.all_dentists.address_state,
        address_zip: $rootScope.all_dentists.address_zip,
        license_num: $rootScope.all_dentists.license_num}})
    .then(function(response) {
      if (response.data.status == 200) {
        self.flash = ""
        document.getElementById('dentist_update').innerHTML = "Profile Update Successful"
        $rootScope.all_dentists = response.data.dentist;
        $state.go('orders')
      } else {
        self.flash = "Bad Params"
      }
    })
  }

  this.update = update;
  this.get_dentists = get_dentists;
}
