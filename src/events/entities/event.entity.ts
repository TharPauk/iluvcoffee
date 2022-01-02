import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Event extends mongoose.Document {
  @Prop()
  type: string;

  @Prop({ index: true })
  name: string;

  @Prop({ type: mongoose.SchemaTypes.Mixed })
  payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);

// Compound index referencing multiple properties
EventSchema.index({ name: 1, type: -1 });

/**
 * In this example:
 * We passed a value of 1 (to name) which specifies that the index
 * should order these items in an Ascending order.
 *
 * We passed type a value of (negative) -1 which specifies that
 * The index should order these items in Descending order.
 */
