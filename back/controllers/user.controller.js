import User from "../models/user.model"


// Create
export async function create(user) {
    const newUser = new User(user);

    newUser.save()

    return newUser
}

// Read
export async function findAll() {
    const users = await User.find()

    return users
}

export async function findById(id) {
    const users = await User.find({_id:id})

    return users
}



// update

export async function update (id, update) {
    const updatedUser = await User.findOneAndUpdate({_id: id}, update);

    return updatedUser
}

// Delete

export async function remove (id) {
    const removedUser = await User.remove({_id: id}, update);

    return removedUser
}

