function DueDate() {

  return function(input) {

    var diff =  Math.floor(( Date.parse(input) - Date.now() ) / 86400000);

    var out = "";

    if (diff < 2) {
      out = '#f99';
    } else if (diff <= 4) {
      out = '#fc9';
    } else if (diff <= 7){
      out = '#ffc';
    } else {
      out = 'white'
    }

    return out;
  }

};
