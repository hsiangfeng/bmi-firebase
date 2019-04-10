"use strict";

var config = {
  apiKey: 'AIzaSyBcPs6BK07utWcbABZM6MPMe3jqA0QII4Q',
  authDomain: 'bmi-learn.firebaseapp.com',
  databaseURL: 'https://bmi-learn.firebaseio.com',
  projectId: 'ㄖmi-learn',
  storageBucket: 'bmi-learn.appspot.com',
  messagingSenderId: '585806415748'
};
firebase.initializeApp(config);
var dataRef = firebase.database().ref('bmi');
var btncountId = document.getElementById('btn-count');
var indexList = document.querySelector('.bmiResultList');
btncountId.addEventListener('click', bmiFu);
indexList.addEventListener('click', deleteData);
var fireData = [];
dataRef.orderByChild('timestamp').on('value', function (snapshot) {
  fireData.length = 0;
  snapshot.forEach(function (item) {
    var origin = item.val();
    origin.key = item.key;
    fireData.push(origin);
  });
  updataLiet(fireData.reverse());
  console.log(fireData);
});

function bmiFu(e) {
  e.preventDefault();
  var cmId = document.getElementById('cm').value;
  var kgId = document.getElementById('kg').value;
  var genderId = document.getElementById('gender').value;
  var meter = cmId / 100;
  var bmiCountResult = (kgId / (meter * meter)).toFixed(2);
  var time = new Date();
  var BMIdata = {
    cm: cmId,
    kg: kgId,
    gender: genderId,
    bmiResult: bmiCountResult,
    timestamp: time.getTime()
  };

  if (analysisBMI(bmiCountResult) !== 'ERROR') {
    btnColor(analysisBMI(bmiCountResult), bmiCountResult);
    dataRef.push(BMIdata);
  }
}

function btnColor(item, bmi) {
  var str = '';
  var outer = '';
  var btn = '';

  switch (item) {
    case '體重過輕':
      outer = 'btn-primary-border';
      btn = 'bg-primary';
      break;

    case '正常範圍':
      outer = 'btn-success-border';
      btn = 'bg-success';
      break;

    case '過重':
      outer = 'btn-warning-border';
      btn = 'bg-warning';
      break;

    case '輕度肥胖':
      outer = 'btn-warning-border';
      btn = 'bg-warning';
      break;

    case '中度肥胖':
      outer = 'btn-danger-border';
      btn = 'bg-danger';
      break;

    case '重度肥胖':
      outer = 'btn-danger-border';
      btn = 'bg-danger';
      break;

    default:
      console.log('生成按鈕錯誤');
      break;
  }

  str += "<a class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column ".concat(outer, "\" href=\"#\">\n                        <h5 class=\"m-0\">").concat(item, "</h5>\n                        <small>BMI-").concat(bmi, "</small>\n                        <div class=\"rounded-circle btn-redo d-flex justify-content-center align-items-center ").concat(btn, " text-white\"><i class=\"fas fa-redo rounded-circle\"></i></div>\n                    </a>");
  btncountId.innerHTML = str;
}

function analysisBMI(item) {
  switch (true) {
    case item < 18.5:
      return '體重過輕';

    case item >= 18.5 && item < 24:
      return '正常範圍';

    case item >= 24 && item < 27:
      return '過重';

    case item >= 27 && item < 30:
      return '輕度肥胖';

    case item >= 30 && item < 35:
      return '中度肥胖';

    case item >= 35:
      return '重度肥胖';

    default:
      return 'ERROR';
  }
}

function deleteData(e) {
  e.preventDefault();

  if (e.target.tagName !== 'A') {
    return;
  }

  var str = e.target.dataset.index;
  dataRef.child(str).remove();
  updataLiet();
}

