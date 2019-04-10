const config = {
  apiKey: 'AIzaSyBcPs6BK07utWcbABZM6MPMe3jqA0QII4Q',
  authDomain: 'bmi-learn.firebaseapp.com',
  databaseURL: 'https://bmi-learn.firebaseio.com',
  projectId: 'ㄖmi-learn',
  storageBucket: 'bmi-learn.appspot.com',
  messagingSenderId: '585806415748'
}
firebase.initializeApp(config)

const dataRef = firebase.database().ref('bmi')
const btncountId = document.getElementById('btn-count')
const indexList = document.querySelector('.bmiResultList')

btncountId.addEventListener('click', bmiFu)
indexList.addEventListener('click', deleteData)

const fireData = []
dataRef.orderByChild('timestamp').on('value', (snapshot) => {
  fireData.length = 0
  snapshot.forEach(item => {
    let origin = item.val()
    origin.key = item.key
    fireData.push(origin)
  })
  updataLiet(fireData.reverse())
  console.log(fireData)
})

function bmiFu (e) {
  e.preventDefault()
  const cmId = document.getElementById('cm').value
  const kgId = document.getElementById('kg').value
  const genderId = document.getElementById('gender').value
  const meter = cmId / 100
  const bmiCountResult = (kgId / (meter * meter)).toFixed(2)
  const time = new Date()
  const BMIdata = {
    cm: cmId,
    kg: kgId,
    gender: genderId,
    bmiResult: bmiCountResult,
    timestamp: time.getTime()
  }

  if (analysisBMI(bmiCountResult) !== 'ERROR') {
    btnColor(analysisBMI(bmiCountResult), bmiCountResult)
    dataRef.push(BMIdata)
  }
}
function btnColor (item, bmi) {
  let str = ''
  let outer = ''
  let btn = ''
  switch (item) {
    case '體重過輕':
      outer = 'btn-primary-border'
      btn = 'bg-primary'
      break
    case '正常範圍':
      outer = 'btn-success-border'
      btn = 'bg-success'
      break
    case '過重':
      outer = 'btn-warning-border'
      btn = 'bg-warning'
      break
    case '輕度肥胖':
      outer = 'btn-warning-border'
      btn = 'bg-warning'
      break
    case '中度肥胖':
      outer = 'btn-danger-border'
      btn = 'bg-danger'
      break
    case '重度肥胖':
      outer = 'btn-danger-border'
      btn = 'bg-danger'
      break
    default:
      console.log('生成按鈕錯誤')
      break
  }
  str += `<a class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column ${outer}" href="#">
                        <h5 class="m-0">${item}</h5>
                        <small>BMI-${bmi}</small>
                        <div class="rounded-circle btn-redo d-flex justify-content-center align-items-center ${btn} text-white"><i class="fas fa-redo rounded-circle"></i></div>
                    </a>`
  btncountId.innerHTML = str
}

function analysisBMI (item) {
  switch (true) {
    case item < 18.5:
      return '體重過輕'
    case item >= 18.5 && item < 24:
      return '正常範圍'
    case item >= 24 && item < 27:
      return '過重'
    case item >= 27 && item < 30:
      return '輕度肥胖'
    case item >= 30 && item < 35:
      return '中度肥胖'
    case item >= 35:
      return '重度肥胖'
    default:
      return 'ERROR'
  }
}

function deleteData (e) {
  e.preventDefault()
  if (e.target.tagName !== 'A') { return }
  let str = e.target.dataset.index
  dataRef.child(str).remove()
  updataLiet()
}

