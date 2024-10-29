export default mongoose => {
    var schema = mongoose.Schema(
        {
            bookArticle: mongoose.Types.ObjectId(),
            date: Date,
            user: mongoose.Types.ObjectId()


        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Commentary = mongoose.model("commentary", schema);
    return Commentary;
};