import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db'

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

class DailyHistory extends Model { }
DailyHistory.init(dailyHistorySchema, { sequelize, modelName: 'DailyHistory' })
DailyHistory.belongsTo(sequelize.models.User, { foreignKey: 'owner' })
export default DailyHistory