from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time

import pandas as pd
import glob
import pickle
import os
import tensorflow as tf
import numpy as np

################################
# Constants
################################

def get_data_from_pickle(path):
    with open(path, "rb") as f:
        data = pickle.load(f)
    return data

def write_data_to_pickle(data, path):
    with open(path, "wb") as f:
        f.write(pickle.dumps(data))

def get_path(filename, parent='__models__'):
    return os.path.join('..', '..', parent, filename)

tag_vectors = get_data_from_pickle(get_path('tag_vectors', parent='__const__'))
cluster_centers = get_data_from_pickle(get_path('kmeans15.cluster_centers_.pickle', parent='__const__'))
unique_tag_list = get_data_from_pickle(get_path('unique_tag_list.pickle', parent='__const__'))
tag_dict = get_data_from_pickle(get_path('tag_dict.pickle', parent='__const__'))
songId2meta = get_data_from_pickle(get_path('songId2meta.pickle', parent='__const__'))

tag2idx = {tag: i for i, tag in enumerate(unique_tag_list)}
idx2tag = {i: tag for i, tag in enumerate(unique_tag_list)}

################################
# Load Balancing
################################

import math
from queue import PriorityQueue

def distance_tag_to_centroid(tag_idx,cluster_idx): # tag와 cluster의 중심까지의 거리
    return np.sum((tag_vectors[tag_idx]-cluster_centers[cluster_idx])**2)

def nearest_clusters(tag_idx):    # tag와 가장 가까운 클러스터 1개 또는 2개 출력하는 함수
    que = PriorityQueue(maxsize=15)
    near_list_idx = []
    near_clusters_dict = dict()
    for i in range(15):    # 가장 거리가 짧은 클러스터 순서대로 정렬
        que.put([distance_tag_to_centroid(tag_idx,i),i])
    for i in range(2):     # 거리가 짧은 2개만 추출
        near_list_idx.append(que.get())
    
    if(2*near_list_idx[0][0]<near_list_idx[1][0]):    # a(첫번째 클러스터와 태그의 거리), b(두번째 클러스터와 태그의 거리)라고 할 때, a*2 < b 이면 두번째 클러스터 제거(즉 거리차이가 많이나면 제거)
        del near_list_idx[1]
        
    if(len(near_list_idx)==1):
        near_clusters_dict[near_list_idx[0][1]] = near_list_idx[0][0]    
    else:
        for i in range(2):
            near_clusters_dict[near_list_idx[i][1]] = near_list_idx[i][0]        
    
    return near_clusters_dict

def clusters_and_weight(tag_idx):     # 태그의 인덱스를 넣으면 원하는 결과가 출력 --> dict{cluster_index : weight}
    ans_dict = dict()
    near_cluster = nearest_clusters(tag_idx)
    dict_keys = list(near_cluster.keys())
    
    if(len(dict_keys)==1):
        ans_dict[dict_keys[0]] = 1.0
    else:
        a = 2/near_cluster[dict_keys[0]]
        b = 1/near_cluster[dict_keys[1]]
        
        a_percentage = round(a/(a+b),2)
        b_percentage = round(1-a_percentage,2)
        
        ans_dict[dict_keys[0]] = a_percentage
        ans_dict[dict_keys[1]] = b_percentage     
    return ans_dict

tag2clusterId = {
    keyword: key
    for key in tag_dict.keys()
    for keyword in tag_dict[key]
}

################################
# Load Model
################################

CLUSTER_MODELS = [
    tf.keras.models.load_model(get_path(f'cluster_model_{i}'))
    for i in range(15)
]

CLUSTER_ID_TRANSFORMER = [
    get_data_from_pickle(get_path(f'newid2songid/cluster_model_{i}_new2idx2songidx.pickle'))
    for i in range(15)
]

def get_recommendations(tag_id, new_model, id_transformer, k=50):
    _max_song_len = len(id_transformer)
    tags_input = np.array([tag_id] * _max_song_len).reshape(-1, 1)
    songs_input = np.array([*range(_max_song_len)]).reshape(-1, 1)
    
    predicted = new_model.predict([tags_input, songs_input]).flatten()
    predicted = predicted.argsort()[-k:][::-1]
    
    return [id_transformer.get(new_id) for new_id in predicted]

def map_reduce_recommendations(_tag_input):
    _tag_id = tag2idx.get(_tag_input)
    predicted = []
    
    for key_id, weight in clusters_and_weight(_tag_id).items():
        predicted.extend(get_recommendations(_tag_id, CLUSTER_MODELS[key_id], CLUSTER_ID_TRANSFORMER[key_id], int(50*weight)))
    
    return [songId2meta.get(sid) for sid in predicted]


app = FastAPI(name="Music Recommendation API")

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


predicted_mock = [
    {"songname": "2002", "singer": "Anne Marie"},
    {"songname": "Dynamite", "singer": "BTS"},
    {"songname": "Snowman", "singer": "Sia"},
]

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/tag/{tag_name}")
def read_item(tag_name):
    
    ## Model Prediction Part
    start_time = time.time()
    recommendations = map_reduce_recommendations(tag_name)
    spent_time = = start_time - time.time()
    
    reco_len = len(recommendations)

    return { 
        "total_length": reco_len,
        "spent": spent_time,
        "predictions": [
            {"songname": song_name, "singer": artist_name}
            for song_name, artist_name in recommendations
            ]
    }

if __name__ == "__main__":
    print(map_reduce_recommendations('고막남친'))
    uvicorn.run(app, host="localhost", port=8000)
