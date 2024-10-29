export default mongoose => {
  var schema = mongoose.Schema(
    {
      pseudonym: String,
      image: String,
      email: String,
      type: String,
      password: String,
      type: Number, // 0: user, 1: ADMIN, 2: DEV
      books: [mongoose.Types.ObjectId()],
      history: [mongoose.Types.ObjectId()],
      demands: [mongoose.Types.ObjectId()],
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