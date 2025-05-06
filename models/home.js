

module.exports = (sequelize, DataTypes) => {
  const Home = sequelize.define('Home', {    
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city:{
        type: DataTypes.STRING,
        allowNull: false
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

  Home.associate = function (models) {
    Home.belongsTo(models.Participant, { foreignKey: "participantEmail" });
  };

  return Home;
};
