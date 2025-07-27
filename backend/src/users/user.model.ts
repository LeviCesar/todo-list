import { Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Task } from 'src/task/task.model';

@Table
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column
  email: string;

  @Column(DataType.BLOB)
  hashPasswd: Buffer;
  
  @HasMany(() => Task)
  tasks: Task[];
}
