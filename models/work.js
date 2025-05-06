module.exports = (sequelize, DataTypes) => {
  const Work = sequelize.define('Work', {    
    companyName: {
        type: DataTypes.STRING,

        allowNull: false,
    }, 

    salary: {
        type: DataTypes.DECIMAL,

        allowNull: false,
    },

    currency: {
        type: DataTypes.STRING,

        allowNull: false,
    },
    participantEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  },
  {
    timestamps: false
  }
);

  Work.associate = function (models) {
    Work.belongsTo(models.Participant, { foreignKey: "participantEmail" });
  };

  return Work;
};
