const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://hhhanimohamed1_db_user:${password}@cluster0.ahbbhwp.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


const name = process.argv[3]
const number = process.argv[4]

if (process.argv.length === 3) {
    Person.find({}).then(persons => {
        console.log('phonebook:')

        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })

        mongoose.connection.close()

    })

} else {
    const person = new Person ({
        name: name,
        number: number,
})

person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
})

}