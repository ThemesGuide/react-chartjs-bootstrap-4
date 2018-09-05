const helpers = {
  getRandomInt(min, max) {
    var rand = Math.floor(Math.random() * (max - min + 1)) + 1;
    return rand;
  },

  getRandomArr(len, min, max) {
    var arr = [];
    for (var i = 0; i < len; i++) {
      //console.log(i);
      arr.push(helpers.getRandomInt(min, max));
    }
    return arr;
  }
};

export default helpers;
