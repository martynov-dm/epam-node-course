import Sequelize from 'sequelize';

const sequelize = new Sequelize('epam_node', 'postgres', '3443', {
    host: 'localhost',
    dialect: 'postgres'
});


export async function connectDB() {
    try {
        await sequelize.authenticate().then(() => {
            console.log('DB connected');
        })
    } catch (err) {
        console.log(err);
    }
}
