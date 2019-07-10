json.extract! diary, :id, :diary_title, :diary_body, :diary_image_id, :user_id, :created_at, :updated_at
json.url diary_url(diary, format: :json)