function updataLiet (data) {
  let str = ''
  for (let item in data) {
    switch (true) {
      case data[item].bmiResult < 18.5:
        str += `<div class="form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-primary my-4 border-5">
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <img class="img-fluid" src="./images/BMICLogo.png" alt="" srcset="" />
                            </div>
                            <div class="col-md-4 form-group">
                                <p>身高(CM)：${data[item].cm}</p>
                                <p>體重(KG)：${data[item].kg}</p>
                                <p>性別：${data[item].gender}</p>
                                <p>紀錄時間：${getDataTime(data[item].timestamp)}</p>
                            </div>
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <div class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-primary-border" href="#" id="btn-count">
                                    <h4 class="m-0">${data[item].bmiResult}</h4>
                                    <small>BMI</small>
                                </div>
                                <br/>
                                <a class="btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center" id="btn-dele" data-index="${data[item].key}" href="#"/>刪除</a>
                            </div>
                        </div>`
        indexList.innerHTML = str
        break
      case data[item].bmiResult >= 18.5 && data[item].bmiResult < 24:
        str += `<div class="form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-success my-4 border-5">
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <img class="img-fluid" src="./images/BMICLogo.png" alt="" srcset="" />
                            </div>
                            <div class="col-md-4 form-group">
                                <p>身高(CM)：${data[item].cm}</p>
                                <p>體重(KG)：${data[item].kg}</p>
                                <p>性別：${data[item].gender}</p>
                                <p>紀錄時間：${getDataTime(data[item].timestamp)}</p>
                            </div>
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <div class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-success-border" href="#" id="btn-count">
                                    <h4 class="m-0">${data[item].bmiResult}</h4>
                                    <small>BMI</small>
                                </div>
                                <br/>
                                <a class="btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center" id="btn-dele" data-index="${data[item].key}"/>刪除</a>
                            </div>
                        </div>`
        indexList.innerHTML = str
        break
      case data[item].bmiResult >= 24 && data[item].bmiResult < 27:
        str += `<div class="form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-warning my-4 border-5">
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <img class="img-fluid" src="./images/BMICLogo.png" alt="" srcset="" />
                            </div>
                            <div class="col-md-4 form-group">
                                <p>身高(CM)：${data[item].cm}</p>
                                <p>體重(KG)：${data[item].kg}</p>
                                <p>性別：${data[item].gender}</p>
                                <p>紀錄時間：${getDataTime(data[item].timestamp)}</p>
                            </div>
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <div class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-warning-border" href="#" id="btn-count">
                                    <h4 class="m-0">${data[item].bmiResult}</h4>
                                    <small>BMI</small>
                                </div>
                                <br/>
                                <a class="btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center" id="btn-dele" data-index="${data[item].key}"/>刪除</a>
                            </div>
                        </div>`
        indexList.innerHTML = str
        break
      case data[item].bmiResult >= 27 && data[item].bmiResult < 30:
        str += `<div class="form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-warning my-4 border-5">
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <img class="img-fluid" src="./images/BMICLogo.png" alt="" srcset="" />
                            </div>
                            <div class="col-md-4 form-group">
                                <p>身高(CM)：${data[item].cm}</p>
                                <p>體重(KG)：${data[item].kg}</p>
                                <p>性別：${data[item].gender}</p>
                                <p>紀錄時間：${getDataTime(data[item].timestamp)}</p>
                            </div>
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <div class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-warning-border" href="#" id="btn-count">
                                    <h4 class="m-0">${data[item].bmiResult}</h4>
                                    <small>BMI</small>
                                </div>
                                <br/>
                                <a class="btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center" id="btn-dele" data-index="${data[item].key}"/>刪除</a>
                            </div>
                        </div>`
        indexList.innerHTML = str
        break
      case data[item].bmiResult >= 30 && data[item].bmiResult < 35:
        str += `<div class="form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-danger my-4 border-5">
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <img class="img-fluid" src="./images/BMICLogo.png" alt="" srcset="" />
                            </div>
                            <div class="col-md-4 form-group">
                                <p>身高(CM)：${data[item].cm}</p>
                                <p>體重(KG)：${data[item].kg}</p>
                                <p>性別：${data[item].gender}</p>
                                <p>紀錄時間：${getDataTime(data[item].timestamp)}</p>
                            </div>
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <div class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-danger-border" href="#" id="btn-count">
                                    <h4 class="m-0">${data[item].bmiResult}</h4>
                                    <small>BMI</small>
                                </div>
                                <br/>
                                <a class="btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center" id="btn-dele" data-index="${data[item].key}"/>刪除</a>
                            </div>
                        </div>`
        indexList.innerHTML = str
        break
      case data[item].bmiResult >= 35:
        str += `<div class="form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-danger my-4 border-5">
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <img class="img-fluid" src="./images/BMICLogo.png" alt="" srcset="" />
                            </div>
                            <div class="col-md-4 form-group">
                                <p>身高(CM)：${data[item].cm}</p>
                                <p>體重(KG)：${data[item].kg}</p>
                                <p>性別：${data[item].gender}</p>
                                <p>紀錄時間：${getDataTime(data[item].timestamp)}</p>
                            </div>
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <div class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-danger-border" href="#" id="btn-count">
                                    <h4 class="m-0">${data[item].bmiResult}</h4>
                                    <small>BMI</small>
                                </div>
                                <br/>
                                <a class="btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center" id="btn-dele" data-index="${data[item].key}"/>刪除</a>
                            </div>
                        </div>`
        indexList.innerHTML = str
        break
      default:
        console.log('ERROR')
        break
    }
  }
}

function getDataTime (item) {
  const date = new Date(item)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const second = date.getSeconds()

  return `${year}/${month}/${day} ${hour}:${min}${second}`
}
