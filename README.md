# 2nd_week_board

## Backend Stack

- Java 8 / jdk 1.8
- springboot 2.4.0
- swagger 3.0.0
- PostgreSQL (dbeaver 22.0.4)
- springdata jpa
- Lombok

## Frontend Stack

- Node.js 16.15.0
- npm 8.5.5
- express 4.18.1

## 코드리뷰

자바스크립트 함수표현식 공부하기.

JS에서 비교시 === 로 엄격하게 체크. 형변환 까지 엄밀히 확인 
이를 위해 TS, jslint등 사용 

var은 최대한 사용 지양할것!!!

제이쿼리는 최대한 지양하는 추세. ES6에서는 이를 안쓰기 위해 개선함. 

if / else 작성시 겹치는 로직은 최대한 배제할 것. 
( blog-list.js 122~141 )

Base64 의 경우에는 실무...? 보통 Column의 Length 문제 발생할 확률 높음. 
보통 멀티파트 사용. -> 어떤 프로필 이미지인지 확인하기 편리함.

통신시 대부분 axios 사용 --> 공부할 것!