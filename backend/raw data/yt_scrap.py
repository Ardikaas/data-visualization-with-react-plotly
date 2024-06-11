import yt_dlp
from datetime import datetime
import csv

channel_url = 'https://www.youtube.com/c/TED/videos'

def get_videos_from_channel(channel_url):
  ydl_opts = {
    'extract_flat': True,
    'playlistend': 1000,
  }
  with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info_dict = ydl.extract_info(channel_url, download=False)
  return info_dict.get('entries', [])

def get_video_info(url):
  ydl_opts = {}
  with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info_dict = ydl.extract_info(url, download=False)
  return info_dict

def process_video_info(video_info):
  title = video_info.get('title')
  author = 'Unknown'

  if ' | ' in title:
    title_parts = title.split(' | ')
    if len(title_parts) == 3:
      title = title_parts[0].strip()
      author = title_parts[1].strip()

  upload_date_str = video_info.get('upload_date')
  upload_date = datetime.strptime(upload_date_str, "%Y%m%d")
  formatted_date = upload_date.strftime("%B %Y")
  views = video_info.get('view_count')
  likes = video_info.get('like_count')
  link = video_info.get('webpage_url')

  if 2022 <= upload_date.year <= 2024:
    video_data = [title, author, formatted_date, views, likes, link]
    return video_data
  else:
    return None

channel_url = 'https://www.youtube.com/c/TED/videos'
videos = get_videos_from_channel(channel_url)
csv_file = 'ted_talks_yt.csv'

with open(csv_file, mode='w', newline='', encoding='utf-8') as file:
  writer = csv.writer(file)
  writer.writerow(['title', 'author', 'date', 'views', 'likes', 'link'])  # Tulis header

  for video in videos:
    video_url = video['url']
    video_info = get_video_info(video_url)
    video_data = process_video_info(video_info)

    if video_data:
      writer.writerow(video_data)

print(f"Data telah disimpan dalam file CSV: {csv_file}")
