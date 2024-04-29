import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "usuario",
  modelName: "Usuario",
})
class Usuario extends Model {

  @AutoIncrement
  @Column({
      primaryKey: true,
      type: DataType.BIGINT,
  })
  declare id: number;

  @Column({
      type: DataType.STRING,
  })
  declare nome: string;

  @Column({
      type: DataType.STRING,
  })
  declare matricula: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}

export default Usuario;
