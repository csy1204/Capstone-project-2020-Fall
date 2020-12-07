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

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  // const [time, setTime] = React.useState(null);


  var time = 63.56789;


  const playlist = [
    {songname: "2002", singer: "Anne Marie"},
    {songname: "Dynamite", singer: "BTS"},
    {songname: "Snowman", singer: "Sia"},
  ]

  const handleClick = async (e) => {
    e.preventDefault() 
    console.log("Clcik!")
    setIsLoading(true)

    if (value.title == ""){
      alert("태그를 입력하세요.") //질문 ***
    }
    else{
      const inferences = await api.getInference({tag: value.title })
      console.log(inferences)

      setData(inferences)
    }    
    setIsLoading(false)
  }


  return (
    <div className="App">
      <div className="header">
        <div id="Sung-Ply">Sung-Ply</div>

        <form className="search-form">
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
        <div id="LB_NeuralCF">
          <div className="table_title">
            <h3 id="h3_color">Load Balanced Neural CF (Target)</h3>
            <p id="infer_time">Inference time: {time.toFixed(2)}</p>
          </div>
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
        <div id="Total_NeuralCF">
          <div className="table_title">
            <h3 id="h3_color">Original Neural CF (Baseline 1)</h3>
            <p id="infer_time">Inference time: {time.toFixed(2)}</p>
          </div>
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
        <div id="Total_SVD">
          <div className="table_title">
            <h3 id="h3_color">SVD Latent Factor CF (Baseline 2)</h3>
            <p id="infer_time">Inference time: {time.toFixed(2)}</p>
          </div>
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
    </div>
  ); 
}

