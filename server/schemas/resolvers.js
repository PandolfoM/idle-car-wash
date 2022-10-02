const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not Logged In");
    },
    user: async ({ _id }) => {
      return User.findOne({ _id }).select("-__v -password");
    },
    users: async () => {
      return User.find().select("-__v -password");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    updateWallet: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {wallet: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateWater: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {water: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateWheel: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {wheel: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateFoam: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {foam: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateMitt: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {mitt: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateSpray: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {spray: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateDry: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {dry: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateVac: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {vac: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateCarpet: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {carpet: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateSpot: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {spot: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateSteamer: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {steamer: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateClay: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {clay: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateSealant: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {sealant: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateWindow: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {window: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateWaffle: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {waffle: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    updateShine: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$set: {shine: args}},
          {new: true},
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
