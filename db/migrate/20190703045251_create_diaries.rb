class CreateDiaries < ActiveRecord::Migration[5.2]
  def change
    create_table :diaries do |t|
      t.integer :user_id
      t.string :diary_title
      t.string :diary_body
      t.text :diary_image_id
      t.timestamps
    end
  end
end
