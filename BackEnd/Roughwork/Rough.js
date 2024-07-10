import bcrypt from 'bcrypt'

const password="dhamo"

// bcrypt.hash(password,5)
// .then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// })

bcrypt.compare('dhamo','$2b$05$5r5kJo3NiGZWvfrLkZW5YOhof9nQuAsBNtKnVH5b09rxIJfM7lZaC')
.then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
})

