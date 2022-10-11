const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Not a valid email address"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  sfx: {
    type: Boolean,
    default: true,
  },
  wallet: {
    cash: {
      type: Number,
      required: true,
      default: 0,
    },
    gems: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  water: {
    lvl: {
      type: Number,
      default: 1,
    },
    cost: {
      type: Number,
      default: 3,
    },
    profit: {
      type: Number,
      default: 1,
    },
    speed: {
      type: Number,
      default: 10
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  wheel: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 210,
    },
    profit: {
      type: Number,
      default: 30,
    },
    speed: {
      type: Number,
      default: 7
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  foam: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 5100,
    },
    profit: {
      type: Number,
      default: 73,
    },
    speed: {
      type: Number,
      default: 4
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  mitt: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 79,
    },
    profit: {
      type: Number,
      default: 40,
    },
    speed: {
      type: Number,
      default: 2
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  spray: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 105,
    },
    profit: {
      type: Number,
      default: 55,
    },
    speed: {
      type: Number,
      default: 1
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  dry: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 131,
    },
    profit: {
      type: Number,
      default: 70,
    },
    speed: {
      type: Number,
      default: 1
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  vac: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 157,
    },
    profit: {
      type: Number,
      default: 85,
    },
    speed: {
      type: Number,
      default: 1
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  carpet: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 183,
    },
    profit: {
      type: Number,
      default: 100,
    },
    speed: {
      type: Number,
      default: 1
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  spot: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 209,
    },
    profit: {
      type: Number,
      default: 115,
    },
    speed: {
      type: Number,
      default: 1
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  steamer: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 224,
    },
    profit: {
      type: Number,
      default: 130,
    },
    speed: {
      type: Number,
      default: 1
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  clay: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 239,
    },
    profit: {
      type: Number,
      default: 145,
    },
    speed: {
      type: Number,
      default: 1
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  sealant: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 265,
    },
    profit: {
      type: Number,
      default: 160,
    },
    speed: {
      type: Number,
      default: 1
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  window: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 291,
    },
    profit: {
      type: Number,
      default: 175,
    },
    speed: {
      type: Number,
      default: 1
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  waffle: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 317,
    },
    profit: {
      type: Number,
      default: 190,
    },
    speed: {
      type: Number,
      default: 1
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
  shine: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 343,
    },
    profit: {
      type: Number,
      default: 205,
    },
    speed: {
      type: Number,
      default: 1
    },
    manager: {
      type: Boolean,
      default: false
    }
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
