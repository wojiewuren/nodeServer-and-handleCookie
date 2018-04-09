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
     * @param {Array/Object} opt 常规情况下只设置cookie的key和对应value,path/domain/maxAge选传，有默认值
     */                  
    HandleCookie.prototype.set = function(opt) {
        let _this = this;
        // Array入参,可以同时设置多个
        if(Object.prototype.toString.call(opt) === '[object Array]') {
            opt.forEach(function(item) {
                setItem(item,_this)
            })
            return;
        }
        // Object入参，设置单个值
        if(Object.prototype.toString.call(opt) === '[object Object]') {
            setItem(opt,_this)
            return;
        }
    }
    /**
     * @use 获取cookie
     * @param {String} key cookie键值
     */
    HandleCookie.prototype.get = function(key) {
        if(key === '' || typeof(key) !== 'string') return null;
        return cookieObj[key] || null;
    }
    /**
     * @use 删除key键值对应cookie值 
     * @param {String} key cookie键值
     */  
    HandleCookie.prototype.removeItem = function(key) {
        if(key === '' || typeof(key) !== 'string') return null;
        document.cookie = key + '=;max-age=0';
    }
    /**
     * @use 删除所有cookie值
     */  
    HandleCookie.prototype.clear = function() {
        for(let k in cookieObj) {
            document.cookie = k + '=;max-age=0';
        }
    }
    /**
     * @处理设置cookie 
     * @param {Object} item cookie键值入参 
     * @param {Object} _this 原型对象
     */
    function setItem(item,_this) {
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
    }
    /* function getCookieValue(key) {
        let reg = new RegExp('\\s' + key + '=([^;])*'),
        r = cookieStr.match(reg);
        if(r) return decodeURIComponent(r[1]);
        return; 
    } */
    
    const handleCookie = new HandleCookie(defaultParams.path, defaultParams.domain, defaultParams.maxAge);

    window.handleCookie = handleCookie;
}()