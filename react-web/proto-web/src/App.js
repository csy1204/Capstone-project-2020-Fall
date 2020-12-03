import logo from './logo.svg';
import './App.css';
import Song from './Song';
import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import * as ReactBootstrap from "react-bootstrap";
import api from './api.js'
import CircularProgress from '@material-ui/core/CircularProgress';


const filter = createFilterOptions();

const App = () => {

  // const [songs, setSongs] = useState([]);
  // const [search, setSearch] = useState("");
  // const [query, setQuery] = useState('성탄절');

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // useEffect(() => {
  //   getSongs();
  // }, []); // [query]);

  // const getSongs = async () => {
  //   const response = await fetch(
  //     // ??? 
  //   );
  //   const data = await response.json();
  //   setSongs(data.hits);
  //   console.log(data.hits);
  // };

  // const updateSearch = e => {
  //     setSearch(e.target.value);
  //     console.log(search);
  // }

  // const getSearch = e => {
  //   e.preventDefault();
  //   setQuery(search);
  // }



  const playlist = [
    {songname: "2002", singer: "Anne Marie"},
    {songname: "Dynamite", singer: "BTS"},
    {songname: "Snowman", singer: "Sia"},
  ]

  const handleClick = async (e) => {
    e.preventDefault() 
    console.log("Clcik!")
    setIsLoading(true)

    const inferences = await api.getInference({tag: value.title })
    console.log(inferences)

    setData(inferences)
    setIsLoading(false)
  }


  return (
    <div className="App">
      <div className="header">
        <div id="Sung-Ply">Sung-Ply</div>

        <form className="search-form">
          {/* <input className="search-bar" type="text" value={search} onChange={updateSearch}/>          */}
          <Autocomplete
            className="autocomplete-search"
            value={value}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setValue({
                  title: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                // setValue({
                //   title: newValue.inputValue,
                // });
              } else {
                setValue(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              // Suggest the creation of a new value
              if (params.inputValue !== '') {
                // filtered.push({
                //   inputValue: params.inputValue,
                //   title: `Add "${params.inputValue}"`,
                // });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={top100Films}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.title;
            }}
            renderOption={(option) => option.title}
            style={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="태그를 입력하세요" variant="outlined" />
            )}
          />
          <button disabled={isLoading} className="search-button" onClick={handleClick}>
            {isLoading ?
               <> {"로딩 중 "} <CircularProgress size={10} thickness={1.5} /></>: "음악 추천"
            }
          </button>
        </form>
      </div>
      
      <div className={"playlist"}>
        <ReactBootstrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {data.map((recommendation, index) => (
              <tr key={index}>
                <td>{recommendation.songname}</td>
                <td>{recommendation.singer}</td>
              </tr>
            ))
          }
          </tbody>
        </ReactBootstrap.Table>
        <ReactBootstrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {data.map((recommendation, index) => (
              <tr key={index}>
                <td>{recommendation.songname}</td>
                <td>{recommendation.singer}</td>
              </tr>
            ))
          }
          </tbody>
        </ReactBootstrap.Table>
        <ReactBootstrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {data.map((recommendation, index) => (
              <tr key={index}>
                <td>{recommendation.songname}</td>
                <td>{recommendation.singer}</td>
              </tr>
            ))
          }
          </tbody>
        </ReactBootstrap.Table>
      </div>
    </div>
  ); 
}

const top100Films = [
  { title: '명곡들'}, { title: '서정적인'}, { title: '프랑스'}, { title: '고전'}, { title: '기쁨'},
  { title: '연주자'}, { title: '라디오'}, { title: '2017'}, { title: '남성보컬'}, { title: '콜라보'}, 
  { title: '짜증'}, { title: 'Official_Chart'}, { title: '공부할때'}, { title: '펑키'}, { title: '아이돌'}, 
  { title: '피로'}, { title: '선곡표'}, { title: '8090'}, { title: '피아노'}, { title: '기분'}, 
  { title: '비올때'}, { title: '따뜻'}, { title: '목소리'}, { title: '갬성'}, { title: '요리'}, 
  { title: '감성충만'}, { title: '차안에서'}, { title: '엄마아리랑'}, { title: '매혹적'}, { title: '인디뮤직'}, 
  { title: '추석'}, { title: '개성'}, { title: '테라스'}, { title: '힘나는'}, { title: '숙면'}, 
  { title: '아무생각없이'}, { title: 'izm'}, { title: '권태기'}, { title: '록'}, { title: '싱숭생숭'}, 
  { title: '1980'}, { title: 'virtuoso'}, { title: '파리'}, { title: '홈카페'}, { title: '유산슬'}, 
  { title: '숨겨진'}, { title: '강아지'}, { title: '피아노곡'}, { title: '역주행'}, { title: '발랄'}, 
  { title: '눈물'}, { title: '샤워'}, { title: '방탄'}, { title: '추천곡'}, { title: '회상'},
  { title: '섬세한'}, { title: '고급진'}, { title: '감성충전'}, { title: 'swing'}, { title: '모던록'}, 
  { title: 'Lofi'}, { title: '잠'}, { title: '이브'}, { title: '산뜻'}, { title: '불금'}, 
  { title: '신선한'}, { title: '호텔'}, { title: '라이브'}, { title: '연주곡'}, { title: '좋아'}, 
  { title: '감성인디'}, { title: '인기곡'}, { title: '한동윤'}, { title: 'Alternative'}, { title: '할로윈'}, 
  { title: '시티팝'}, { title: 'OST모음'}, { title: '에너지'}, { title: '미세먼지'}, { title: '필청곡'}, 
  { title: '봄비'}, { title: '감미로운'}, { title: '늦여름'}, { title: '애절'}, { title: '외출'}, 
  { title: '위로'}, { title: '아름다운'}, { title: '집중'}, { title: '스쿨오브록'}, { title: '몽롱한'}, 
  { title: '연애'}, { title: 'EDM'}, { title: '샹송'}, { title: '빌보드'}, { title: '눈오는날'}, 
  { title: '슬픔'}, { title: '자연'}, { title: '하이브리드'}, { title: '가을하늘'}, { title: '친구'}, 

  { title: '교회'}, { title: '도서관'}, { title: '오르골'}, { title: 'bar'}, { title: '입학'},
  { title: '따스함'}, { title: '모닝콜'}, { title: '워너원'}, { title: '한강'}, { title: '마무리'}, 
  { title: 'BTS'}, { title: 'KPOP탐구생활'}, { title: '책'}, { title: '야경'}, { title: '차분'}, 
  { title: '장소'}, { title: '이불속'}, { title: '불면증'}, { title: '찬양'}, { title: '센치'}, 
  { title: '잠들기전'}, { title: 'Musical'}, { title: '초여름'}, { title: '긴장감'}, { title: '추위'}, 
  { title: '프로포즈'}, { title: '트로피컬하우스'}, { title: '댄스곡'}, { title: '요가'}, { title: '차분함'}, 
  { title: '캐롤'}, { title: '지미노래'}, { title: '비오는'}, { title: '운동'}, { title: '드라이브할때신나는노래'}, 
  { title: '여행'}, { title: '맥주'}, { title: '태연'}, { title: '이태원'}, { title: '뮤직'}, 
  { title: 'popsong'}, { title: '차트'}, { title: '감성적'}, { title: '패션'}, { title: '어쿠스틱팝'}, 
  { title: '웨하스구름'}, { title: '낙엽'}, { title: '솔로'}, { title: '귀여운'}, { title: '설레임'}, 
  { title: '팝송추천'}, { title: '따뜻함'}, { title: '하우스'}, { title: '우아한'}, { title: '혼자만의시간'},
  { title: '일탈'}, { title: '좋은음악'}, { title: '고독'}, { title: '신난다'}, { title: '방콕'}, 
  { title: '행복'}, { title: '인디팝'}, { title: '집중력'}, { title: '2017년'}, { title: '신난'}, 
  { title: '게임'}, { title: '전설'}, { title: '세련된'}, { title: 'drive'}, { title: '포근함'}, 
  { title: '라운지바'}, { title: '신나는음악'}, { title: '연인'}, { title: '별'}, { title: '끈적'}, 
  { title: '일요일'}, { title: '3살'}, { title: '평화로운_릴렉스'}, { title: '생각'}, { title: 'pub'}, 
  { title: 'deep'}, { title: '고백송'}, { title: '힙스터'}, { title: '가사없는'}, { title: '버스'}, 
  { title: '켄드릭라마'}, { title: '프로듀스101'}, { title: '기분좋은'}, { title: '올림픽'}, { title: '여운'}, 
  { title: '추워'}, { title: '80년대'}, { title: '딥하우스'}, { title: '스웨그'}, { title: '클럽음악'}, 
  { title: '고요한'}, { title: '점심'}, { title: '스탠더드'}, { title: '캠핑'}, { title: '힙합'}, 

  { title: '지친'}, { title: '흥겨움'}, { title: '지칠때'}, { title: '취준생'}, { title: '봄캐롤'},
  { title: '하이라이트'}, { title: '추억'}, { title: '서울'}, { title: '봄'}, { title: '2019'}, 
  { title: '러닝머신'}, { title: 'Party'}, { title: '2000년대'}, { title: '힙'}, { title: '미스터트롯'}, 
  { title: 'Metal'}, { title: '쉼'}, { title: '끝'}, { title: '취저'}, { title: '판타지'}, 
  { title: '공항'}, { title: '편안한음악'}, { title: '지누락엔터테인먼트'}, { title: '최신곡'}, { title: '브릿팝'}, 
  { title: '자극'}, { title: '로맨스'}, { title: '꿈'}, { title: '인싸'}, { title: '힙합엘이'}, 
  { title: '분노'}, { title: 'Coldplay'}, { title: '발라드추천'}, { title: '신나게'}, { title: '힘든날'}, 
  { title: '책읽을때'}, { title: '추억의'}, { title: '비투비'}, { title: '그루비'}, { title: '웨이트'}, 
  { title: '선선한'}, { title: '저녁'}, { title: 'TOP20'}, { title: 'house'}, { title: '잔잔함'}, 
  { title: '자유'}, { title: '고속도로'}, { title: '웹진이즘'}, { title: '팝락'}, { title: '공허함'}, 
  { title: '엑소'}, { title: '음악의안단테'}, { title: '드라이브'}, { title: '내취향'}, { title: 'EXO'},
  { title: '파워워킹'}, { title: '인생곡'}, { title: '스포츠'}, { title: '명곡'}, { title: '편안'}, 
  { title: 'soul'}, { title: '아련'}, { title: '딘'}, { title: '2000'}, { title: '몽글몽글'}, 
  { title: '옛날'}, { title: '잔나비'}, { title: 'J_Rock'}, { title: 'IDOL'}, { title: '고요'}, 
  { title: '스트레스'}, { title: '소녀시대'}, { title: '유럽'}, { title: '쓸쓸'}, { title: '선곡'}, 
  { title: '피아니스트'}, { title: '대중적'}, { title: '낭만적인'}, { title: '겨울밤'}, { title: '오늘'}, 
  { title: '자존감'}, { title: '영화'}, { title: '오페라'}, { title: 'Playlist'}, { title: '발렌타인데이'}, 
  { title: '런닝'}, { title: 'newage'}, { title: '가사'}, { title: '싸이월드'}, { title: '내한'}, 
  { title: '보사노바'}, { title: 'Queen'}, { title: '러블리즈'}, { title: '오디오'}, { title: '취향저격'}, 
  { title: '둠칫둠칫'}, { title: '스타일'}, { title: '우울할때'}, { title: '팝송모음'}, { title: '독특한'}, 

  { title: '대학가요제'}, { title: '노동요'}, { title: '박효신'}, { title: '해외힙합'}, { title: '멜랑꼴리'},
  { title: '내적댄스'}, { title: '멜로우_그루비'}, { title: '2018년'}, { title: '세련'}, { title: 'HiFi가이드'}, 
  { title: '분위기좋은'}, { title: '보이그룹'}, { title: '네오소울'}, { title: '퓨전재즈'}, { title: 'EdSheeran'}, 
  { title: '데일리'}, { title: 'funk'}, { title: '국내'}, { title: '참이슬'}, { title: 'Summer'}, 
  { title: '랩힙합'}, { title: '달달한노래'}, { title: '개성있는'}, { title: 'i_know_it'}, { title: '원곡'}, 
  { title: '여성'}, { title: '결혼식'}, { title: '나른함'}, { title: '올드팝'}, { title: 'Producer_DJ'}, 
  { title: '썸'}, { title: '러브송'}, { title: '록명곡'}, { title: '아일랜드'}, { title: '잠자기전'}, 
  { title: '노래들'}, { title: '청량'}, { title: 'LONMusic'}, { title: '스타일리시'}, { title: 'Electronic'}, 
  { title: '피처링'}, { title: '자전거'}, { title: '나만알고싶은음악'}, { title: '회상_추억'}, { title: '감정'}, 
  { title: '방학'}, { title: '졸릴때'}, { title: '달콤한'}, { title: '레이블'}, { title: '북유럽'}, 
  { title: '쿨'}, { title: '세트리스트'}, { title: '달달함'}, { title: 'OfficialCharts'}, { title: '월드'},
  { title: '연휴'}, { title: '아메리카노'}, { title: '힘내'}, { title: '음악추천'}, { title: '해변'}, 
  { title: '이루마'}, { title: '전자음악'}, { title: '잔잔'}, { title: 'icons'}, { title: '차'}, 
  { title: '레드벨벳'}, { title: '록밴드'}, { title: '기리보이'}, { title: '1990년대'}, { title: 'R'}, 
  { title: '자신감'}, { title: '첫사랑'}, { title: '레트로'}, { title: '상처'}, { title: '따뜻한'}, 
  { title: '치명적'}, { title: '그래미'}, { title: '영국'}, { title: '편안함'}, { title: '등교'}, 
  { title: '중독성'}, { title: '여자친구'}, { title: '용기'}, { title: '수능'}, { title: '흥폭발'}, 
  { title: '어쿠스틱기타'}, { title: '설렘'}, { title: '블랙핑크'}, { title: '리메이크'}, { title: 'classic'}, 
  { title: '한국힙합'}, { title: 'Coffee'}, { title: '팝재즈'}, { title: '까페음악'}, { title: '팝'}, 
  { title: '음색깡패'}, { title: '우정'}, { title: 'JPOP'}, { title: '아이돌의숨은명곡'}, { title: '재즈'}, 

  { title: '새해'},  { title: '봄나들이'},  { title: '연주음악'},  { title: '명상'},  { title: '트랩'}, 
  { title: '부드러운_잔잔한'},  { title: '고막힐링'},  { title: '레전드'},  { title: 'Folk'},  { title: '발라드'}, 
  { title: '아이들'},  { title: '사랑'},  { title: '퇴근'},  { title: '크리스마스캐롤'},  { title: '메탈'}, 
  { title: '보컬'},  { title: '월드뮤직'},  { title: '해외랩힙합'},  { title: 'DEAN'},  { title: '경쾌'}, 
  { title: '에드시런'},  { title: '해외음악'},  { title: '내적댄스유발'},  { title: '주말'},  { title: 'DAY6'}, 
  { title: '일렉트로니카'},  { title: '사랑해'},  { title: '감성힙합'},  { title: '사운드'},  { title: '국내인디'}, 
  { title: '즐거움'},  { title: '정미애'},  { title: '아픔'},  { title: '재즈추천'},  { title: '대한민국'}, 
  { title: '국내힙합'},  { title: '작곡'},  { title: '국내알앤비'},  { title: '긍정'},  { title: '독서'}, 
  { title: '미국'},  { title: '하드락'},  { title: 'disco'},  { title: '디저트'},  { title: '꽃'}, 
  { title: '라라랜드'},  { title: '개인취향'},  { title: '퇴근길'},  { title: '떼창'},  { title: '자기전에'}, 
  { title: '산뜻한'},  { title: '시작'},  { title: '고음'},  { title: '봄날'},  { title: '팝음악'}, 
  { title: '아이오아이'},  { title: '헬스장'},  { title: '이별'},  { title: '그루브'},  { title: '미련'}, 
  { title: ' 붸붸 '},  { title: ' 핫한 '},  { title: ' 하루 '},  { title: ' 안녕 '},  { title: ' 일 '}, 
  { title: '띵곡'},  { title: '슬픈노래'},  { title: '남녀듀엣'},  { title: '바이브'},  { title: '연말'}, 
  { title: '발렌타인'},  { title: '잠안올때'},  { title: '아련한'},  { title: '모던락'},  { title: '방안에서'}, 
  { title: '스윙재즈' },  { title: '커피'},  { title: '박효재'},  { title: '흥겨운'},  { title: '공원'}, 
  { title: '예배'},  { title: 'indie'},  { title: '트로피컬'},  { title: '청량함'},  { title: '학교'}, 
  { title: '바람'},  { title: '락음악'},  { title: '듀엣'},  { title: '로맨틱'},  { title: '인기'}, 
  { title: '나른'},  { title: '공연'},  { title: '우울한'},  { title: '불토'},  { title: '가볍게'}, 
  { title: '아이돌탐구생활'},  { title: '여자아이돌'},  { title: '여성뮤지션'},  { title: '방탄소년단'},  { title: '고막남친'}, 

  { title: '수록곡추천'},  { title: '발라드감성'},  { title: '연말결산'},  { title: '멜랑콜리'},  { title: 'HIP'}, 
  { title: '울고싶을때'},  { title: '멋진'},  { title: ' ip_Hop'},  { title: '편안한'},  { title: '휴가'}, 
  { title: '고민'},  { title: '재즈보컬'},  { title: '브런치'},  { title: '작곡가'},  { title: '숨은띵곡'}, 
  { title: '30대'},  { title: '요즘'},  { title: '가요'},  { title: '웹진웨이브'},  { title: '비'}, 
  { title: '일렉'},  { title: '고막여친'},  { title: '오후'},  { title: '로파이'},  { title: '볼빨간사춘기'}, 
  { title: '뉴이스트'},  { title: '아기클래식'},  { title: '릴렉스'},  { title: '바다'},  { title: '열정'}, 
  { title: '따듯한'},  { title: '어린이집'},  { title: '겨울'},  { title: '아티스트'},  { title: '애절한'}, 
  { title: '휴일'},  { title: '복고'},  { title: '유산소'},  { title: '밤하늘'},  { title: '안전운전'}, 
  { title: '아침'},  { title: '4월'},  { title: 'COOL'},  { title: '크리스마스이브'},  { title: '드라마'}, 
  { title: '외힙'},  { title: 'ASMR'},  { title: '이별노래'},  { title: '트렌디'},  { title: '질주'}, 
  { title: '장르'},  { title: '몽환적'},  { title: 'CCM'},  { title: '외로움'},  { title: '흐린날 '}, 
  { title: '장마'},  { title: '달리기'},  { title: '지브리'},  { title: '혼자'},  { title: '파워풀_에너제틱'}, 
  { title: '시험'},  { title: '귀르가즘'},  { title: '무더위'},  { title: '라운지'},  { title: '출발'}, 
  { title: '다중음격'},  { title: '청음'},  { title: '가을감성'},  { title: '스코어'},  { title: '퓨전'}, 
  { title: 'since2000'},  { title: 'Rap'},  { title: '락메탈'},  { title: '그루비한'},  { title: '명반'}, 
  { title: '겨울연가'},  { title: '기차'},  { title: '서정적'},  { title: '서정'},  { title: '데이식스'}, 
  { title: '꿀잠'},  { title: '가스펠'},  { title: '엄마'},  { title: '추천음악'},  { title: '감성자극'}, 
  { title: 'HOT'},  { title: '응원'},  { title: '힐링'},  { title: '미스트롯'},  { title: '두근두근'}, 
  { title: 'RNBSOUL'},  { title: '집'},  { title: '영화OST'},  { title: '명절'},  { title: '낭만'}, 
  { title: '감동적인'},  { title: '일본음악'},  { title: '추천'},  { title: '겨울음악'},  { title: '가을음악'}, 

  { title: '축하'},  { title: '해외일렉트로니카'},  { title: '느낌적인' },  { title: '쓸쓸한'},  { title: '결혼'}, 
  { title: '아이돌숨은명곡'},  { title: '다운템포'},  { title: 'cafe'},  { title: '은혜'},  { title: '인디음악'}, 
  { title: '올드스쿨'},  { title: '해외'},  { title: '숨겨진명곡'},  { title: '트와이스'},  { title: '콜드플레이'}, 
  { title: '레게'},  { title: '흑인음악'},  { title: '덥스텝'},  { title: '모음'},  { title: 'JRock'}, 
  { title: '잔잔한노래'},  { title: '다이어트'},  { title: '웅장함'},  { title: '화이트데이'},  { title: '송가인'}, 
  { title: '뉴에이지피아노'},  { title: '기타리스트'},  { title: 'andB'},  { title: 'Soundtrack'},  { title: '국내ccm'}, 
  { title: '귀성길'},  { title: '술'},  { title: '가을'},  { title: '임영웅'},  { title: '통기타'}, 
  { title: '이국적인'},  { title: '따뜻하게'},  { title: '청춘'},  { title: 'ballad'},  { title: '재즈명곡'}, 
  { title: '뮤지션'},  { title: '최신'},  { title: '가사로듣는'},  { title: '혼자있을때'},  { title: '힙한'}, 
  { title: '홈파티'},  { title: '편집샵'},  { title: '사랑고백'},  { title: '라떼'},  { title: '쿨한'}, 
  { title: '밤새벽'},  { title: '광고음악'},  { title: '감수성'},  { title: '그루브한'},  { title: '힘들때'}, 
  { title: '포크'},  { title: '옷가게'},  { title: '취향'},  { title: '비오는_날'},  { title: '여자가수'}, 
  { title: 'DJ'},  { title: 'etc'},  { title: '잠이안올때'},  { title: '조용한'},  { title: '집에서'}, 
  { title: '홀로'},  { title: '1960_70'},  { title: '2018'},  { title: '휘트니스'},  { title: '슬로우잼'}, 
  { title: '정리'},  { title: '프롬'},  { title: '1990'},  { title: '잘자요'},  { title: '퇴근후'}, 
  { title: '전곡듣기'},  { title: '꿀보이스'},  { title: '내마음의사진'},  { title: '실력파'},  { title: '극복'}, 
  { title: '보컬재즈'},  { title: '2010'},  { title: '바운스'},  { title: '봄노래'},  { title: '워십'}, 
  { title: '색다른'},  { title: '브금'},  { title: '분위기깡패'},  { title: '록메탈'},  { title: '명곡모음'}, 
  { title: '정다경'},  { title: '시원함'},  { title: '깊은밤'},  { title: '함께'},  { title: '재즈음악'}, 
  { title: '신나는팝송'},  { title: '도시'},  { title: '조성진'},  { title: '피곤'},  { title: '짝사랑'},

  { title: '즐거운'},  { title: '러닝'},  { title: '연주'},  { title: '하이틴'},  { title: '나만알고싶은노래'}, 
  { title: '어두운'},  { title: '시원'},  { title: '밤에'},  { title: '20대'},  { title: '겨울감성'}, 
  { title: '산책'},  { title: '쓸쓸함'},  { title: '외국힙합'},  { title: '밴드음악'},  { title: 'bgm'}, 
  { title: '느낌'},  { title: '가을비'},  { title: '송라이터'},  { title: '락'},  { title: '여유로운'}, 
  { title: '신곡'},  { title: '제이팝'},  { title: '스윗마인드'},  { title: '창작'},  { title: '유니크'}, 
  { title: '북카페'},  { title: 'Hot100'},  { title: '케이팝'},  { title: '추억회상'},  { title: '바'}, 
  { title: '좋아요'},  { title: 'Trendy'},  { title: '랩'},  { title: '기분업'},  { title: '작업'}, 
  { title: '피아노음악'},  { title: '7080'},  { title: '홈트'},  { title: '일상'},  { title: '아날로그'}, 
  { title: '보고싶다'},  { title: '평화'},  { title: '누디스코'},  { title: '내맘대로'},  { title: '오토튠'}, 
  { title: '사무실'},  { title: 'remix'},  { title: '새벽에'},  { title: '어반'},  { title: 'mood'}, 
  { title: '아이유'},  { title: '그리움'},  { title: '폭염'},  { title: '사랑노래'},  { title: '쇼미더머니'}, 
  { title: 'OST'},  { title: '칵테일'},  { title: '날씨'},  { title: '베이스'},  { title: '신인'}, 
  { title: '숨은명곡'},  { title: '명작'},  { title: '출근길'},  { title: '수상작'},  { title: '국내RnB'}, 
  { title: '버스킹'},  { title: '겨울왕국'},  { title: 'Chill'},  { title: '남자친구'},  { title: '조깅'}, 
  { title: 'Billboard'},  { title: '5월'},  { title: '걸크러쉬'},  { title: '감각적인'},  { title: '나혼자'}, 
  { title: '소주'},  { title: '월요일'},  { title: 'Latin'},  { title: '부드러운'},  { title: '일본'}, 
  { title: '헤비메탈'},  { title: '국외'},  { title: '파워DJ_CCM'},  { title: '벚꽃'},  { title: '가벼운'}, 
  { title: '카페음악'},  { title: '와인'},  { title: '국악'},  { title: '생일'},  { title: '김소유'}, 
  { title: '수면'},  { title: 'Best'},  { title: '소울'},  { title: '쏘카'},  { title: '화이팅'}, 
  { title: '컬래버레이션'},  { title: '괜찮아'},  { title: '피쉬슈즈'},  { title: '선물'},  { title: '고백'}, 

  { title: '개취'},  { title: '샤이니'},  { title: '청량감'},  { title: '키즈클래식'},  { title: '재즈_pick'}, 
  { title: '라틴'},  { title: '잠잘때'},  { title: '청소'},  { title: '대표곡'},  { title: '콘서트'}, 
  { title: '더워'},  { title: 'Instrumental'},  { title: '일할때'},  { title: '3월'},  { title: '여성보컬'}, 
  { title: '봄바람'},  { title: '모닝커피'},  { title: '커버곡 '},  { title: '수고'},  { title: '프로듀서'}, 
  { title: '스웩'},  { title: '상쾌한'},  { title: '일렉트로 '},  { title: '인디밴드'},  { title: '피크닉'}, 
  { title: '더위'},  { title: '소풍'},  { title: '멜로우 '},  { title: 'piano'},  { title: '홈트레이닝'}, 
  { title: 'weiv'},  { title: '감성'},  { title: '시원한 '},  { title: '사이키델릭'},  { title: '뉴욕'}, 
  { title: '시크'},  { title: '모임'},  { title: '한국 '},  { title: '외로울때'},  { title: '웅장한'}, 
  { title: '일렉트로팝'},  { title: '힙합감성'},  { title: '흔하지않은 '},  { title: ' _POP'},  { title: '상큼한'}, 
  { title: 'rain'},  { title: '처방전'},  { title: '데이트 '},  { title: '회식'},  { title: '졸업'}, 
  { title: '달달'},  { title: '매력'},  { title: '파티 '},  { title: '매력적'},  { title: '소나기'}, 
  { title: '가을밤'},  { title: '클럽'},  { title: '늦은밤 '},  { title: '주제곡'},  { title: '매장음악'}, 
  { title: '홍대'},  { title: '동요'},  { title: '인디아티스트들의추천음악 '},  { title: '싱어송라이터'},  { title: 'Chillout'}, 
  { title: '상큼'},  { title: '찾아오는DJ'},  { title: '향기 '},  { title: '음악'},  { title: '센티멘탈'}, 
  { title: '찬바람'},  { title: '시간'},  { title: 'HIPHOPLE '},  { title: '마마무'},  { title: '출퇴근'}, 
  { title: '분위기있는'},  { title: '설레는'},  { title: '드럼 '},  { title: '가수'},  { title: '우주'}, 
  { title: '외힙모음'},  { title: '희망'},  { title: '파워 '},  { title: '리드미컬'},  { title: '째즈'}, 
  { title: '아기'},  { title: '차분한'},  { title: '밤산책 '},  { title: '비오는날'},  { title: '갬성갬성'}, 
  { title: '몽환'},  { title: '밴드'},  { title: '슬픈 '},  { title: '피아노연주곡'},  { title: '국힙'}, 
  { title: '사이다'},  { title: '스트레칭'},  { title: '트롯 '},  { title: 'SWAG'},  { title: '노을'}, 

  { title: '꿀맛'},  { title: '윤종신'},  { title: 'funky'},  { title: '홍자'},  { title: '나른한'}, 
  { title: '위클리초이스'},  { title: '야근'},  { title: '워킹'},  { title: '취향저격DJ'},  { title:  'timeoff'}, 
  { title: 'setlist'},  { title: '2020'},  { title: '사랑스러운'},  { title: '라틴팝'},  { title: '어린이'}, 
  { title: 'Christmas'},  { title: '느낌있는'},  { title: '키즈동요'},  { title: 'groove'},  { title: '컨템포러리RNB'}, 
  { title: '그때그시절'},  { title: 'TWICE'},  { title: '간지'},  { title: '편곡'},  { title: '로멘틱'}, 
  { title: '90년대'},  { title: '감성노래'},  { title: '디즈니'},  { title: '노래방'},  { title: '센치한'}, 
  { title: '계절'},  { title: 'inst'},  { title: '배경음악'},  { title: 'M에센셜'},  { title: '커플'}, 
  { title: '태교음악'},  { title: 'Songwriter'},  { title: '헤이즈'},  { title: '다양한'},  { title: '장'}, 
  { title: '록발라드'},  { title: '재즈연주곡'},  { title: '한국록'},  { title: '일본노래'},  { title: '나만의Best3'}, 
  { title: '백색소음'},  { title: '후회'},  { title: '매장'},  { title: '휴식'},  { title: '도깨비'}, 
  { title: 'Standard'},  { title: '동화'},  { title: '편집숍'},  { title: '호주'},  { title: '바'}, 
  { title: '노래'},  { title: 'Club'},  { title: '히트곡'},  { title: '첫눈'},  { title: '가창력'}, 
  { title: '좋은'},  { title: '공부'},  { title: '플레이리스트'},  { title: 'CityPop'},  { title: '장마철'}, 
  { title: '상쾌'},  { title: '촉촉한'},  { title: '운전'},  { title: '에이핑크'},  { title: '눈'}, 
  { title: '센치한_우울한'},  { title: '트랜디'},  { title: 'tv별책부록'},  { title: '에센셜'},  { title: '울함'}, 
  { title: '힐링음악'},  { title: 'Producer'},  { title: '인생'},  { title: '편한'},  { title: '유재석'}, 
  { title: 'Acoustic'},  { title: '해외록'},  { title: '목요일'},  { title: '졸음'},  { title: '감상'}, 
  { title: '듣기좋은'},  { title: '월요병'},  { title: '여름'},  { title: ' riacharts'},  { title: '기타'}, 
  { title: '월간'},  { title: '우울한날'},  { title: '최애곡'},  { title: '론뮤직'},  { title: '달콤'}, 
  { title: '중독성있는'},  { title: '새학기'},  { title: '밤'},  { title: '신나는'},  { title: '아카펠라 '}, 

  { title: '여름휴가 '},  { title: '연애세포'},  { title: 'UK'},  { title: '몽환적인'},  { title: '셋리스트'}, 
  { title: '감동 '},  { title: '음색'},  { title: '공감'},  { title: '신나고'},  { title: '낮잠 '}, 
  { title: '감각적 '},  { title: '나들이'},  { title: '가야씨'},  { title: '피트니스'},  { title: '여름노래'}, 
  { title: '70년대 '},  { title: '붐뱁'},  { title: '회사'},  { title: 'legend'},  { title: '비타민'}, 
  { title: '2016 '},  { title: '기억'},  { title: '래퍼'},  { title: '방구석'},  { title: '만남'}, 
  { title: '2019년 '},  { title: '남자보컬'},  { title: '듀엣곡'},  { title: '피서'},  { title: '감성곡'}, 
  { title: '달 '},  { title: 'LOVE'},  { title: '가사가좋은노래'},  { title: '흐림'},  { title: '트럼펫'}, 
  { title: '베스트 '},  { title: '특별한'},  { title: '발랄한'},  { title: 'HipHop'},  { title: '가사좋은노래'}, 
  { title: '영화음악 '},  { title: '경쾌한'},  { title: '카페뮤직'},  { title: '스트레스해소'},  { title: '작사가'}, 
  { title: '테크노 '},  { title: '이지리스닝'},  { title: '태교'},  { title: '여름밤'},  { title: '댄스팝'}, 
  { title: '인디 '},  { title: '크러쉬'},  { title: '자유로운'},  { title: '칠아웃'},  { title: '아이돌그룹'}, 
  { title: '추운날 '},  { title: '무드'},  { title: '소울풀'},  { title: '사극'},  { title: '노래모음'}, 
  { title: '히든트랙 '},  { title: '상쾌함'},  { title: '자장가'},  { title: '빌로우'},  { title: '스윗'}, 
  { title: '브라질 '},  { title: '중독'},  { title: '팝록'},  { title: '여유'},  { title: '포크팝'}, 
  { title: '대중적인 '},  { title: '지친하루'},  { title: '위로가필요할때'},  { title: '락발라드'},  { title: '섹시'}, 
  { title: '조용 '},  { title: '재즈팝'},  { title: '직장인'},  { title: '댄스음악'},  { title: '부모님'}, 
  { title: '예쁜 '},  { title: '1960년대'},  { title: '레스토랑'},  { title: 'SOCAR'},  { title: '겨울노래'}, 
  { title: 'Jazz '},  { title: '평화로운'},  { title: '하늘'},  { title: '뭉클한'},  { title: '믿고듣는'}, 
  { title: '삼바'},  { title: '낭만적'},  { title: '춤'},  { title: '휴식이필요할때'},  { title: '블루스'}, 
  { title: '신나는_음악'},  { title: '비트'},  { title: '에너제틱'},  { title: '과거'},  { title: '좋은노래'}, 

  { title: '알앤비소울'},  { title: '블랙뮤직'},  { title: '여행산책'},  { title: '혼자있고싶을때'},  { title: '넷플릭스'}, 
  { title: '활기'},  { title: '잔잔한음악'},  { title: '크리스마스'},  { title: 'RnB'},  { title: '클래식'}, 
  { title: '젊음'},  { title: '오전'},  { title: '감성팝'},  { title: '수고했어'},  { title: '샘플링'}, 
  { title: '익숙한'},  { title: '옛날노래'},  { title: '미드'},  { title: '재즈힙합'},  { title: '지코'}, 
  { title: '흥'},  { title: '트렌디한'},  { title: '여친'},  { title: '가족'},  { title: '축가'}, 
  { title: '달달한'},  { title: '매력적인'},  { title: '추운'},  { title: '삽입곡'},  { title: '멜로디'}, 
  { title: '쌀쌀'},  { title: '리듬'},  { title: '섹시한'},  { title: '국내록'},  { title: '장르구분없이'}, 
  { title: '침대'},  { title: '심심할때'},  { title: '캐럴' },  { title: '피쳐링'},  { title: '맑음'}, 
  { title: '감각'},  { title: '로맨틱한'},  { title: 'Lounge'},  { title: '맑은' },  { title: '쌀쌀한'}, 
  { title: '토닥토닥'},  { title: '활력'},  { title: '쇼핑 '},  { title: '대세 '},  { title: '기도'}, 
  { title: '시부야케이'},  { title: '트랜스'},  { title: 'Vocal'},  { title: '드라마ost'},  { title: '홍진영'}, 
  { title: '우산'},  { title: '사운드트랙'},  { title: '기분좋아지는'},  { title: '리드미컬_그루 '},  { title: '새로운'}, 
  { title: 'kpop'},  { title: '2010년대'},  { title: '주간'},  { title: '비긴어게인'},  { title: '뉴에이지'}, 
  { title: '애니메이션'},  { title: '싱그러운'},  { title: '동심'},  { title: '힙합클럽'},  { title: '컨트리'}, 
  { title: '아무로나미에'},  { title: '드라이빙'},  { title: '내한공연'},  { title: '시상식'},  { title: 'PBRnB'}, 
  { title: '작사'},  { title: '흥부자'},  { title: '장윤정'},  { title: '커피숍'},  { title: '알앤비'}, 
  { title: '팝발라드'},  { title: '페스티벌'},  { title: '금요일'},  { title: '모닝'},  { title: '남자'}, 
  { title: '카페'},  { title: '춘곤증'},  { title: '신비로운'},  { title: '한지훈'},  { title: '파워풀'}, 
  { title: 'SM'},  { title: '띵곡들'},  { title: '모던'},  { title: '걱정'},  { title: '영탁'}, 
  { title: '컴백'},  { title: '카페에서'},  { title: '도입부'},  { title: '크리스마스노래'},  { title: '1980년대'}, 

  { title: '바이올린'},  { title: '보컬리스트'},  { title: '외로운'},  { title: '집콕'},  { title: '티타임'}, 
  { title: '델리민주'},  { title: '나만알고싶은'},  { title: '신남'},  { title: '전통가요'},  { title: '힘이_나는'}, 
  { title: 'BossaNova'},  { title: '알엔비'},  { title: '트로트'},  { title: '따스한'},  { title: '감성발라드'}, 
  { title: '업무'},  { title: '애창곡'},  { title: '텐션업'},  { title: '슈가맨'},  { title: '얼터너티브'}, 
  { title: 'EDMFloor'},  { title: '인디추천'},  { title: '리스트'},  { title: '힘'},  { title: '휴양지'}, 
  { title: '트렌드'},  { title: '심쿵'},  { title: '답답할때'},  { title: '열대야'},  { title: '향수'}, 
  { title: '퇴폐'},  { title: '명작OST'},  { title: '걸그룹'},  { title: '첼로'},  { title: 'label_crew'}, 
  { title: '트렌디팝'},  { title: '퀸'},  { title: '행복한'},  { title: '안정'},  { title: '일렉트로닉팝'}, 
  { title: 'sweetmind'},  { title: '리듬감'},  { title: '지하철'},  { title: '빈티지'},  { title: '파이팅'}, 
  { title: '팝명곡'},  { title: '아리아나그란데'},  { title: '밤에듣기좋은노래'},  { title: 'Rock'},  { title: '설날'}, 
  { title: '귀호강'},  { title: '인디록'},  { title: '감성음악'},  { title: '라이딩'},  { title: '우울'}, 
  { title: '들썩들썩'},  { title: '봄맞이'},  { title: '강렬한'},  { title: '성탄절'},  { title: '걷기'}, 
  { title: '토요일'},  { title: '분위기'},  { title: '자기전'},  { title: '댄스댄스'},  { title: '까페'}, 
  { title: '이별후'},  { title: '로드트립'},  { title: '멜론'},  { title: '2000_10'},  { title: '잡POP사전'}, 
  { title: '메리크리스마스'},  { title: '빗소리'},  { title: '치유'},  { title: '새벽'},  { title: '운동할때'}, 
  { title: '고급'},  { title: '신나'},  { title: '창모'},  { title: '1970_80'},  { title: '감사'}, 
  { title: '집순이'},  { title: '팝송'},  { title: '꿀음색'},  { title: '사랑설렘'},  { title: '크루'}, 
  { title: '꿀성대'},  { title: '수험생'},  { title: '크로스오버'},  { title: '펑크'},  { title: '화창한'}, 
  { title: '펍'},  { title: '잔잔한'},  { title: '얼터너티브락'},  { title: '포근'},  { title: '충전'}, 
  { title: '활기찬'},  { title: '12월'},  { title: '남친'},  { title: '디스코'},  { title: '마음'}, 

  { title: '출퇴근길'},  { title: '스타일리쉬'},  { title: '해외알앤비소울'},  { title: '빅뱅'},  { title: '수록곡'}, 
  { title: '오디션'},  { title: '새벽감성'},  { title: '감성적인'},  { title: '트로피칼'},  { title: '힘내요'}, 
  { title: '댄스'},  { title: '성인가요'},  { title: '장르불문'},  { title: '그냥'},  { title: '얼터너티브록'}, 
  { title: '매장노래'},  { title: 'bonOBono'},  { title: 'dance'},  { title: '빈지노'},  { title: '어쿠스틱'}, 
  { title: '신스팝'},  { title: '힐링송'},  { title: '끈적한'},  { title: '이어폰'},  { title: '로큰롤'}, 
  { title: '여름향기'},  { title: '미디어'},  { title: '이디엠'},  { title: '드림팝'},  { title: '슬플때'}, 
  { title: '시험기간'},  { title: '뉴트로'},  { title: '재즈피아노'},  { title: '러브'},  { title: '일렉트로닉'}, 
  { title: '하드록'},  { title: '이불'},  { title: '여자'},  { title: '오케스트라'},  { title: '무기력'}, 
  { title: '팝랩'},  { title: '가을노래'},  { title: '석양'},  { title: '출근'},  { title: '리믹스'}, 
  { title: '일렉팝'},  { title: '신나는노래'},  { title: '여자보컬'},  { title: '스윙'},  { title: '남자아이돌'}, 
  { title: '뮤지컬'},  { title: '밝은'},  { title: '신난_흥겨운'},  { title: '헬스'},  { title: '사색'}, 
  { title: '노래추천'},  { title: '비오는날듣기좋은노래'},  { title: '오마이걸'},  { title: '축제'},  { title: '커피한잔'}, 
  { title: '심야'},  { title: '빅밴드'},  { title: '남자가수'},  { title: 'Pop'},  { title: 'electronica'}, 
  { title: '낮'},  { title: '팝뮤직'},  { title: '헤어짐'},  { title: '광고'},  { title: '햇살'}, 
  { title: '혼술'},  { title: '비행기'},  { title: '살랑살랑'},  { title: '바캉스'},  { title: '루프탑'}, 
  { title: '청량한'},  { title: '포근한'},  { title: '로우파이'},  { title: '기분전환'},  { title: '밤공기'}, 
  { title: '프로그레시브'}, { title: '귀경길'}
];


export default App;
