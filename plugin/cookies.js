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
 2. domain,expires,max-age,path
 */
;!function(){
    // 默认参数
    const defaultParams = {
        path: '/',
        expire: (new Date).getTime() / 1000 + 3600 * 24 * 7,
    },
    cookieStr = document.cookie;
    function HandleCookie(path,  expire) {
        this.path = path;
        this.expire = expire;
    }
    // 设置cookie   
    HandleCookie.prototype.set = function(opt) {
        if(Object.prototype.toString.call(opt) === '[object Object]') {
            if(JSON.stringify(opt) === '{}') return;
            for(let k in opt) {
                if(!k || !opt[k]) continue;
                document.cookie = k + '=' + opt[k];
            }
        }
    }
    // 获取cookie   
    HandleCookie.prototype.get = function(key) {
        return getCookieValue(key)
    }
    // 删除一条cookie值   
    HandleCookie.prototype.remove = function() {

    }
    // 删除所有cookie值   
    HandleCookie.prototype.clear = function() {

    }
    function getCookieValue(key) {
        if(key === '' || typeof(key) !== 'string') return;
        let reg = new RegExp('\\s' + key + '=([^;])*'),
        r = cookieStr.match(reg);
        if(r) return r[1];
        return; 
    }
    
    const handleCookie = new HandleCookie(defaultParams.path, defaultParams.expire);

    window.handleCookie = handleCookie;
}()