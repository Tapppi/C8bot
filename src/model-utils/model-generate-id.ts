import {type Model, type QueryContext} from 'objection';
import {customAlphabet} from 'nanoid';
import {nolookalikes} from 'nanoid-dictionary';

type Constructor<T> = new (...arguments_: any[]) => T;

type Plugin = <M extends Constructor<Model>>(modelClass: M) => M;

const generateId = customAlphabet(nolookalikes, 12);

const generateIds: Plugin = (Model) => {
  return class extends Model {
    id!: string;

    async $beforeInsert(context: QueryContext) {
      await super.$beforeInsert(context);

      this.id ||= generateId();
    }
  };
};

export default generateIds;
