class CreateDiaryImages < ActiveRecord::Migration[5.2]
  def change
    create_table :diary_images do |t|
      t.integer :diary_id
      t.string :image_id

      t.timestamps
    end
  end
end