# Node.JS에서 TypeORM을 사용해서 객체 모델 매핑을 하는 방법

Node.JS와 TypeORM을 사용하여 데이터베이스 객체 모델 매핑을 구현하는 방법을 단계별로 살펴보겠습니다.

## 1. TypeORM 설치하기

먼저, 프로젝트에 TypeORM과 필요한 의존성을 설치해야 합니다. 터미널에서 다음 명령어를 실행하세요:

```bash
npm install typeorm reflect-metadata @types/node pg
```

## 2. TypeORM 설정하기

프로젝트 루트 디렉토리에 `ormconfig.json` 파일을 생성하고 다음과 같이 설정합니다:

```json
{
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "your_username",
   "password": "your_password",
   "database": "your_database",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ]
}
```

## 3. 엔티티 정의하기

`src/entity` 디렉토리에 `User.ts` 파일을 생성하고 다음과 같이 User 엔티티를 정의합니다:

```typescript
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
```

## 4. 데이터베이스 연결 및 사용하기

`src/index.ts` 파일에서 다음과 같이 데이터베이스에 연결하고 엔티티를 사용할 수 있습니다:

```typescript
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

createConnection().then(async connection => {

    console.log("데이터베이스에 새 사용자를 추가합니다...");
    const user = new User();
    user.firstName = "길동";
    user.lastName = "홍";
    user.age = 25;
    await connection.manager.save(user);
    console.log("새 사용자가 저장되었습니다. ID: " + user.id);

    console.log("데이터베이스에서 사용자를 조회합니다...");
    const users = await connection.manager.find(User);
    console.log("조회된 사용자:", users);

}).catch(error => console.log(error));
```

## 마무리

이제 TypeORM을 사용하여 Node.JS에서 객체 모델 매핑을 구현할 수 있습니다. 이 방법을 통해 데이터베이스 작업을 더 객체 지향적으로 처리할 수 있으며, 타입 안정성도 확보할 수 있습니다.

![TypeORM 구조도](https://nanu.cc/assets/dashboard.png)

TypeORM을 활용하면 복잡한 데이터베이스 쿼리도 간단하게 처리할 수 있으며, 마이그레이션 관리도 용이합니다. 앞으로 프로젝트를 진행하면서 TypeORM의 다양한 기능을 더 깊이 탐구해 보시기 바랍니다.