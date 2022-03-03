import {Model, QueryContext} from 'objection';
import {customAlphabet} from 'nanoid/async';
import {nolookalikes} from 'nanoid-dictionary';

type Constructor<T> = new (...args: any[]) => T;

type Plugin = <M extends Constructor<Model>>(modelClass: M) => M;

const generateId = customAlphabet(nolookalikes, 12);

const generateIds: Plugin = (Model) => {
  return class extends Model {
    id!: string;

    async $beforeInsert(context: QueryContext) {
      await super.$beforeInsert(context);

      this.id = this.id || (await generateId());
    }
  };
};

export default generateIds;
