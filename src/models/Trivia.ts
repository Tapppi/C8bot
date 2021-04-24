import {Model, Pojo} from 'objection';

import generateIds from '../model-utils/model-generate-id';

export default class Trivia extends generateIds(Model) {
  static tableName = 'trivia';

  static jsonSchema = {
    type: 'object',
    required: ['author', 'category', 'content'],

    properties: {
      author: {type: 'string', minLength: 1, maxLength: 64},
      category: {type: 'string', minLength: 1, maxLength: 64},
      content: {type: 'string', minLength: 1, maxLength: 1024},
    },
  };

  id!: string;
  author!: string;
  category!: string;
  content!: string;
  categoryCount?: number;
  createdAt!: Date;

  $formatJson(json: Pojo) {
    json = super.$formatJson(json);

    json.createdAt = new Date(json.createdAt);

    return json;
  }
}
