class CreateDiaries < ActiveRecord::Migration[5.2]
  def change
    create_table :diaries do |t|
      t.string :diary_title
      t.text :diary_body
      t.string :diary_image_id
      t.integer :user_id

      t.timestamps
    end
  end
end
