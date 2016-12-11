export function nextTick (cb) {
    setTimeout(()=>{
        cb();
    }, 0);
}

/**
 * 随机字符串
 */
export function randomStr () {
    return Math.random() + String(Number(new Date()));
}