class CreatePoints < ActiveRecord::Migration[5.2]
  def change
    create_table :points do |t|
      t.integer :point
      t.integer :point_up
      t.integer :point_wall
      t.timestamps
    end
  end
end