function updataLiet(data) {
  var str = '';

  for (var item in data) {
    switch (true) {
      case data[item].bmiResult < 18.5:
        str += "<div class=\"form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-primary my-4 border-5\">\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <img class=\"img-fluid\" src=\"./images/BMICLogo.png\" alt=\"\" srcset=\"\" />\n                            </div>\n                            <div class=\"col-md-4 form-group\">\n                                <p>\u8EAB\u9AD8(CM)\uFF1A".concat(data[item].cm, "</p>\n                                <p>\u9AD4\u91CD(KG)\uFF1A").concat(data[item].kg, "</p>\n                                <p>\u6027\u5225\uFF1A").concat(data[item].gender, "</p>\n                                <p>\u7D00\u9304\u6642\u9593\uFF1A").concat(getDataTime(data[item].timestamp), "</p>\n                            </div>\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <div class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-primary-border\" href=\"#\" id=\"btn-count\">\n                                    <h4 class=\"m-0\">").concat(data[item].bmiResult, "</h4>\n                                    <small>BMI</small>\n                                </div>\n                                <br/>\n                                <a class=\"btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center\" id=\"btn-dele\" data-index=\"").concat(data[item].key, "\" href=\"#\"/>\u522A\u9664</a>\n                            </div>\n                        </div>");
        indexList.innerHTML = str;
        break;

      case data[item].bmiResult >= 18.5 && data[item].bmiResult < 24:
        str += "<div class=\"form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-success my-4 border-5\">\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <img class=\"img-fluid\" src=\"./images/BMICLogo.png\" alt=\"\" srcset=\"\" />\n                            </div>\n                            <div class=\"col-md-4 form-group\">\n                                <p>\u8EAB\u9AD8(CM)\uFF1A".concat(data[item].cm, "</p>\n                                <p>\u9AD4\u91CD(KG)\uFF1A").concat(data[item].kg, "</p>\n                                <p>\u6027\u5225\uFF1A").concat(data[item].gender, "</p>\n                                <p>\u7D00\u9304\u6642\u9593\uFF1A").concat(getDataTime(data[item].timestamp), "</p>\n                            </div>\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <div class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-success-border\" href=\"#\" id=\"btn-count\">\n                                    <h4 class=\"m-0\">").concat(data[item].bmiResult, "</h4>\n                                    <small>BMI</small>\n                                </div>\n                                <br/>\n                                <a class=\"btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center\" id=\"btn-dele\" data-index=\"").concat(data[item].key, "\"/>\u522A\u9664</a>\n                            </div>\n                        </div>");
        indexList.innerHTML = str;
        break;

      case data[item].bmiResult >= 24 && data[item].bmiResult < 27:
        str += "<div class=\"form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-warning my-4 border-5\">\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <img class=\"img-fluid\" src=\"./images/BMICLogo.png\" alt=\"\" srcset=\"\" />\n                            </div>\n                            <div class=\"col-md-4 form-group\">\n                                <p>\u8EAB\u9AD8(CM)\uFF1A".concat(data[item].cm, "</p>\n                                <p>\u9AD4\u91CD(KG)\uFF1A").concat(data[item].kg, "</p>\n                                <p>\u6027\u5225\uFF1A").concat(data[item].gender, "</p>\n                                <p>\u7D00\u9304\u6642\u9593\uFF1A").concat(getDataTime(data[item].timestamp), "</p>\n                            </div>\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <div class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-warning-border\" href=\"#\" id=\"btn-count\">\n                                    <h4 class=\"m-0\">").concat(data[item].bmiResult, "</h4>\n                                    <small>BMI</small>\n                                </div>\n                                <br/>\n                                <a class=\"btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center\" id=\"btn-dele\" data-index=\"").concat(data[item].key, "\"/>\u522A\u9664</a>\n                            </div>\n                        </div>");
        indexList.innerHTML = str;
        break;

      case data[item].bmiResult >= 27 && data[item].bmiResult < 30:
        str += "<div class=\"form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-warning my-4 border-5\">\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <img class=\"img-fluid\" src=\"./images/BMICLogo.png\" alt=\"\" srcset=\"\" />\n                            </div>\n                            <div class=\"col-md-4 form-group\">\n                                <p>\u8EAB\u9AD8(CM)\uFF1A".concat(data[item].cm, "</p>\n                                <p>\u9AD4\u91CD(KG)\uFF1A").concat(data[item].kg, "</p>\n                                <p>\u6027\u5225\uFF1A").concat(data[item].gender, "</p>\n                                <p>\u7D00\u9304\u6642\u9593\uFF1A").concat(getDataTime(data[item].timestamp), "</p>\n                            </div>\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <div class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-warning-border\" href=\"#\" id=\"btn-count\">\n                                    <h4 class=\"m-0\">").concat(data[item].bmiResult, "</h4>\n                                    <small>BMI</small>\n                                </div>\n                                <br/>\n                                <a class=\"btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center\" id=\"btn-dele\" data-index=\"").concat(data[item].key, "\"/>\u522A\u9664</a>\n                            </div>\n                        </div>");
        indexList.innerHTML = str;
        break;

      case data[item].bmiResult >= 30 && data[item].bmiResult < 35:
        str += "<div class=\"form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-danger my-4 border-5\">\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <img class=\"img-fluid\" src=\"./images/BMICLogo.png\" alt=\"\" srcset=\"\" />\n                            </div>\n                            <div class=\"col-md-4 form-group\">\n                                <p>\u8EAB\u9AD8(CM)\uFF1A".concat(data[item].cm, "</p>\n                                <p>\u9AD4\u91CD(KG)\uFF1A").concat(data[item].kg, "</p>\n                                <p>\u6027\u5225\uFF1A").concat(data[item].gender, "</p>\n                                <p>\u7D00\u9304\u6642\u9593\uFF1A").concat(getDataTime(data[item].timestamp), "</p>\n                            </div>\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <div class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-danger-border\" href=\"#\" id=\"btn-count\">\n                                    <h4 class=\"m-0\">").concat(data[item].bmiResult, "</h4>\n                                    <small>BMI</small>\n                                </div>\n                                <br/>\n                                <a class=\"btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center\" id=\"btn-dele\" data-index=\"").concat(data[item].key, "\"/>\u522A\u9664</a>\n                            </div>\n                        </div>");
        indexList.innerHTML = str;
        break;

      case data[item].bmiResult >= 35:
        str += "<div class=\"form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-danger my-4 border-5\">\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <img class=\"img-fluid\" src=\"./images/BMICLogo.png\" alt=\"\" srcset=\"\" />\n                            </div>\n                            <div class=\"col-md-4 form-group\">\n                                <p>\u8EAB\u9AD8(CM)\uFF1A".concat(data[item].cm, "</p>\n                                <p>\u9AD4\u91CD(KG)\uFF1A").concat(data[item].kg, "</p>\n                                <p>\u6027\u5225\uFF1A").concat(data[item].gender, "</p>\n                                <p>\u7D00\u9304\u6642\u9593\uFF1A").concat(getDataTime(data[item].timestamp), "</p>\n                            </div>\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <div class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-danger-border\" href=\"#\" id=\"btn-count\">\n                                    <h4 class=\"m-0\">").concat(data[item].bmiResult, "</h4>\n                                    <small>BMI</small>\n                                </div>\n                                <br/>\n                                <a class=\"btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center\" id=\"btn-dele\" data-index=\"").concat(data[item].key, "\"/>\u522A\u9664</a>\n                            </div>\n                        </div>");
        indexList.innerHTML = str;
        break;

      default:
        console.log('ERROR');
        break;
    }
  }
}

function getDataTime(item) {
  var date = new Date(item);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var second = date.getSeconds();
  return "".concat(year, "/").concat(month, "/").concat(day, " ").concat(hour, ":").concat(min).concat(second);
}
//# sourceMappingURL=all.js.map
