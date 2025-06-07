// module.exports = {
//     async up(queryInterface, Sequelize) {
//       await queryInterface.createTable('Subscriptions', {
//         id: {
//           type: Sequelize.INTEGER,
//           autoIncrement: true,
//           primaryKey: true,
//           allowNull: false,
//         },
//         sensor_id: {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//           references: {
//             model: 'Sensors', // название таблицы сенсоров
//             key: 'id',
//           },
//           onDelete: 'CASCADE',
//         },
//         callback_url: {
//           type: Sequelize.STRING,
//           allowNull: false,
//         },
//         createdAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.NOW,
//         },
//         updatedAt: {
//           type: Sequelize.DATE,
//           allowNull: false,
//           defaultValue: Sequelize.NOW,
//         },
//       });
//     },
  
//     async down(queryInterface) {
//       await queryInterface.dropTable('Subscriptions');
//     },
//   };