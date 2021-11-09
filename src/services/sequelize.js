import Sequelize from 'sequelize';

export const db = new Sequelize('epam_node', 'postgres', '3443', {
    host: 'localhost',
    dialect: 'postgres'
});


export async function connectDB() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
