class CreateExps < ActiveRecord::Migration[5.2]
  def change
    create_table :exps do |t|
      t.integer :level
      t.integer :level_up
      t.integer :level_wall
      t.timestamps
    end
  end
end
