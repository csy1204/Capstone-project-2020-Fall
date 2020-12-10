# Sungply :: Capstone-project-2020-Fall

## Env

```
python 3.8
Node v12
```
## Web Demo

http://49.50.162.241:3000/


## Result

### Latency
![image](https://user-images.githubusercontent.com/18041103/101727712-5bb7ba80-3af8-11eb-86be-003d90110204.png)

### Recall
![image](https://user-images.githubusercontent.com/18041103/101727721-62463200-3af8-11eb-84fe-ec28416fa0ff.png)

### Precision
![image](https://user-images.githubusercontent.com/18041103/101727737-6a05d680-3af8-11eb-83c1-be0693cbe069.png)





### Process

``` bash
git add .
git commit -m "깃메시지"
# 오류가 난다면 (pull를 하기 위해서 무조건 commit 먼저)
git pull origin main
git push origin main
```

``` bash
git branch 브랜치명
git checkout 브랜치명 #브랜치로 이동
# 위 두개 합친 명령어
# git checkout -b 브랜치명
================================
git add .
git commit -m "깃메시지"
================================
# 중앙 서버 코드 당겨오기
git pull origin main
# github 서버로 보내기
git push origin 브랜치명
```

## 본인 Repo 업데이트 하기 

``` bash
# 최초 1회
git remote add csy https://github.com/csy1204/Capstone-project-2020-Fall.git
# git remote 확인
git remote -v 
# 최신 상태로 업데이트 (주기적 반복)
git pull csy main
```
