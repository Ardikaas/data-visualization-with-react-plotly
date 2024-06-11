import pandas as pd
import requests

url = 'http://localhost:8080/input'
df = pd.read_csv('./ted_talks_yt.csv')
df_cleaned = df.dropna() 

def row_to_json(row):
  if row['author'] != 'Unknown':
    return {
      'title': row['title'],
      'author': row['author'],
      'date': row['date'],
      'views': row['views'],
      'likes': row['likes'],
      'link': row['link']
    }
  else:
    return None

for index, row in df_cleaned.iterrows():
  json_data = row_to_json(row)
  if json_data:
    response = requests.post(url, json=json_data)
    if response.ok:
      print(f'Data untuk "{row["title"]}" berhasil dikirim.')
    else:
      print(f'Gagal mengirim data untuk "{row["title"]}".')
  else:
    print(f'Skipping data untuk "{row["title"]}" karena author tidak diketahui.')
