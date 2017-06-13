function DueDate() {

  return function(input) {

    //# of days between due date and now
    var days_remaining =  Math.floor(( Date.parse(input) - Date.now() ) / 86400000);

    var out = "";

    if (days_remaining < 2) {
      out = '#f99';
    } else if (days_remaining <= 4) {
      out = '#fc9';
    } else if (days_remaining <= 7){
      out = '#ffc';
    } else {
      out = 'white'
    }

    return out;
  }

};
