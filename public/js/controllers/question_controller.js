function QuestionController($http) {
  var self = this;
  var server  = 'https://properguide-api.herokuapp.com';

  function submit(question) {
    $http.post(`${server}/questions`, { question })
      .then(function(response) {
        var form = document.getElementById('question_form');
        form.innerHTML = '<br><h3>Your question has been submitted!</h3>'
      });
  }

  this.submit = submit;
}
