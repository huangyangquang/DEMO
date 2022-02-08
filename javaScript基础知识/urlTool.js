// 浏览器端:
// 剔除url中某几个参数，并且返回新的url
function removeArgFromUrl( paramsArr ){
    if ( !Array.isArray(paramsArr) ) return

    let queryString = window.location.search.substring(1);
    if (queryString !== undefined) {
        queryString = '&' + queryString
        paramsArr.forEach(params => {
            // 将格式为 &xx=yy 替换 为 ''
            let reg = new RegExp('(^|&)' + params + '=([^&]*)');
            queryString = queryString.replace(reg,'');
        })

        const {origin, pathname} = location

        if (queryString.indexOf('&') === 0) {
            queryString = queryString.substring(1)
        }

        return origin + pathname + ( queryString ? '?' + queryString : '' )
    }
    return lacation.href;
}

// 浏览器 + node端
// 剔除url中某几个参数，并且返回新的url
function delateUrlParams (url, paramsArr) {
    const urlConfig = url.split('?')
    const baserUrl = urlConfig[0]
    let queryString = urlConfig[1]

    if (queryString !== undefined) {
        queryString = '&' + queryString
        paramsArr.forEach(params => {
            // 将格式为 &xx=yy 替换 为 ''
            let reg = new RegExp('(^|&)' + params + '=([^&]*)');
            queryString = queryString.replace(reg,'');
        })

        if (queryString.indexOf('&') === 0) {
            queryString = queryString.substring(1)
        }

        return baserUrl + ( queryString ? '?' + queryString : '' )
    }

    return url
}

// Test:
const newUrl = delateUrlParams(
    'https://pub.kdocs.cn/q/qRkbzPFkuTW4ndk?source=ppp&as=ooo&debug&viewsource=list&viewsource=list&iii=iii&source=ppp', 
    ['viewsource', 'source', 'iii']
)
console.log( newUrl );