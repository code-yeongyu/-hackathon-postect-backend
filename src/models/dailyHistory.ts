import { DataTypes } from 'sequelize'
import sequelize from '../utils/db'

let dailyHistorySchema = {
    pk: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    correctingPoseExecutedCnt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    stretchingExecutedCnt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}

const DailyHistory = sequelize.define('DailyHistory', dailyHistorySchema)
DailyHistory.belongsTo(sequelize.models.User, { foreignKey: 'owner' })
export default DailyHistory