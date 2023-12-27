**API연동 연습을 위한 코인사이트 만들기**

<br /><br /><br />

**1.createGlobalStyle을 활용해 reset.css 만들기**
<br />
- 해당 프로젝트는 따로 파일을 만들지 않고 App.tsx에 변수를 선언해 css를 집어넣었음.
<br /><br />

**2.Router**
<br /> 
- router-dom을 최신버전으로 사용했다. 강의에서 5.4v로 진행했는데, 6v과 차이가 꽤 많이 남. 실무에서는 5.4v를 많이 쓴다고 해서 다음엔 5.4v로 해볼 예정
<br /><br />

**3.데이터 연동**
<br />
- 해당 강의에서 총 3가지 방법을 설명해줌. useEffect 안에 API를 넣는 방법, 따로 빼서 async 안에서 넣는 방법, API파일을 따로 만들어 fetch함수와 useQuery 훅으로 모든 state들과 fetch를 대체할 수 있는 방법.
- React query는 API로부터 response를 받고 있어서 화면을 바꿨다 돌아와도 우리가 원하는 data가 이미 캐시에 있다는 것을 알고 있다. 그래서 API에 접근하지 않음.
- useQuery를 사용하지 않는 환경이라면 async로 관리하는게 더 직관적이고 유지보수가 쉬울거같다는 생각이 들었다.
- 현 프로젝트는 useQuery로 진행하였고, async는 주석처리해놓음.. ~~힘들게 이해에 성공한 작고 소중한 내 코드들을 차마 지울 수 없었다,,,~~
<br /><br />

**4.interface**
<br />
- 특정 타입에 대한 규칙, 구조, 계약을 정의하는데 사용. 주로 객체의 형태(shape)를 설명, 코드 가독성과 유지보수에 뛰어나다.
<br /><br />

**5.ReactQueryDevtools**
<br />
- react-query의 Devtools를 사용해보았다. App.tsx파일에 추가해 주면 사용이 가능하다.
<br /><br />

**6.Outlet**
<br />
- router 6v를 사용하는 바람에 chart를 받아와야 하는 과정에서 강의와 너무 달라서 진땀뺐다.
- 일단 Router.tsx에서 <Route path="/:coinId/*" element={<Coin />}><Route path="chart" element={<Chart />} /></Route> 이렇게 넣고싶은 페이지 안에 자식으로 넣어 준 뒤, 해당 파일인 Coin.tsx 안에서 불러올 때 <Outlet context={coinId} />이런식으로 Outlet을 사용해야 했다.
- Chart.tsx파일에서 해줘야 하는 일은 5v와 같지만, useOutletContext();를 추가해 줘서 기존 Chart의 props를 useOutletContext로 받아와준다. useOutletContext로 props를 받아오기 때문에 함수에 props를 받아오지 않아도 된다.
<br /><br />

**7.APEXCHARTS**
<br />
- data 불러오는 과정에서 data가 number여야 하는데 받아오는 값이 string이라 변환이 필요했다. data?.map(price => parseFloat(price.close)) 로 해결!! 하나 했는데 null일 때 값을 안받아와줘서 에러나길래 null일 때 빈 배열 뱉으라고 ?? []붙여줌. 잘 된다.
<br /><br />

**8.react-helmet**
<br />
- 페이지 전환 시 타이틀에 해당 코인을 추가해주기 위해 설치 및 사용했다.

<br /><br /><br />
막판에 코인 가격 1초에 한 번씩 바뀌는거 보고싶어서 가격 데이터 불러오는 코드에 refetchInterval 추가 후 1초에 한 번씩 불러오게 바꿨다가 API의 한달 무료 리퀘스트를 다 채워버려서 막혀버렸다😂 황급히 지웠지만 이미 늦었죠?😇
<br />
덕분에 코인 페이지에서 Chart의 디자인 캔들모양으로 변경, Price부분 진행을 못했다😂😂😂휴..못끝낸건 한 달 뒤에 추가해주자
<br />
API 막혀서 완성을 못하는 기가막히는 상황...😇 앞으로 무료 API 쓸 때 리퀘스트 제한 있는지 확인해야겠다...
<br />
