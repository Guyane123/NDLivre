function isED(authType) {
  return authType == "ED" ? true : false
}


export default mongoose => {
  var schema = mongoose.Schema(
    {
      pseudonym: String,
      image: { type: String, required: !isED(authType) },
      email: { type: String, required: !isED(authType) },
      type: String,
      authType: String,
      EDId: { type: String, required: isED(authType) },
      password: String,
      type: Number, // 0: user, 1: ADMIN, 2: DEV
      books: [mongoose.Types.ObjectId()],
      history: [mongoose.Types.ObjectId()],
      loans: [mongoose.Types.ObjectId()],
      comments: [mongoose.Types.ObjectId()]



    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};