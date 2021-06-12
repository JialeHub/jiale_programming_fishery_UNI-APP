import Vue from 'vue'
import {format} from '@/utils/silly-datetime.js'
/**
 * @param value
 * @return {Boolean}
 * @description 判断是否为空
 * */
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

/**
 * @param string
 * @param addBase
 * @return {String}
 * @description 自动去除第一斜杠
 * */
export const addBaseURL = (string, addBase) => {
  if (string && string !== '') {
    if (string.charAt(0) !== '/' && string.charAt(0) !== '\\') { string = '/' + string }
    if (string.charAt(string.length - 1) === '/') { string = string.substr(0, string.length - 1) }
    if (addBase === true) {
      return string.replace(/\\/g,"/")
    } else {
      return string
    }
  } else {
    return ''
  }
}

/**
 * @param html
 * @return {String}
 * @description 过滤富文本HTML标签
 * */
export const getSimpleHtml = (html = '') => {
	html = html.replace('↵', '')
	const re1 = new RegExp('<.+?>', 'g') // 匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
	const msg = html.replace(re1, '') // 执行替换成空字符
	return msg
}

/**
 * @param value 例： '2020-08-07T03:22:56.000+0000';
 * @return {String}
 * @description 兼容IOS时间转化 
 * */
export const compatibleTime = (value) => {
	let newStr = value.replace(/-/g, '/').replace(/T/g, ' ');
	newStr = newStr.substr(0, newStr.indexOf('.'));
	newStr = new Date(new Date(newStr).getTime() + 3600 * 1000 * 8);
	/* newStr = `${newStr.getFullYear()}-${
	        newStr.getMonth() < 10 ? '0'+String(newStr.getMonth()+1):String(newStr.getMonth()+1)
	    }-${
	    　　newStr.getDate() < 10 ? '0'+newStr.getDate() : newStr.getDate()
	    } ${
	        newStr.getHours()
	    }:${
	        newStr.getMinutes()
	    }:${
	        newStr.getSeconds()
	    }`; */
	return newStr;
}


/**
 * @description 过滤时间
 * @return {String}
 **/
export const formatDateTime = (value,timestamp = false) => {
  let tranValue = value
  if(tranValue.indexOf('T')!==-1) tranValue=compatibleTime(tranValue); //兼容IOS时间转化 
  else tranValue=new Date(value.replace(/-/g, '/')).getTime(); 
  if(timestamp) return tranValue;
  else return format(tranValue , 'YYYY-MM-DD HH:mm:ss');
  
  // const dayjs = require('@/utils/day.min.js')
  // return dayjs(new Date(value.replace(/-/g, '/'))).format('YYYY/MM/DD HH:mm:ss')
  
  /* const date = value ? (new Date(value.replace(/-/g, '/'))) : (new Date())
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date
    .getDate()
    .toString()
    .padStart(2, '0')
  const hours = date
    .getHours()
    .toString()
    .padStart(2, '0')
  const minutes = date
    .getMinutes()
    .toString()
    .padStart(2, '0')
  const seconds = date
    .getSeconds()
    .toString()
    .padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}` */
}

export const formatDate = (value,timestamp = false) => {
  let tranValue = value
  if(tranValue.indexOf('T')!==-1) tranValue=compatibleTime(tranValue); //兼容IOS时间转化 
  else tranValue=new Date(value.replace(/-/g, '/')).getTime(); 
  if(timestamp) return tranValue;
  else return format(tranValue , 'YYYY-MM-DD');
}

export const formatDateTime2 = (value,timestamp = false) => {
  let tranValue = value
  if(tranValue.indexOf('T')!==-1) tranValue=compatibleTime(tranValue); //兼容IOS时间转化 
  else tranValue=new Date(value.replace(/-/g, '/')).getTime(); 
  if(timestamp) return tranValue;
  else return format(tranValue , 'YYYY-MM-DD HH:mm');
}

// 时间戳转多少分钟之前
export const getDateDiff = (dateTimeStamp)=> {
    // 时间字符串转时间戳
    var timestamp = new Date(dateTimeStamp).getTime();
    
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var year = day * 365;
    var now = new Date().getTime();
    var diffValue = now - timestamp;
    var result;
    if (diffValue < 0) {
        return;
    }
    var yearC = diffValue / year;
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (yearC >= 1) {
        result = "" + parseInt(yearC) + "年前";
    } else if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
}

/**
 * @description App微信登录获取用户信息
 **/
export const getAppUnionId = () => {
	return new Promise((resolve,reject)=>{
		
		uni.login({
		  provider: 'weixin',
		  success: loginRes => {
			uni.getUserInfo({
				  provider: 'weixin',
				  success: infoRes => {
					resolve(infoRes);
				  }
			});
		  },
		  fail: res=> {
			reject(res)
		  }
		});
	})
}

/**
 * @param url
 * @param state
 * @description 公众号微信登录获取用户信息
 **/
export const getH5UnionId = (redirectUrl='',state='ok',scopeBase=false) => {
	let appid = 'wx9071d92e71f1e564';
	let redirect_uri = encodeURIComponent(window.location.origin+redirectUrl);
	let response_type = 'code';
	let scope = scopeBase?'snsapi_base':'snsapi_userinfo';
	let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type="+response_type+"&scope="+scope+"&state="+state+"#wechat_redirect"
	window.location.href = url
}

/**
 * @param {Object} target
 * @param {Object} object
 * @description target从object中取值 target <= object
 * */
export const objectEvaluate = (target, object) => {
  for (let key in target) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      if (object[key] instanceof Array) {
        target[key] = [...object[key]]
      } else {
        target[key] = object[key]
      }
    }
  }
};