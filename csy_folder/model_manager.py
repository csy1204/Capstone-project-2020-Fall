from .model import RecommenderNet

class ClusterModel(object):
    
    def __init__(self, _df):
        self._df = _df
        
        self._unique_tag_list = list(set([tag for tags in _df.tagIds for tag in tags]))
        self._tag2idx = {tag: i for i, tag in enumerate(self._unique_tag_list)}
        self._idx2tag = {i: tag for i, tag in enumerate(self._unique_tag_list)}

        self._unique_songs = list(set([song for songs in _df.songs2 for song in songs]))
        self._song_idx2new_idx = {song_id: idx for idx, song_id in enumerate(self._unique_songs)}
        self._new_idx2song_idx = {idx: song_id for idx, song_id in enumerate(self._unique_songs)}
        
        self._max_tag_len = len(self._unique_tag_list)
        self._max_song_len = len(self._unique_songs)
        
        self._df['_song_ids'] = _df.songs2.map(lambda x: [self._song_idx2new_idx.get(song) for song in x])
        self._df['_tag_ids'] = _df.tagIds.map(lambda x: [self._tag2idx.get(tag) for tag in x])
        
        
    def preprocess(self, NEG_SAMPLE_NUM=20):
        _tag_song_freq = {i: defaultdict(int) for i in range(self._max_tag_len)}
        
        for tags, songs in tqdm(zip(self._df._tag_ids, self._df._song_ids)):
            for song in songs:
                for tag in tags:
                    _tag_song_freq[tag][song] += 1
                    
        _df_freq = pd.DataFrame(_tag_song_freq).T
        _df_freq = _df_freq.stack().reset_index()
        _df_freq.columns = ['tag_id', 'song_id', 'freq']
        
        neg_data = []
        
        for new_tag_id in tqdm(range(self._max_tag_len)):
            i = NEG_SAMPLE_NUM
            while i:
                random_id = self.get_random_music_id(self._max_song_len)
                
                if not _tag_song_freq[new_tag_id][random_id]:
                    neg_data.append((new_tag_id, random_id, 0))
                    i -= 1
        
        _df_neg = pd.DataFrame(neg_data, columns=_df_freq.columns)
        _df_freq = pd.concat([_df_freq, _df_neg]).sample(frac=1).reset_index(drop=True)
        _df_freq['freq2'] = _df_freq.freq.map(lambda x: 0.5 if x == 1 else (0 if x == 0 else 1))

        _df_over = _df_freq[_df_freq.freq > 1]
        
        test = _df_over.groupby('tag_id').apply(self.get_test_sample).reset_index()
        test = test.sample(frac=1).reset_index(drop=True)
        
        train = _df_freq[~_df_freq.index.isin(test.level_1)]
        
        self.x_train = train[['tag_id','song_id']].values
        self.y_train = train.freq2.values
        
        self.x_test = test[['tag_id','song_id']].values
        self.y_test = test.freq2.values
        
        
        
    def build_model(self, EMBEDDING_SIZE=10):
        self.model = RecommenderNet(self._max_tag_len, self._max_song_len, EMBEDDING_SIZE)

        self.model.compile(
            loss=tf.keras.losses.BinaryCrossentropy(), 
            optimizer=keras.optimizers.Adam(lr=0.0001),
            metric=["mse"]
        )
        
    def train(self, batch_size=32, epochs=10):
        self.history = self.model.fit(
            x=self.x_train,
            y=self.y_train,
            batch_size=batch_size,
            epochs=epochs,
            verbose=1,
            validation_data=(self.x_test, self.y_test),
        )
        
    def print_summary(self):
        print(self.model.summary())
        
    def predict(self, tag_id, k=50):
        _tag_id = self._tag2idx.get(tag_id)
        inputs = [[_tag_id, music_id] for music_id in range(self._max_song_len)]
        predicts = self.model.predict(inputs).flatten()
        predicted = predicts.argsort()[-k:][::-1]
        return [self._new_idx2song_idx.get(new_id) for new_id in predicted]
        
    @staticmethod
    def get_test_sample(df, test_size=0.2, drop_column='tag_id'):
        return df.sample(frac=test_size).drop(drop_column, axis=1)
        
    @staticmethod
    def get_random_music_id(_max_len):
        return random.randint(0, _max_len-1)
