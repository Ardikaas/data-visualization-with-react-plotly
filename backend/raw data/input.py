import pandas as pd
import requests

url = 'http://localhost:8080/input'
df = pd.read_csv('./data.csv')
df_cleaned = df.dropna() 

def row_to_json(row):
  return {
    'title': row['title'],
    'author': row['author'],
    'date': row['date'],
    'views': row['views'],
    'likes': row['likes'],
    'link': row['link']
  }

for index, row in df_cleaned.iterrows():
  json_data = row_to_json(row)
  response = requests.post(url, json=json_data)
  
  if response.ok:
    print(f'Data untuk "{row["title"]}" berhasil dikirim.')
  else:
    print(f'Gagal mengirim data untuk "{row["title"]}".')