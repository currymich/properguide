function DentistController($http, $state) {
  var self    = this;
  self.flash = ""
  var server  = 'https://properguide-api.herokuapp.com';

  function get_dentists() {
    $http.get(`${server}/dentists`)
      .then(function(response) {
        self.all_dentists = response.data.dentists;
      });
  }

  get_dentists();

  function update(dentist_id) {
    $http.patch(`${server}/dentists/${dentist_id}`, {dentist: {
        name: self.all_dentists.name,
        email: self.all_dentists.email,
        phone: self.all_dentists.phone,
        office_name: self.all_dentists.office_name,
        address: self.all_dentists.address,
        address_state: self.all_dentists.address_state,
        address_city: self.all_dentists.address_city,
        address_zip: self.all_dentists.address_zip,
        license_num: self.all_dentists.license_num}})
    .then(function(response) {
      if (response.data.status == 200) {
        self.flash = ""
        document.getElementById('dentist_update').innerHTML = "Profile Update Successful"
        self.all_dentists = response.data.dentist;
        $state.go('dentist', {dentist_id: response.data.dentist.id})
      } else {
        self.flash = "Bad Params"
      }
    })
  }

  this.update = update;
  this.get_dentists = get_dentists;
}
