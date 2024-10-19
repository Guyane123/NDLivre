export default mongoose => {
    var schema = mongoose.Schema(
      {
        date: { type: Date },
        title: String,
        author: String,
        desc: String,
        ISBN: String,
        
        users: [mongoose.Types.ObjectId()]

      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Book = mongoose.model("book", schema);
    return Book;
  };