const top100Films = [
  { title: '연애'},  { title: '유재석'},  { title: '포근한'},  { title: '연말'},  { title: '짝사랑'}, 
  { title: '친구'},  { title: '운전'},  { title: '봄바람'},  { title: '호텔'},  { title: '잠들기전'}, 
  { title: '러브송'},  { title: '흥겨운'},  { title: '산책'},  { title: '듣기좋은'},  { title: '걸그룹'}, 
  { title: '요가'},  { title: '드라이빙'},  { title: '안녕'},  { title: '파티'},  { title: '비오는날'}, 
  { title: '추위'},  { title: '감미로운'},  { title: '재즈'},  { title: '기억'},  { title: '이브'}, 
  { title: 'UK'},  { title: '추억회상'},  { title: '여행'},  { title: '가을밤'},  { title: '센치한'}, 
  { title: '최신'},  { title: '배경음악'},  { title: '추석'},  { title: '피트니스'},  { title: '추억'}, 
  { title: '집'},  { title: '남자'},  { title: '살랑살랑'},  { title: '어쿠스틱'},  { title: '감성곡'}, 
  { title: '드라이브'},  { title: '고속도로'},  { title: '신나는'},  { title: '가을비'},  { title: '눈'}, 
  { title: '불금'},  { title: '피아노'},  { title: '연주'},  { title: '성인가요'},  { title: '댄스'}, 
  { title: '주말'},  { title: '패션'},  { title: '우울한'},  { title: '벚꽃'},  { title: '날씨'}, 
  { title: '커피'},  { title: '노동요'},  { title: '경쾌한'},  { title: '나만의Best3'},  { title: '정미애'}, 
  { title: '노래'},  { title: '헤어짐'},  { title: '팝'},  { title: '댄스곡'},  { title: '심쿵'}, 
  { title: '여유'},  { title: '휴식'},  { title: '아기'},  { title: '새벽'},  { title: 'SWAG'}, 
  { title: '우울'},  { title: '침대'},  { title: '12월'},  { title: '뉴에이지'},  { title: '낭만적인'}, 
  { title: '론뮤직'},  { title: '공부할때'},  { title: '우울할때'},  { title: '명절'},  { title: '2019년'}, 
  { title: '중독성'},  { title: '엄마아리랑'},  { title: '인디'},  { title: 'DJ'},  { title: '비'}, 
  { title: '자장가'},  { title: '버스'},  { title: '스타일'},  { title: '까페'},  { title: '퇴근'}, 
  { title: '핫한'},  { title: '상큼한'},  { title: '노래방'},  { title: '상큼'},  { title: 'EDM'}, 
  { title: '오디오'},  { title: '혼자'},  { title: '기분전환'},  { title: 'cafe'},  { title: '감성자극'}, 
  { title: '휴양지'},  { title: '아이돌'},  { title: '부드러운'},  { title: '눈오는날'},  { title: '아련한'}, 
  { title: '여름노래'},  { title: '댄스댄스'},  { title: 'electronica'},  { title: '연휴'},  { title: '가을'}, 
  { title: '알앤비'},  { title: '토닥토닥'},  { title: '장마'},  { title: '가을감성'},  { title: '트렌디'}, 
  { title: '꿀잠'},  { title: '내마음의사진'},  { title: '과거'},  { title: '잔잔'},  { title: '하우스'}, 
  { title: '와인'},  { title: '고백'},  { title: '신남'},  { title: '봄노래'},  { title: '쓸쓸'}, 
  { title: '데이식스'},  { title: '느낌있는'},  { title: '성탄절'},  { title: '불면증'},  { title: '전곡듣기'}, 
  { title: '월드'},  { title: '귀성길'},  { title: '최애곡'},  { title: '디스코'},  { title: '달달'}, 
  { title: '소울'},  { title: '책읽을때'},  { title: '슬픔'},  { title: '운동'},  { title: '사랑노래'}, 
  { title: '락'},  { title: '잔잔한노래'},  { title: '첫눈'},  { title: '여름밤'},  { title: '쌀쌀한'}, 
  { title: '시원한'},  { title: '저녁'},  { title: '낮잠'},  { title: '일렉'},  { title: '캐롤'}, 
  { title: '수고'},  { title: 'kpop'},  { title: '방콕'},  { title: '혼자있을때'},  { title: '메리크리스마스'}, 
  { title: '기분좋은'},  { title: '포크'},  { title: '빌로우'},  { title: '아무로나미에'},  { title: '꽃'}, 
  { title: '월요병'},  { title: '분위기'},  { title: '청량'},  { title: '페스티벌'},  { title: '추천곡'}, 
  { title: '내적댄스'},  { title: '외로움'},  { title: '클럽'},  { title: '즐거운'},  { title: '맑은'}, 
  { title: '스포츠'},  { title: '미스터트롯'},  { title: '열대야'},  { title: '오르골'},  { title: '감성발라드'}, 
  { title: '밤'},  { title: '시작'},  { title: '브릿팝'},  { title: 'EDMFloor'},  { title: '빗소리'}, 
  { title: '트렌드'},  { title: '조용한'},  { title: '낙엽'},  { title: '겨울밤'},  { title: 'RnB'}, 
  { title: '2019'},  { title: '몽환'},  { title: '블랙뮤직'},  { title: '겨울노래'},  { title: '겨울'}, 
  { title: '휴일'},  { title: '태교'},  { title: '팝송'},  { title: '새벽감성'},  { title: '소나기'}, 
  { title: '그리움'},  { title: '공감'},  { title: 'dance'},  { title: '달달한'},  { title: '신나는노래'}, 
  { title: '하늘'},  { title: '그루브'},  { title: '봄'},  { title: '퓨전재즈'},  { title: '회식'}, 
  { title: '일렉트로니카'},  { title: '잔잔한'},  { title: '힙합엘이'},  { title: '이어폰'},  { title: '힘들때'}, 
  { title: '설렘'},  { title: '취향저격'},  { title: '독서'},  { title: '명상'},  { title: '썸'}, 
  { title: '목소리'},  { title: 'TOP20'},  { title: '내한'},  { title: '랩'},  { title: '더위'}, 
  { title: '송가인'},  { title: 'Official_Chart'},  { title: '따듯한'},  { title: '띵곡들'},  { title: '파워풀'}, 
  { title: '베스트'},  { title: '연주곡'},  { title: '셋리스트'},  { title: '감성'},  { title: '엄마'}, 
  { title: '재즈힙합'},  { title: '바람'},  { title: '헬스'},  { title: '운동할때'},  { title: '동요'}, 
  { title: '흐린날'},  { title: '감성적인'},  { title: '명곡'},  { title: '감성충전'},  { title: '임영웅'}, 
  { title: '집콕'},  { title: '홍자'},  { title: '별'},  { title: '커피숍'},  { title: 'pub'}, 
  { title: '크리스마스'},  { title: '바다'},  { title: '기분업'},  { title: '안전운전'},  { title: '봄캐롤'}, 
  { title: '추억의'},  { title: '흥폭발'},  { title: '겨울감성'},  { title: '도시'},  { title: '어린이집'}, 
  { title: '숨은명곡'},  { title: '모닝콜'},  { title: '꿀맛'},  { title: '화창한'},  { title: '라운지'}, 
  { title: '2000'},  { title: '휴가'},  { title: 'bgm'},  { title: '여름휴가'},  { title: '연인'}, 
  { title: '비오는날듣기좋은노래'},  { title: '하루'},  { title: '슬픈'},  { title: '헬스장'},  { title: 'Pop'}, 
  { title: '집중'},  { title: '눈물'},  { title: '아침'},  { title: '두근두근'},  { title: '즐거움'}, 
  { title: 'Rock'},  { title: '차분한'},  { title: '출근길'},  { title: '이별'},  { title: '계절'}, 
  { title: '스트레스'},  { title: '봄날'},  { title: '잠'},  { title: '피크닉'},  { title: '음색'}, 
  { title: '달콤'},  { title: 'OST모음'},  { title: '다이어트'},  { title: '추운날'},  { title: '띵곡'}, 
  { title: '알엔비'},  { title: '콘서트'},  { title: '오후'},  { title: '시험'},  { title: '트롯'}, 
  { title: ' 숙면 '},  { title: ' HOT '},  { title: ' 회상 '},  { title: ' 우산 '},  { title: ' 대세 '}, 
  { title: '싱어송라이터'},  { title: '캐럴'},  { title: '취저 '},  { title: '신나는_음악'},  { title: '꿀성대'}, 
  { title: '흥'},  { title: '설레임'},  { title: '힙합'},  { title: '애창곡'},  { title: '이별노래'}, 
  { title: '카페'},  { title: '매장'},  { title: '음색깡패'},  { title: '크리스마스노래'},  { title: '여자'}, 
  { title: '스웩'},  { title: '1990'},  { title: '미스트롯'},  { title: '2010'},  { title: '퇴근길'}, 
  { title: '잠잘때'},  { title: '공부'},  { title: '설날'},  { title: '쓸쓸한'},  { title: '감각적인'}, 
  { title: '연주음악'},  { title: '달콤한'},  { title: '주제곡'},  { title: '사랑'},  { title: 'HIPHOPLE'}, 
  { title: '발라드'},  { title: '생각'},  { title: '여름'},  { title: '힐링'},  { title: '여자아이돌'}, 
  { title: '방탄'},  { title: '센치'},  { title: '커플'},  { title: '첫사랑'},  { title: '지하철'}, 
  { title: '위로'},  { title: '매장음악'},  { title: '좋은노래'},  { title: '가사'},  { title: '데이트'}, 
  { title: 'Acoustic'},  { title: '유산소'},  { title: '솔로'},  { title: '세련된'},  { title: '비트'}, 
  { title: '스타일리시'},  { title: '꿈'},  { title: '야경'},  { title: '편안한'},  { title: '일상'} 

];


export default App;
