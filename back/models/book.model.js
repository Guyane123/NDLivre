export default mongoose => {
    var schema = mongoose.Schema(
      {
        ISBN: [{ type: String, identifier: string }],        
        user: mongoose.Types.ObjectId(),
        isVisible: Boolean,
        desc: String,
        date: Date,
        comments: [mongoose.Types.ObjectId()],
        likes: [mongoose.Types.ObjectId()],

        user: mongoose.Types.ObjectId()


      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
  const BookArticle = mongoose.model("bookArticle", schema);
  return BookArticle;
  };