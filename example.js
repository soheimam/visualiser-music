const sayHello = () => {
    return new Promise((resolve, reject) => {
        console.log('hello')
        resolve()
    })
}


const sayGoodbye = () => {
    return new Promise((resolve, reject) => {
        console.log('goodbye')
        resolve()
    })
}


const doSomething = () => {
    return new Promise((resolve, reject) => {
        console.log('doing something')
        resolve()
    })
}

sayHello()
    .then(
        sayGoodbye()
    )
    .then(
        doSomething()
    )



