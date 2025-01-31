import { DataTypes, Model } from 'sequelize';
import { sequelize } from "./../config/database"

class Message extends Model {
  public id!: number;
  public senderName!: string;
  public message!: string;
  public timestamp!: Date;
}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  senderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Message',
});

export default Message;