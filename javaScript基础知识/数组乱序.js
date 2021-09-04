function sortRandom (arr) {
    arr.sort(function (a, b) {
        return Math.random() - 0.5;
    })
}

const arr = [1, 2, 3, 4]
sortRandom(arr)
console.log(arr)

sortRandom(arr)
console.log(arr)