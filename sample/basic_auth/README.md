# basic_auth

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2024/03/23 

 update  : 2024/03/24

***
### Summary

file base routing, React + express + vite +  SPA sample

***
* src/index.ts: user, password set

```
app.use(basicAuth({
  users: { "test": "1111" },
  challenge: true,
}));
```

