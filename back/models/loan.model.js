export default mongoose => {
    var schema = mongoose.Schema(
        {
            type: String, // "from" | "to"
            user: mongoose.Types.ObjectId(),
            bookArticle: mongoose.Types.ObjectId(),
            date: Date,
            target: user,
            validation: String // "pending" | "accepted" | "denied"


        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Loan = mongoose.model("loan", schema);
    return Loan;
};