
const bookRentModel = (sequelize, DataTypes) => {
    const bookRent = sequelize.define('bookRent', {
        bookRentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },  
        rentDate: {
            type: DataTypes.DATE
        },  
        returnDate: {
            type: DataTypes.DATE
        }, 
        createAt: {
            type: DataTypes.DATE
        },  
        extendNumber: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },  
        bookId: {
            type: DataTypes.INTEGER
        },  
        userId: {
            type: DataTypes.INTEGER
        },  
        delinquencyDate: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        // Other model options go here
        timestamps: false,
        tableName: 'bookrent',
    });

    return bookRent;
}

module.exports = bookRentModel;