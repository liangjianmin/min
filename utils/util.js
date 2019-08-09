//数据请求(get,post)
const getData = (url, type, param, callBack, loading, isheader, istoken) => {

  wx.showNavigationBarLoading();

  var token, header;

  //获取token
  token = wx.getStorageSync('access_token');

  //参数字段追加来源字段,token字段
  if (istoken) {
    var params = Object.assign({}, param, {
      source: 1,
      token: token
    });
  } else {
    var params = Object.assign({}, param, {
      source: 1
    });
  }

  //是否启用loading加载效果
  if (loading) {
    wx.showLoading();
  }

  //是否启用请求头token
  if (isheader) {
    header = {
      "Content-Type": "applciation/json",
      "Authorization": 'Bearer ' + token
    }
  } else {
    header = {
      "Content-Type": "applciation/json"
    }
  }

  wx.request({
    url: url,
    data: params,
    header: header,
    method: type,
    success: (res) => {
      
      //处理token失效的情况
      if (res.data.hasOwnProperty('data')) {
        if (res.data.err_code == 501 || res.data.errcode == 501) {
          wx.redirectTo({
            url: '/pages/person/login/index'
          });
        } else {
          typeof callBack == "function" && callBack(res.data, "");
        }
      } else {
        if (res.data.err_code == 501 || res.data.errcode == 501) {
          wx.redirectTo({
            url: '/pages/person/login/index'
          });
        } else {
          typeof callBack == "function" && callBack(res.data, "");
        }
      }

      wx.hideNavigationBarLoading();

      if (loading) {
        wx.hideLoading();
      }

    },
    fail: (err) => {

      typeof callBack == "function" && callBack(null, err.errMsg);

      console.log(err);

      wx.hideNavigationBarLoading();


      if (loading) {
        wx.hideLoading();
      }

    }
  })
};

//上传文件
const uploadFile = (url, paths, callBack) => {
  wx.showLoading({
    title: '上传中',
    mask: true
  })
  for (var i = 0; i < paths.length; i++) {
    wx.uploadFile({
      url: url,
      filePath: paths[i],
      name: 'upload',
      formData: {
        token: wx.getStorageSync('access_token'),
        source: 2
      },
      header: {
        "Content-Type": "multipart/form-data"
      },
      success: (res) => {
        var data = JSON.parse(res.data);
        if (data.errcode == 103200) {
          callBack(data.data[0])
        } else {
          wx.showToast({
            title: '上传失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: (e) => {
        console.log(e)
        wx.showToast({
          title: '上传失败',
          icon: 'none',
          duration: 2000
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  }
};

const chooseImg = (url, num, callback) => {
  wx.chooseImage({
    count: num,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      uploadFile(url, res.tempFilePaths, (rtn) => {
        callback(rtn)
      })
    }
  })
};


const tips = (text) => {
  wx.showToast({
    title: text,
    icon: 'none',
    duration: 2000
  });
};


const changeTime = (str) => {
  let date = new Date(str);
  let Hours = date.getHours();
  let Minutes = date.getMinutes();
  let Seconds = date.getSeconds();
  let Month = date.getMonth() + 1;
  let Day = date.getDate();
  let time = date.getFullYear() + "-" + (Month < 10 ? "0" + Month : Month) + "-" + (Day < 10 ? "0" + Day : Day) + " " +
    (Hours < 10 ? "0" + Hours : Hours) + ":" + (Minutes < 10 ? "0" + Minutes : Minutes) + ":" + (Seconds < 10 ? "0" + Seconds : Seconds);
  return time;
};


const randomFun = () => {
  let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let newStr = "";
  for (let i = 0; i < 8; i++) {
    let randomNum = parseInt(Math.random() * ((str.length - 1) + 1), 10);
    newStr += str.substr(randomNum, 1)
  }
  return newStr
};


const sort = (arr) => {
  for (let j = 0; j < arr.length; j++) {
    for (let i = 0; i < arr.length - 1 - j; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
  }
  return arr;
};


const encodeUTF8 = (s) => {
  var i, r = [],
    c, x;
  for (i = 0; i < s.length; i++)
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
    else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
  else {
    if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
      c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
      r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
    else r.push(0xE0 + (c >> 12 & 0xF));
    r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
  };
  return r;
};


const sha1 = (s) => {
  var data = new Uint8Array(encodeUTF8(s))
  var i, j, t;
  var l = ((data.length + 8) >>> 6 << 4) + 16,
    s = new Uint8Array(l << 2);
  s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
  for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
  s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
  s[l - 1] = data.length << 3;
  var w = [],
    f = [
      function () {
        return m[1] & m[2] | ~m[1] & m[3];
      },
      function () {
        return m[1] ^ m[2] ^ m[3];
      },
      function () {
        return m[1] & m[2] | m[1] & m[3] | m[2] & m[3];
      },
      function () {
        return m[1] ^ m[2] ^ m[3];
      }
    ],
    rol = function (n, c) {
      return n << c | n >>> (32 - c);
    },
    k = [1518500249, 1859775393, -1894007588, -899497514],
    m = [1732584193, -271733879, null, null, -1009589776];
  m[2] = ~m[0], m[3] = ~m[1];
  for (i = 0; i < s.length; i += 16) {
    var o = m.slice(0);
    for (j = 0; j < 80; j++)
      w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
      t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
      m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
    for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0;
  };
  t = new DataView(new Uint32Array(m).buffer);
  for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);

  var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
    return (e < 16 ? "0" : "") + e.toString(16);
  }).join("");
  return hex;
};


const dataEncryption = () => {
  let timestamp = Date.parse(new Date()) / 1000;
  let randomStr = randomFun();
  let token = 'zbPx8gDXDfIh3ZoJcO4EH';
  let arr = [timestamp, randomStr, token];
  let singnatrueStr = sha1(sort(arr).join('')).toUpperCase();
  return {
    randomStr: randomStr,
    singnatrueStr: singnatrueStr,
    timestampStr: timestamp
  }
};

const judgeToken = (boolen) => {
  let token = wx.getStorageSync('access_token');
  if (token) {
    return true
  } else {
    if (boolen) {
      wx.redirectTo({
        url: '/pages/person/login/index'
      })
    }
    return false;
  }
};

module.exports = {
  getData: getData,
  chooseImg: chooseImg,
  tips: tips,
  changeTime: changeTime,
  dataEncryption: dataEncryption,
  judgeToken: judgeToken
}