# fastPanel Account.
Add-on to work with users of the system.

---

## Events

### account:login
``` typescript
  this.events.on('account:login', async (user: IUser) => {});
```

### account:logout
``` typescript
  this.events.on('account:logout', async (user: IUser) => {});
```

### account:create
``` typescript
```

### account:delete
``` typescript
```

### account:restore
``` typescript
```

---

## Models

### Account.Group

``` typescript
  interface IGroup extends Mongoose.Document {
    alias: string;
    label: string;
    enabled?: boolean;
    readonly users: Array<IUser>;
    createdAt?: Date;
    updatedAt?: Date;
    version?: number;
  };
```

``` typescript
  import Mongoose from 'mongoose';
  const GroupModel = Mongoose.model<IGroup>('Account.Group');
```

``` javascript
  const Mongoose = require('mongoose');
  const GroupModel = Mongoose.model('Account.Group');
```

### Account.User

``` typescript
  interface IUser extends Mongoose.Document {
    /**
     * 
     */
    group: IGroup;

    /**
     * User full name fields.
     */
    name: {
      /**
       * The given name of the contact.
       */
      given?: string,

      /**
       * The middle name of the contact.
       */
      middle?: string,

      /**
       * The family name of the contact.
       */
      family?: string,

      /**
       * The name prefix of the contact.
       */
      prefix?: string,

      /**
       * The name suffix of the contact.
       */
      suffix?: string,

      /**
       * 
       */
      displayName: string,

      /**
       * 
       */
      phonetic?: {
        /**
         * The phonetic given name of the contact.
         */
        given?: string,

        /**
         * The phonetic middle name of the contact.
         */
        middle?: string,

        /**
         * A string for the phonetic family name of the contact.
         */
        family?: string
      }
    };
    
    /**
     * The nickname of the contact.
     */
    nickname?: string;

    /**
     * Password for login.
     */
    password?: string;

    /**
     * A string containing notes for the contact.
     */
    notes?: string;
    
    /**
     * A users who is directly or indirectly related to this account.
     */
    parents?: Array<IUser>;

    /**
     * n array of labeled phone numbers for a contact.
     */
    phoneNumbers: Array<IPhoneNumber>;

    /**
     * An array of labeled email addresses for the contact.
     */
    emailAddresses: Array<IEmailAddress>;

    /**
     * An array of labeled postal addresses for a contact.
     */
    postalAddresses: Array<IPostalAddress>;

    /**
     * An array of labeled URL addresses for a contact.
     */
    urls: Array<IUrl>;

    /**
     * Status of the enabled record.
     */
    enabled?: boolean;

    /* ----------------------------------------------------------------------- */

    /**
     * 
     */
    createdAt?: Date;

    /**
     * 
     */
    updatedAt?: Date;

    /**
     * Current version of the record.
     */
    version?: number;

    /* ----------------------------------------------------------------------- */
    
    /**
     * Async password verification function.
     * 
     * @param password Password in clear text.
     */
    verifyPassword(password: string): Promise<boolean>;

    /**
     * Sync password verification function.
     * 
     * @param password Password in clear text.
     */
    verifyPasswordSync(password: string): boolean;

  };
```

``` typescript
  import Mongoose from 'mongoose';
  const UserModel = Mongoose.model<IUser>('Account.User');
```

``` javascript
  const Mongoose = require('mongoose');
  const UserModel = Mongoose.model('Account.User');
```

---

## License
The MIT License (MIT)

---

## Copyright
(c) 2014 - 2019 Desionlab
