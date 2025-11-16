const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let plantSchema = new Schema({
  name: {
    type: String,
    required: [true, "Plant name is required"],
    minlength: [3, "Plant name must be at least 3 characters"],
    maxlength: [100, "Plant name cannot exceed 100 characters"],
  },
  type: {
    type: String,
    required: [true, "Plant type is required"],
    enum: {
      values: ["Flower", "Vegetable", "Herb", "Tree"],
      // If your test expects a very specific message, keep this:
      message: "`{VALUE}` is not a valid enum value for pat`type`.",
      // If not, you can instead use the default Mongoose message by omitting `message`.
    },
  },
  status: {
    type: String,
    required: [true, "Plant status is required"],
    enum: {
      values: ["Planted", "Growing", "Harvested"],
      // Matches the test that expects “path`status`.”
      message: "`{VALUE}` is not a valid enum value for path`status`.",
    },
  },
  datePlanted: { type: Date },
  dateHarvested: { type: Date },
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date },
  gardenId: {
    type: Number,
    required: [true, "Garden ID is required"],
  },
});

plantSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.dateModified = new Date();
  }
  next();
});

module.exports = {
  Plant: mongoose.model("Plant", plantSchema),
};
