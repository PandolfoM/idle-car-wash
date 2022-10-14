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
      default: 14
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
      default: 200,
    },
    profit: {
      type: Number,
      default: 30,
    },
    speed: {
      type: Number,
      default: 12
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
      default: 5000,
    },
    profit: {
      type: Number,
      default: 73,
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
  mitt: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 100000,
    },
    profit: {
      type: Number,
      default: 454,
    },
    speed: {
      type: Number,
      default: 8
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
      default: 750000,
    },
    profit: {
      type: Number,
      default: 1000,
    },
    speed: {
      type: Number,
      default: 6
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
      default: 1500000,
    },
    profit: {
      type: Number,
      default: 10000,
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
  vac: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 10000000,
    },
    profit: {
      type: Number,
      default: 20000,
    },
    speed: {
      type: Number,
      default: 3.5
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
      default: 1000000000,
    },
    profit: {
      type: Number,
      default: 50000,
    },
    speed: {
      type: Number,
      default: 3
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
      default: 10000000000,
    },
    profit: {
      type: Number,
      default: 100000,
    },
    speed: {
      type: Number,
      default: 2.5
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
      default: 500000000000,
    },
    profit: {
      type: Number,
      default: 500000,
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
  clay: {
    lvl: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 1000000000000,
    },
    profit: {
      type: Number,
      default: 1000000,
    },
    speed: {
      type: Number,
      default: 1.5
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
      default: 50000000000000,
    },
    profit: {
      type: Number,
      default: 10000000,
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
      default: 10000000000000000,
    },
    profit: {
      type: Number,
      default: 50000000,
    },
    speed: {
      type: Number,
      default: 0.5
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
      default: 50000000000000000000,
    },
    profit: {
      type: Number,
      default: 1000000000,
    },
    speed: {
      type: Number,
      default: 0.1
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
      default: 100000000000000000000000,
    },
    profit: {
      type: Number,
      default: 50000000000,
    },
    speed: {
      type: Number,
      default: 0.05
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
