// 倒计时器 (时间戳)

const countDown = ({startTime, endTime}) => {

    let diff = endTime - startTime
    let tiemr = null

  
    tiemr = setInterval(() => {
        if (diff <= 1000) clearInterval(tiemr)

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor(diff / (1000 * 60));
        const secs = Math.floor(diff / 1000);
        const d = days;
        const h = hours - days * 24;
        const m = mins - hours * 60;
        const s = secs - mins * 60;

        console.log(`${d}天${h}时${m}分${s}秒`)
        diff -= 1000
    })
}

countDown({
    startTime: 100,
    endTime: 100000222222
})

// 一般是会在页面上使用，所以样式的宽度需要固定下。
// 否则页面会产生局部闪动
