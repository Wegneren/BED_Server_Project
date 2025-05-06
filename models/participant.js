module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,

      allowNull: false,
    },

    lastName:{
      type: DataTypes.STRING,

      allowNull: false,
    },

    dob:{
      type: DataTypes.STRING,

      allowNull: false,
    }
  },
  {
    timestamps: false
  }
);

  Participant.associate = function (models) {
    Participant.hasOne(models.Work, { foreignKey: "participantEmail" , onDelete: 'CASCADE', hooks:true});
    Participant.hasOne(models.Home, { foreignKey: "participantEmail" , onDelete: 'CASCADE', hooks:true});
  };

  return Participant;
};
