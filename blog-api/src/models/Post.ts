import { DataTypes, Model, Optional } from 'sequelize'
import User from './User'
import sequelize from '../config/database'

interface PostAttributes {
  id: number
  title: string
  content: string
  authorId: number
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  public id!: number
  public title!: string
  public content!: string
  public authorId!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'posts',
  }
)

export default Post
