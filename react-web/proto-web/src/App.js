import './App.css';
import React from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import * as ReactBootstrap from "react-bootstrap";
import api from './api.js'
import CircularProgress from '@material-ui/core/CircularProgress';

const filter = createFilterOptions();

const App = () => {

  const [value, setValue] = React.useState(null);

  const [clusterData, setClusterData] = React.useState([]);
  const [allData, setAllData] = React.useState([]);
  const [svdData, setSvdData] = React.useState([]);
  
  const [spentData, setSpentData] = React.useState([0.0, 0.0, 0.0]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async (e) => {
    e.preventDefault() 
    setIsLoading(true)

    if (!value){
      setIsLoading(false)
      alert("태그를 입력하세요.") //질문 ***
      return
    }

    const inferences = await api.getInference({tag: value.title })
    if (inferences.total_length == 0) {
      setIsLoading(false)
      alert("존재하지 않는 태그입니다. 다시 입력해주세요~ :)")
      return
    }

    setClusterData(inferences.cluster_model.predictions)
    setAllData(inferences.all_model.predictions)
    setSvdData(inferences.svd_model.predictions)
    setSpentData([inferences.cluster_model.spent, inferences.all_model.spent, inferences.svd_model.spent])
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
            <p id="infer_time">Inference time: {spentData[0].toFixed(2)}</p>
          </div>
          <ReactBootstrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody>
              {clusterData.map((recommendation, index) => (
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
            <p id="infer_time">Inference time: {spentData[1].toFixed(2)}</p>
          </div>
          <ReactBootstrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((recommendation, index) => (
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
            <p id="infer_time">Inference time: {spentData[2].toFixed(2)}</p>
          </div>
          <ReactBootstrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody>
              {svdData.map((recommendation, index) => (
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

const input_tags = ['디즈니', '연애', '유재석', '고막남친', '포근한', '연말', '짝사랑', '운전', '봄바람',
       '잠들기전', '힘', '흥겨운', '신곡', '산책', '듣기좋은', '걸그룹', '파티', '비오는날', '추위',
       '비오는', '불토', '재즈', '이브', 'UK', '연애세포', '여행', '가을밤', '센치한', '록',
       '행복', '배경음악', '감성힙합', '추석', '추억', '지친', '집', '어쿠스틱', '감성곡', '드라이브',
       '고속도로', '신나는', '가을비', '트로트', '눈', '불금', '피아노', '발랄', '성인가요', '댄스',
       '주말', '패션', '우울한', '벚꽃', '날씨', '커피', '노동요', '수록곡', '힘내', '경쾌한',
       '정미애', '따뜻함', '노래', 'OfficialCharts', '헤어짐', '남자아이돌', '팝', '댄스곡',
       '정다경', '여유', '휴식', '새벽', '잔잔함', '2000년대', '나른', '우울', '12월',
       '뉴에이지', '우울할때', '명절', '2019년', '중독성', '엄마아리랑', '인디', '비', '자장가',
       '버스', '스타일', '축하', '까페', '퇴근', '2016', '상큼한', '노래방', '찾아오는DJ',
       'RNBSOUL', '상큼', '청량한', 'EDM', 'deep', '한국힙합', '아픔', '밝은', '혼자',
       '기분전환', '찬양', '아이돌', '부드러운', '눈오는날', '귀르가즘', '여름노래', '댄스댄스', 'bar',
       '크리스마스캐롤', '테라스', 'electronica', '연휴', '봄비', '가을', '북카페', '알앤비',
       '토닥토닥', '장마', '트렌디', '꿀잠', '잔잔', '하우스', '와인', '생일', '국외', '고백',
       '신남', '봄노래', '쓸쓸', '얼터너티브', '느낌있는', '성탄절', '브금', '불면증', '귀성길',
       '에이핑크', '디스코', '인기', '달달', '소울', '책읽을때', '슬픔', '운동', '사랑노래', '락',
       '잔잔한노래', '여름밤', '쌀쌀한', '시원한', '저녁', '낮잠', '일렉', '캐롤', '방콕',
       '메리크리스마스', '기분좋은', '따뜻하게', '빌로우', '아무로나미에', '장르구분없이', '월요병', '분위기',
       '청량', '페스티벌', '추천곡', '내적댄스', '국힙', '외로움', '클럽', '즐거운', '맑은', '스포츠',
       '열대야', '오르골', '감성발라드', '밤', '시작', '브릿팝', '산뜻한', 'EDMFloor', '빗소리',
       '쓸쓸함', '조용한', '낙엽', '겨울밤', '좋아요', '2019', '몽환', '블랙뮤직', '겨울노래',
       '겨울', '휴일', '태교', '팝송', '새벽감성', '바캉스', '그리움', '추천', 'Lounge',
       '플레이리스트', 'dance', '달달한', '신나는노래', '하늘', 'Instrumental', '그루브',
       '치유', '봄', '퓨전재즈', '회식', '일렉트로니카', '잔잔한', '힙합엘이', '힙한', '힘들때',
       '설렘', '취향저격', '독서', '썸', '차분', '목소리', '마음', '내한', '랩', '더위', '따듯한',
       '띵곡들', '베스트', '봄나들이', '인디팝', '연주곡', '셋리스트', '감성', '장윤정', '후회',
       '바람', '헬스', '지칠때', '흐린날', '감성적인', '유산슬', '임영웅', '집콕', '에너지',
       '몽환적인', 'Christmas', '해외일렉트로니카', '크리스마스', '바다', '케이팝', '기분업',
       '흥폭발', '겨울감성', '어린이집', '숨은명곡', 'OST', '2000', '고막여친', '춤', '휴가',
       'bgm', '트랩', '연인', '비오는날듣기좋은노래', '하루', '가족', '슬픈', 'Pop', '집중',
       '눈물', '아침', '카페뮤직', '두근두근', 'Rock', '차분한', '출근길', '이별', 'house',
       '기분', '스트레스', '봄날', '잠', 'ballad', '음색', '달콤', '인디음악', '기타',
       '다이어트', '띵곡', '떼창', '오후', '시험', '숙면', '회상', '대세', '캐럴', '취저',
       '달달한노래', '꿀성대', '희망', '팝송모음', '흥', '설레임', '힙합', '애창곡', '카페', '매장',
       '음색깡패', '크리스마스노래', '스웩', '오늘', '음악', '1990', '신나는음악', '유니크', '퇴근길',
       '신나', '잠잘때', '공부', '설날', '힘이_나는', '달콤한', '주제곡', '사랑', '발라드', '생각',
       '여름', '힐링', '여자아이돌', '방탄', '센치', '고백송', '커플', '첫사랑', '조깅', '지하철',
       '위로', '매장음악', '좋은노래', '가사', '데이트', '유산소', '트로피컬', '리드미컬', '솔로',
       '세련된', '비트', '스타일리시', '야경', '나들이', '편안한', '휘트니스', '영국', '일상'
]

const top100Films = input_tags.map((tag_name) => ({title: tag_name}))


export default App;
