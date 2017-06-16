function DueDate() {

  return function(input) {

    //# of days between due date and now
    var days_remaining =  Math.floor(( Date.parse(input) - Date.now() ) / 86400000);

    var highlight_color = "";

    if (days_remaining < 0) {
      highlight_color = '#cff';
    } else if (days_remaining < 2) {
      highlight_color = '#f99';
    } else if (days_remaining <= 4) {
      highlight_color = '#fc9';
    } else if (days_remaining <= 7){
      highlight_color = '#ffc';
    } else {
      highlight_color = 'white'
    }

    return highlight_color;
  }

};
