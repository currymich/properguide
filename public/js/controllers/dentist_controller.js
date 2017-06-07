function DentistController($http) {
  var self    = this;
  var server  = 'https://properguide-api.herokuapp.com';

  function get_dentists() {
    $http.get(`${server}/dentists`)
      .then(function(response) {
        self.all_dentists = response.data.dentists;
      });
  }

  get_dentists();

  this.get_dentists = get_dentists;
}
