
const userModel = (sequelize, DataTypes) => 
{ 
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },  
        email: {
            type: DataTypes.STRING
        },  
        name: {
            type: DataTypes.STRING,
            allowNull : false
        },  
        address: {
            type: DataTypes.STRING
        },  
        phoneNumber: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },   
        role: {
            type: DataTypes.ENUM(['admin','normal']),
            allowNull : false,
            defaultValue: 'normal'
            
        }
        
    }, {
        // Other model options go here
        timestamps: false,
        tableName: 'user',
    });



    User.associate = async (db) => {
        await User.hasMany(db.Booking, { foreignKey: 'userId'});
        // await User.hasMany(db.Booking);

    }

    return User;
}


module.exports = userModel;

