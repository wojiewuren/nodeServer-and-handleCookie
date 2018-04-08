/**
 * @author: jack
 * @use: 操作cookie
 * @params: 
 *      name {String} cookie的key值
 *      val {Any} cookie的value值
 *      path {String} cookie的作用域
 *      expire {Number} cookie的有效期
 */

 /* 
 issue: 
 1. encodeURIComponent
 2. domain,maxAge,maxAge,path
 3. 兼容
 4. 每次都要写吗 domain,maxAge,maxAge,path
 */
;!function(){
    // 默认参数
    const defaultParams = {
        path: '/',
        domain: document.location.hostname,
        maxAge: (new Date).getTime() / 1000 + 3600 * 24 * 7,
    },
    cookieObj = (function(){
        let str = document.cookie,
            obj = {};
        if(!str) return;
        let arr = str.split('; ');
        arr.forEach(function(item) {
            let temp = item.split('=');
            obj[temp[0]] = decodeURIComponent(temp[1])    
        })
        return obj;
    } ());
    function HandleCookie(path,  maxAge, domain) {
        this.path = path;
        this.domain = domain;
        this.maxAge = maxAge;
    }
    /**
     * @use 设置cookie 
     * @param {Array} optArr 常规情况下只设置cookie的key和对应value,path/domain/maxAge选传，有默认值
     */                  
    HandleCookie.prototype.set = function(optArr) {
        let _this = this;
        if(Object.prototype.toString.call(optArr) === '[object Array]') {
            // if(JSON.stringify(opt) === '{}') return;
            optArr.forEach(function(item) {
                for(let k in item) {
                    if(!k || !item[k]) continue;
                    document.cookie = k + '=' + encodeURIComponent(item[k]);
                }
                // TODO 设置默认值(每次都要吗)
                if(!('path' in item)) {
                    document.cookie = 'path=' + encodeURIComponent(_this.path);
                }
                if(!('domain' in item)) {
                    document.cookie = 'domain=' + encodeURIComponent(_this.domain);
                }
                if(!('maxAge' in item)) {
                    document.cookie = 'max-age=' + encodeURIComponent(_this.maxAge);
                }
            })
        }
    }
    // 获取cookie   
    HandleCookie.prototype.get = function(key) {
        return getCookieValue(key)
    }
    // 删除一条cookie值   
    HandleCookie.prototype.remove = function(key) {
        document.cookie = key + '=;max-age=0';
    }
    // 删除所有cookie值   
    HandleCookie.prototype.clear = function() {
        document.cookie = 'tname=;maxAge=0';
    }
    function getCookieValue(key) {
        if(key === '' || typeof(key) !== 'string') return null;
        return cookieObj[key] || null;
        /* let reg = new RegExp('\\s' + key + '=([^;])*'),
        r = cookieStr.match(reg);
        if(r) return decodeURIComponent(r[1]);
        return;  */
    }
    
    const handleCookie = new HandleCookie(defaultParams.path, defaultParams.domain, defaultParams.maxAge);

    window.handleCookie = handleCookie;
}()