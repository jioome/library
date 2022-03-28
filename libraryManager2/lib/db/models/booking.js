
const bookingModel = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        bookingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },  
        userId: {
            type: DataTypes.INTEGER,
        },  
        bookId: {
            type: DataTypes.INTEGER
        },  
        bookingOrder: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        createAt: {
            type: DataTypes.DATE
        }
        
    }, {
        // Other model options go here
        timestamps: false,
        tableName: 'bookingHistory',
    });

    Booking.associate = async (db) => {
        await Booking.belongsTo(db.User ,{ foreignKey: 'userId'}); 
        await Booking.belongsTo(db.Book ,{ foreignKey: 'bookId'}); 
    }

    return Booking;
}

module.exports = bookingModel;