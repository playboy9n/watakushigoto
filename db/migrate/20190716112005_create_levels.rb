class CreateLevels < ActiveRecord::Migration[5.2]
  def change
    create_table :levels do |t|
      t.integer :lv, default: 1
      t.integer :exp, default: 0
      t.integer :exp_box, default: 200
      t.integer :user_id
      t.timestamps
    end
  end
end
