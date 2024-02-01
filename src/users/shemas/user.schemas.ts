import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required:true,unique:true
  })
  email: string;
  
  @Prop()
  age: number;

  @Prop()
  name: string;
  @Prop({required:true})
  passWord:string
}

export const UserSchema = SchemaFactory.createForClass(User);