
const bookModel = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },  
        author: {
            type: DataTypes.STRING
        },  
        bookName: {
            type: DataTypes.STRING
        },  
        publishingHouse: {
            type: DataTypes.STRING
        },  
        issueDate: {
            type: DataTypes.DATE
        },  
        classification: {
            type: DataTypes.STRING
        },  
        bookingNumber: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }, 
        isbn: {
            type: DataTypes.INTEGER
        
        }
        
    }, {
        // Other model options go here
        timestamps: false,
        tableName: 'book',
    });

    return Book;
}

module.exports = bookModel;