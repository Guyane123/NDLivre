export default mongoose => {
    var schema = mongoose.Schema(
        {
            type: String, // "from" | "to"
            user: mongoose.Types.ObjectId(),
            bookArticle: mongoose.Types.ObjectId(),
            date: Date,
            target: user


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