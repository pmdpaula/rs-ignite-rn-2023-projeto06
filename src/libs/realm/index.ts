import { createRealmContext } from '@realm/react';

import { Historic } from './schemas/Historic';

const realAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
};

export const syncConfig: any = {
  flexible: true,
  newRealmFileBehavior: realAccessBehavior,
  existingRealmFileBehavior: realAccessBehavior,
};

export const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext({
  schema: [Historic],
});
