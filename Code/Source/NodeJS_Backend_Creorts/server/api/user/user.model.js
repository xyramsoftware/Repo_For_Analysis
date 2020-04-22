'use strict';
/*eslint no-invalid-this:0*/
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const jwt = require('jsonwebtoken');
import {registerEvents} from './user.events';
mongoose.Promise = require('bluebird');
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var userSchema = new Schema({
  userNotification: [{}],

  QRImg: {
    type: String
  },

  image: {
    type: String
  },

  RegisterId: {
    type: String
  },


  name: {
    type: String
  },

  gender: {
    type: String
  },

  age: {
    type: Number
  },

  DOB: {
    type: Date
  },

  phone: {
    type: Number,
    unique: true
  },

  paymentOption: {
    type: String
  },

  payment: {
    transactionId: {
      type: String
    },
    paymentType: {
      type: String
    },
    paymentStatus: {
      type: Boolean,
      default: false
    }
  },

  cardDetails: [{}],

  cart: [{}],

  grandTotal: {
    type: Number
  },

  ScanCheck: {
    type: Boolean,
    default: false
  },

  TeamCheck: {
    type: Boolean
  },

  emailCheck: {
    type: Boolean
  },


  email: {
    type: String,

  },

  place: {
    type: String
  },

  occupation: {
    type: String
  },

  schoolName: {
    type: String
  },

  organisation: {
    type: String
  },
  
  representingTeam: {
    type: String
  },

  sportIndividualReg: [{}],

  culturalReg: [{}],

  TotalEventsList: [{}],

  teamReg: [{
    title: {
      type: String
    },

    EventDate: {
      type: Date
    },

    EventDateID: {
      type: String
    },
    CategoryID: {
      type: String
    },
    EventTypeID: {
      type: String
    },

    teamdetails: {
      TeamName: {
        type: String
      },
      TeamCaptain: {
        type: String
      },
      teamMembers: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          required: true,
          auto: true,
        },

        TeamMemberId: {
          type: String,
          index: true,
          auto: true,
        },

        ScanTeamCheck: {
          type: Boolean,
          default: false
        },

        name: {
          type: String
        },
        DOB: {
          type: Date
        },

        Mobile: {
          type: Number
        },

        position: {
          type: String
        }
      }]
    }
  }],
  QREvents: [{}],
  AllTeamImages: [{}],

SpectatorEventList :[ {
    EventId: {
      type: String
    },
    EventName: {
      type: String
    },
    QRScanCheck: {
      type: Boolean,
      default: false
    }
  
   } ],

  publicId: {
    type: String
  },
  role: {
    type: String,
    default: 'user'
  },
  tokens: [{}],

  createdAt: {
    type: Date,
    default: Date.now
  }
});


userSchema.statics.checkValidCredentials = async (phone) => {
  const user = await User.findOne({phone});
  if(!user) {
    throw new Error('Unable to login 2');
  }

  return user;
};

userSchema.statics.checkValidCredential = async (email) => {
  const user = await User.findOne({email});
  if(!user) {
    throw new Error('Unable to login 2');
  }

  return user;
};

userSchema.methods.newAuthToken = async function() {
  const user = this;
  const token =  jwt.sign({ _id: user.id.toString() }, "thisismynewblog");
  await user.save();
  return token;
};

userSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  return userObj;
};

userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'UserID',
  startAt: 100,
  incrementBy: 1
});
registerEvents(userSchema);
const User = mongoose.model('User', userSchema);
module.exports = User;
