export default mongoose => {
  var schema = mongoose.Schema(
    {
      pseudonym: String,
      image: String,
      email: String,
      type: String,
      password: String,
      books: [mongoose.Types.ObjectId()]



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